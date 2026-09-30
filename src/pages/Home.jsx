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
  ArrowUpRight,
  Lock,
  Menu,
  X,
  MessageCircle,
} from 'lucide-react';
import cvData from '../data/cv.json';
import projects from '../data/projects.js';
import Magnetic from '../components/Magnetic.jsx';
import TiltCard from '../components/TiltCard.jsx';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'CV', href: '/cv' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-ink-950/90 backdrop-blur-sm border-b border-ink-700 py-4' : 'border-b border-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="font-display text-xl font-semibold text-ink-50 tracking-tight">
          Ayodamope<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.name} to={link.href} className="label-mono text-xs text-ink-300 hover:text-accent-400 transition-colors">
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={link.href} className="label-mono text-xs text-ink-300 hover:text-accent-400 transition-colors">
                {link.name}
              </a>
            )
          ))}
          <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
            Let's talk
          </a>
        </div>

        <button className="md:hidden text-ink-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ink-950 border-b border-ink-700 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link key={link.name} to={link.href} className="label-mono text-sm text-ink-300" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href={link.href} className="label-mono text-sm text-ink-300" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                )
              ))}
              <a href="#contact" className="btn-primary justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Clock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
};

const Hero = () => {
  return (
    <section id="about" className="relative pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-16 items-end">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="label-mono text-xs text-accent-400 block mb-6">Portfolio / 2026</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] text-ink-50 mb-8">
            {cvData.title.split(' & ')[0]},<br />
            building things that <em className="text-accent-400 not-italic font-normal">hold up</em>.
          </h1>
          <p className="text-lg text-ink-300 max-w-xl leading-relaxed mb-10 font-light">
            {cvData.summary}
          </p>

          <div className="flex flex-wrap gap-4">
            <Magnetic as={Link} to="/cv" className="btn-primary">
              <Download size={16} /> View CV
            </Magnetic>
            <Magnetic as="a" href="#work" className="btn-outline">
              See the work <ArrowUpRight size={16} />
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="card font-mono text-xs text-ink-300 w-full lg:w-72 shrink-0"
        >
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-ink-700">
            <span className="text-ink-500">SYSTEM STATUS</span>
            <span className="flex items-center gap-2 text-accent-400">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" /> AVAILABLE
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-ink-500">Location</span><span className="text-ink-100">{cvData.contact.location}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Local time</span><span className="text-ink-100"><Clock /></span></div>
            <div className="flex justify-between"><span className="text-ink-500">Experience</span><span className="text-ink-100">{cvData.stats[0].value} yrs</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Platforms shipped</span><span className="text-ink-100">{cvData.stats[1].value}</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = ['Frontend Engineering', 'System Security', 'Platform Architecture', 'Lagos, Nigeria'];
  const track = [...items, ...items];
  return (
    <div className="relative py-5 border-y border-ink-700 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {track.map((item, i) => (
          <span key={i} className="label-mono flex items-center text-xs text-ink-500 mx-6">
            {item}
            <span className="ml-6 text-accent-500">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const ExperienceStrip = () => {
  return (
    <section id="experience" className="py-20 px-6 border-b border-ink-700">
      <div className="max-w-6xl mx-auto">
        <span className="label-mono text-xs text-accent-400 block mb-8">01 / Experience</span>
        <div className="divide-y divide-ink-800">
          {cvData.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group grid sm:grid-cols-[1fr_auto_auto] gap-2 sm:gap-8 items-baseline py-5"
            >
              <div>
                <span className="font-display text-xl text-ink-50 group-hover:text-accent-400 transition-colors">{exp.company}</span>
                <span className="text-ink-500 text-sm ml-3">{exp.platform}</span>
              </div>
              <p className="text-ink-400 text-sm max-w-md">{exp.usage}</p>
              <div className="hidden sm:flex gap-2 justify-end">
                {exp.tools.slice(0, 2).map((t) => (
                  <span key={t} className="label-mono text-[10px] text-ink-500 border border-ink-700 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsGallery = () => {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="label-mono text-xs text-accent-400 block mb-4">02 / Selected Work</span>
            <h2 className="text-4xl sm:text-5xl font-light text-ink-50">
              Things I've <span className="text-accent-400 font-normal">built</span>.
            </h2>
          </div>
          <p className="text-sm text-ink-400 max-w-xs font-light">
            Seven projects, from production systems to research. Every one is real — click through for the case study.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-800">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.06 }}
              className="bg-ink-950"
            >
              <TiltCard className="h-full">
                <Link to={`/projects/${project.slug}`} className="group relative flex flex-col h-full" data-cursor-hover>
                  {project.image && (
                    <div className="relative aspect-video overflow-hidden bg-ink-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-accent-600/0 group-hover:bg-accent-600/10 transition-colors duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span className="label-mono text-[10px] text-ink-500">{project.category}</span>
                      {project.isPrivate ? (
                        <Lock size={13} className="text-ink-600" />
                      ) : (
                        <ArrowUpRight size={15} className="text-ink-600 group-hover:text-accent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      )}
                    </div>
                    <h3 className="font-display text-xl text-ink-50 mb-2 group-hover:text-accent-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-ink-400 leading-relaxed font-light">{project.tagline}</p>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    { key: 'frontend', title: 'Frontend', skills: cvData.skills.frontend },
    { key: 'backend', title: 'Backend', skills: cvData.skills.backend },
    { key: 'tools', title: 'Systems & Tools', skills: cvData.skills.tools },
  ];
  const [active, setActive] = useState('frontend');
  const current = categories.find((c) => c.key === active);

  return (
    <section id="skills" className="py-24 px-6 border-t border-ink-700">
      <div className="max-w-6xl mx-auto">
        <span className="label-mono text-xs text-accent-400 block mb-4">03 / Capabilities</span>
        <h2 className="text-4xl sm:text-5xl font-light text-ink-50 mb-14">
          What I <span className="text-accent-400 font-normal">work with</span>.
        </h2>

        <div className="flex gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`label-mono text-xs px-4 py-2 rounded-full border transition-colors ${active === cat.key ? 'border-accent-500 text-accent-400 bg-accent-500/5' : 'border-ink-700 text-ink-400 hover:border-ink-500'}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {current.skills.map((skill) => (
              <span
                key={skill}
                className="font-display text-2xl sm:text-3xl text-ink-300 hover:text-accent-400 transition-colors cursor-default font-light"
              >
                {skill}
                <span className="text-ink-700 mx-3 text-xl">/</span>
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer id="contact" className="pt-24 pb-10 px-6 border-t border-ink-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl sm:text-5xl font-light text-ink-50 mb-6">
              Let's <span className="text-accent-400 font-normal">talk</span>.
            </h2>
            <p className="text-ink-400 mb-8 max-w-md font-light">
              Whether it's a new opportunity or just a chat about technology, my inbox is always open.
            </p>
            <div className="flex flex-col gap-3 items-start">
              <a href={`mailto:${cvData.contact.email}`} className="flex items-center gap-3 text-ink-300 hover:text-accent-400 transition-colors" data-cursor-hover>
                <Mail size={16} /> <span className="text-sm">{cvData.contact.email}</span>
              </a>
              <a href={`tel:${cvData.contact.phone}`} className="flex items-center gap-3 text-ink-300 hover:text-accent-400 transition-colors" data-cursor-hover>
                <Phone size={16} /> <span className="text-sm">{cvData.contact.phone}</span>
              </a>
              <a href={`https://wa.me/${cvData.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink-300 hover:text-accent-400 transition-colors" data-cursor-hover>
                <MessageCircle size={16} /> <span className="text-sm">WhatsApp</span>
              </a>
              <div className="flex items-center gap-3 text-ink-500">
                <MapPin size={16} /> <span className="text-sm">{cvData.contact.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end items-start md:items-end gap-4">
            <div className="flex gap-4">
              <a href={cvData.contact.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full border border-ink-700 hover:border-accent-500 hover:text-accent-400 transition-all text-ink-300" data-cursor-hover>
                <Linkedin size={18} />
              </a>
              <a href={cvData.contact.github} target="_blank" rel="noreferrer" className="p-3 rounded-full border border-ink-700 hover:border-accent-500 hover:text-accent-400 transition-all text-ink-300" data-cursor-hover>
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-ink-600 text-xs label-mono border-t border-ink-800 pt-8">
          <span>{cvData.name} © {new Date().getFullYear()}</span>
          <span>Built by hand, not a template</span>
        </div>
      </div>
    </footer>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-ink-950 selection:bg-accent-500/30">
      <Navbar />
      <Hero />
      <Marquee />
      <ExperienceStrip />
      <ProjectsGallery />
      <Skills />
      <Footer />
    </div>
  );
}

export default Home;
