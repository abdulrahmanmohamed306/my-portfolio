"use client";

import { useEffect, useMemo, useState } from "react";
import { retail } from "@/lib/retail-data";

const YEARS = [2014, 2015, 2016, 2017];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function money(n: number) {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 10_000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function Choice<T extends string | number>({
  label,
  options,
  value,
  onChange,
  format = (v) => String(v),
}: {
  label: string;
  options: (T | "all")[];
  value: T | "all";
  onChange: (v: T | "all") => void;
  format?: (v: T) => string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-semibold text-ink">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={String(o)}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o)}
              className={`rounded-sm border px-2.5 py-1.5 text-xs transition-colors ${
                active ? "border-ink bg-ink text-paper" : "border-rule-strong bg-sheet text-ink-soft hover:border-ledger hover:text-ledger"
              }`}
            >
              {o === "all" ? "All" : format(o as T)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function InteractiveDashboard() {
  const [year, setYear] = useState<number | "all">("all");
  const [region, setRegion] = useState<number | "all">("all");
  const [segment, setSegment] = useState<number | "all">("all");
  // A narrower drawing on phones keeps the chart labels readable
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const view = useMemo(() => {
    const rows = retail.rows.filter(
      (r) => (region === "all" || r[3] === region) && (segment === "all" || r[4] === segment),
    );
    const inYear = rows.filter((r) => year === "all" || r[0] === year);

    let sales = 0;
    let profit = 0;
    let lines = 0;
    const byCat = retail.categories.map(() => ({ s: 0, p: 0 }));
    const byRegion = retail.regions.map(() => 0);
    for (const r of inYear) {
      sales += r[5];
      profit += r[6];
      lines += r[7];
      byCat[r[2]].s += r[5];
      byCat[r[2]].p += r[6];
    }
    // Region split ignores the region filter so it always shows the comparison
    for (const r of retail.rows) {
      if ((year === "all" || r[0] === year) && (segment === "all" || r[4] === segment)) byRegion[r[3]] += r[5];
    }

    const trendLabels = year === "all" ? YEARS.map(String) : MONTHS;
    const trend = trendLabels.map(() => ({ s: 0, p: 0 }));
    for (const r of rows) {
      if (year === "all") {
        const i = YEARS.indexOf(r[0]);
        trend[i].s += r[5];
        trend[i].p += r[6];
      } else if (r[0] === year) {
        trend[r[1] - 1].s += r[5];
        trend[r[1] - 1].p += r[6];
      }
    }
    return { sales, profit, lines, byCat, byRegion, trend, trendLabels };
  }, [year, region, segment]);

  const margin = view.sales ? (view.profit / view.sales) * 100 : 0;
  const catMax = Math.max(...view.byCat.map((c) => c.s), 1);
  const regionTotal = view.byRegion.reduce((a, b) => a + b, 0) || 1;

  // Line chart geometry
  const W = narrow ? 340 : 520;
  const H = narrow ? 200 : 180;
  const pad = { l: 8, r: 8, t: 22, b: 24 };
  const tMax = Math.max(...view.trend.map((t) => t.s), 1) * 1.1;
  const n = view.trend.length;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (n - 1);
  const y = (v: number) => pad.t + (1 - v / tMax) * (H - pad.t - pad.b);
  const path = (key: "s" | "p") => view.trend.map((t, i) => `${x(i)},${y(t[key])}`).join(" ");
  const peak = view.trend.reduce((best, t, i) => (t.s > view.trend[best].s ? i : best), 0);

  const filterText = [
    year === "all" ? "2014–2017" : String(year),
    region === "all" ? "all regions" : `${retail.regions[region]} region`,
    segment === "all" ? "all segments" : retail.segments[segment],
  ].join(", ");

  return (
    <div className="border border-rule-strong bg-sheet">
      <div className="grid gap-5 border-b border-rule-strong bg-paper px-4 py-4 sm:px-5 md:grid-cols-[auto_auto_1fr] md:gap-8">
        <Choice label="Year" options={["all", ...YEARS]} value={year} onChange={setYear} />
        <Choice
          label="Region"
          options={["all", 0, 1, 2, 3]}
          value={region}
          onChange={setRegion}
          format={(v) => retail.regions[v as number]}
        />
        <Choice
          label="Customer segment"
          options={["all", 0, 1, 2]}
          value={segment}
          onChange={setSegment}
          format={(v) => retail.segments[v as number]}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filterText}: sales {money(view.sales)}, net profit {money(view.profit)}, margin {margin.toFixed(1)}%.
      </p>

      <dl className="grid grid-cols-2 gap-px border-b border-rule bg-rule md:grid-cols-4">
        {[
          { label: "Sales", value: money(view.sales) },
          { label: "Net profit", value: money(view.profit) },
          { label: "Profit margin", value: `${margin.toFixed(1)}%` },
          { label: "Order lines", value: view.lines.toLocaleString("en-US") },
        ].map((k, i) => (
          <div key={k.label} className={`px-4 py-3 sm:px-5 ${i === 0 || i === 3 ? "bg-bar" : "bg-sheet"}`}>
            <dt className="text-xs text-muted">{k.label}</dt>
            <dd className="figure mt-1 font-serif text-2xl font-semibold text-ink sm:text-3xl">{k.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-8 px-4 py-5 sm:px-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-xs font-semibold text-ink">
              {year === "all" ? "Sales and profit by year" : `Sales and profit by month, ${year}`}
            </p>
            <ul className="flex gap-3 text-[11px] text-muted">
              <li className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-3 bg-ink" /> Sales
              </li>
              <li className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-3 bg-ledger" /> Net profit
              </li>
            </ul>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label={`Trend chart for ${filterText}`}>
            {[0.25, 0.5, 0.75, 1].map((t) => (
              <line key={t} x1={pad.l} x2={W - pad.r} y1={y(tMax * t)} y2={y(tMax * t)} stroke="var(--color-rule)" />
            ))}
            <line x1={pad.l} x2={W - pad.r} y1={y(0)} y2={y(0)} stroke="var(--color-rule-strong)" />
            <polyline points={path("s")} fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
            <polyline points={path("p")} fill="none" stroke="var(--color-ledger)" strokeWidth="2" strokeLinejoin="round" />
            {view.trend.map((t, i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(t.s)} r="2.75" fill="var(--color-sheet)" stroke="var(--color-ink)" strokeWidth="1.5" />
                <circle cx={x(i)} cy={y(t.p)} r="2.75" fill="var(--color-sheet)" stroke="var(--color-ledger)" strokeWidth="1.5" />
              </g>
            ))}
            {view.trend[peak].s > 0 && (
              <text
                x={x(peak)}
                y={y(view.trend[peak].s) - 8}
                textAnchor={peak === 0 ? "start" : peak === n - 1 ? "end" : "middle"}
                fontSize="11"
                fontWeight="600"
                fill="var(--color-ink)"
              >
                Peak {money(view.trend[peak].s)}
              </text>
            )}
            {view.trendLabels.map((l, i) => (narrow && n > 6 && i % 2 === 1 ? null : (
              <text
                key={l}
                x={x(i)}
                y={H - 6}
                textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
                fontSize="11"
                fill="var(--color-muted)"
              >
                {l}
              </text>
            )))}
          </svg>
        </div>

        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold text-ink">Sales by category</p>
            <ul className="mt-3 space-y-3">
              {retail.categories.map((c, i) => {
                const cat = view.byCat[i];
                const m = cat.s ? (cat.p / cat.s) * 100 : 0;
                return (
                  <li key={c}>
                    <div className="flex items-baseline justify-between gap-3 text-xs">
                      <span className="text-ink-soft">{c}</span>
                      <span className="figure font-semibold text-ink">
                        {money(cat.s)} <span className="font-normal text-muted">{m.toFixed(0)}% margin</span>
                      </span>
                    </div>
                    <div className="mt-1 h-2 bg-bar">
                      <div className="h-full bg-ledger transition-[width] duration-500" style={{ width: `${(cat.s / catMax) * 100}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-ink">Share of sales by region</p>
            <p className="text-[11px] text-muted">Select a region to filter.</p>
            <div className="mt-2 flex h-9 overflow-hidden border border-rule">
              {retail.regions.map((r, i) => {
                const share = (view.byRegion[i] / regionTotal) * 100;
                const active = region === i;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegion(active ? "all" : i)}
                    aria-pressed={active}
                    aria-label={`${r}: ${share.toFixed(0)}% of sales`}
                    title={`${r}: ${share.toFixed(0)}%`}
                    className={`relative min-w-0 border-r border-sheet text-[11px] transition-[flex-grow,background-color] duration-500 last:border-r-0 ${
                      active ? "bg-ledger text-white" : region === "all" ? "bg-ink/85 text-paper hover:bg-ledger" : "bg-rule text-ink-soft hover:bg-rule-strong"
                    }`}
                    style={{ flexGrow: Math.max(share, 0.01), flexBasis: 0 }}
                  >
                    <span className="block truncate px-1">{share >= 12 ? `${r} ${share.toFixed(0)}%` : ""}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
