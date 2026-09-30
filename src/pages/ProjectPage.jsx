import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Lock, CheckCircle2, Github } from 'lucide-react';
import projects, { getProjectBySlug } from '../data/projects.js';
import { Navbar, Footer } from './Home.jsx';

function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-black selection:bg-primary-500/30">
      <Navbar />

      <header className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 -left-20 w-72 h-72 bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400 bg-primary-400/10 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border border-white/10 px-3 py-1 rounded-full">
              {project.year}
            </span>
            {project.isPrivate ? (
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 border border-white/10 px-3 py-1 rounded-full">
                <Lock size={11} /> Private repository
              </span>
            ) : (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-primary-400 border border-white/10 hover:border-primary-500/40 px-3 py-1 rounded-full transition-colors"
              >
                <Github size={11} /> View code <ArrowUpRight size={11} />
              </a>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.05] tracking-tight text-white">
            {project.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-bold uppercase tracking-wider text-white/50 border border-white/5 px-3 py-1.5 rounded-lg bg-white/[0.02]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.isPrivate && (
        <div className="max-w-5xl mx-auto px-6 mb-4">
          <div className="flex items-start gap-3 text-sm text-white/50 bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4">
            <Lock size={16} className="mt-0.5 shrink-0 text-white/30" />
            <span>
              This is proprietary / commercial work — the source stays private, so this page is a written case study rather than a code walkthrough.
            </span>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-4">Overview</h2>
            <p className="text-white/70 text-lg leading-relaxed">{project.summary}</p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">What it does</h2>
            <ul className="space-y-4">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-white/70 leading-relaxed"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-400" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="glass-card">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-3">Role</h3>
            <p className="text-white font-bold">{project.role}</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-3">Impact</h3>
            <p className="text-white/70 text-sm leading-relaxed">{project.impact}</p>
          </div>
        </aside>
      </main>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        <Link
          to={`/projects/${next.slug}`}
          className="group flex items-center justify-between glass-card hover:border-primary-500/40 transition-all"
        >
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Next project</span>
            <span className="text-xl font-black text-white group-hover:text-primary-400 transition-colors">{next.name}</span>
          </div>
          <ArrowUpRight size={22} className="text-white/30 group-hover:text-primary-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectPage;
