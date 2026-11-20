"use client";

import { useEffect, useState } from "react";
import { ledger } from "@/lib/site";

// Timings (ms) shared by the CSS animation delays and the count-up
const START = 250;
const STEP = 260;
const COUNT = 700;

function split(value: string) {
  const m = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return { prefix: "", num: NaN, suffix: value, decimals: 0 };
  return { prefix: m[1], num: Number(m[2]), suffix: m[3], decimals: (m[2].split(".")[1] ?? "").length };
}

function CountUp({ value, delay }: { value: string; delay: number }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    const { prefix, num, suffix, decimals } = split(value);
    if (Number.isNaN(num) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - t0) / COUNT, 0), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(`${prefix}${(num * eased).toFixed(decimals)}${suffix}`);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, delay]);

  return <>{text}</>;
}

/** The hero's "statement": rows post one by one, figures count up, and the total gets its double rule. */
export function LedgerStatement() {
  const footDelay = START + ledger.length * STEP + 150;

  return (
    <figure className="ledger-anim border border-rule-strong bg-sheet shadow-[0_1px_0_var(--color-rule)]">
      <figcaption className="flex items-baseline justify-between border-b border-rule-strong px-5 py-3">
        <span className="font-serif text-lg text-ink">Statement of experience</span>
        <span className="text-xs text-muted">2017 – 2026</span>
      </figcaption>
      <table className="w-full text-sm">
        <tbody>
          {ledger.map((row, i) => {
            const delay = START + i * STEP;
            return (
              <tr key={row.label} className={`ledger-row ${i % 2 === 0 ? "bg-bar" : ""}`} style={{ animationDelay: `${delay}ms` }}>
                <th scope="row" className="px-5 py-3 text-left font-normal text-ink-soft">
                  {row.label}
                </th>
                <td className="figure px-5 py-3 text-right font-serif text-xl font-semibold text-ink">
                  <CountUp value={row.value} delay={delay} />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="ledger-row" style={{ animationDelay: `${footDelay}ms` }}>
            <th scope="row" className="px-5 pb-4 pt-4 text-left font-semibold text-ink">
              Open to
            </th>
            <td className="px-5 pb-4 pt-4 text-right">
              <span className="relative inline-block whitespace-nowrap pb-1 font-semibold text-ledger">
                Finance &amp; BI roles
                <span
                  aria-hidden
                  className="ledger-rule absolute inset-x-0 bottom-0 h-[3px] border-y border-ink"
                  style={{ animationDelay: `${footDelay + 250}ms` }}
                />
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </figure>
  );
}
