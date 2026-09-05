'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BarChart3, 
  Code2, 
  Globe, 
  Moon, 
  Sun, 
  Activity, 
  Database, 
  CheckCircle2 
} from 'lucide-react';

export default function KidneyDiseaseProject() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen font-sans p-6 md:p-12 transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-[#fafafa] text-slate-800'
    }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header with Back Button and Theme Toggle */}
        <div className="flex items-center justify-between">
          <Link 
            href="/projects" 
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
              isDark ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full bg-slate-800 text-amber-400 hover:bg-slate-700 transition shadow-md cursor-pointer"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

        {/* Project Header Title */}
        <div className="space-y-3 border-l-4 border-cyan-400 pl-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-cyan-950/90 text-cyan-300 border border-cyan-800">
            <Activity className="w-3.5 h-3.5" />
            <span>Healthcare Data Science Case Study</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Chronic Kidney Disease Analysis</h1>
          <p className="text-sm text-slate-400">
            Exploratory data analysis and predictive classification modeling utilizing Python data science libraries.
          </p>
        </div>

        {/* Quick Actions / GitHub Link */}
        <div className="flex flex-wrap items-center gap-4">
          <a 
            href="https://github.com/abdulrahmanmohamed306/chronic-kidney-disease-analysis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>View GitHub Repository</span>
          </a>
        </div>

        {/* Project Details Sections */}
        <div className="space-y-6">
          
          {/* Overview */}
          <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
              <span>Project Overview</span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              This repository contains an end-to-end data analysis project focused on exploring medical attributes to detect patterns associated with chronic kidney disease. The workflow covers data ingestion, rigorous data cleaning, handling missing clinical variables, and uncovering core indicators.
            </p>
          </div>

          {/* Key Technologies */}
          <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-400">
              <Code2 className="w-5 h-5" />
              <span>Technologies & Libraries Used</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Python (Pandas & NumPy for data manipulation)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Seaborn & Matplotlib (Exploratory Data Visualization)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Scikit-Learn (Preprocessing & Model Evaluation)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Jupyter Notebook (Interactive Development Environment)</span>
              </div>
            </div>
          </div>

          {/* Key Objectives */}
          <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-amber-400">
              <Database className="w-5 h-5" />
              <span>Key Steps & Workflow</span>
            </h2>
            <ul className="text-xs sm:text-sm space-y-2 list-disc pl-5 text-slate-300 leading-relaxed">
              <li><strong>Data Preprocessing:</strong> Handled skewed distributions, normalized numerical features, and imputed missing categorical/numerical values in medical records.</li>
              <li><strong>Exploratory Data Analysis (EDA):</strong> Visualized correlations between vital signs, blood chemistry markers, and disease diagnosis flags.</li>
              <li><strong>Model Training & Insights:</strong> Evaluated feature importance to determine primary health markers contributing to early risk assessment.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}