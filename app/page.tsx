'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Mail, 
  Globe, 
  Share2, 
  Moon, 
  Sun,
  ArrowUpRight,
  ChevronDown,
  Phone,
  MessageCircle,
  Calculator,
  BarChart3,
  CheckCircle2
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

// 3D Tilt Card Component Wrapper
function TiltCard({ children, className = '', isDark }: { children: React.ReactNode; className?: string; isDark: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default function PortfolioHome() {
  const [isDark, setIsDark] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(true);

  const phoneNumber = "+201116495454"; 
  const whatsappUrl = `https://wa.me/201116495454`;

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 scroll-smooth ${
      isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-[#fafafa] text-slate-800'
    }`}>
      
      <InteractiveParticlesCanvas isDark={isDark} />
      
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] blur-[100px] pointer-events-none z-0 opacity-60 ${
        isDark ? 'bg-cyan-600/10' : 'bg-cyan-400/15'
      }`} />

      {/* Floating Navbar */}
      <header className="pt-6 px-4 max-w-5xl mx-auto relative z-50">
        <div className={`backdrop-blur-md rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors ${
          isDark ? 'bg-slate-900/80 text-slate-100 border border-slate-800/80' : 'bg-white/80 text-slate-900 border border-slate-200/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-950/10 border-2 border-cyan-400 p-1 flex items-center justify-center overflow-hidden">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-sm tracking-wide">ABDULRAHMAN</span>
          </div>

          <nav className="flex items-center gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Link href="/about" className="hover:text-cyan-600 transition">About</Link>
            <a href="#skills" className="hover:text-cyan-600 transition">Skills</a>
            <a href="#projects" className="hover:text-cyan-600 transition">Projects</a>
            <a href="#contact" className="hover:text-cyan-600 transition">Contact</a>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              title="Toggle Theme"
              className="p-2 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 transition shadow-md flex items-center justify-center"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-20 relative z-10">

        {/* Hero Section (Updated with Personal Photo) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block">
              <span className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-inner ${
                isDark 
                  ? 'bg-cyan-950/80 border border-cyan-400/40 text-cyan-300' 
                  : 'bg-cyan-100/80 border border-cyan-300 text-cyan-800'
              }`}>
                SENIOR GENERAL ACCOUNTANT & FINANCIAL DATA ANALYST
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Abdulrahman Mohamed
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Experienced Senior General Accountant with +7 years in financial reporting and general ledger operations, bridging accounting principles with modern data analytics tools to extract actionable business insights.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 font-medium text-xs">
              <a 
                href="/Abdulrahman_Mohamed_CV.pdf" 
                download
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <a 
                href="mailto:abdulrahmanmohamed306@gmail.com"
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-semibold flex items-center gap-2 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>

              <a 
                href="https://linkedin.com/in/abdulrahman-mohammed-395556148" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-semibold flex items-center gap-2 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <Share2 className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a 
                href="https://github.com/abdulrahmanmohamed306" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-semibold flex items-center gap-2 transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <Globe className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Personal Photo Element */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full bg-white dark:bg-slate-950 border-4 border-cyan-400 overflow-hidden shadow-2xl">
                <Image 
                  src="/my.photo.jpg" 
                  alt="Abdulrahman Mohamed" 
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-l-4 border-cyan-400 pl-3">
            <button 
              onClick={() => setIsSkillsOpen(!isSkillsOpen)}
              className="flex items-center justify-between w-full text-left group focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <h2 className={`text-xl font-extrabold group-hover:text-cyan-500 transition ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Technical & Financial Expertise (Skills)
                </h2>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border transition ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-200 border-slate-300 text-slate-600'
                }`}>
                  {isSkillsOpen ? 'إخفاء' : 'إظهار'}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isSkillsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
            isSkillsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* كارت المحاسبة والمالية */}
                <TiltCard isDark={isDark}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-4 shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <Calculator className="w-5 h-5" />
                        <h3 className="text-base font-bold">Financial Accounting</h3>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Financial Statements Preparation & Analysis (Income Statement, Balance Sheet, Cash Flow)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Cost Accounting & Budgeting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>General Ledger Management & Reconciliation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Accounts Payable & Receivable (AP/AR)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Financial Auditing & Internal Control</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TiltCard>

                {/* كارت تحليل البيانات */}
                <TiltCard isDark={isDark}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-4 shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                        <BarChart3 className="w-5 h-5" />
                        <h3 className="text-base font-bold">Data Analytics & BI</h3>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Data Visualization:</strong> Power BI, Tableau (Interactive Dashboards & Reports)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Programming:</strong> Python (Pandas, NumPy, Matplotlib, Seaborn)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Database:</strong> SQL Server (Advanced Queries, JOINs, Aggregations)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Advanced Excel:</strong> Power Query, Pivot Tables, VLOOKUP, Financial Modeling</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TiltCard>

                {/* كارت المهارات المهنية والتحليلية */}
                <TiltCard isDark={isDark}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-4 shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <Globe className="w-5 h-5" />
                        <h3 className="text-base font-bold">Core Competencies</h3>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Exploratory Data Analysis (EDA) & Market Basket Analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Financial Modeling & Automated Business KPIs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Analytical Thinking & Problem Solving</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Data Storytelling & Cross-functional Communication</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TiltCard>

              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6 pt-4">
          <div className="flex items-center gap-3 border-l-4 border-cyan-400 pl-3">
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project 1 */}
            <TiltCard isDark={isDark}>
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full uppercase dark:bg-cyan-950 dark:text-cyan-300">
                    Featured EDA & Python
                  </span>
                  <h3 className="text-xl font-bold">E-Commerce Customer Retention Analysis</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    An end-to-end data analytics project investigating customer churn, order frequencies, regional performance, and product profitability.
                  </p>
                </div>

                <div className="pt-2">
                  <Link 
                    href="/projects/ecommerce-customer-retention" 
                    className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition shadow-md shadow-cyan-500/20"
                  >
                    <span>View Full Project Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Project 2: Online Sales Intelligence */}
            <TiltCard isDark={isDark}>
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase dark:bg-emerald-950 dark:text-emerald-300">
                    Real Dataset & EDA
                  </span>
                  <h3 className="text-xl font-bold">Global Online Sales & Revenue Intelligence</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    An end-to-end data analytics project leveraging real online transaction datasets to evaluate regional sales distribution, unit pricing, and top-performing product categories.
                  </p>
                </div>

                <div className="pt-2">
                  <Link 
                    href="/projects/online-sales-analysis" 
                    className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition shadow-md shadow-cyan-500/20"
                  >
                    <span>View Full Project Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>

          </div>
        </section>

        {/* Contact CTA */}
        <TiltCard isDark={isDark}>
          <section id="contact" className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 space-y-5 text-center shadow-sm">
            <h2 className="text-2xl font-bold">Let's Connect</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Available for Senior Accounting, Financial Data Analytics, and Business Intelligence opportunities.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a 
                href="mailto:abdulrahmanmohamed306@gmail.com" 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-cyan-400 font-bold text-xs hover:bg-slate-900 transition shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>abdulrahmanmohamed306@gmail.com</span>
              </a>

              <a 
                href={`tel:${phoneNumber}`} 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>01116495454</span>
              </a>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </section>
        </TiltCard>

      </main>

      <footer className="py-8 text-center text-xs text-slate-500 font-medium relative z-10">
        © 2026 Abdulrahman Mohamed. All rights reserved.
      </footer>
    </div>
  );
}