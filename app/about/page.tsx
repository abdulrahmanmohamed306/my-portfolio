'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Mail, 
  Share2, 
  Globe,
  Moon, 
  Sun,
  Code2,
  BookOpen
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

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 scroll-smooth ${
      isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-[#fafafa] text-slate-800'
    }`}>
      
      <InteractiveParticlesCanvas isDark={isDark} />
      
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] blur-[100px] pointer-events-none z-0 opacity-60 ${
        isDark ? 'bg-cyan-600/10' : 'bg-cyan-400/15'
      }`} />

      {/* Navigation */}
      <header className="pt-6 px-4 max-w-5xl mx-auto relative z-50">
        <div className={`backdrop-blur-md rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors ${
          isDark ? 'bg-slate-900/80 text-slate-100 border border-slate-800/80' : 'bg-white/80 text-slate-900 border border-slate-200/80'
        }`}>
          <Link href="/" className={`flex items-center gap-2 text-xs font-bold transition cursor-pointer ${
            isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-800'
          }`}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-950/10 border-2 border-cyan-400 p-1 flex items-center justify-center overflow-hidden">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`font-black text-xs tracking-wide ${isDark ? 'text-white' : 'text-slate-950'}`}>ABDULRAHMAN</span>
          </div>

          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition shadow-md cursor-pointer ${
              isDark ? 'bg-slate-900 text-amber-400 hover:bg-slate-800' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16 relative z-10">

        {/* Profile Header & Bio */}
        <section className="space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            {/* Personal Photo Frame */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className={`relative w-40 h-48 sm:w-48 sm:h-56 rounded-2xl border-2 border-cyan-400 overflow-hidden shadow-2xl ${
                isDark ? 'bg-slate-900' : 'bg-white'
              }`}>
                <img 
                  src="/my.photo.jpg" 
                  alt="Abdulrahman Mohamed" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Profile Intro */}
            <div className="space-y-4 text-center sm:text-left">
              <span className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider inline-block border ${
                isDark ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300' : 'bg-cyan-100 border-cyan-400 text-cyan-950'
              }`}>
                About Me
              </span>

              <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                Abdulrahman Mohamed Fathy Morsy
              </h1>

              <p className={`text-xs sm:text-sm font-black uppercase tracking-wide ${
                isDark ? 'text-cyan-400' : 'text-cyan-800'
              }`}>
                Senior General Accountant | Financial & Data Analyst
              </p>

              <p className={`text-xs sm:text-base font-semibold leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Experienced Senior General Accountant with <span dir="ltr">&#43;7</span> years of expertise in financial reporting, general ledger operations, and treasury management. I blend deep accounting expertise with modern data science tools like Python, SQL, Power BI, and Advanced Excel to transform accounting and business operations into actionable, data-driven insights.
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-bold">
                <a 
                  href="mailto:abdulrahmanmohamed306@gmail.com" 
                  className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-slate-200 hover:bg-slate-300 text-slate-950 border-slate-300'
                  }`}
                >
                  <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <span>Email</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/abdulrahman-mohammed-395556148" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-slate-200 hover:bg-slate-300 text-slate-950 border-slate-300'
                  }`}
                >
                  <Share2 className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/abdulrahmanmohamed306" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-slate-200 hover:bg-slate-300 text-slate-950 border-slate-300'
                  }`}
                >
                  <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Key Metrics Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <TiltCard isDark={isDark}>
              <div className={`p-4 rounded-xl border shadow-sm text-center h-full flex flex-col items-center justify-center ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div dir="ltr" className="flex flex-row-reverse items-center justify-center">
                  <span className={`text-2xl font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>7</span>
                  <span className={`text-2xl font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>&#43;</span>
                </div>
                <p className={`text-xs font-bold mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Years Experience</p>
              </div>
            </TiltCard>
            
            <TiltCard isDark={isDark}>
              <div className={`p-4 rounded-xl border shadow-sm text-center h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <p className={`text-2xl font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>100%</p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>GL Data Accuracy</p>
              </div>
            </TiltCard>

            <TiltCard isDark={isDark}>
              <div className={`p-4 rounded-xl border shadow-sm text-center h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <p className={`text-2xl font-black ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>214h</p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>DEPI Training</p>
              </div>
            </TiltCard>

            <TiltCard isDark={isDark}>
              <div className={`p-4 rounded-xl border shadow-sm text-center h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <p className={`text-2xl font-black ${isDark ? 'text-amber-400' : 'text-amber-500'}`}>IBM</p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Data Certificate</p>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            <Briefcase className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Professional Experience</h2>
          </div>

          <div className={`space-y-8 border-l-2 ml-3 pl-6 ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
            
            {/* Freelance Data Analyst */}
            <div className="relative space-y-2">
              <div className={`absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-4 ${
                isDark ? 'border-slate-900' : 'border-slate-100'
              }`} />
              <div className="flex justify-between items-start flex-wrap gap-1">
                <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Freelance Data Analyst</h3>
                <span className={`text-xs font-black ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>Upwork & Remote Client Projects</span>
              </div>
              <p className={`text-xs font-extrabold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Present</p>
              <ul className={`text-xs font-semibold space-y-1.5 list-disc pl-4 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <li>Building automated data exploration pipelines in Python (Pandas, NumPy, Seaborn) to analyze sales performance, profitability, and customer behavior.</li>
                <li>Designing interactive Power BI dashboards and SQL query structures for custom client business requirements.</li>
                <li>Executing end-to-end data cleaning pipelines, variance analysis, and automated KPI summaries.</li>
              </ul>
            </div>

            {/* General Accountant - Emessa Denim */}
            <div className="relative space-y-2">
              <div className={`absolute -left-[32px] top-1.5 w-4 h-4 rounded-full border-4 ${
                isDark ? 'bg-slate-400 border-slate-900' : 'bg-slate-400 border-slate-100'
              }`} />
              <div className="flex justify-between items-start flex-wrap gap-1">
                <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>General Accountant</h3>
                <span className={`text-xs font-black ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>Emessa Denim for Ready Garments</span>
              </div>
              <p className={`text-xs font-extrabold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Apr 2023 – Present | Beni Suef, Egypt</p>
              <ul className={`text-xs font-semibold space-y-1.5 list-disc pl-4 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <li>Processed and analyzed financial transaction data, journal entries, and general ledger balances to ensure 100% data accuracy for month-end closing.</li>
                <li>Generated and reconciled Accounts Receivable (AR) and Accounts Payable (AP) reports, performing variance analysis to optimize cash collections.</li>
                <li>Executed bank reconciliation statements and managed tax declarations using ERP accounting software.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            <GraduationCap className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Education</h2>
          </div>

          <TiltCard isDark={isDark}>
            <div className={`p-6 rounded-2xl border space-y-2 shadow-sm ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    Bachelor of Commerce (Accounting – English Section)
                  </h3>
                  <p className={`text-xs font-extrabold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                    Al-Azhar University
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-200'
                }`}>
                  Graduated 2016 | Grade: Good
                </span>
              </div>
              <p className={`text-xs font-semibold pt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Focused on advanced financial accounting, auditing, cost accounting, and business laws in English.
              </p>
            </div>
          </TiltCard>
        </section>

        {/* Certifications & Professional Development */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            <Award className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Certifications & Professional Training</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* DEPI */}
            <TiltCard isDark={isDark}>
              <div className={`p-5 rounded-2xl border space-y-2 shadow-sm h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 font-black text-xs ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  <Code2 className="w-4 h-4" />
                  <span>MCIT - DEPI</span>
                </div>
                <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Digital Egypt Pioneers Initiative</h3>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Advanced Data Analysis Track (214 Hours Total)</p>
                <ul className={`text-[11px] font-semibold space-y-1 list-disc pl-4 leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <li>160h Technical Training: Python (Pandas, NumPy), SQL, Power BI & Power Query.</li>
                  <li>36h Freelance & Soft Skills: Proposal writing, client acquisition on Upwork & Data Storytelling.</li>
                  <li>18h Business English: Technical vocabulary & business correspondence.</li>
                </ul>
              </div>
            </TiltCard>

            {/* IBM */}
            <TiltCard isDark={isDark}>
              <div className={`p-5 rounded-2xl border space-y-2 shadow-sm h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 font-black text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  <Award className="w-4 h-4" />
                  <span>IBM Certificate</span>
                </div>
                <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Data Fundamentals Course</h3>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>IBM</p>
                <p className={`text-[11px] font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Covered core data lifecycle stages, types of data analytics (descriptive, predictive, prescriptive), and data visualization practices.
                </p>
              </div>
            </TiltCard>

            {/* CMA Candidate */}
            <TiltCard isDark={isDark}>
              <div className={`p-5 rounded-2xl border space-y-2 shadow-sm h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 font-black text-xs ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  <BookOpen className="w-4 h-4" />
                  <span>IMA</span>
                </div>
                <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Certified Management Accountant (CMA)</h3>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Part 1 Candidate</p>
                <p className={`text-[11px] font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  In-depth study of Financial Planning, Performance, Analytics, and Internal Control.
                </p>
              </div>
            </TiltCard>

            {/* Oracle AI */}
            <TiltCard isDark={isDark}>
              <div className={`p-5 rounded-2xl border space-y-2 shadow-sm h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 font-black text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  <Award className="w-4 h-4" />
                  <span>Oracle MyLearn</span>
                </div>
                <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>AI for You Course</h3>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Oracle</p>
                <p className={`text-[11px] font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Completed training on AI fundamentals, Machine Learning, Deep Learning, Generative AI, and AI integration in business operations.
                </p>
              </div>
            </TiltCard>

            {/* CFI Accounting Fundamentals */}
            <TiltCard className="sm:col-span-2" isDark={isDark}>
              <div className={`p-5 rounded-2xl border space-y-2 shadow-sm h-full ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 font-black text-xs ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                  <Award className="w-4 h-4" />
                  <span>Corporate Finance Institute (CFI)</span>
                </div>
                <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Accounting Fundamentals</h3>
                <p className={`text-[11px] font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Fundamental accounting principles, balance sheet mechanics, income statement analysis, and general ledger operations.
                </p>
              </div>
            </TiltCard>

          </div>
        </section>

        {/* Call to Action */}
        <TiltCard isDark={isDark}>
          <section className={`p-8 rounded-2xl border text-center space-y-4 shadow-sm ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Interested in Working Together?</h2>
            <p className={`text-xs font-semibold max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Feel free to download my resume or contact me directly via email.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold">
              <a 
                href="/Abdulrahman_Mohamed_CV.pdf" 
                download="Abdulrahman_Mohamed_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black flex items-center gap-2 shadow-md hover:bg-cyan-400 transition cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
              <a 
                href="mailto:abdulrahmanmohamed306@gmail.com" 
                className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 transition shadow-sm ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-950 border-slate-300'
                }`}
              >
                <Mail className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span>Get in Touch</span>
              </a>
            </div>
          </section>
        </TiltCard>

      </main>

      <footer className={`py-8 text-center text-xs font-bold relative z-10 ${
        isDark ? 'text-slate-500' : 'text-slate-600'
      }`}>
        © 2026 Abdulrahman Mohamed. All rights reserved.
      </footer>
    </div>
  );
}