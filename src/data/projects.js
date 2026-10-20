// Real projects pulled from GitHub + local repos. Two are kept private
// (trade-secret backbone code, not for public release) and are shown here
// as case studies only, with no outbound "view code" link for those.

const projects = [
  {
    slug: 'hg-attendance-system',
    name: 'HG Attendance System',
    tagline: 'Attendance, scheduling, leave and reporting platform for a guard workforce',
    category: 'Full-stack · Production system',
    tech: ['Laravel 12', 'React 19', 'MySQL 8.4', 'Docker', 'Nginx', 'PHP-FPM', 'TypeORM'],
    year: '2026',
    isPrivate: true,
    repoUrl: null,
    image: '/case-studies/hg-attendance-demo.png',
    demoPath: '/demo/hg-attendance-system',
    liveNote: 'Interactive demo running on sample data. The real system, its code and its data stay private.',
    role: 'Sole developer & operator',
    summary:
      'An internal attendance, scheduling, leave, and reporting system built for Hogan Guards’ on-the-ground security workforce. Built to run in production on a self-hosted Docker stack, with an offline-capable kiosk for clock-in/out.',
    highlights: [
      'Offline-first PWA kiosk (installable service worker) for staff clock-in/out at guard posts with unreliable connectivity',
      'Automatic supersession of stale open sessions, overnight-shift handling, and grace-window scan pairing to keep attendance data accurate without manual correction',
      'Staff photos are served only through short-lived signed URLs, never public storage, to protect personal data',
      'Built-in billing: Paystack-powered subscription payments, auto-renewal, receipts, and payment history',
      'Proactive system-health email alerts, automated log/image pruning, and encrypted external-drive backups',
      'Deployed two ways: on-premises via Docker/Nginx with internal-CA HTTPS over ZeroTier, or on an Oracle Cloud Always Free tier for remote offices',
      'Super-admin recovery flow with session revocation, designed so a forgotten password can never lock the whole org out',
    ],
    impact:
      'A complete attendance, scheduling, leave, reporting and billing system, with deployment, backup and recovery procedures documented.',
  },
  {
    slug: 'hogan-hub',
    name: 'Hogan Hub',
    tagline: 'Internal operations platform for a guard company: patrol verification, SOS alerts and staff accounts',
    category: 'Full-stack · Internal platform',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'NestJS 11', 'TypeORM', 'SQLite / Postgres', 'JWT', 'Gemini API'],
    year: '2026',
    isPrivate: true,
    repoUrl: null,
    image: '/case-studies/hogan-hub-demo.jpg',
    demoPath: '/demo/hogan-hub',
    liveNote: 'Interactive demo running on sample data. The real system, its code and its data stay private.',
    role: 'Sole developer',
    summary:
      'Hogan Guards\u2019 internal operations platform: patrol verification at client sites, SOS alerts, staff accounts, asset records and an encrypted password vault. One organisation, with access decided by role.',
    highlights: [
      'A strict role hierarchy: higher roles manage lower ones, nobody manages a peer or themselves, and deactivating an account or changing its role takes effect on its very next request',
      'Patrol verification: client sites with schedules and assigned guards, and checkpoints with signed, printable QR tags that guards scan on their round',
      'SOS alerts with GPS location, a hold-to-send button so a stray tap cannot fire one, and a response workflow with a timeline',
      'A per-user password vault with AES-256-GCM encrypted credentials, and staff accounts created with memorable generated passwords',
      'System governance for the Super Admin: maintenance mode, sign everyone out, background jobs and an AI security audit that runs server-side only',
      'Security logs of sign-in activity with CSV export',
      'NestJS 11 and TypeORM on the back end (SQLite in development, Postgres in production), React 19, Vite and Tailwind on the front end, sharing its look with the HG Attendance System',
    ],
    impact:
      'One internal system for patrols, emergencies and staff access, with every module gated by role.',
  },
  {
    slug: 'phishing-detection-app',
    name: 'PhishGuard AI',
    tagline: 'Multimodal deep-learning system for real-time phishing detection',
    category: 'Machine learning · Security',
    tech: ['Python', 'Flask', 'PyTorch', 'DistilBERT', 'SHAP', 'Transformers'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/phishing-detection-app',
    image: '/case-studies/phishguard-ai.png',
    video: '/case-studies/phishguard-demo.mp4',
    imageNote: 'Recorded walkthrough of the app running locally on the trained model: a legitimate email, a phishing email, then the performance page. There is no hosted version; the repository includes setup instructions and a Dockerfile.',
    liveUrl: null,
    role: 'Sole developer & researcher',
    summary:
      'A runnable multimodal deep-learning system that combines DistilBERT email-text embeddings with a metadata neural network and late fusion, served through a Flask dashboard with real-time predictions and explainability.',
    highlights: [
      '98.26% accuracy / 99.75% ROC-AUC on a held-out 460-email test set (3,065-row stratified split, seed 42). Fully reproducible and documented in a model card',
      'Frozen DistilBERT text encoder fused with a 15-feature sender/receiver/message/URL metadata branch via a late-fusion classifier',
      'Kernel SHAP explanations for metadata attribution, plus DistilBERT final-layer attention visualization, so the tool shows why it flagged an email, not just that it did',
      '.eml / .txt import for real-world email analysis',
      'Automatic heuristic fallback if model artifacts are unavailable, so the app degrades gracefully rather than failing',
    ],
    impact:
      'Built as a dissertation-grade research project, with verified metrics kept separate from any originally reported results. Provenance and limitations are documented rather than asserted.',
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
    image: '/case-studies/advanta-ai.png',
    liveUrl: 'https://d4mz3y.github.io/AdVanta-AI/',
    role: 'Frontend developer',
    summary:
      'A full marketing site for an AI-driven growth product: hero, problem framing, services, process, audience segmentation, pricing, and conversion sections, built as independent, composable React components.',
    highlights: [
      'Eleven-section one-page structure (Hero, Ticker, Problem, Services, Process, Who We Serve, AI Edge, Pricing, CTA) built as isolated, reusable components',
      'Scroll-reveal animation component shared across sections for a consistent motion language',
      'Production-instrumented with Vercel Analytics and Speed Insights from day one',
    ],
    impact: 'A complete, launch-ready marketing site, built component by component.',
  },
  {
    slug: 'leadbybooks',
    name: 'LeadByBooks',
    tagline: 'A social reading platform: books, audiobooks, podcasts & community',
    category: 'Full-stack · Vue / Nuxt',
    tech: ['Nuxt 3', 'Vue', 'Prisma', 'TailwindCSS', 'TypeScript'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/Library-Project',
    image: '/case-studies/library-project.png',
    liveUrl: 'https://d4mz3y.github.io/Library-Project/',
    role: 'Sole developer',
    summary:
      'An ambitious digital-library concept that goes beyond a book catalog: books, audiobooks, podcasts, live chatrooms, even a chess page, backed by a Prisma-modeled database and built on Nuxt 3.',
    highlights: [
      'Thirteen distinct pages, including dashboard, books, audiobooks, podcasts, chatrooms, articles, interests, and auth flows',
      'Prisma schema-driven data layer, shared layout and navbar/footer components across the app',
      'TailwindCSS design system configured from scratch for the project',
    ],
    impact: 'A genuinely broad product surface for a solo build: reading, listening, and community in one app.',
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
    image: '/case-studies/feedback-system.png',
    liveUrl: 'https://d4mz3y.github.io/Feedback-System/',
    liveNote: 'Demo build: submissions are simulated, nothing is stored or emailed.',
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
    slug: 'classon',
    name: 'Classon',
    tagline: 'A learning platform for young children: letters, numbers, songs, tracing and a parents\u2019 view',
    category: 'Product design · Frontend',
    tech: ['Figma', 'React 19', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Web Audio API'],
    year: '2026',
    isPrivate: false,
    repoUrl: 'https://github.com/d4mz3y/classon-react',
    image: '/case-studies/classon/landing.jpg',
    liveUrl: 'https://d4mz3y.github.io/classon-react/',
    liveNote: 'Progress is saved in your browser only. There is no backend.',
    role: 'Designer and frontend developer',
    summary:
      'An early-learning product for young children. Kids sign in with their own account, work through lessons by letter and number, and parents get a separate dashboard to follow progress. Shown here as the Figma product design and as a working React app.',
    highlights: [
      'All 26 letters, each with four activities: an animated Watch scene with a spoken word, a Sing-along with a tune generated in code, a Trace canvas, and a page-turning Read flip-book',
      'Numbers 1 to 10 with a tap-to-count activity and a quiz',
      'Lessons unlock one after another, and a direct link to a locked lesson sends you back',
      'Tracing is measured, not faked: it checks how much of the letter your strokes cover and how much of the drawing stays on it, so scribbling or a single dot does not pass',
      'A parents\u2019 view that counts letters, numbers and activities finished and shows a calendar of active days, all from real in-app activity',
      'The Figma file covers the wider product: sign-up and sign-in for children, parents and admins, the child dashboard, videos, books, songs, worksheets, reports, tests and a marketing site',
      'No third-party media in the app: pictures are emoji and SVG, speech uses the browser\u2019s own voices, and the songs are synthesised with the Web Audio API',
    ],
    galleries: [
      {
        title: 'The app',
        items: [
          { src: '/case-studies/classon/home.jpg', caption: 'Subject dashboard with progress rings' },
          { src: '/case-studies/classon/lesson.jpg', caption: 'Watch: animated letter with a spoken word' },
          { src: '/case-studies/classon/trace.jpg', caption: 'Trace: strokes are checked against the letter' },
          { src: '/case-studies/classon/flipbook.jpg', caption: 'Read: page-turning flip-book' },
          { src: '/case-studies/classon/letters.jpg', caption: 'Letters unlock one after another' },
          { src: '/case-studies/classon/parents.jpg', caption: 'Parents\u2019 view, built from real activity' },
        ],
      },
      {
        title: 'Design in Figma',
        items: [
          { src: '/case-studies/classon/design/welcome.jpg', caption: 'Welcome and sign-in' },
          { src: '/case-studies/classon/design/subjects.jpg', caption: 'Child dashboard: subjects' },
          { src: '/case-studies/classon/design/lesson.jpg', caption: 'Lesson for a letter' },
          { src: '/case-studies/classon/design/videos.jpg', caption: 'Videos' },
          { src: '/case-studies/classon/design/books.jpg', caption: 'Books' },
          { src: '/case-studies/classon/design/worksheet.jpg', caption: 'Worksheet' },
          { src: '/case-studies/classon/design/marketing-site.jpg', caption: 'Marketing site (landing page)' },
        ],
      },
    ],
    impact:
      'A complete learning loop for two subjects (lesson, activities, unlocking and a parents\u2019 view), plus the design for the rest of the product. Story and Moral are placeholders.',
  },
  {
    slug: 'innovated-funded',
    name: 'Innovated Funded',
    tagline: 'Website and sign-up flow for a forex proprietary-trading platform',
    category: 'Product design · Frontend',
    tech: ['Figma', 'Vue.js', 'Tailwind CSS', 'HTML5'],
    year: '2023',
    isPrivate: true,
    repoUrl: null,
    image: '/case-studies/innovated-funded/landing.jpg',
    role: 'Designer and frontend contributor',
    summary:
      'The website for Innovated Funded, a forex proprietary-trading company where traders take an evaluation to get funded. Designed in Figma and built as a small team, covering the public site, the account flow and the content pages a trading product needs.',
    highlights: [
      'A marketing landing page and a waiting-list version, with a clear path from \u201cGet funded\u201d to account creation',
      'Membership tiers shown as Evaluation, Lite and Pro, each with its own trading-model and rules page',
      'A trading competition flow, plus an affiliate programme page',
      'Account creation and sign-in screens, including the error states for a wrong email or password',
      'The supporting pages: about, customer support, FAQ, risk disclosure, privacy policy and cookies policy',
      'Built front-end pages in Vue-style templating and Tailwind CSS, with the brand colours defined once in the Tailwind config',
    ],
    galleries: [
      {
        title: 'Design in Figma',
        items: [
        { src: '/case-studies/innovated-funded/trading-models.jpg', caption: 'Trading models: Evaluation, Lite and Pro' },
        { src: '/case-studies/innovated-funded/competition.jpg', caption: 'Competition flow' },
        { src: '/case-studies/innovated-funded/affiliate.jpg', caption: 'Affiliate programme' },
        { src: '/case-studies/innovated-funded/create-account.jpg', caption: 'Create account' },
        ],
      },
    ],
    impact:
      'A team project from 2023. The team\u2019s built pages live in private repositories, and the source of my own Vue 3 implementation of the design is in a private repository of mine. There is no public code link, so the design is shown here.',
  },
]

export default projects

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}
