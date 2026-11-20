import { experience } from "@/lib/site";

function monthsBetween(start: string, end?: string) {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return (ey - sy) * 12 + (em - sm);
}

const years = (m: number) => `${(m / 12).toFixed(1)} yrs`;

/** Experience drawn as a waterfall chart: each role adds its months to the running total. */
export function CareerWaterfall() {
  const roles = experience
    .filter((j) => j.start && !j.concurrent)
    .map((j) => ({ ...j, months: monthsBetween(j.start!, j.end) }))
    .reverse(); // oldest first

  const bars = roles.map((r, i) => ({
    ...r,
    from: roles.slice(0, i).reduce((sum, prev) => sum + prev.months, 0),
  }));
  const total = roles.reduce((sum, r) => sum + r.months, 0);
  const finance = bars.filter((b) => b.field !== "operations").reduce((a, b) => a + b.months, 0);
  const pct = (m: number) => `${(m / total) * 100}%`;

  return (
    <figure className="border border-rule-strong bg-sheet">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule-strong px-5 py-3">
        <span className="font-serif text-lg text-ink">Experience, built up role by role</span>
        <span className="flex gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 bg-ledger" /> Accounting &amp; finance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 bg-rule-strong" /> Retail operations
          </span>
        </span>
      </figcaption>
      <ol className="text-sm">
        {bars.map((b, i) => (
          <li
            key={b.role + b.start}
            className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 px-5 py-2.5 sm:grid-cols-[14rem_1fr_4.5rem] ${i % 2 === 0 ? "bg-bar/60" : ""}`}
          >
            <p className="min-w-0">
              <span className="block text-ink">{b.short}</span>
              <span className="figure block text-[11px] text-muted">{b.period}</span>
            </p>
            <p className="figure whitespace-nowrap text-right font-semibold text-ink sm:order-last">{b.months} mo</p>
            <div className="relative col-span-2 h-4 sm:col-span-1 sm:h-5" aria-hidden>
              <div
                className={`absolute top-0 h-full ${b.field === "operations" ? "bg-rule-strong" : "bg-ledger"}`}
                style={{ left: pct(b.from), width: pct(b.months) }}
              />
              {i > 0 && <div className="absolute -top-2 h-2 border-l border-dashed border-muted/60" style={{ left: pct(b.from) }} />}
            </div>
            <span className="sr-only">Running total {years(b.from + b.months)}.</span>
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-t border-ink px-5 pb-4 pt-3 sm:grid-cols-[14rem_1fr_4.5rem]">
        <p>
          <span className="block font-semibold text-ink">Total</span>
          <span className="block text-[11px] text-muted">of which accounting &amp; finance: {years(finance)}</span>
        </p>
        <p className="text-right sm:order-last">
          <span className="figure double-rule whitespace-nowrap pb-0.5 font-serif text-lg font-semibold text-ink">{years(total)}</span>
        </p>
        <div className="col-span-2 h-4 bg-ink sm:col-span-1 sm:h-5" aria-hidden />
      </div>
    </figure>
  );
}
