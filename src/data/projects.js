// Real projects pulled from GitHub + local repos. Two are kept private
// (trade-secret backbone code, not for public release) and are shown here
// as case studies only — no outbound "view code" link for those.

const projects = [
  {
    slug: 'hg-attendance-system',
    name: 'HG Attendance System',
    tagline: 'Production attendance, scheduling & payroll platform for a guard workforce',
    category: 'Full-stack · Production system',
    tech: ['Laravel 12', 'React 19', 'MySQL 8.4', 'Docker', 'Nginx', 'PHP-FPM', 'TypeORM'],
    year: '2026',
    isPrivate: true,
    repoUrl: null,
    role: 'Sole developer & operator',
    summary:
      'An internal attendance, scheduling, leave, and reporting system built for Hogan Guards’ on-the-ground security workforce. Runs in production on a self-hosted Docker stack with an offline-capable kiosk for clock-in/out.',
    highlights: [
      'Offline-first PWA kiosk (installable service worker) for staff clock-in/out at guard posts with unreliable connectivity',
      'Automatic supersession of stale open sessions, overnight-shift handling, and grace-window scan pairing to keep attendance data accurate without manual correction',
      'Staff photos served only through short-lived signed URLs — never public storage — to protect personal data',
      'Built-in billing: Paystack-powered subscription payments, auto-renewal, receipts, and payment history',
      'Proactive system-health email alerts, automated log/image pruning, and encrypted external-drive backups',
      'Deployed two ways: on-premises via Docker/Nginx with internal-CA HTTPS over ZeroTier, or on an Oracle Cloud Always Free tier for remote offices',
      'Super-admin recovery flow with session revocation, designed so a forgotten password can never lock the whole org out',
    ],
    impact:
      'Replaced a manual, paper-based attendance and leave process with a system guards and administrators use daily — including scheduling, payroll-adjacent reporting, and billing.',
  },
  {
    slug: 'hogan-hub',
    name: 'Hogan Hub',
    tagline: 'Modular infrastructure-protection platform — admin, patrol, intel & SOS',
    category: 'Full-stack · Internal platform',
    tech: ['React 19', 'TypeScript', 'NestJS', 'TypeORM', 'SQLite', 'JWT', 'Gemini API'],
    year: '2026',
    isPrivate: true,
    repoUrl: null,
    role: 'Sole developer',
    summary:
      'A role-based operations platform for Hogan Tech: separate access tiers for Super Admin, Client Admin, and Field Guard, covering user/permission management, patrol operations, threat intel, and emergency SOS handling.',
    highlights: [
      'Modular backend (NestJS) split into admin, patrol, intel, profile, and SOS domains, each with its own guarded routes',
      'JWT auth with role-based module access guards — a Field Guard and a Super Admin see entirely different surfaces of the same app',
      'AI-assisted features via the Gemini API for the intel module',
      'Rate limiting (NestJS Throttler) and Helmet-hardened API surface',
      'SQLite + TypeORM for a self-contained deployment with migration support',
    ],
    impact:
      'Gives Hogan Tech a single modular system for the operational and security-management work that previously lived across spreadsheets and manual processes.',
  },
  {
    slug: 'phishing-detection-app',
    name: 'AI Phishing Email Detector',
    tagline: 'Multimodal deep-learning system for real-time phishing detection',
    category: 'Machine learning · Security',
    tech: ['Python', 'Flask', 'PyTorch', 'DistilBERT', 'SHAP', 'Transformers'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/phishing-detection-app',
    role: 'Sole developer & researcher',
    summary:
      'A runnable multimodal deep-learning system that combines DistilBERT email-text embeddings with a metadata neural network and late fusion, served through a Flask dashboard with real-time predictions and explainability.',
    highlights: [
      '98.26% accuracy / 99.75% ROC-AUC on a held-out 460-email test set (3,065-row stratified split, seed 42) — fully reproducible and documented in a model card',
      'Frozen DistilBERT text encoder fused with a 15-feature sender/receiver/message/URL metadata branch via a late-fusion classifier',
      'Kernel SHAP explanations for metadata attribution, plus DistilBERT final-layer attention visualization — the tool shows *why* it flagged an email, not just that it did',
      '.eml / .txt import for real-world email analysis',
      'Automatic heuristic fallback if model artifacts are unavailable, so the app degrades gracefully rather than failing',
    ],
    impact:
      'Built as a dissertation-grade research project, with verified metrics kept separate from any originally reported results — provenance and limitations documented rather than asserted.',
  },
  {
    slug: 'advanta-ai',
    name: 'AdVanta AI',
    tagline: 'Marketing site for an AI-powered growth/agency product',
    category: 'Frontend · Marketing site',
    tech: ['React', 'Vite', 'Vercel Analytics', 'Speed Insights'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/AdVanta-AI',
    role: 'Frontend developer',
    summary:
      'A full marketing site for an AI-driven growth product — hero, problem framing, services, process, audience segmentation, pricing, and conversion sections, built as independent, composable React components.',
    highlights: [
      'Eleven-section one-page structure (Hero, Ticker, Problem, Services, Process, Who We Serve, AI Edge, Pricing, CTA) built as isolated, reusable components',
      'Scroll-reveal animation component shared across sections for a consistent motion language',
      'Production-instrumented with Vercel Analytics and Speed Insights from day one',
    ],
    impact: 'A complete, launch-ready marketing site — not a template, a full component-driven build.',
  },
  {
    slug: 'library-project',
    name: 'Library Project',
    tagline: 'A social reading platform — books, audiobooks, podcasts & community',
    category: 'Full-stack · Vue / Nuxt',
    tech: ['Nuxt 3', 'Vue', 'Prisma', 'TailwindCSS', 'TypeScript'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/Library-Project',
    role: 'Sole developer',
    summary:
      'An ambitious digital-library concept that goes beyond a book catalog: books, audiobooks, podcasts, live chatrooms, even a chess page, backed by a Prisma-modeled database and built on Nuxt 3.',
    highlights: [
      'Thirteen distinct pages, including dashboard, books, audiobooks, podcasts, chatrooms, articles, interests, and auth flows',
      'Prisma schema-driven data layer, shared layout and navbar/footer components across the app',
      'TailwindCSS design system configured from scratch for the project',
    ],
    impact: 'A genuinely broad product surface for a solo build — reading, listening, and community in one app.',
  },
  {
    slug: 'feedback-system',
    name: 'Client Onboarding & Referral Portal',
    tagline: 'Digitized KYC/onboarding workflow replacing a paper form',
    category: 'Full-stack · Internal tool',
    tech: ['Node.js', 'Express', 'MongoDB', 'Nodemailer', 'Docker'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/Feedback-System',
    role: 'Sole developer',
    summary:
      'Replaces the paper Know-Your-Client form used when onboarding a new client for guard deployment, with real-time validation, automated email notifications, and an admin dashboard to review submissions.',
    highlights: [
      'Client details, deployment specifics, and attribution tracking (advert / website / referral / social, with a conditional referrer field)',
      'Automated HTML email summary to admins plus a confirmation email to the client on every submission, via Nodemailer/SMTP',
      'Authenticated admin dashboard for reviewing and managing submissions',
      'Dockerized with an Nginx deploy config for self-hosting',
    ],
    impact: 'Turned a manual, paper-based client intake process into a same-day digital workflow.',
  },
  {
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    tagline: 'Editable, print-ready invoice/proforma tool',
    category: 'Frontend tool',
    tech: ['HTML5', 'Vanilla CSS', 'JavaScript'],
    year: '2022',
    isPrivate: true,
    repoUrl: null,
    role: 'Sole developer',
    summary:
      'A lightweight, dependency-free invoice generator: a live-editable, print-ready proforma/invoice template with auto-calculated totals, built for real client billing use.',
    highlights: [
      'Every field is directly editable in-place (contenteditable) — no form, no build step, just open and edit',
      'Auto-calculated subtotal, tax, and balance rows',
      'Print-optimized layout for one-click PDF export',
    ],
    impact: 'Used for real client invoicing — kept private here since the shipped copy contains live client and payment details.',
  },
]

export default projects

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}
