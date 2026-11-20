"use client";

import { useEffect, useState } from "react";
import { ledger } from "@/lib/site";

// Timings (ms) shared by the CSS animation delays and the count-up
const START = 250;
const STEP = 220;
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

/**
 * The hero's "statement", laid out as one ledger line across the page:
 * entries post one by one, figures count up, and the total gets its double rule.
 */
export function LedgerStatement() {
  const footDelay = START + ledger.length * STEP + 100;

  return (
    <figure className="ledger-anim border border-rule-strong bg-sheet">
      <figcaption className="flex items-baseline justify-between border-b border-rule-strong px-5 py-2.5">
        <span className="font-serif text-base text-ink sm:text-lg">Statement of experience</span>
        <span className="text-xs text-muted">2017 – 2026</span>
      </figcaption>
      <dl className="grid grid-cols-2 gap-px bg-rule md:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        {ledger.map((row, i) => {
          const delay = START + i * STEP;
          return (
            <div
              key={row.label}
              className={`ledger-row px-5 py-4 ${i === 0 || i === 3 ? "bg-bar" : "bg-sheet"}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              <dt className="text-xs leading-snug text-ink-soft">{row.label}</dt>
              <dd className="figure mt-1 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                <CountUp value={row.value} delay={delay} />
              </dd>
            </div>
          );
        })}
        <div
          className="ledger-row col-span-2 flex items-center justify-between gap-4 bg-sheet px-5 py-4 md:col-span-1 md:flex-col md:items-start md:justify-center"
          style={{ animationDelay: `${footDelay}ms` }}
        >
          <dt className="text-xs font-semibold text-ink">Open to</dt>
          <dd className="relative inline-block whitespace-nowrap pb-1 font-semibold text-ledger">
            Finance &amp; BI roles
            <span
              aria-hidden
              className="ledger-rule absolute inset-x-0 bottom-0 h-[3px] border-y border-ink"
              style={{ animationDelay: `${footDelay + 250}ms` }}
            />
          </dd>
        </div>
      </dl>
    </figure>
  );
}
