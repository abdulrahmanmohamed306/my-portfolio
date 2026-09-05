'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  Moon, 
  Sun,
  Layers,
  Globe,
  Stethoscope
} from "lucide-react";

const cardPageVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function ProjectsMainPage() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#070a12] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Background Ambient Lights */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] blur-[150px] pointer-events-none z-0 ${
        isDark ? 'bg-cyan-600/15' : 'bg-cyan-400/20'
      }`} />

      {/* Header */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4 max-w-6xl mx-auto">
        <div className={`backdrop-blur-md rounded-2xl px-8 py-3.5 flex items-center justify-between border shadow-lg transition-all ${
          isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'bg-white/80 border-slate-200 text-slate-900'
        }`}>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold hover:text-cyan-400 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <span className="font-black text-sm tracking-widest uppercase">ALL PROJECTS</span>

          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-amber-500 hover:scale-110 transition shadow"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-16 relative z-10">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            <Layers className="w-4 h-4" />
            <span>Portfolio Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">Data & Analytics Projects</h1>
          <p className="text-sm text-slate-400">Detailed overview of end-to-end data analytics, machine learning, and business intelligence projects.</p>
        </div>

        {/* PROJECT 1: CUSTOMER CHURN */}
        <motion.div 
          className={`w-full p-8 md:p-12 rounded-3xl border space-y-8 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardPageVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-cyan-400 bg-cyan-950/80 px-3.5 py-1 rounded-full uppercase tracking-wider border border-cyan-800">
                PROJECT 01 • PYTHON & CHURN ANALYTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black pt-1">E-Commerce Customer Retention Analysis</h2>
              <p className="text-xs sm:text-sm text-slate-400">EDA project identifying churn risk drivers, purchasing cycles, and customer lifetime value.</p>
            </div>

            <Link 
              href="/projects/ecommerce-customer-retention" 
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/20 self-start sm:self-auto flex-shrink-0"
            >
              <span>VIEW FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-full rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-6 text-slate-200">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <span className="font-mono text-cyan-400 font-bold flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4" />
                <span>Customer Retention & Churn EDA Metrics</span>
              </span>
              <span className="text-xs text-slate-400">Dataset Size: 5,000 Customers</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Total Analyzed</div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">5,000 Users</div>
                <div className="text-xs text-cyan-400">100% Clean Data</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Overall Churn Rate</div>
                <div className="text-xl sm:text-2xl font-extrabold text-rose-400">16.8%</div>
                <div className="text-xs text-rose-400 font-bold">840 Lost Users</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Retention Rate</div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">83.2%</div>
                <div className="text-xs text-emerald-400 font-bold">4,160 Active</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Avg Tenure</div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400">11.5 Months</div>
                <div className="text-xs text-amber-400">Loyalty Cycle</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong className="text-amber-400">Key Finding:</strong> Single users with low tenure (&lt; 3 months) showed the highest churn probability. Retention strategies should focus on onboarding incentives.
              </p>
            </div>
          </div>
        </motion.div>


        {/* PROJECT 2: GLOBAL SALES */}
        <motion.div 
          className={`w-full p-8 md:p-12 rounded-3xl border space-y-8 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardPageVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-3.5 py-1 rounded-full uppercase tracking-wider border border-emerald-800">
                PROJECT 02 • GLOBAL E-COMMERCE & RETAIL ANALYTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black pt-1">Global Online Sales & Revenue Intelligence Analysis</h2>
              <p className="text-xs sm:text-sm text-slate-400">Analyzing multi-category retail transactions to uncover revenue drivers, regional trends, and margin concentration.</p>
            </div>

            <Link 
              href="/projects/online-sales-analysis" 
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 self-start sm:self-auto flex-shrink-0"
            >
              <span>VIEW FULL CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-full rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-6 text-slate-200">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <span className="font-mono text-emerald-400 font-bold flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>Global Sales & Revenue Distribution Metrics</span>
              </span>
              <span className="text-xs text-slate-400">Transactions Dataset</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Total Gross Revenue</div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">$8,912,450</div>
                <div className="text-xs text-emerald-400 font-bold">Global Sales Volume</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Total Units Sold</div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">1,250,400</div>
                <div className="text-xs text-slate-400">Multi-Category</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Avg Unit Price</div>
                <div className="text-xl sm:text-2xl font-extrabold text-sky-400">$28.50</div>
                <div className="text-xs text-sky-400">Unit Price Point</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Top Revenue Region</div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400">North America</div>
                <div className="text-xs text-amber-400">&gt;65% Revenue Share</div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* PROJECT 3: CHRONIC KIDNEY DISEASE ANALYSIS */}
        <motion.div 
          className={`w-full p-8 md:p-12 rounded-3xl border space-y-8 ${
            isDark ? 'bg-slate-900/90 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardPageVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-sky-400 bg-sky-950/80 px-3.5 py-1 rounded-full uppercase tracking-wider border border-sky-800">
                PROJECT 03 • HEALTHCARE DATA SCIENCE & EDA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black pt-1">Chronic Kidney Disease Analysis</h2>
              <p className="text-xs sm:text-sm text-slate-400">Exploratory data analysis and predictive classification modeling utilizing Python data science libraries.</p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0">
              <a 
                href="https://github.com/abdulrahmanmohamed306/chronic-kidney-disease-analysis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-extrabold text-xs transition border border-slate-700"
                title="GitHub Repository"
              >
                <Globe className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <Link 
                href="/projects/kidney_disease" 
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-sky-500/20"
              >
                <span>VIEW FULL CASE STUDY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-6 text-slate-200">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <span className="font-mono text-sky-400 font-bold flex items-center gap-2 text-sm">
                <Stethoscope className="w-4 h-4" />
                <span>Medical Data Preprocessing & Predictive Modeling</span>
              </span>
              <span className="text-xs text-slate-400">Python & Scikit-Learn</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Data Domain</div>
                <div className="text-base font-extrabold text-white">Healthcare & Clinical Data</div>
                <div className="text-xs text-sky-400">Risk Assessment</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Core Tools</div>
                <div className="text-base font-extrabold text-white">Pandas, NumPy, Seaborn</div>
                <div className="text-xs text-emerald-400">Advanced EDA</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Workflow</div>
                <div className="text-base font-extrabold text-white">Cleaning & Imputation</div>
                <div className="text-xs text-amber-400">Classification Metrics</div>
              </div>
            </div>
          </div>
        </motion.div>

      </main>

      <footer className="py-6 text-center text-xs text-slate-500 font-medium border-t border-slate-800">
        © 2026 Abdulrahman Mohamed. All rights reserved.
      </footer>
    </div>
  );
}