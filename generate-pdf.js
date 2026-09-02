import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

async function createPdf() {
    const pdfDoc = await PDFDocument.create();

    const pages = [
        path.join(publicDir, 'cv-page-1.jpg'),
        path.join(publicDir, 'cv-page-2.jpg'),
        path.join(publicDir, 'cv-page-3.jpg'),
    ];

    for (const pagePath of pages) {
        const imgBytes = fs.readFileSync(pagePath);
        const img = await pdfDoc.embedJpg(imgBytes);
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
        });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(publicDir, 'cv.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`PDF created successfully at ${outputPath}`);
}

createPdf().catch(err => console.error(err));
