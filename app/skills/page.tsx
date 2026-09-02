'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, BarChart3, Globe, CheckCircle2, Moon, Sun, Star } from 'lucide-react';

export default function SkillsPage() {
  const [isDark, setIsDark] = useState(false);

  const skillsData = [
    {
      category: "Financial Accounting & Reporting",
      icon: <Calculator className="w-5 h-5 text-emerald-500" />,
      skills: [
        { 
          name: "Financial Statements Preparation", 
          rating: 5, 
          percentage: "95%", 
          comment: "Extensive expertise in preparing Income Statement, Balance Sheet, and Cash Flow statements in compliance with standards." 
        },
        { 
          name: "General Ledger & Reconciliations", 
          rating: 4.5, 
          percentage: "90%", 
          comment: "Managing general ledger operations accurately and handling regular bank reconciliations and period-end closings." 
        },
        { 
          name: "Accounts Payable & Receivable", 
          rating: 4.5, 
          percentage: "90%", 
          comment: "Managing full-cycle AP/AR operations, monitoring collections, and tracking vendor payments efficiently." 
        },
        { 
          name: "Financial Auditing & Internal Control", 
          rating: 4, 
          percentage: "85%", 
          comment: "Executing financial audits, strengthening internal controls, and ensuring accuracy across financial transactions." 
        }
      ]
    },
    {
      category: "Data Analytics & Business Intelligence",
      icon: <BarChart3 className="w-5 h-5 text-cyan-500" />,
      skills: [
        { 
          name: "Python (Pandas, NumPy, Seaborn)", 
          rating: 4, 
          percentage: "85%", 
          comment: "Leveraging Python libraries for automated data cleaning, exploratory data analysis, and financial performance modeling." 
        },
        { 
          name: "SQL Server", 
          rating: 4, 
          percentage: "85%", 
          comment: "Writing advanced queries, joins, and aggregations to extract deep financial and business intelligence insights from relational databases." 
        },
        { 
          name: "Power BI & Tableau", 
          rating: 4, 
          percentage: "80%", 
          comment: "Designing interactive visual dashboards to track key performance indicators (KPIs) and operational metrics." 
        },
        { 
          name: "Advanced Excel", 
          rating: 5, 
          percentage: "95%", 
          comment: "Expert in Power Query, Pivot Tables, complex formulas, and financial modeling for corporate data structuring." 
        }
      ]
    },
    {
      category: "Core Competencies & Tools",
      icon: <Globe className="w-5 h-5 text-amber-500" />,
      skills: [
        { 
          name: "Exploratory Data Analysis (EDA)", 
          rating: 4.5, 
          percentage: "90%", 
          comment: "Investigating dataset characteristics, identifying anomalies, and uncovering commercial patterns to support decision-making." 
        },
        { 
          name: "Financial Modeling", 
          rating: 4.5, 
          percentage: "88%", 
          comment: "Building structural quantitative models to forecast business revenues, expenditures, and corporate growth." 
        },
        { 
          name: "Git & GitHub", 
          rating: 4, 
          percentage: "85%", 
          comment: "Version control management, repository documentation, and collaborative code deployment." 
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen font-sans p-6 md:p-12 transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] text-slate-200' : 'bg-[#fafafa] text-slate-800'
    }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header with Back Button and Theme Toggle */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition ${
              isDark ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 transition shadow-md"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-200" />}
          </button>
        </div>

        {/* Page Title */}
        <div className="space-y-2 border-l-4 border-cyan-400 pl-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Technical & Financial Expertise</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A comprehensive breakdown of accounting proficiencies, data analytics tools, and core competencies.
          </p>
        </div>

        {/* Skills List with Hover Effect */}
        <div className="space-y-8">
          {skillsData.map((section, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border shadow-sm space-y-5 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                {section.icon}
                <h2 className="text-lg font-bold">{section.category}</h2>
              </div>

              <div className="space-y-4">
                {section.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`p-4 rounded-xl border transition-all duration-300 group hover:shadow-md hover:border-cyan-400/60 ${
                      isDark ? 'bg-slate-950/50 border-slate-800/60 hover:bg-slate-900/80' : 'bg-slate-50 border-slate-100 hover:bg-cyan-50/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                        <span className="font-bold text-sm">{skill.name}</span>
                      </div>
                      
                      {/* Rating Stars & Percentage (Visible/Enhanced on Hover) */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(skill.rating) 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : i < skill.rating 
                                  ? 'text-amber-400 fill-amber-400/50' 
                                  : 'text-slate-300 dark:text-slate-700'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">
                          {skill.percentage}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                      {skill.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}