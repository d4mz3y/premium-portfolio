import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function createPdf() {
    const pdfDoc = await PDFDocument.create();

    const pages = [
        '/home/damxey/.gemini/antigravity/scratch/premium-portfolio/public/cv-page-1.jpg',
        '/home/damxey/.gemini/antigravity/scratch/premium-portfolio/public/cv-page-2.jpg',
        '/home/damxey/.gemini/antigravity/scratch/premium-portfolio/public/cv-page-3.jpg'
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
    fs.writeFileSync('/home/damxey/.gemini/antigravity/scratch/premium-portfolio/public/cv.pdf', pdfBytes);
    console.log('PDF created successfully at /home/damxey/.gemini/antigravity/scratch/premium-portfolio/public/cv.pdf');
}

createPdf().catch(err => console.error(err));
