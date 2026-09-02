'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, BarChart3, Globe, CheckCircle2, Moon, Sun } from 'lucide-react';

export default function SkillsPage() {
  const [isDark, setIsDark] = useState(false);

  const skillsData = [
    {
      category: "Financial Accounting & Reporting",
      icon: <Calculator className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "Financial Statements Preparation", level: "95%", comment: "خبرة واسعة في إعداد القوائم المالية (الدخل، المركز المالي، التدفقات النقدية) طبقاً للمعايير." },
        { name: "General Ledger & Reconciliations", level: "90%", comment: "إدارة الحسابات العامة بدقة عالية ومراجعة المطابقات البنكية ودورية الحسابات." },
        { name: "Cost Accounting & Budgeting", level: "85%", comment: "تحليل التكاليف ومراقبة المصروفات وإعداد الموازنات التخطيطية للشركات." },
        { name: "Accounts Payable & Receivable", level: "90%", comment: "إدارة دورة العملاء والموردين ومتابعة التحصيلات والمدفوعات بكفاءة." }
      ]
    },
    {
      category: "Data Analytics & Business Intelligence",
      icon: <BarChart3 className="w-5 h-5 text-cyan-500" />,
      skills: [
        { name: "Python (Pandas, NumPy, Seaborn)", level: "85%", comment: "استخدام بايثون في تنظيف البيانات وتحليلها واستخراج رؤى الأداء المالي والتجاري." },
        { name: "SQL Server", level: "85%", comment: "كتابة استعلامات متقدمة، وربط الجداول (Joins)، وإدارة القواعد لاستخراج البيانات بدقة." },
        { name: "Power BI & Tableau", level: "80%", comment: "تصميم لوحات تحكم تفاعلية (Dashboards) لعرض مؤشرات الأداء الرئيسية (KPIs)." },
        { name: "Advanced Excel", level: "95%", comment: "احتراف الجداول المحورية، المعادلات المتقدمة، وPower Query للنمذجة المالية." }
      ]
    },
    {
      category: "Core Competencies & Tools",
      icon: <Globe className="w-5 h-5 text-amber-500" />,
      skills: [
        { name: "Exploratory Data Analysis (EDA)", level: "90%", comment: "تحليل استكشافي للبيانات لمعالجة القيم الشاذة وفهم السلوكيات الشرائية والتجارية." },
        { name: "Financial Modeling", level: "88%", comment: "بناء نماذج مالية لتقييم الأداء والتنبؤ بالإيرادات واتخاذ القرارات الإدارية." },
        { name: "Git & GitHub", level: "85%", comment: "إدارة النسخ الاحتياطية للمشاريع ورفع الأكواد وتوثيقها بشكل احترافي." }
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
            <span>العودة للرئيسية</span>
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
          <h1 className="text-3xl font-extrabold tracking-tight">المهارات والخبرات التقنية والمالية</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            تفصيل شامل للمهارات المحاسبية وأدوات تحليل البيانات المتقدمة التي أمتلكها.
          </p>
        </div>

        {/* Skills List */}
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
                  <div key={sIdx} className={`p-4 rounded-xl border transition ${
                    isDark ? 'bg-slate-950/50 border-slate-800/60' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                        <span className="font-bold text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 w-fit">
                        المستوى: {skill.level}
                      </span>
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