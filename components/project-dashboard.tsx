import type { Dashboard } from "@/lib/site";

const SERIES_COLORS = ["var(--color-ink)", "var(--color-ledger)"];

function LineChart({ line, compact }: { line: NonNullable<Dashboard["line"]>; compact?: boolean }) {
  const W = 340;
  const H = compact ? 120 : 150;
  const padL = 8;
  const padR = 8;
  const padT = 18;
  const padB = 22;
  const max = Math.max(...line.series.flatMap((s) => s.values)) * 1.08;
  const n = line.labels.length;
  const x = (i: number) => padL + (i * (W - padL - padR)) / (n - 1);
  const y = (v: number) => padT + (1 - v / max) * (H - padT - padB);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-xs font-semibold text-ink">{line.title}</p>
        {line.series.length > 1 && (
          <ul className="flex gap-3 text-[11px] text-muted">
            {line.series.map((s, i) => (
              <li key={s.name} className="flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-3" style={{ background: SERIES_COLORS[i] }} />
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label={line.title}>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={padL} x2={W - padR} y1={y(max * t)} y2={y(max * t)} stroke="var(--color-rule)" strokeWidth="1" />
        ))}
        <line x1={padL} x2={W - padR} y1={y(0)} y2={y(0)} stroke="var(--color-rule-strong)" strokeWidth="1" />
        {line.series.map((s, si) => {
          const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
          const last = s.values.length - 1;
          return (
            <g key={s.name}>
              <polyline points={pts} fill="none" stroke={SERIES_COLORS[si]} strokeWidth="2" strokeLinejoin="round" />
              {s.values.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="2.75" fill="var(--color-sheet)" stroke={SERIES_COLORS[si]} strokeWidth="1.5" />
              ))}
              {[0, last].map((i) => (
                <text
                  key={i}
                  x={x(i)}
                  y={y(s.values[i]) - 7}
                  textAnchor={i === 0 ? "start" : "end"}
                  fontSize="10"
                  fontWeight="600"
                  fill={SERIES_COLORS[si]}
                  className="figure"
                >
                  {line.format(s.values[i])}
                </text>
              ))}
            </g>
          );
        })}
        {line.labels.map((l, i) => (
          <text
            key={l}
            x={x(i)}
            y={H - 6}
            textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
            fontSize="10"
            fill="var(--color-muted)"
          >
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

function Bars({ bars, limit }: { bars: NonNullable<Dashboard["bars"]>; limit?: number }) {
  const items = limit ? bars.items.slice(0, limit) : bars.items;
  const max = Math.max(...bars.items.map((b) => b.share));
  return (
    <div>
      <p className="text-xs font-semibold text-ink">{bars.title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((b) => (
          <li key={b.label}>
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-ink-soft">{b.label}</span>
              <span className="figure font-semibold text-ink">
                {b.value} <span className="font-normal text-muted">{b.share.toFixed(0)}%</span>
              </span>
            </div>
            <div className="mt-1 h-2 bg-bar">
              <div className="h-full bg-ledger" style={{ width: `${(b.share / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Ranked({ ranked }: { ranked: NonNullable<Dashboard["ranked"]> }) {
  return (
    <div>
      <p className="text-xs font-semibold text-ink">{ranked.title}</p>
      <ol className="mt-2 divide-y divide-rule text-xs">
        {ranked.items.map((r, i) => (
          <li key={r.label} className="flex items-baseline gap-3 py-1.5">
            <span className="figure w-3 text-muted">{i + 1}</span>
            <span className="flex-1 text-ink-soft">{r.label}</span>
            <span className="text-muted">{r.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * A small report sheet built from the project's real figures.
 * `compact` is used for project covers; the full version sits at the top of each case study.
 */
export function ProjectDashboard({ data, compact = false }: { data: Dashboard; compact?: boolean }) {
  return (
    <figure className="border border-rule-strong bg-sheet" aria-label={`${data.heading}, ${data.period}`}>
      <figcaption className="flex items-baseline justify-between gap-3 border-b border-rule-strong px-4 py-2.5">
        <span className="font-serif text-base font-semibold text-ink">{data.heading}</span>
        <span className="text-[11px] text-muted">{data.period}</span>
      </figcaption>

      <dl className={`grid grid-cols-2 gap-px border-b border-rule bg-rule ${compact ? "" : "sm:grid-cols-4"}`}>
        {data.kpis.map((k, i) => (
          <div key={k.label} className={`px-4 py-3 ${i === 0 || i === 3 ? "bg-bar" : "bg-sheet"}`}>
            <dt className="text-[11px] leading-tight text-muted">{k.label}</dt>
            <dd className="figure mt-1 font-serif text-xl font-semibold leading-none text-ink sm:text-2xl">{k.value}</dd>
            {k.note && <dd className="mt-1 text-[11px] text-muted">{k.note}</dd>}
          </div>
        ))}
      </dl>

      {compact ? (
        <div className="px-4 py-4">
          {data.line ? <LineChart line={data.line} compact /> : data.bars ? <Bars bars={data.bars} /> : null}
        </div>
      ) : (
        <div className="grid gap-8 px-4 py-5 sm:px-5 md:grid-cols-2">
          {data.line && <LineChart line={data.line} />}
          {data.bars && <Bars bars={data.bars} />}
          {data.ranked && <Ranked ranked={data.ranked} />}
        </div>
      )}
    </figure>
  );
}
