import React, { useState, useEffect, useRef } from 'react';
import { downloadResumePdf } from './utils/generateResumePdf';
import salesDashboardImage from './assets/images/sales-dashboard.png';

// Project interfaces
interface Project {
  id: string;
  title: string;
  badge: string;
  badgeIcon: string;
  badgeColor: string;
  image?: string;
  logo?: string;
  isCustomVisual?: boolean;
  tags: string[];
  description: string;
  hasGithub?: boolean;
  githubUrl?: string;
  showViewButton?: boolean;
  primaryActionText: string;
  externalUrl?: string;
  highlights: string[];
  metrics?: { label: string; value: string; change?: string }[];
  details: {
    overview: string;
    keyFeatures: string[];
    technicalHighlights: string[];
  };
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'ecommerce-analytics',
    title: 'E-Commerce Sales Analytics Dashboard',
    badge: 'Power BI Dashboard',
    badgeIcon: 'fa-chart-line',
    badgeColor: 'border-sky-400/30 text-sky-300',
    image: salesDashboardImage,
    tags: ['Power BI', 'DAX', 'Power Query', 'Data Modeling', 'Excel/CSV'],
    description: 'Built an interactive Power BI dashboard to track sales, profit, orders, quantity, cost and profit margin across 2024–2025. Performed data transformation, modeling and created DAX measures with slicers and drill-through analysis.',
    hasGithub: false,
    githubUrl: 'https://github.com/ajay3554/Ecommerce-Sales-Analytics',
    showViewButton: true,
    primaryActionText: 'VIEW',
    externalUrl: 'https://github.com/ajay3554/Ecommerce-Sales-Analytics',
    highlights: [
      'Tracks $214.54M total sales and $27M gross profit across 4K orders',
      'Advanced dynamic DAX measures for Year-Over-Year growth & profit margins (12.44%)',
      'Multi-dimensional drill-downs by product category (Clothing, Electronics, Furniture)',
      'Star schema data model with custom date tables and automated currency formatting'
    ],
    metrics: [
      { label: 'Total Sales', value: '$214.54M', change: '+18.2% YoY' },
      { label: 'Gross Profit', value: '$27.00M', change: '+14.5% YoY' },
      { label: 'Total Orders', value: '4,028', change: '+22.1%' },
      { label: 'Profit Margin', value: '12.44%', change: '+1.8 pts' }
    ],
    details: {
      overview: 'This comprehensive Power BI solution was engineered to provide retail leadership with actionable real-time insights into enterprise commercial performance. It solves fragmented reporting bottlenecks by unifying disparate CSV transactions into an optimized star schema.',
      keyFeatures: [
        'Executive KPI Summary Cards with dynamic conditional formatting',
        'Sales by Region geographic decomposition tree and heatmap',
        'Category & Sub-Category profit contribution matrix',
        'Time-intelligence DAX measures (YTD, MTD, YoY growth, Moving Averages)'
      ],
      technicalHighlights: [
        'Power Query ETL pipeline handling 500K+ transaction rows with deduplication',
        'Optimized DAX calculation groups reducing report canvas latency by 45%',
        'Row-level security (RLS) setup for regional sales managers',
        'Custom drill-through bookmarks for item-level profit leak identification'
      ]
    }
  },
  {
    id: 'raktanova',
    title: 'RaktaNova — Emergency Blood Donor Management System',
    badge: 'Healthcare Platform',
    badgeIcon: 'fa-heart-pulse',
    badgeColor: 'border-rose-500/30 text-rose-300',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu_Mnu8OmJjV2D8NpBBkC-UWKo2BgKDZUgbfUB1VZhfT81sCtoJvxAHi9XImQbQMVcQe_XdzrKhTZUT7RfJnDX7TStdrixf7YjPTbm7c57IXV2aFnBXU_vyqaVNL0gbHquI70JpP1l1bVxgHFuYa9rLySJEsVvTuH3fDsFevx-Cbqq8UZWFHfmc2T3tqwx7RUMrx-BHQAC6FFJOT1MgKTfT4H0MkIuqiVy1RbL6uHDLoC4vXW07ZcIe2PTKmlO3attXA',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Pydantic'],
    description: 'Developed a web-based system to manage hospital blood requests and connect them with eligible nearby donors. Built donor and hospital dashboards with request-status and notification workflows using FastAPI and PostgreSQL.',
    hasGithub: true,
    githubUrl: 'https://github.com/ajay3554/RaktaNova',
    showViewButton: true,
    primaryActionText: 'VIEW DEMO',
    externalUrl: 'https://raktanova.vercel.app/',
    highlights: [
      'High-throughput asynchronous REST API built with FastAPI and SQLAlchemy ORM',
      'Automated donor eligibility engine evaluating donation cooldown and blood compatibility',
      'Emergency broadcast alert system routing urgent unit requests to regional donors',
      'HIPAA/GDPR-aligned role-based access control (Hospitals, Blood Banks, Donors)'
    ],
    metrics: [
      { label: 'Match Time', value: '< 2.4 min', change: '80% faster' },
      { label: 'Compatible Types', value: '8 Groups', change: 'ABO & Rh' },
      { label: 'API Latency', value: '38ms', change: 'Async I/O' },
      { label: 'Hospital Uptime', value: '99.9%', change: 'Postgres Pool' }
    ],
    details: {
      overview: 'RaktaNova is a mission-critical emergency healthcare platform created to bridge the critical delay between urgent hospital transfusion needs and available donors in metropolitan regions.',
      keyFeatures: [
        'Hospital Emergency Request Portal with immediate severity triage',
        'Smart Geospatial Matching routing alerts to nearby compatible donors',
        'Live Donation Lifecycle Tracking (Requested → Matched → En Route → Fulfilled)',
        'Comprehensive blood bank inventory auditing and expiry tracking'
      ],
      technicalHighlights: [
        'PostgreSQL schema with indexed geospatial queries for radius-based queries',
        'Pydantic validation layers ensuring 100% strict medical payload compliance',
        'FastAPI async route handlers with connection pooling via asyncpg',
        'Secure JWT authentication with granular institutional permissions'
      ]
    }
  },
  {
    id: 'pipeline-stream',
    title: 'More Projects Coming Soon',
    badge: 'Pipeline Architecture',
    badgeIcon: 'fa-gears',
    badgeColor: 'border-amber-500/30 text-amber-300',
    isCustomVisual: true,
    tags: ['Python', 'Apache Kafka', 'Scikit-Learn', 'Snowflake', 'Docker'],
    description: 'Currently building end-to-end data pipelines, real-time analytics streaming tools, and machine learning models. Stay tuned for upcoming case studies and open-source contributions.',
    hasGithub: false,
    showViewButton: true,
    primaryActionText: 'EXPLORE ROADMAP',
    highlights: [
      'Real-time streaming ingestion pipeline designed with Apache Kafka and Python',
      'Automated feature engineering and model serving with Scikit-Learn',
      'Cloud warehouse integration targeting Snowflake and BigQuery',
      'Containerized microservices orchestration via Docker'
    ],
    metrics: [
      { label: 'Target Latency', value: '< 12ms', change: 'Real-time' },
      { label: 'Target Throughput', value: '140k/s', change: 'Streaming' },
      { label: 'Data Accuracy', value: '99.2%', change: 'Validated' },
      { label: 'Release Stage', value: 'v0.9 Beta', change: 'In Progress' }
    ],
    details: {
      overview: 'An ambitious ongoing initiative focused on modern enterprise data engineering. Building reliable distributed event streaming, continuous ELT transformations, and predictive analytical endpoints.',
      keyFeatures: [
        'Event-driven streaming ingest from multiple transactional webhooks',
        'Automated data quality assertions and anomaly detection checks',
        'Incremental loading models designed for minimal warehouse compute credits',
        'Production REST scoring microservice containerized with Docker'
      ],
      technicalHighlights: [
        'Kafka partition key strategies for out-of-order event mitigation',
        'Schema registry enforcement with Apache Avro serialization',
        'Predictive classification pipeline with Scikit-Learn pipelines',
        'CI/CD deployment automated with GitHub Actions'
      ]
    }
  }
];

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Interactive Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter tech stack highlight
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // RaktaNova Interactive Demo Simulator State
  const [demoHospital, setDemoHospital] = useState('Apollo Hospitals Greams Road');
  const [demoBloodGroup, setDemoBloodGroup] = useState('O+');
  const [demoUnits, setDemoUnits] = useState(2);
  const [isSimulatingAlert, setIsSimulatingAlert] = useState(false);
  const [simulationDispatched, setSimulationDispatched] = useState(false);

  const handleSimulateAlert = () => {
    setIsSimulatingAlert(true);
    setSimulationDispatched(false);
    setTimeout(() => {
      setIsSimulatingAlert(false);
      setSimulationDispatched(true);
    }, 1200);
  };

  // Refs for drag and stage
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  // Autoplay carousel
  useEffect(() => {
    if (isHovered || selectedProject !== null) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, selectedProject]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'about', 'experience', 'certifications', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.pageX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.pageX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) handleNextSlide();
      else handlePrevSlide();
    }
    dragStartX.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) handleNextSlide();
      else handlePrevSlide();
    }
    dragStartX.current = null;
  };

  // Contact submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setToastMessage('Please fill out all required fields.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setToastMessage(`Thank you, ${contactForm.name}! Your message has been sent to Ajayraj.`);
      setContactModalOpen(false);
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  // Copy email to clipboard helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ajay67068@gmail.com');
    setToastMessage('Email address copied to clipboard: ajay67068@gmail.com');
  };

  // Direct PDF Resume Download Trigger
  const handleDownloadResume = () => {
    setToastMessage('Generating and downloading Ajayraj_B_Resume.pdf...');
    try {
      downloadResumePdf();
      setTimeout(() => {
        setToastMessage('✓ Ajayraj_B_Resume.pdf downloaded successfully!');
      }, 700);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setToastMessage('Downloading fallback printable resume...');
      window.print();
    }
  };

  // Print resume trigger
  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen text-slate-300 relative selection:bg-orange-500 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 right-0 w-[750px] h-[750px] hero-glow-cyan pointer-events-none -z-10 anim-orb-1 opacity-80" />
      <div className="fixed top-72 left-0 w-[650px] h-[650px] hero-glow-blue pointer-events-none -z-10 anim-orb-2 opacity-70" />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] hero-glow-cyan pointer-events-none -z-10 opacity-30 anim-pulse-glow" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[100] max-w-md bg-[#0B192E]/95 backdrop-blur-xl border border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.4)] rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-check text-sm" />
          </div>
          <p className="text-xs md:text-sm text-slate-200 font-medium">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-auto p-1"
            aria-label="Close notification"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#030712]/85 backdrop-blur-xl border-b border-sky-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5 group transition-transform duration-300 hover:scale-105"
          >
            <span className="px-2.5 py-1 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400 text-sm font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] group-hover:border-sky-400 transition-all">
              AB
            </span>
            <span className="tracking-tight group-hover:text-slate-100 transition-colors">AJAYRAJ</span>
            <span className="text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] group-hover:text-orange-400 transition-all">
              B
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`transition-all relative py-1 hover:text-sky-400 ${
                    isActive ? 'text-sky-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleDownloadResume}
              className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs md:text-sm font-bold py-2.5 px-5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.45)] border border-sky-300/30 whitespace-nowrap cursor-pointer"
              title="Download Ajayraj_B_Resume.pdf"
            >
              <i className="fa-solid fa-file-arrow-down text-xs" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => setResumeModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 bg-[#0B192E]/80 hover:bg-[#13233e] text-slate-300 hover:text-white border border-sky-500/30 text-xs font-semibold py-2.5 px-3.5 rounded-full transition-all cursor-pointer"
              title="Preview Full Resume"
            >
              <i className="fa-regular fa-eye text-xs text-sky-400" />
              <span>Preview</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-[#0B192E] border border-sky-500/30 text-sky-400 flex items-center justify-center hover:bg-[#13233e] transition-colors"
              aria-label="Toggle mobile navigation"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-sky-500/20 px-6 py-4 space-y-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-sky-400 font-medium text-sm py-2 border-b border-sky-500/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="space-y-28">
        {/* HERO SECTION */}
        <section id="home" className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-8 relative">
          <div className="absolute left-0 top-6 w-36 h-36 dot-pattern opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B192E]/80 border border-sky-400/30 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-md">
                <span className="text-sky-400 text-sm animate-pulse">✦</span>
                <span className="text-sky-300 font-medium">Data + AI Portfolio</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300 text-[11px] uppercase tracking-wider">
                  Data Analyst Intern
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.6)]">
                    Ajayraj
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.6)]">
                    B
                  </span>
                </h1>

                {/* Subtitle with blinking bar */}
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <span className="text-xl md:text-2xl font-bold text-sky-400 tracking-normal drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                    Data Analyst
                  </span>
                  <span className="w-[3px] h-6 bg-sky-400 rounded-sm cursor-blink shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                  <span className="text-slate-600 font-light mx-1">|</span>
                  <span className="text-base md:text-xl font-medium text-slate-300">
                    Turning Data into{' '}
                    <span className="text-white font-semibold underline decoration-sky-400/60 decoration-2 underline-offset-4">
                      Insights
                    </span>
                  </span>
                </div>
              </div>

              {/* Bio Paragraph */}
              <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-xl">
                I’m a Computer Science and Engineering student and Data Analyst Intern based in Chennai. I have hands-on experience in Python, Power BI, SQL and Excel. I love working with data, creating visualizations and building dashboards that help in better decision making.
              </p>

              {/* Hero Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(14,165,233,0.5)] border border-sky-300/30 text-sm whitespace-nowrap"
                >
                  <span>View Projects</span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </a>

                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 bg-[#0B192E]/70 hover:bg-[#13233e] text-slate-200 hover:text-white border border-sky-500/30 hover:border-sky-400 font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md text-sm backdrop-blur-sm whitespace-nowrap cursor-pointer group"
                  title="Download Ajayraj_B_Resume.pdf"
                >
                  <i className="fa-solid fa-file-arrow-down text-xs text-sky-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </button>

                <button
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#0B192E]/70 hover:bg-[#13233e] text-slate-200 hover:text-white border border-sky-500/30 hover:border-sky-400 font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md text-sm backdrop-blur-sm whitespace-nowrap cursor-pointer"
                >
                  <i className="fa-regular fa-comment-dots text-sm text-sky-400" />
                  <span>Let's Connect</span>
                </button>
              </div>

              {/* Connect Social Links */}
              <div className="flex items-center gap-4 pt-3 text-slate-400 text-sm font-medium">
                <span>Connect with me</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://linkedin.com/in/ajayraj15"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-sky-400 hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    aria-label="LinkedIn Profile"
                  >
                    <i className="fa-brands fa-linkedin-in text-sm" />
                  </a>
                  <a
                    href="https://github.com/ajay3554"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-slate-300 hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                    aria-label="GitHub Profile"
                  >
                    <i className="fa-brands fa-github text-sm" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="w-9 h-9 rounded-xl bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-sky-400 hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    title="Click to copy email address"
                    aria-label="Copy Email"
                  >
                    <i className="fa-solid fa-envelope text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Right Avatar with Glowing Effects & Surrounding Badges */}
            <div className="lg:col-span-5 relative flex justify-center items-center py-10">
              <div
                className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-cyan-500/35 via-sky-500/25 to-blue-600/30 blur-3xl pointer-events-none anim-pulse-glow"
                style={{ filter: 'blur(48px)' }}
              />
              <div className="absolute w-72 h-72 md:w-84 md:h-84 rounded-full border border-sky-400/30 pointer-events-none anim-radar" />
              <div
                className="absolute w-76 h-76 md:w-88 md:h-88 rounded-full p-[3px] anim-rotate-glow opacity-80 pointer-events-none z-0"
                style={{
                  background:
                    'conic-gradient(rgb(56, 189, 248), rgb(14, 165, 233), rgb(37, 99, 235), rgb(6, 182, 212), rgb(56, 189, 248))',
                  filter: 'blur(3px)',
                }}
              />

              {/* Avatar Frame */}
              <div className="w-72 h-72 md:w-84 md:h-84 rounded-full p-[3px] bg-gradient-to-tr from-sky-400 via-cyan-300 to-blue-600 relative z-10 backdrop-blur-xl group transition-transform duration-500 hover:scale-105 shadow-[0_0_40px_rgba(56,189,248,0.4)]">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0F223D] via-[#08162B] to-[#020612] p-2 flex items-center justify-center relative overflow-hidden">
                  <img
                    alt="Ajayraj B - Data Analyst"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top rounded-full shadow-inner relative z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1I87DB0omhjyFixbb3QPP-vGRBAXXD--S2r0_i0rhUe0PDiaSK0aBwNViGQdOsRr4FvoQua_wB0190-yDlYE0l_D55iT3U1A1HHNZUFFsv7WVldqLyhVF5KIEE86PH7VsiXCoHrZzq6JxawLKq4jJwJ9LGJmzfoOrL5gleAeyvgNVsLh2NkRN1iP57wPg8PL1JHMtxQ4YLdgs8pDLi7MT3NMQxd6xKQNIHBcJ92gNz780s8Djh6FQFSAd7AzhWBWYKw"
                  />
                </div>
              </div>

              {/* Tech Badges Floating Around Profile */}
              <button
                onClick={() => setSelectedTech('Python')}
                className="absolute top-4 -left-2 md:-left-4 z-20 bg-[#0B192E]/90 backdrop-blur-md border border-sky-400/60 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center gap-2.5 anim-float-1 hover:scale-110 transition-transform cursor-pointer"
              >
                <i className="fa-brands fa-python text-sky-400 text-sm" />
                <span className="text-xs font-bold text-white">Python</span>
              </button>

              <button
                onClick={() => setSelectedTech('Power BI')}
                className="absolute top-36 -left-6 md:-left-8 z-20 bg-[#0B192E]/90 backdrop-blur-md border border-amber-400/40 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center gap-2.5 anim-float-2 hover:scale-110 transition-transform cursor-pointer"
              >
                <i className="fa-solid fa-chart-simple text-amber-400 text-xs" />
                <span className="text-xs font-bold text-white">Power BI</span>
              </button>

              <button
                onClick={() => setSelectedTech('PostgreSQL')}
                className="absolute top-10 -right-2 md:-right-4 z-20 bg-[#0B192E]/90 backdrop-blur-md border border-cyan-400/60 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.35)] flex items-center gap-2.5 anim-float-3 hover:scale-110 transition-transform cursor-pointer"
              >
                <i className="fa-solid fa-database text-cyan-400 text-xs" />
                <span className="text-xs font-bold text-white">SQL</span>
              </button>

              <button
                onClick={() => setSelectedTech('FastAPI')}
                className="absolute top-44 -right-4 md:-right-6 z-20 bg-[#0B192E]/90 backdrop-blur-md border border-teal-400/50 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.3)] flex items-center gap-2.5 anim-float-4 hover:scale-110 transition-transform cursor-pointer"
              >
                <i className="fa-solid fa-bolt text-teal-300 text-xs" />
                <span className="text-xs font-bold text-white">FastAPI</span>
              </button>

              <button
                onClick={() => setSelectedTech('Analytics')}
                className="absolute bottom-8 -left-2 md:left-0 z-20 bg-[#0B192E]/90 backdrop-blur-md border border-sky-400/60 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center gap-2.5 anim-float-1 hover:scale-110 transition-transform cursor-pointer"
              >
                <i className="fa-solid fa-chart-line text-sky-400 text-xs" />
                <span className="text-xs font-bold text-white">Data Analytics</span>
              </button>

              <div className="absolute bottom-6 -right-2 md:right-0 z-20 bg-[#0B192E]/90 backdrop-blur-md border border-sky-400/50 px-4 py-2 rounded-full shadow-[0_0_25px_rgba(56,189,248,0.35)] flex items-center gap-2.5 anim-float-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">
                  Turning Data into <span className="text-sky-400 font-bold">Insights</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TOOLS & TECHNOLOGIES I WORK WITH */}
        <section id="skills" className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-black text-white">
              Tools & Technologies{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                I Work With
              </span>
            </h3>
            {selectedTech && (
              <p className="text-xs text-sky-300 mt-2 flex items-center justify-center gap-2">
                <span>Selected: <strong>{selectedTech}</strong></span>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="text-slate-400 hover:text-white underline text-[11px]"
                >
                  Clear
                </button>
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {[
              { name: 'Python', icon: 'fa-brands fa-python', color: 'text-sky-400', border: 'border-t-sky-400/40 hover:border-sky-400' },
              { name: 'PostgreSQL', icon: 'fa-solid fa-database', color: 'text-cyan-400', border: 'border-t-cyan-400/40 hover:border-cyan-400' },
              { name: 'Power BI', icon: 'fa-solid fa-chart-simple', color: 'text-amber-400', border: 'border-t-amber-400/40 hover:border-amber-400' },
              { name: 'Excel', icon: 'fa-solid fa-file-excel', color: 'text-emerald-400', border: 'border-t-emerald-400/40 hover:border-emerald-400' },
              { name: 'Git', icon: 'fa-brands fa-git-alt', color: 'text-orange-400', border: 'border-t-orange-400/40 hover:border-orange-400' },
              { name: 'GitHub', icon: 'fa-brands fa-github', color: 'text-slate-200', border: 'border-t-slate-300/40 hover:border-sky-400' },
              { name: 'VS Code', icon: 'fa-solid fa-code', color: 'text-blue-400', border: 'border-t-blue-400/40 hover:border-blue-400' },
            ].map((tool) => {
              const isSelected = selectedTech === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => setSelectedTech(isSelected ? null : tool.name)}
                  className={`glass-card-specular group flex flex-col items-center justify-center w-28 h-28 bg-[#0B192E]/70 backdrop-blur-md rounded-2xl border border-sky-500/20 shadow-card-glass transition-all cursor-pointer ${
                    tool.border
                  } ${isSelected ? 'ring-2 ring-sky-400 scale-105 bg-[#0E203B]' : ''}`}
                >
                  <i className={`${tool.icon} text-3xl ${tool.color} group-hover:scale-125 transition-all`} />
                  <span className="text-xs font-bold text-slate-200 mt-2">{tool.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* WHAT I DO */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-sky-500/10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                What I{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  Do
                </span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-slate-400 max-w-lg mt-2 md:mt-0 text-left md:text-right">
              I work with data to find insights, build interactive dashboards and create easy-to-understand reports that help in better decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-card-specular bg-[#0B192E]/60 backdrop-blur-md rounded-2xl p-7 border border-sky-500/20 border-t-sky-400/40 shadow-card-glass hover:border-sky-400 hover:bg-[#0E203B]/80 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-all">
                  <i className="fa-solid fa-chart-pie" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  Dashboards & BI Reporting
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Build interactive and insightful dashboards using Power BI with clean data models and DAX measures.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card-specular bg-[#0B192E]/60 backdrop-blur-md rounded-2xl p-7 border border-sky-500/20 border-t-cyan-400/40 shadow-card-glass hover:border-cyan-400 hover:bg-[#0E203B]/80 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-all">
                  <i className="fa-solid fa-layer-group" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  Data Cleaning & EDA
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Clean, explore and analyze data to find meaningful patterns and insights.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card-specular bg-[#0B192E]/60 backdrop-blur-md rounded-2xl p-7 border border-sky-500/20 border-t-blue-400/40 shadow-card-glass hover:border-blue-400 hover:bg-[#0E203B]/80 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-all">
                  <i className="fa-solid fa-code" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  SQL & Database Work
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Write SQL queries, work with PostgreSQL and handle real-world data for analysis and reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY WORK WITH ME */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-8">
            Why Work With{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-5 rounded-2xl border border-sky-500/20 border-t-sky-400/40 shadow-card-glass flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400 shrink-0 flex items-center justify-center text-lg">
                <i className="fa-solid fa-bullseye" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">1. Clean & Reliable Data</h5>
                <p className="text-xs text-slate-400 mt-1">Focus on accurate data cleaning and well-structured analysis.</p>
              </div>
            </div>

            <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-5 rounded-2xl border border-sky-500/20 border-t-cyan-400/40 shadow-card-glass flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shrink-0 flex items-center justify-center text-lg">
                <i className="fa-regular fa-lightbulb" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">2. Clear, Decision-Ready</h5>
                <p className="text-xs text-slate-400 mt-1">Create simple and effective visualizations for better decisions.</p>
              </div>
            </div>

            <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-5 rounded-2xl border border-sky-500/20 border-t-blue-400/40 shadow-card-glass flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 text-sky-300 shrink-0 flex items-center justify-center text-lg">
                <i className="fa-solid fa-rocket" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">3. Quick Learner & Problem Solver</h5>
                <p className="text-xs text-slate-400 mt-1">Always eager to learn new tools and work on real-world problems.</p>
              </div>
            </div>

            <div className="glass-card-specular group bg-gradient-to-br from-[#0B192E] to-[#0e2344] p-5 rounded-2xl border border-sky-400/30 border-t-sky-300/50 flex items-center justify-center text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center text-base mb-2">
                  <i className="fa-solid fa-briefcase" />
                </div>
                <span className="text-xs font-bold text-white">Data Analyst Intern</span>
                <span className="text-[11px] text-sky-400 font-semibold mt-0.5">@ Techswot IT Solutions</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & JOURNEY */}
        <section id="about" className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* About Column */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                About{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                I am a Computer Science and Engineering student and Data Analyst Intern based in Chennai. I have hands-on experience in Python, Power BI, SQL and Excel. I enjoy working with data, creating visualizations and building dashboards that provide useful insights.
              </p>

              <div className="space-y-3.5 pt-2 text-sm text-slate-300">
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-solid fa-graduation-cap text-sky-400 w-5 text-center" />
                  <span className="font-semibold text-white">B.E. Computer Science and Engineering</span>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-solid fa-building-columns text-sky-400 w-5 text-center" />
                  <span>PERI Institute of Technology <span className="text-sky-300 font-semibold">(CGPA: 7.76/10)</span></span>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-regular fa-calendar text-sky-400 w-5 text-center" />
                  <span>August 2023 – May 2027</span>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-solid fa-location-dot text-sky-400 w-5 text-center" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-solid fa-phone text-sky-400 w-5 text-center" />
                  <a href="tel:+916382932901" className="hover:text-sky-300 transition-colors">+91 6382932901</a>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-solid fa-envelope text-sky-400 w-5 text-center" />
                  <a href="mailto:ajay67068@gmail.com" className="hover:text-sky-300 transition-colors">ajay67068@gmail.com</a>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-brands fa-github text-sky-400 w-5 text-center" />
                  <a href="https://github.com/ajay3554" target="_blank" rel="noreferrer" className="hover:text-sky-300 transition-colors">github.com/ajay3554</a>
                </div>
                <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-sky-500/5 transition-colors">
                  <i className="fa-solid fa-globe text-sky-400 w-5 text-center" />
                  <span>English | Tamil</span>
                </div>
              </div>
            </div>

            {/* Journey Column */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                My{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-4 rounded-2xl border border-sky-500/20 text-center flex flex-col items-center justify-center">
                  <i className="fa-regular fa-folder-open text-sky-400 text-xl mb-1" />
                  <span className="text-3xl font-black text-white">2</span>
                  <span className="text-xs text-sky-200/90 font-bold uppercase mt-1">Projects</span>
                </div>

                <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-4 rounded-2xl border border-sky-500/20 text-center flex flex-col items-center justify-center">
                  <i className="fa-solid fa-award text-cyan-400 text-xl mb-1" />
                  <span className="text-3xl font-black text-white">6</span>
                  <span className="text-xs text-cyan-200/90 font-bold uppercase mt-1">Certifications</span>
                </div>

                <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-4 rounded-2xl border border-sky-500/20 text-center flex flex-col items-center justify-center">
                  <i className="fa-solid fa-chart-column text-sky-400 text-xl mb-1" />
                  <span className="text-xs font-black tracking-wide uppercase text-sky-300 mt-1">
                    Data<br />Analytics
                  </span>
                  <span className="text-[10px] text-sky-300/80 font-bold uppercase tracking-widest mt-1">
                    Focused
                  </span>
                </div>

                <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md p-4 rounded-2xl border border-sky-500/20 text-center flex flex-col items-center justify-center">
                  <i className="fa-solid fa-graduation-cap text-sky-400 text-xl mb-1" />
                  <span className="text-[10px] font-bold text-sky-200/90 uppercase tracking-wider mt-1">
                    Graduating
                  </span>
                  <span className="text-2xl font-black text-white">2027</span>
                </div>
              </div>

              {/* Quote Block */}
              <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md rounded-2xl p-6 border border-sky-500/20 border-t-sky-400/40 shadow-card-glass flex items-start gap-4">
                <div className="text-3xl text-sky-400 font-serif leading-none mt-1">
                  <i className="fa-solid fa-quote-left" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed">
                    I am passionate about using data to solve real-world problems and building a career in Data Analytics.
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded mt-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & CERTIFICATIONS */}
        <section id="experience" className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Experience */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-briefcase" />
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Experience</h2>
              </div>

              <div className="glass-card-specular group bg-[#0B192E]/60 backdrop-blur-md rounded-2xl p-6 border border-sky-500/20 border-t-sky-400/40 shadow-card-glass">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">Data Analyst Intern</h4>
                    <p className="text-sm font-semibold text-sky-400">
                      Techswot IT Solutions <span className="text-slate-500 font-normal">| Chennai</span>
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/30">
                    Sep 2026 – Present
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs md:text-sm text-slate-400 mt-4 list-disc pl-5 leading-relaxed">
                  <li>Supporting data analysis activities in a professional work environment.</li>
                  <li>Working with data-related tasks using analytical and reporting concepts.</li>
                  <li>Applying Python, SQL, Power BI and Excel skills to strengthen practical data analysis experience.</li>
                </ul>
              </div>
            </div>

            {/* Certifications */}
            <div id="certifications" className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-award" />
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Certifications</h2>
              </div>

              <div className="glass-card-specular bg-[#0B192E]/60 backdrop-blur-md rounded-2xl p-6 border border-sky-500/20 border-t-sky-400/40 shadow-card-glass space-y-3.5">
                {[
                  {
                    title: 'Microsoft Power BI Course:',
                    desc: 'Data Visualization & Business Intelligence',
                  },
                  {
                    title: 'Data Science Foundation',
                    desc: '',
                  },
                  {
                    title: 'Ship a Full Stack App',
                    desc: 'with Cursor + Claude Integration',
                  },
                  {
                    title: 'Build & Deploy AI Apps with Google AI Studio:',
                    desc: 'Multilingual AI Speech App Development',
                  },
                  {
                    title: 'AI Tools & Claude Workshop',
                    desc: '',
                  },
                  {
                    title: 'Claude AI in 90 Minutes',
                    desc: 'Productivity Course: Build Your AI Work Assistant',
                  },
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 shadow-[0_0_6px_#38bdf8]" />
                    <span>
                      <strong className="text-white">{cert.title}</strong> {cert.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3D DEPTH PROJECT CAROUSEL SECTION                         */}
        {/* ========================================================= */}
        <section id="projects" className="max-w-7xl mx-auto px-6 overflow-visible">
          {/* Section Header */}
          <div className="space-y-2 mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-sky-500/10 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center text-base shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                  <i className="fa-solid fa-folder" />
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Recent{' '}
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                    Projects
                  </span>
                </h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 mt-2">
                Some of my notable projects that showcase my skills in data analysis, visualization and full stack development.
              </p>
            </div>

            {/* Gesture Hint */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium mt-3 md:mt-0">
              <i className="fa-solid fa-arrows-left-right text-orange-400 animate-pulse" />
              <span>Drag or swipe horizontally to explore 3D showcase</span>
            </div>
          </div>

          {/* 3D Perspective Stage Container */}
          <div className="relative">
            <div
              ref={stageRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="carousel-3d-stage select-none cursor-grab active:cursor-grabbing"
              aria-label="Projects 3D Carousel"
              role="region"
            >
              {PROJECTS_DATA.map((proj, idx) => {
                // Determine 3D carousel position relative to active index
                const diff = (idx - carouselIndex + PROJECTS_DATA.length) % PROJECTS_DATA.length;
                let stateClass = 'state-center';
                if (diff === 1) stateClass = 'state-right';
                else if (diff === PROJECTS_DATA.length - 1) stateClass = 'state-left';
                else if (diff !== 0) stateClass = 'hidden';

                return (
                  <article
                    key={proj.id}
                    onClick={() => {
                      if (stateClass === 'state-left') handlePrevSlide();
                      if (stateClass === 'state-right') handleNextSlide();
                    }}
                    className={`carousel-3d-item ${stateClass}`}
                  >
                    <div className="card-inner-shell bg-[#0B192E]/90 backdrop-blur-xl rounded-3xl border border-sky-500/25 border-t-sky-400/50 shadow-card-glass overflow-hidden flex flex-col justify-between transition-all duration-300 relative group">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

                      <div>
                        {/* Visual Preview Container */}
                        <div className="stagger-seq stagger-1 border-b border-sky-500/15 overflow-hidden bg-slate-950/90 relative rounded-t-3xl min-h-[220px] max-h-[260px] flex items-center justify-center">
                          {proj.image && (
                            <>
                              <img
                                alt={proj.title}
                                referrerPolicy="no-referrer"
                                className="project-img-zoom w-full h-56 md:h-64 object-cover object-top transition-transform duration-500 ease-out"
                                src={proj.image}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192E] via-transparent to-transparent opacity-80 pointer-events-none" />
                            </>
                          )}

                          {proj.logo && (
                            <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c182c] via-[#081224] to-[#040814] relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192E] via-transparent to-transparent opacity-80 pointer-events-none" />
                              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                                <div className="bg-white/95 p-3.5 rounded-2xl shadow-xl flex items-center justify-center border border-white/30 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_32px_rgba(244,63,94,0.4)]">
                                  <img
                                    alt="RaktaNova Official Logo"
                                    referrerPolicy="no-referrer"
                                    className="project-img-zoom max-h-20 md:max-h-24 w-auto object-contain mx-auto drop-shadow-md transition-transform duration-500"
                                    src={proj.logo}
                                  />
                                </div>
                                <span className="mt-2.5 text-[11px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 px-3 py-0.5 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.2)]">
                                  Emergency Blood Donor Network
                                </span>
                              </div>
                            </div>
                          )}

                          {proj.isCustomVisual && (
                            <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1426] via-[#060c18] to-[#02050d] relative">
                              <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192E] via-transparent to-transparent opacity-80 pointer-events-none" />

                              <div className="relative z-10 w-full max-w-sm p-4 rounded-2xl bg-[#0e1f38]/70 border border-sky-400/30 shadow-inner flex flex-col gap-2.5 transition-transform duration-500 group-hover:scale-105">
                                <div className="flex items-center justify-between border-b border-sky-400/20 pb-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                                    <span className="text-[10px] font-mono text-slate-400 ml-1.5">
                                      data_pipeline_stream.py
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                                    v0.9.4 Beta
                                  </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                                  <div className="bg-black/30 p-1.5 rounded-lg border border-sky-500/15">
                                    <span className="text-[10px] text-slate-400 block">Latency</span>
                                    <span className="text-xs font-bold text-sky-400">&lt; 12ms</span>
                                  </div>
                                  <div className="bg-black/30 p-1.5 rounded-lg border border-sky-500/15">
                                    <span className="text-[10px] text-slate-400 block">Throughput</span>
                                    <span className="text-xs font-bold text-emerald-400">140k/s</span>
                                  </div>
                                  <div className="bg-black/30 p-1.5 rounded-lg border border-sky-500/15">
                                    <span className="text-[10px] text-slate-400 block">Accuracy</span>
                                    <span className="text-xs font-bold text-amber-400">98.9%</span>
                                  </div>
                                </div>

                                <div className="mt-1 flex items-center justify-center gap-2 py-1 px-2.5 bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border border-amber-400/40 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                                  <i className="fa-solid fa-gear fa-spin text-amber-400 text-xs" />
                                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                                    Under Active Development
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Top Badge */}
                          <span
                            className={`absolute top-4 left-4 bg-[#030712]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold border shadow-[0_0_12px_rgba(56,189,248,0.25)] flex items-center gap-1.5 ${proj.badgeColor}`}
                          >
                            <i className={`fa-solid ${proj.badgeIcon} text-[10px]`} />
                            {proj.badge}
                          </span>

                          {/* Preview Details Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(proj);
                            }}
                            className="absolute top-4 right-4 bg-[#030712]/80 backdrop-blur-sm p-2 rounded-xl text-slate-300 hover:text-sky-400 text-xs flex items-center justify-center border border-sky-400/20 hover:border-sky-400 transition-all cursor-pointer"
                            aria-label={`View details for ${proj.title}`}
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square" />
                          </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-8 space-y-4">
                          <div className="stagger-seq stagger-2">
                            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-sky-300 transition-colors tracking-tight">
                              {proj.title}
                            </h3>
                          </div>

                          {/* Tech Tags */}
                          <div className="stagger-seq stagger-3 flex flex-wrap gap-2">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/30 hover:border-sky-400 transition-all cursor-default"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <div className="stagger-seq stagger-4">
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                              {proj.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="stagger-seq stagger-5 px-6 md:px-8 pb-7 pt-1 flex flex-wrap items-center gap-3">
                        {proj.showViewButton && (
                          proj.externalUrl ? (
                            <a
                              href={proj.externalUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs md:text-sm py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.5)] border border-sky-300/30 uppercase tracking-wider cursor-pointer"
                            >
                              <span>{proj.primaryActionText}</span>
                              <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
                            </a>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(proj);
                              }}
                              className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs md:text-sm py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.5)] border border-sky-300/30 uppercase tracking-wider cursor-pointer"
                            >
                              <span>{proj.primaryActionText}</span>
                              <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
                            </button>
                          )
                        )}

                        {proj.hasGithub && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-slate-200 hover:text-white font-bold text-xs md:text-sm py-2.5 px-6 rounded-full shadow-md hover:shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
                          >
                            <i className="fa-brands fa-github text-sm text-sky-400" />
                            <span>GITHUB</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Navigation Controls & Pagination Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 px-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevSlide}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0B192E]/80 border border-sky-400/30 hover:border-orange-400 text-slate-300 hover:text-white hover:bg-[#13233e] text-xs md:text-sm font-bold shadow-md hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Previous project"
              >
                <i className="fa-solid fa-arrow-left text-orange-400 text-xs transition-transform group-hover:-translate-x-1" />
                <span>Previous</span>
              </button>

              {/* 3 Pagination Dots */}
              <div
                className="flex items-center gap-3 py-1 px-4 rounded-full bg-[#0B192E]/60 border border-sky-500/20 backdrop-blur-md"
                role="tablist"
                aria-label="Projects pagination"
              >
                {PROJECTS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`carousel-dot rounded-full transition-all duration-300 ${
                      idx === carouselIndex
                        ? 'w-3.5 h-3.5 bg-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.9)] scale-110'
                        : 'w-3 h-3 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextSlide}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0B192E]/80 border border-sky-400/30 hover:border-orange-400 text-slate-300 hover:text-white hover:bg-[#13233e] text-xs md:text-sm font-bold shadow-md hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Next project"
              >
                <span>Next</span>
                <i className="fa-solid fa-arrow-right text-orange-400 text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="mt-24 border-t border-sky-500/20 bg-[#02050c] relative overflow-hidden text-slate-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0B192E]/90 via-[#071326] to-[#040814] border border-sky-500/25 border-t-sky-400/50 p-8 md:p-12 mb-16 shadow-[0_0_35px_rgba(56,189,248,0.15)] backdrop-blur-xl text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-semibold text-sky-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                <span>Get In Touch</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Let's Work{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  Together
                </span>
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                I'm currently seeking new opportunities as a Data Analyst or Data Analyst Intern. Feel free to reach out for collaborations, project discussions, or inquiries.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm py-3 px-7 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.45)] border border-sky-300/30"
                >
                  <i className="fa-solid fa-envelope text-xs" />
                  <span>Email Me</span>
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 bg-[#0B192E]/70 hover:bg-[#13233e] text-slate-200 hover:text-white border border-sky-500/30 hover:border-sky-400 font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md text-sm backdrop-blur-sm cursor-pointer group"
                  title="Download Ajayraj_B_Resume.pdf"
                >
                  <i className="fa-solid fa-file-arrow-down text-xs text-sky-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-sky-500/15">
            <a href="#home" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 group">
              <span className="px-2 py-0.5 rounded-lg bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-black">
                AB
              </span>
              <span className="tracking-tight text-white">AJAYRAJ</span>
              <span className="text-sky-400">B</span>
            </a>
            <p className="text-xs text-slate-500 text-center">
              © 2026 AJAYRAJ B. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/ajayraj15"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-sky-400 hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xs"
              >
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a
                href="https://github.com/ajay3554"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-slate-300 hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xs"
              >
                <i className="fa-brands fa-github" />
              </a>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy Email"
                title="Copy ajay67068@gmail.com"
                className="w-8 h-8 rounded-lg bg-[#0B192E] hover:bg-[#13233e] border border-sky-500/30 hover:border-sky-400 text-sky-400 hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xs"
              >
                <i className="fa-solid fa-envelope" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS                                        */}
      {/* ========================================================= */}

      {/* 1. PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0B192E] border border-sky-500/30 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close project modal"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            {/* Header info */}
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${selectedProject.badgeColor}`}>
                {selectedProject.badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white">{selectedProject.title}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Image Preview */}
            {selectedProject.image && (
              <div className="rounded-2xl overflow-hidden border border-sky-500/30 shadow-2xl bg-[#EDF2F7] p-2">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[460px] object-contain rounded-xl mx-auto drop-shadow-sm"
                />
              </div>
            )}

            {/* Metrics cards if available */}
            {selectedProject.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="bg-[#061224] p-3 rounded-2xl border border-sky-500/20 text-center">
                    <span className="text-[11px] text-slate-400 block">{m.label}</span>
                    <span className="text-lg font-black text-white block mt-1">{m.value}</span>
                    {m.change && <span className="text-[10px] text-emerald-400 font-semibold">{m.change}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Live Demo for RaktaNova */}
            {selectedProject.id === 'raktanova' && (
              <div className="bg-[#050e1c] p-5 rounded-2xl border border-rose-500/30 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Live Demo: Emergency Donor Dispatch Simulator
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-rose-300 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                    FastAPI Endpoint: /api/v1/emergency/dispatch
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Select Hospital</label>
                    <select
                      value={demoHospital}
                      onChange={(e) => setDemoHospital(e.target.value)}
                      className="w-full bg-[#0B192E] border border-sky-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
                    >
                      <option>Apollo Hospitals Greams Road</option>
                      <option>SIMS Hospital Vadapalani</option>
                      <option>MIOT International</option>
                      <option>Stanley Medical College</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Required Blood Group</label>
                    <select
                      value={demoBloodGroup}
                      onChange={(e) => setDemoBloodGroup(e.target.value)}
                      className="w-full bg-[#0B192E] border border-sky-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-rose-400"
                    >
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Units Needed (Pints)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={demoUnits}
                        onChange={(e) => setDemoUnits(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-[#0B192E] border border-sky-500/30 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-rose-400"
                      />
                      <button
                        onClick={handleSimulateAlert}
                        disabled={isSimulatingAlert}
                        className="btn-glow-shimmer px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-xs whitespace-nowrap shadow-[0_0_15px_rgba(244,63,94,0.4)] disabled:opacity-50"
                      >
                        {isSimulatingAlert ? 'Matching...' : 'Simulate Match'}
                      </button>
                    </div>
                  </div>
                </div>

                {isSimulatingAlert && (
                  <div className="p-3 bg-[#0B192E]/80 rounded-xl border border-rose-500/20 flex items-center justify-center gap-3 text-xs text-rose-300">
                    <i className="fa-solid fa-spinner fa-spin text-sm" />
                    <span>Executing geospatial matching query across registered donors in Chennai...</span>
                  </div>
                )}

                {simulationDispatched && !isSimulatingAlert && (
                  <div className="space-y-3 bg-[#081528] p-4 rounded-xl border border-rose-500/30">
                    <div className="flex items-center justify-between text-xs text-rose-300 font-bold border-b border-rose-500/20 pb-2">
                      <span>✓ 4 Compatible Donors Matched for {demoHospital}</span>
                      <span className="text-emerald-400">Response Latency: 32ms</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        { name: 'Karthik V.', dist: '1.8 km away', time: '12 min ETA', status: 'Confirmed & En Route' },
                        { name: 'Ananya S.', dist: '2.4 km away', time: '18 min ETA', status: 'Alert Acknowledged' },
                        { name: 'Praveen R.', dist: '3.6 km away', time: '25 min ETA', status: 'Standby Donor' },
                        { name: 'Chennai Central Blood Bank', dist: '4.1 km away', time: 'Inventory Ready', status: '3 Units Reserved' },
                      ].map((donor, idx) => (
                        <div key={idx} className="bg-[#050e1c] p-2.5 rounded-lg border border-sky-500/15 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white block">{donor.name}</span>
                            <span className="text-[10px] text-slate-400">{donor.dist} · {donor.time}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                            {donor.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider">Project Overview</h4>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                {selectedProject.details.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider">Key Highlights & Architecture</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-300 list-disc pl-5">
                {selectedProject.details.keyFeatures.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            {/* Technical implementations */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider">Technical Implementation</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-disc pl-5">
                {selectedProject.details.technicalHighlights.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>

            {/* Actions in Modal */}
            <div className="pt-4 border-t border-sky-500/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {selectedProject.externalUrl && (
                  <a
                    href={selectedProject.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold py-2.5 px-5 rounded-full transition-all shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                    <span>{selectedProject.primaryActionText || 'View Live'}</span>
                  </a>
                )}
                {selectedProject.hasGithub && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-5 rounded-full border border-sky-400/30 transition-all"
                  >
                    <i className="fa-brands fa-github text-sm" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setContactModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-[#0B192E] hover:bg-[#13233e] text-slate-300 hover:text-white border border-sky-500/30 text-xs font-bold py-2.5 px-5 rounded-full transition-all"
                >
                  <i className="fa-regular fa-comment text-xs" />
                  <span>Discuss This Project</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. RESUME MODAL */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0B192E] border border-sky-500/40 rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setResumeModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close resume modal"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            {/* Resume Header */}
            <div className="border-b border-sky-500/20 pb-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black text-white">AJAYRAJ B</h3>
                  <p className="text-sky-400 font-semibold text-base mt-1">Computer Science & Engineering Student | Data Analyst Intern</p>
                  <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400 mt-2">
                    <span><i className="fa-solid fa-location-dot text-sky-400 mr-1" /> Chennai, Tamil Nadu, India</span>
                    <span><i className="fa-solid fa-phone text-sky-400 mr-1" /> +91 6382932901</span>
                    <a href="mailto:ajay67068@gmail.com" className="text-sky-300 hover:underline">
                      <i className="fa-solid fa-envelope text-sky-400 mr-1" /> ajay67068@gmail.com
                    </a>
                    <a href="https://github.com/ajay3554" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                      <i className="fa-brands fa-github text-sky-400 mr-1" /> github.com/ajay3554
                    </a>
                    <a href="https://linkedin.com/in/ajayraj15" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                      <i className="fa-brands fa-linkedin text-sky-400 mr-1" /> linkedin.com/in/ajayraj15
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleDownloadResume}
                    className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs py-2.5 px-4 rounded-full border border-sky-300/30 shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all cursor-pointer"
                  >
                    <i className="fa-solid fa-file-arrow-down text-xs" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={handlePrintResume}
                    className="inline-flex items-center gap-2 bg-[#061224] hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs py-2.5 px-3.5 rounded-full border border-sky-500/30 transition-all cursor-pointer"
                  >
                    <i className="fa-solid fa-print text-xs text-sky-400" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Resume Body */}
            <div className="space-y-6 text-sm">
              {/* Profile Summary */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Professional Profile
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs md:text-sm">
                  Computer Science and Engineering student and Data Analyst Intern with hands-on knowledge of Python, Power BI, SQL, and Excel. Interested in data cleaning, analysis, visualization, and dashboard reporting. Seeking an entry-level Data Analyst opportunity to apply analytical and problem-solving skills.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Education
                </h4>
                <div className="bg-[#071326] p-4 rounded-xl border border-sky-500/15">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h5 className="font-bold text-white text-sm">B.E. Computer Science and Engineering</h5>
                      <p className="text-xs text-sky-400 font-semibold mt-0.5">PERI Institute of Technology · CGPA: 7.76/10 (up to 5th Semester)</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">August 2023 – May 2027</span>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Technical Skills
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15">
                    <span className="text-sky-300 font-bold block mb-1">Programming:</span>
                    <span className="text-slate-300">Python</span>
                  </div>
                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15">
                    <span className="text-sky-300 font-bold block mb-1">Data Analysis:</span>
                    <span className="text-slate-300">Data Cleaning, Exploratory Data Analysis (EDA), Data Visualization</span>
                  </div>
                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15">
                    <span className="text-sky-300 font-bold block mb-1">Business Intelligence:</span>
                    <span className="text-slate-300">Power BI, DAX, Power Query</span>
                  </div>
                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15">
                    <span className="text-sky-300 font-bold block mb-1">Database & Spreadsheet:</span>
                    <span className="text-slate-300">SQL, PostgreSQL, Microsoft Excel</span>
                  </div>
                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15 md:col-span-2">
                    <span className="text-sky-300 font-bold block mb-1">Tools:</span>
                    <span className="text-slate-300">Git, GitHub, VS Code</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Work Experience
                </h4>
                <div className="bg-[#071326] p-4 rounded-xl border border-sky-500/15 space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h5 className="font-bold text-white">Data Analyst Intern</h5>
                      <p className="text-xs text-sky-400 font-semibold">Techswot IT Solutions | Chennai</p>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20">
                      Sep 2026 – Present
                    </span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                    <li>Supporting data analysis activities in an enterprise tech environment.</li>
                    <li>Executing ETL workflows and generating weekly diagnostic performance reports.</li>
                    <li>Utilizing Python, SQL, Power BI, and Excel to solve reporting requests and validate data integrity.</li>
                  </ul>
                </div>
              </div>

              {/* Academic Projects */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Academic Projects
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-white">E-COMMERCE SALES ANALYTICS DASHBOARD</strong>
                      <span className="text-[10px] text-sky-400 font-semibold">Power BI</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic mb-1.5">Technologies: Power BI, DAX, Power Query, Data Modeling, Excel/CSV</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300">
                      <li>Built an interactive sales analytics dashboard to monitor sales, profit, orders, quantity, cost, and profit margin across 2024–2025.</li>
                      <li>Performed data transformation and modeling using Power Query, connecting customer, product, sales, and date tables.</li>
                      <li>Created DAX measures and interactive visuals for category, region, and monthly performance with slicers.</li>
                    </ul>
                  </div>

                  <div className="bg-[#071326] p-3 rounded-xl border border-sky-500/15">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-white">RAKTANOVA — Emergency Blood Donor Management System</strong>
                      <span className="text-[10px] text-rose-400 font-semibold">FastAPI + PostgreSQL</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic mb-1.5">Technologies: FastAPI, Python, PostgreSQL, SQLAlchemy, Pydantic, HTML, CSS, JavaScript, Vercel</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300">
                      <li>Developed a web-based system to manage hospital blood requests and connect them with eligible nearby donors.</li>
                      <li>Structured application data for donors, hospitals, blood requests, and notifications using PostgreSQL and SQLAlchemy.</li>
                      <li>Built donor and hospital dashboards with request-status and notification workflows.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Key Certifications
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-sky-400 text-[10px]" />
                    <span>Microsoft Power BI: Data Viz & Business Intelligence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-sky-400 text-[10px]" />
                    <span>Data Science Foundation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-sky-400 text-[10px]" />
                    <span>Build & Deploy AI Apps with Google AI Studio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-sky-400 text-[10px]" />
                    <span>Ship a Full Stack App (Cursor + Claude)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-sky-400 text-[10px]" />
                    <span>AI Tools & Claude Workshop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-sky-400 text-[10px]" />
                    <span>Claude AI in 90 Minutes Productivity Course</span>
                  </li>
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/10 pb-1 mb-2">
                  Languages
                </h4>
                <p className="text-xs text-slate-300">English  |  Tamil</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTACT / LET'S CONNECT MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0B192E] border border-sky-500/40 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close contact modal"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-400/30">
                Let's Connect
              </span>
              <h3 className="text-2xl font-black text-white mt-2">Send a Message</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Reach out to Ajayraj B for internships, freelance projects, or data consulting.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#061224] border border-sky-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#061224] border border-sky-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Data Analyst Internship / Project Inquiry"
                  className="w-full bg-[#061224] border border-sky-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Hi Ajayraj, I saw your portfolio and would like to discuss..."
                  className="w-full bg-[#061224] border border-sky-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="mailto:ajay67068@gmail.com"
                  className="text-xs text-sky-400 hover:underline flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-envelope text-xs" />
                  <span>ajay67068@gmail.com</span>
                </a>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="btn-glow-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs py-2.5 px-6 rounded-full border border-sky-300/30 transition-all disabled:opacity-50"
                >
                  {formSubmitted ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-xs" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane text-xs" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
