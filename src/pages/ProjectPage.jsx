import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Lock, Github } from 'lucide-react';
import projects, { getProjectBySlug } from '../data/projects.js';
import { Navbar, Footer } from './Home.jsx';

function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-ink-950 selection:bg-accent-500/30">
      <Navbar />

      <header className="pt-36 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/#work" className="label-mono inline-flex items-center gap-2 text-xs text-ink-400 hover:text-accent-400 transition-colors mb-10" data-cursor-hover>
            <ArrowLeft size={14} /> Back to work
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6 label-mono text-[11px]">
            <span className="text-accent-400">{project.category}</span>
            <span className="text-ink-600">·</span>
            <span className="text-ink-500">{project.year}</span>
            {project.isPrivate ? (
              <span className="flex items-center gap-1.5 text-ink-500">
                <Lock size={11} /> Private repository
              </span>
            ) : (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-ink-400 hover:text-accent-400 transition-colors"
                data-cursor-hover
              >
                <Github size={11} /> View code <ArrowUpRight size={11} />
              </a>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] text-ink-50 mb-6">
            {project.name}
          </h1>
          <p className="text-lg text-ink-400 max-w-2xl leading-relaxed mb-10 font-light">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="label-mono text-[10px] text-ink-400 border border-ink-700 px-3 py-1.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.image && (
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-hidden border border-ink-700"
          >
            <img src={project.image} alt={project.name} className="w-full h-auto block" />
          </motion.div>
          {project.imageNote && (
            <p className="text-xs text-ink-600 mt-3 italic font-light">{project.imageNote}</p>
          )}
        </div>
      )}

      {project.isPrivate && (
        <div className="max-w-4xl mx-auto px-6 mb-4">
          <div className="flex items-start gap-3 text-sm text-ink-400 border border-ink-700 px-5 py-4 font-light">
            <Lock size={16} className="mt-0.5 shrink-0 text-ink-600" />
            <span>
              This is proprietary / commercial work — the source stays private, so this page is a written case study rather than a code walkthrough.
            </span>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <span className="label-mono text-xs text-accent-400 block mb-4">Overview</span>
            <p className="text-ink-300 text-lg leading-relaxed font-light">{project.summary}</p>
          </section>

          <section>
            <span className="label-mono text-xs text-accent-400 block mb-6">What it does</span>
            <ul className="space-y-4">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-ink-300 leading-relaxed font-light border-l border-ink-700 pl-4"
                >
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="card">
            <span className="label-mono text-xs text-ink-500 block mb-3">Role</span>
            <p className="text-ink-50 font-display text-lg">{project.role}</p>
          </div>
          <div className="card">
            <span className="label-mono text-xs text-ink-500 block mb-3">Impact</span>
            <p className="text-ink-300 text-sm leading-relaxed font-light">{project.impact}</p>
          </div>
        </aside>
      </main>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <Link
          to={`/projects/${next.slug}`}
          className="group flex items-center justify-between card hover:border-accent-500/50 transition-all"
          data-cursor-hover
        >
          <div>
            <span className="label-mono text-xs text-ink-500 block mb-1">Next project</span>
            <span className="font-display text-xl text-ink-50 group-hover:text-accent-400 transition-colors">{next.name}</span>
          </div>
          <ArrowUpRight size={20} className="text-ink-600 group-hover:text-accent-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectPage;
