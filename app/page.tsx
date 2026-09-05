'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  FileText, 
  Mail, 
  Moon, 
  Sun,
  Phone,
  BarChart3,
  Calculator,
  ArrowRight,
  User,
  Send,
  Sparkles,
  Layers,
  FolderKanban,
  PieChart
} from "lucide-react";

// Interactive Gentle Particles Background Component
function InteractiveParticlesCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 130
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particlesCount = Math.floor((width * height) / 14000);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.5 + 1,
        baseX: x,
        baseY: y
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dotColor = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.3)';
      const lineColor = isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.07)';

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 2.5;
          p.y -= Math.sin(angle) * force * 2.5;
        }

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ndx = p.x - p2.x;
          const ndy = p.y - p2.y;
          const dist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (dist < 110) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

const cardPageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function PortfolioHome() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-[#fafafa] text-slate-800'
    }`}>
      
      <InteractiveParticlesCanvas isDark={isDark} />

      {/* Background Ambient Lights */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] blur-[150px] pointer-events-none z-0 ${
        isDark ? 'bg-cyan-600/15' : 'bg-cyan-400/20'
      }`} />

      {/* Floating Header - تم رفع الـ z-index وضبط الـ pointer-events */}
      <header className="fixed top-6 left-0 right-0 z-50 px-4 max-w-6xl mx-auto pointer-events-auto">
        <div className={`backdrop-blur-md rounded-2xl px-8 py-4 flex items-center justify-between border shadow-2xl transition-all ${
          isDark ? 'bg-slate-900/95 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center gap-4">
            <Link href="/" className="w-12 h-12 rounded-2xl bg-slate-950 border-2 border-cyan-400 p-1 flex items-center justify-center overflow-hidden shadow-lg shadow-cyan-500/20 cursor-pointer">
              <img src="/logo.svg" alt="Abdulrahman" className="w-full h-full object-contain" />
            </Link>
            <span className="font-black text-xs tracking-widest uppercase text-cyan-500">ABDULRAHMAN</span>
          </div>

          <nav className="flex items-center gap-8 text-sm font-extrabold">
            <Link href="/about" className="hover:text-cyan-500 transition cursor-pointer">About</Link>
            <a href="#skills-card" className="hover:text-cyan-500 transition cursor-pointer">Skills</a>
            <a href="#projects-card" className="hover:text-cyan-500 transition cursor-pointer">Projects</a>
            <a href="#contact-card" className="hover:text-cyan-500 transition cursor-pointer">Contact</a>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-amber-500 hover:scale-110 transition shadow cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-16 space-y-10 relative z-10">

        {/* ==================== CARD 1: HERO / INTRO ==================== */}
        <motion.section 
          id="hero-card" 
          className="flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardPageVariants}
        >
          <div className={`relative w-full p-10 md:p-14 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col md:flex-row items-center gap-10 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20' : 'bg-white border-slate-200 shadow-slate-200'
          }`}>
            
            <div className="relative z-20 md:w-7/12 space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-cyan-100/90 text-cyan-800 dark:bg-cyan-950/90 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                <Sparkles className="w-4 h-4" />
                <span>Senior Accountant & Data Analyst</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Hi, I'm <span className="text-cyan-500">Abdulrahman</span>
              </h1>

              <p className={`text-sm sm:text-base leading-relaxed font-semibold max-w-2xl ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Experienced Senior General Accountant with +7 years in financial reporting and general ledger operations, bridging accounting principles with modern data analytics tools (Python, SQL, Power BI) to extract actionable business insights.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition hover:scale-105 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>ABOUT ME</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="/Abdulrahman_Mohamed_CV.pdf" 
                  download 
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs transition border cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-950/50' 
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-300'
                  }`}
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>

            {/* Hero Section Image Frame */}
            <div className="relative md:w-5/12 h-80 md:h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-400/50 flex items-center justify-center bg-slate-950 flex-shrink-0 group p-1">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-sky-500 blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              <img 
                src="/hero section.png" 
                alt="Abdulrahman Mohamed Hero" 
                className="relative z-10 w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.svg';
                  (e.target as HTMLImageElement).className = 'relative z-10 w-3/4 h-3/4 object-contain';
                }}
              />
            </div>

          </div>
        </motion.section>


        {/* ==================== CARD 2: SKILLS REVEAL ==================== */}
        <motion.section 
          id="skills-card" 
          className="flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardPageVariants}
        >
          <div className={`w-full p-10 md:p-14 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row items-center gap-12 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            <div className="relative md:w-5/12 h-72 md:h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 flex-shrink-0 group">
              <img 
                src="/workspace.jpg" 
                alt="Abdulrahman Workspace & Skills" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${
                isDark ? 'from-slate-900/80 via-transparent to-transparent' : 'from-white/50 via-transparent to-transparent'
              }`} />
            </div>

            <div className="space-y-6 text-center md:text-left flex-1">
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">TECHNICAL & FINANCIAL SKILLS</span>
              <h2 className="text-3xl sm:text-5xl font-black">Core Capabilities</h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Combining precision in General Ledger & Financial Statements with Python & Power BI to transform raw transactions into automated KPI dashboards.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-400 pb-2">
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/50">
                  <Calculator className="w-5 h-5" />
                  <span>Financial GL & Costing</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/30 p-3 rounded-xl border border-cyan-900/50">
                  <BarChart3 className="w-5 h-5" />
                  <span>Python & SQL Analytics</span>
                </div>
              </div>

              <div>
                <Link 
                  href="/skills" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-cyan-400 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs transition hover:scale-105 border border-cyan-500/30 cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>EXPLORE ALL SKILLS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </motion.section>


        {/* ==================== CARD 3: GENERAL PROJECTS OVERVIEW ==================== */}
        <motion.section 
          id="projects-card" 
          className="flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardPageVariants}
        >
          <div className={`w-full p-10 md:p-14 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row items-center gap-12 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            <div className="space-y-6 text-center md:text-left flex-1">
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                <FolderKanban className="w-4 h-4" />
                <span>FEATURED CASE STUDIES & DASHBOARDS</span>
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-black">Data-Driven Projects</h2>
              
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Explore hands-on data analytics and financial modeling projects utilizing Python, Pandas, SQL Server, and interactive Power BI dashboards to drive revenue growth and customer retention.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-400 pb-2">
                <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/30 p-3 rounded-xl border border-cyan-900/50">
                  <PieChart className="w-5 h-5" />
                  <span>Customer Churn EDA</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/50">
                  <BarChart3 className="w-5 h-5" />
                  <span>Revenue & Sales BI</span>
                </div>
              </div>

              <div>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition hover:scale-105 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>EXPLORE ALL PROJECTS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative md:w-5/12 h-80 md:h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-400/50 flex items-center justify-center bg-slate-950 flex-shrink-0 group p-1">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-sky-500 blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              <img 
                src="/Firefly_Gemini Flash_data analysis  886741.png" 
                alt="Data Analytics & Dashboard Projects" 
                className="relative z-10 w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.svg';
                  (e.target as HTMLImageElement).className = 'relative z-10 w-3/4 h-3/4 object-contain';
                }}
              />
            </div>

          </div>
        </motion.section>


        {/* ==================== CARD 4: CONTACT ==================== */}
        <motion.section 
          id="contact-card" 
          className="flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardPageVariants}
        >
          <div className={`w-full p-10 md:p-14 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row items-center gap-12 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="space-y-6 text-center md:text-left flex-1">
              <div className="w-28 h-28 rounded-2xl bg-slate-950 border-2 border-cyan-400/80 overflow-hidden mx-auto md:mx-0 shadow-lg p-3 flex items-center justify-center">
                <img 
                  src="/logo.svg" 
                  alt="Abdulrahman Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-3xl sm:text-5xl font-black">Let's Connect</h2>
              <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Available for Senior Accounting, Financial Data Analytics, and BI Opportunities.
              </p>

              <div className="space-y-3 text-xs sm:text-sm font-semibold pt-2">
                <div className="flex items-center justify-center md:justify-start gap-3 text-cyan-500">
                  <Mail className="w-5 h-5" />
                  <span>abdulrahmanmohamed306@gmail.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 text-emerald-500">
                  <Phone className="w-5 h-5" />
                  <span>+20 111 649 5454</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 space-y-5 shadow-xl">
              <h3 className="font-bold text-base text-cyan-400 flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span>Send Direct Message</span>
              </h3>

              {emailSent ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              ) : (
                <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                  <textarea 
                    placeholder="Your Message..." 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.section>

      </main>

      <footer className="py-6 text-center text-xs text-slate-500 font-medium border-t border-slate-800">
        © 2026 Abdulrahman Mohamed. All rights reserved.
      </footer>
    </div>
  );
}