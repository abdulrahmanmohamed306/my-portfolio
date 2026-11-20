"use client";

import { useState } from "react";
import { dataQuestions } from "@/lib/ask-data";

/** Pick a business question, see the Pandas or SQL that answers it and the real result. */
export function AskTheData() {
  const [active, setActive] = useState(0);
  const [lang, setLang] = useState<"pandas" | "sql">("pandas");
  const q = dataQuestions[active];

  return (
    <div className="grid border border-rule-strong bg-sheet lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="border-b border-rule-strong lg:border-b-0 lg:border-r">
        <p className="border-b border-rule px-5 py-3 text-xs font-semibold text-ink">Choose a question</p>
        <ul role="tablist" aria-label="Questions" aria-orientation="vertical">
          {dataQuestions.map((d, i) => {
            const selected = i === active;
            return (
              <li key={d.question} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`q-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="q-panel"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-start gap-3 border-b border-rule px-5 py-3 text-left text-sm transition-colors last:border-b-0 ${
                    selected ? "bg-bar text-ink" : "text-ink-soft hover:bg-paper hover:text-ledger"
                  }`}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${selected ? "bg-ledger" : "border border-rule-strong"}`} />
                  <span className={selected ? "font-semibold" : ""}>{d.question}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id="q-panel" role="tabpanel" aria-labelledby={`q-tab-${active}`} className="min-w-0 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-serif text-xl font-semibold text-ink">{q.question}</p>
        </div>

        <div className="mt-4 flex gap-1" role="group" aria-label="Code language">
          {(["pandas", "sql"] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={`rounded-sm border px-3 py-1 text-xs ${
                lang === l ? "border-ink bg-ink text-paper" : "border-rule-strong text-ink-soft hover:border-ledger hover:text-ledger"
              }`}
            >
              {l === "pandas" ? "Python (Pandas)" : "SQL"}
            </button>
          ))}
        </div>
        <pre className="mt-2 overflow-x-auto bg-ink p-4 text-[12.5px] leading-relaxed text-paper">
          <code>{lang === "pandas" ? q.pandas : q.sql}</code>
        </pre>

        <p className="mt-5 text-xs font-semibold text-ink">Result</p>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[20rem] text-sm">
            <thead>
              <tr className="border-b-2 border-ink text-left">
                {q.columns.map((c, i) => (
                  <th key={c} scope="col" className={`py-2 pr-4 text-xs font-semibold text-ink ${i > 0 ? "text-right" : ""}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {q.rows.map((r, ri) => (
                <tr key={ri} className={`border-b border-rule ${ri === 0 ? "bg-bar" : ""}`}>
                  {r.map((v, i) => (
                    <td key={i} className={`figure py-2 pr-4 ${i > 0 ? "text-right font-semibold text-ink" : "text-ink-soft"}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 border-l-2 border-ledger pl-3 leading-relaxed text-ink-soft">{q.insight}</p>
      </div>
    </div>
  );
}
