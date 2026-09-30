import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  ArrowUpRight,
  Lock,
  ChevronRight,
  Code2,
  Terminal,
  Cpu,
  Menu,
  X,
  Palette,
  FileJson,
  Layout,
  Server,
  Database,
  Figma,
  Cloud,
  Box,
  MessageCircle
} from 'lucide-react';
import cvData from '../data/cv.json';
import projects from '../data/projects.js';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent border-b border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black text-gradient tracking-tighter"
        >
          Ayodamope
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="btn-primary py-2 px-5 text-sm"
          >
            Contact
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-2xl overflow-hidden border-b border-white/5"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="about" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary-600/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary-700/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-primary-400 text-[10px] xs:text-xs sm:text-sm font-semibold mb-6 uppercase tracking-wider"
          >
            Available for opportunities
          </motion.span>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-white">
            I'm <span className="text-gradient leading-normal py-2">{cvData.name}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
            {cvData.summary}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-8 mb-10 pb-8 border-b border-white/5">
            {cvData.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start group/stat">
                <span className="text-2xl sm:text-3xl font-black text-gradient group-hover/stat:scale-110 transition-transform duration-300">{stat.value}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40 font-bold whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="/cv.pdf" download className="btn-primary flex items-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 text-white">
              <Download size={18} /> Download CV
            </a>
            <a href="#experience" className="px-6 sm:px-8 py-3 sm:py-4 border border-white/10 rounded-full font-semibold hover:bg-white/5 transition-all text-sm sm:text-base text-white">
              View Experience
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex items-center justify-center p-4 lg:p-8"
        >
          {/* Minimalist Architectural Signature */}
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            {/* Soft Ambient Glow */}
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute inset-x-0 bg-primary-500/20 rounded-full blur-[120px] h-full w-full"
            />

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative z-10 w-[80%] aspect-square glass-card p-1 rounded-[3.5rem] border border-white/10 shadow-3xl bg-white/[0.01] backdrop-blur-3xl flex items-center justify-center"
            >
              <div className="relative flex flex-col items-center">
                {/* Premium Icon Chamber */}
                <div className="relative p-10 rounded-full bg-gradient-to-br from-primary-600/10 to-transparent border border-white/5 shadow-inner">
                  <Code2 size={80} className="text-primary-400 opacity-80" />
                  {/* Orbiting Tech Dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-400 shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
                  </motion.div>
                </div>

                <div className="mt-8 text-center">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4" />
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Senior Engineering</span>
                </div>
              </div>
            </motion.div>

            {/* Subtle Peripheral Decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-white/5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-white/5 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = ['Frontend Engineering', 'System Security', 'Platform Architecture', 'Lagos, Nigeria', 'Available for Opportunities'];
  const track = [...items, ...items];
  return (
    <div className="relative py-6 border-y border-white/5 overflow-hidden bg-white/[0.015]">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {track.map((item, i) => (
          <span key={i} className="flex items-center text-sm font-bold uppercase tracking-[0.3em] text-white/25 mx-6">
            {item}
            <span className="ml-6 text-primary-400/50">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Eyebrow = ({ index, label }) => (
  <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
    <span className="text-xs font-black font-mono text-primary-400/70">{index}</span>
    <span className="h-px w-8 bg-primary-400/40" />
    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">{label}</span>
  </div>
);

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <Eyebrow index="01" label="Experience" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">Selected <span className="text-gradient leading-normal">Platforms</span></h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-2xl mx-auto md:mx-0 font-medium">Solving complex problems through architecture and refined UX—built to scale.</p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary-500 to-transparent rounded-full mx-auto md:mx-0"></div>
        </div>

        <div className="grid gap-10 sm:gap-12 lg:gap-16">
          {cvData.experience.map((exp, i) => {
            const linked = projects.find((p) => p.slug === exp.projectSlug);
            const card = (
              <div className="lg:w-1/2 overflow-hidden rounded-2xl border border-white/5 order-2 lg:order-1 relative group/img bg-white/5">
                {exp.image ? (
                  <div className="block relative aspect-video overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.platform}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex items-end p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex flex-col gap-2">
                        <span className="text-primary-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] bg-primary-400/10 px-3 py-1 rounded-full w-fit">
                          {linked ? 'Case Study' : 'UI Concept'}
                        </span>
                        <div className="mt-4 flex items-center gap-2 text-primary-400 font-black text-xs sm:text-sm uppercase tracking-widest hover:text-white transition-colors underline decoration-2 underline-offset-4">
                          {linked ? 'View Case Study' : 'View Concept'} <ExternalLink size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                    <Code2 size={48} className="text-white/10" />
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex flex-col lg:flex-row gap-8 lg:gap-12 overflow-hidden group hover:border-primary-500/50 transition-all duration-700"
              >
                {linked ? <Link to={`/projects/${linked.slug}`}>{card}</Link> : (exp.demoLink ? <a href={exp.demoLink} target="_blank" rel="noreferrer">{card}</a> : card)}

                <div className="lg:w-1/2 flex flex-col justify-center order-1 lg:order-2">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black text-white/30 uppercase tracking-[0.3em] font-mono">{exp.company}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black group-hover:text-primary-400 transition-colors uppercase tracking-tighter leading-none mb-4 text-white">{exp.platform}</h3>
                    <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-lg border-l-2 border-primary-500/30 pl-6 italic">
                      {exp.usage}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {exp.tools.map((tool, j) => (
                      <span key={j} className="text-[10px] sm:text-xs font-bold text-white/40 border border-white/5 px-3 py-1.5 rounded-lg bg-white/[0.02] uppercase tracking-widest group-hover:text-primary-400 group-hover:border-primary-500/20 transition-all duration-500">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProjectsGallery = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <Eyebrow index="02" label="Projects" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">
            The <span className="text-gradient leading-normal">Archive</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-2xl mx-auto md:mx-0 font-medium">
            Every worthwhile build, from production systems to research projects. Click through for the full case study.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary-500 to-transparent rounded-full mx-auto md:mx-0"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.08 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group relative block h-full p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary-500/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start justify-between mb-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{project.category}</span>
                  {project.isPrivate ? (
                    <Lock size={14} className="text-white/25" />
                  ) : (
                    <ArrowUpRight size={16} className="text-white/25 group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  )}
                </div>

                <h3 className="relative text-xl font-black text-white mb-2 tracking-tight group-hover:text-primary-400 transition-colors">
                  {project.name}
                </h3>
                <p className="relative text-sm text-white/50 leading-relaxed mb-5 line-clamp-2">
                  {project.tagline}
                </p>

                <div className="relative flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] font-bold uppercase tracking-wider text-white/40 border border-white/5 px-2 py-1 rounded-md bg-white/[0.02]">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 px-2 py-1">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const getSkillIcon = (skill) => {
    const iconSize = 14;
    const name = skill.toLowerCase();
    if (name.includes('react')) return <Code2 size={iconSize} />;
    if (name.includes('vue') || name.includes('nuxt')) return <Cpu size={iconSize} />;
    if (name.includes('tailwind') || name.includes('css') || name.includes('scss')) return <Palette size={iconSize} />;
    if (name.includes('js') || name.includes('ts') || name.includes('typescript')) return <FileJson size={iconSize} />;
    if (name.includes('html')) return <Layout size={iconSize} />;
    if (name.includes('node')) return <Server size={iconSize} />;
    if (name.includes('php') || name.includes('sql')) return <Database size={iconSize} />;
    if (name.includes('git')) return <Github size={iconSize} />;
    if (name.includes('figma')) return <Figma size={iconSize} />;
    if (name.includes('linux')) return <Terminal size={iconSize} />;
    if (name.includes('deploy') || name.includes('support')) return <Cloud size={iconSize} />;
    return <Box size={iconSize} />;
  };

  const skillCategories = [
    { title: 'Frontend', icon: <Code2 />, skills: cvData.skills.frontend },
    { title: 'Backend', icon: <Terminal />, skills: cvData.skills.backend },
    { title: 'Systems & Tools', icon: <Cpu />, skills: cvData.skills.tools },
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center flex flex-col items-center">
          <Eyebrow index="03" label="Capabilities" />
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">Tech <span className="text-gradient">Stack</span></h2>
          <p className="text-white/50">My specialized toolkit for building digital experiences.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 text-primary-400 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/5 hover:border-primary-500/30">
                    <span className="text-primary-400">{getSkillIcon(skill)}</span>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export const Footer = () => {
  return (
    <footer id="contact" className="pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12 text-left">
          <div>
            <h2 className="text-4xl font-black mb-6 text-white">Let's <span className="text-gradient leading-normal">Connect</span></h2>
            <p className="text-white/50 mb-8 max-w-md">
              Whether it's a new opportunity or just a chat about technology, my inbox is always open.
            </p>
            <div className="flex flex-col gap-4 items-start">
              <a href={`mailto:${cvData.contact.email}`} className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary-500/20 transition-colors"><Mail size={20} /></div>
                <span className="text-sm sm:text-base">{cvData.contact.email}</span>
              </a>
              <a href={`tel:${cvData.contact.phone}`} className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary-500/20 transition-colors"><Phone size={20} /></div>
                <span className="text-sm sm:text-base">{cvData.contact.phone}</span>
              </a>
              <a href={`https://wa.me/${cvData.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-green-500/20 transition-colors"><MessageCircle size={20} /></div>
                <span className="text-sm sm:text-base">WhatsApp</span>
              </a>
              <div className="flex items-center gap-4 text-white/70">
                <div className="p-3 rounded-full bg-white/5"><MapPin size={20} /></div>
                <span className="text-sm sm:text-base">{cvData.contact.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start md:items-end">
            <div className="flex gap-4 mb-6">
              <a href={cvData.contact.linkedin} target="_blank" className="p-4 rounded-full glass hover:bg-primary-600/20 transition-all hover:scale-110 active:scale-95 text-white">
                <Linkedin size={24} />
              </a>
              <a href={cvData.contact.github} target="_blank" className="p-4 rounded-full glass hover:bg-primary-600/20 transition-all hover:scale-110 active:scale-95 text-white">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-white/10 text-sm border-t border-white/5 pt-10">
          {cvData.name} © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-black selection:bg-primary-500/30">
      <Navbar />
      <Hero />
      <Marquee />
      <Experience />
      <ProjectsGallery />
      <Skills />
      <Footer />
    </div>
  );
}

export default Home;
