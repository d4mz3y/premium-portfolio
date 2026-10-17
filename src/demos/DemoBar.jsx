import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Shared strip across both private-project demos so visitors always know
// they are looking at sample data, not the real system.
export default function DemoBar({ title, slug, tone = 'dark' }) {
  const dark = tone === 'dark';
  return (
    <div className={`sticky top-0 z-40 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs font-mono ${dark ? 'bg-black text-white/70 border-b border-white/10' : 'bg-[#0b1220] text-white/80'}`}>
      <Link to={`/projects/${slug}`} className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors">
        <ArrowLeft size={13} /> Back to case study
      </Link>
      <span className="uppercase tracking-widest text-[10px]">
        {title} · interactive demo · sample data only
      </span>
    </div>
  );
}
