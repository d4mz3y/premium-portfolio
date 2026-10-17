// Builds public/damxey-portfolio.pdf from the same data the site uses.
// Needs Google Chrome (set CHROME=/path/to/chrome if it is not on the default path).
// Usage: node scripts/make-portfolio-pdf.mjs
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import projects from '../src/data/projects.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cv = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cv.json'), 'utf8'))
const chrome = process.env.CHROME || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => fs.existsSync(p))
if (!chrome) throw new Error('Chrome not found. Set CHROME=/path/to/chrome')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const img = (src) => pathToFileURL(path.join(root, 'public', src)).href
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const c = cv.contact

const projectPage = (p, i) => {
  const extra = (p.galleries?.[0]?.items ?? p.gallery ?? []).slice(0, 3)
  const links = []
  if (p.liveUrl) links.push(`<a href="${esc(p.liveUrl)}">Live: ${esc(host(p.liveUrl))}</a>`)
  if (p.repoUrl) links.push(`<a href="${esc(p.repoUrl)}">Code: ${esc(host(p.repoUrl))}</a>`)
  const note = p.isPrivate
    ? `<p class="note">The source code for this project is private. ${p.demoPath ? 'Case study and screens here; an interactive demo on sample data is available on request.' : 'Case study and design screens only.'}</p>`
    : ''
  return `
<section class="project">
  <p class="kicker">${String(i + 1).padStart(2, '0')} · ${esc(p.category)} · ${esc(p.year)}</p>
  <h2>${esc(p.name)}</h2>
  <p class="tagline">${esc(p.tagline)}</p>
  <img class="hero" src="${img(p.image)}" alt="">
  ${extra.length ? `<div class="strip">${extra.map((e) => `<figure><img src="${img(e.src)}" alt=""><figcaption>${esc(e.caption ?? '')}</figcaption></figure>`).join('')}</div>` : ''}
  <p class="role"><b>Role:</b> ${esc(p.role)}</p>
  <p class="summary">${esc(p.summary)}</p>
  <ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
  <div class="chips">${p.tech.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
  ${links.length ? `<p class="links">${links.join(' &nbsp;·&nbsp; ')}</p>` : ''}
  ${note}
</section>`
}

const skillBlock = (title, list) => `<div><h3>${title}</h3><p>${list.map(esc).join(' · ')}</p></div>`

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Damxey, Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 14mm 16mm; }
:root { --ink:#1c1814; --mute:#6b625a; --paper:#ffffff; --line:#e3dccf; --accent:#b0620f; }
* { box-sizing: border-box; }
html { background: var(--paper); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin:0; font: 9.6pt/1.5 Inter, system-ui, sans-serif; color: var(--ink); }
a { color: var(--accent); text-decoration: none; }
h1,h2,h3 { font-family: Fraunces, Georgia, serif; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
.cover { min-height: 255mm; display:flex; flex-direction:column; }
.cover .top { display:flex; justify-content:space-between; font-size:8pt; letter-spacing:.14em; text-transform:uppercase; color:var(--mute); }
.cover h1 { font-size: 64pt; line-height: .95; margin-top: 34mm; }
.cover .name { font-size: 15pt; margin-top: 6mm; font-family: Fraunces, Georgia, serif; }
.cover .title { color: var(--accent); margin-top: 1mm; }
.cover .lead { font-size: 11.5pt; line-height: 1.55; max-width: 150mm; margin-top: 12mm; }
.cols { display:grid; grid-template-columns: 1fr 1fr; gap: 10mm; margin-top: auto; padding-top: 12mm; border-top: 1px solid var(--line); }
.cols h3 { font-size: 11pt; margin-bottom: 2mm; }
.cols p, .cols li { margin: 0 0 1.4mm; }
.cols ul { list-style:none; padding:0; margin:0; }
.cols .exp b { font-weight:600; }
.cols .exp span { color: var(--mute); }
.contact { margin-top: 8mm; display:grid; grid-template-columns: 1fr 1fr; gap: 1mm 10mm; font-size: 9pt; }
.contact span { color: var(--mute); }
.project { break-before: page; }
.kicker { font-size: 8pt; letter-spacing:.12em; text-transform:uppercase; color: var(--accent); margin:0 0 2mm; }
.project h2 { font-size: 24pt; line-height:1.05; }
.tagline { font-size: 11pt; color: var(--mute); margin: 2mm 0 5mm; }
.hero { width:100%; max-height: 80mm; object-fit: cover; object-position: top; border:1px solid var(--line); border-radius: 3mm; display:block; }
.strip { display:grid; grid-template-columns: repeat(3,1fr); gap: 3mm; margin-top: 3mm; }
.strip figure { margin:0; }
.strip img { width:100%; height:26mm; object-fit:cover; object-position:top; border:1px solid var(--line); border-radius:2mm; display:block; }
.strip figcaption { font-size:7pt; color:var(--mute); margin-top:1mm; }
.role { margin: 5mm 0 1mm; color: var(--mute); }
.role b { color: var(--ink); font-weight:600; }
.summary { margin: 0 0 3mm; font-size: 10pt; }
ul { padding-left: 4.5mm; margin: 0 0 3mm; }
li { margin-bottom: 1mm; padding-left: 1mm; }
li::marker { color: var(--accent); }
.chips { display:flex; flex-wrap:wrap; gap: 1.6mm; }
.chips span { border:1px solid var(--line); border-radius: 99px; padding: .6mm 2.6mm; font-size: 8pt; background:#fff; }
.links { margin: 4mm 0 0; font-weight:500; }
.note { margin: 3mm 0 0; font-size: 8.5pt; color: var(--mute); }
.end { break-before: page; }
.end h2 { font-size: 26pt; }
.end .grid { display:grid; grid-template-columns: 1fr; gap: 6mm; margin-top: 8mm; }
.end h3 { font-size: 12pt; margin-bottom: 1mm; color: var(--accent); }
.end p { margin:0; }
</style></head><body>

<section class="cover">
  <div class="top"><span>Portfolio</span><span>${esc(c.location)}</span></div>
  <h1>Damxey</h1>
  <p class="name">${esc(cv.name)}</p>
  <p class="title">${esc(cv.title)}</p>
  <p class="lead">${esc(cv.summary)}</p>
  <div class="contact">
    <div><span>Email</span><br><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></div>
    <div><span>Phone</span><br>${esc(c.phone)}</div>
    <div><span>GitHub</span><br><a href="${esc(c.github)}">${esc(host(c.github))}</a></div>
    <div><span>LinkedIn</span><br><a href="${esc(c.linkedin)}">${esc(host(c.linkedin))}</a></div>
  </div>
  <div class="cols">
    <div class="exp"><h3>Where I have worked</h3><ul>${cv.experience.map((e) => `<li><b>${esc(e.company)}</b> <span>· ${esc(e.platform)}</span></li>`).join('')}</ul></div>
    <div><h3>Selected work</h3><ul>${projects.map((p, i) => `<li>${String(i + 1).padStart(2, '0')} &nbsp;${esc(p.name)}</li>`).join('')}</ul></div>
  </div>
</section>

${projects.map(projectPage).join('\n')}

<section class="end">
  <h2>Skills</h2>
  <div class="grid">
    ${skillBlock('Frontend', cv.skills.frontend)}
    ${skillBlock('Backend', cv.skills.backend)}
    ${skillBlock('Systems & tools', cv.skills.tools)}
  </div>
  <h2 style="margin-top:16mm">Experience</h2>
  <div class="grid">
    ${cv.experience.map((e) => `<div><h3>${esc(e.company)} · ${esc(e.platform)}</h3><p>${esc(e.usage)}</p><p style="color:var(--mute);margin-top:1mm">${e.tools.map(esc).join(' · ')}</p></div>`).join('')}
  </div>
  <p style="margin-top:14mm;color:var(--mute)">Every project above with public code is on <a href="${esc(c.github)}">${esc(host(c.github))}</a>. Full CV available on request.</p>
</section>
</body></html>`

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-pdf-'))
const htmlPath = path.join(tmp, 'portfolio.html')
fs.writeFileSync(htmlPath, html)
const out = path.join(root, 'public', 'damxey-portfolio.pdf')
execFileSync(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files', '--virtual-time-budget=15000', `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href], { stdio: 'ignore' })
console.log('Wrote', out, `(${(fs.statSync(out).size / 1024).toFixed(0)} KB)`)
fs.rmSync(tmp, { recursive: true, force: true })
