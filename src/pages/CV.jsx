import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import cvData from '../data/cv.json';
import projects from '../data/projects.js';

function CV() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featured = projects.slice(0, 5);

  return (
    <div className="min-h-screen bg-ink-950 print:bg-white text-ink-100 print:text-black">
      <div className="no-print sticky top-0 z-10 bg-ink-950/95 backdrop-blur-sm border-b border-ink-700 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="label-mono inline-flex items-center gap-2 text-xs text-ink-400 hover:text-accent-400 transition-colors">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <button onClick={() => window.print()} className="btn-primary text-sm py-2 px-4">
          <Printer size={15} /> Save as PDF
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 print:py-6 print:px-0">
        <header className="mb-14 print:mb-8 pb-10 print:pb-6 border-b border-ink-700 print:border-black">
          <h1 className="text-4xl sm:text-5xl font-light text-ink-50 print:text-black mb-2">{cvData.name}</h1>
          <p className="label-mono text-accent-400 print:text-black text-sm mb-6">{cvData.title}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-400 print:text-black font-light">
            <span className="flex items-center gap-2"><Mail size={14} /> {cvData.contact.email}</span>
            <span className="flex items-center gap-2"><Phone size={14} /> {cvData.contact.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> {cvData.contact.location}</span>
            <span className="flex items-center gap-2"><Linkedin size={14} /> {cvData.contact.linkedin.replace('https://', '')}</span>
            <span className="flex items-center gap-2"><Github size={14} /> {cvData.contact.github.replace('https://', '')}</span>
          </div>
        </header>

        <section className="mb-14 print:mb-8">
          <h2 className="label-mono text-xs text-accent-400 print:text-black mb-4">Summary</h2>
          <p className="text-ink-300 print:text-black leading-relaxed font-light">{cvData.summary}</p>
        </section>

        <section className="mb-14 print:mb-8">
          <h2 className="label-mono text-xs text-accent-400 print:text-black mb-6">Experience</h2>
          <div className="space-y-6 print:space-y-4">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="font-display text-lg text-ink-50 print:text-black">{exp.platform}</span>
                  <span className="label-mono text-xs text-ink-500 print:text-black">{exp.company}</span>
                </div>
                <p className="text-ink-400 print:text-black text-sm font-light mb-2">{exp.usage}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tools.map((t) => (
                    <span key={t} className="label-mono text-[10px] text-ink-500 print:text-black border border-ink-700 print:border-black px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 print:mb-8">
          <h2 className="label-mono text-xs text-accent-400 print:text-black mb-6">Selected Projects</h2>
          <div className="space-y-6 print:space-y-4">
            {featured.map((p) => (
              <div key={p.slug} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="font-display text-lg text-ink-50 print:text-black">{p.name}</span>
                  <span className="label-mono text-xs text-ink-500 print:text-black">{p.year}</span>
                </div>
                <p className="text-ink-400 print:text-black text-sm font-light">{p.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="label-mono text-xs text-accent-400 print:text-black mb-6">Skills</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', skills: cvData.skills.frontend },
              { title: 'Backend', skills: cvData.skills.backend },
              { title: 'Systems & Tools', skills: cvData.skills.tools },
            ].map((cat) => (
              <div key={cat.title}>
                <span className="label-mono text-[11px] text-ink-500 print:text-black block mb-2">{cat.title}</span>
                <p className="text-ink-300 print:text-black text-sm font-light leading-relaxed">{cat.skills.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CV;
