'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ExternalLink, 
  X, 
  Moon, 
  Sun,
  FolderGit2,
  Maximize2,
  Database,
  BarChart2,
  Code2,
  CheckCircle2
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function OnlineSalesProjectPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ file: string; title: string; desc: string } | null>(null);

  const projectData = {
    title: "Global Online Sales & Revenue Intelligence Analysis",
    subtitle: "Real-World Exploratory Data Analysis & Financial Metrics",
    github: "https://github.com/abdulrahmanmohamed306/online-sales-data-analysis",
    description: "An end-to-end data analytics project leveraging real online transaction datasets. Focused on cleaning transaction logs, evaluating regional sales distribution, and identifying high-revenue product categories using Python and Pandas.",
    techStack: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'SQL Server', 'Power BI', 'Real Dataset'],
    visuals: [
      { file: "real_category_revenue.png", title: "Total Revenue by Product Category", desc: "Actual aggregated revenue distribution across categories showing Electronics as the leading revenue driver at ~$35K." },
      { file: "regional_sales_performance.png", title: "Regional Sales Breakdown", desc: "Geographic performance metrics mapping transactions across North America, Asia, and Europe." }
    ]
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#030712] text-white' : 'bg-slate-100 text-slate-950'
    }`}>
      
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] blur-[120px] pointer-events-none z-0 ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/20'
      }`} />

      {/* Navigation Header */}
      <header className="pt-6 px-4 max-w-5xl mx-auto relative z-50">
        <div className={`backdrop-blur-md rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl transition-colors ${
          isDark ? 'bg-slate-900/90 text-white border border-slate-700' : 'bg-white/95 text-slate-950 border border-slate-300'
        }`}>
          <Link href="/" className={`flex items-center gap-2 text-xs font-bold transition ${
            isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-800'
          }`}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-950/20 border border-cyan-400 p-1 flex items-center justify-center overflow-hidden">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`font-black text-xs tracking-wide ${isDark ? 'text-white' : 'text-slate-950'}`}>ABDULRAHMAN</span>
          </div>

          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition shadow-md ${
              isDark ? 'bg-slate-800 text-amber-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12 relative z-10">

        {/* Project Title & Overview */}
        <section className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider ${
            isDark ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300' : 'bg-cyan-100 border-cyan-400 text-cyan-950'
          }`}>
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>Real Transaction Dataset Project</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {projectData.title}
          </h1>
          <p className={`text-xs sm:text-sm font-semibold max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            {projectData.description}
          </p>
        </section>

        {/* Action Bar & Tech Stack */}
        <div className={`rounded-2xl border p-6 space-y-6 shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
            <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
              {projectData.subtitle}
            </span>
            
            <a 
              href={projectData.github} 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-2 hover:bg-cyan-300 transition"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Repository on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-cyan-400 tracking-wider">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech) => (
                <span key={tech} className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow & Methodology */}
        <section className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <h2 className={`text-lg font-black border-l-4 border-cyan-400 pl-3 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Analysis Workflow & Execution
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-xs uppercase tracking-wide">1. Data Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Loaded structured online sales records, inspecting schema structures, validating data types, and ensuring clean numerical fields via Pandas.
              </p>
            </div>

            <div className={`p-5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <Code2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase tracking-wide">2. Exploratory Data Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aggregated revenue metrics across product lines and regional markets using GroupBy operations and statistical calculations.
              </p>
            </div>

            <div className={`p-5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <BarChart2 className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-xs uppercase tracking-wide">3. Visual Insights</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plotted clean bar distributions with Seaborn/Matplotlib, translating raw transaction numbers into clear financial insights.
              </p>
            </div>
          </div>
        </section>

        {/* Visualizations Gallery */}
        <section className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <h2 className={`text-lg font-black border-l-4 border-cyan-400 pl-3 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Data Visualizations & Charts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projectData.visuals.map((visual, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(visual)}
                className={`rounded-xl overflow-hidden border shadow-md transition cursor-pointer group hover:border-cyan-400 hover:scale-[1.01] ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-950 relative flex items-center justify-center">
                  <img src={`/${visual.file}`} alt={visual.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="bg-slate-900/90 text-cyan-400 border border-cyan-400/40 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand Chart</span>
                    </span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <p className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {visual.title}
                  </p>
                  <p className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {visual.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Findings */}
        <section className={`rounded-2xl border p-6 sm:p-8 space-y-4 shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <h2 className={`text-lg font-black border-l-4 border-cyan-400 pl-3 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Key Analytical Findings
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Electronics generated the highest total revenue ($34,982), outperforming other product categories significantly.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>North America led regional sales performance with $36,844 in total revenue, followed by Asia and Europe.</span>
            </li>
          </ul>
        </section>

      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition shadow-lg z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-white">{selectedImage.title}</h3>
              <p className="text-xs text-slate-400">{selectedImage.desc}</p>
            </div>
            <div className="w-full max-h-[70vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
              <img src={`/${selectedImage.file}`} alt={selectedImage.title} className="max-w-full max-h-[70vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}