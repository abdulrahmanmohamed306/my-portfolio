import type { Metadata } from "next";
import Link from "next/link";
import { skillGroups, certifications, projects } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Skills",
  description: "Accounting, finance and data analysis skills of Abdulrahman Mohamed.",
};

const methods = [
  "Exploratory data analysis",
  "Data cleaning and preprocessing pipelines",
  "Statistical correlation analysis",
  "Feature engineering",
  "Financial data modelling",
  "Automated KPI summaries",
];

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        title="Skills"
        intro="Seven years of hands-on accounting, backed by formal training in data analysis. Every tool listed here is one I have used on real ledgers or in the projects on this site."
        back={{ href: "/", label: "Home" }}
      />

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-16 sm:px-8">
        <div className="grid gap-14 md:grid-cols-2">
          {skillGroups.map((g) => (
            <section key={g.title} aria-labelledby={g.title}>
              <h2 id={g.title} className="border-b-2 border-ink pb-3 font-serif text-2xl font-semibold text-ink">
                {g.title}
              </h2>
              <dl className="divide-y divide-rule">
                {g.items.map((s) => (
                  <div key={s.name} className="py-4">
                    <dt className="font-semibold text-ink">{s.name}</dt>
                    <dd className="mt-0.5 text-ink-soft">{s.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <section aria-labelledby="methods" className="border border-rule-strong bg-sheet p-6 sm:p-10">
          <h2 id="methods" className="font-serif text-2xl font-semibold text-ink">
            Analysis methods
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {methods.map((m) => (
              <li key={m} className="border-l-2 border-ledger pl-3 text-ink-soft">
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="where" className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="where" className="font-serif text-2xl font-semibold text-ink">
              See them in use
            </h2>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {projects.map((p) => (
                <li key={p.slug} className="py-4">
                  <Link href={`/projects/${p.slug}`} className="font-semibold text-ink hover:text-ledger">
                    {p.title}
                  </Link>
                  <p className="text-sm text-muted">{p.tools.join(", ")}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Where I learned them</h2>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {certifications.map((c) => (
                <li key={c.name} className="py-4">
                  <p className="font-semibold text-ink">
                    {c.name}
                    {c.status && <span className="ml-2 text-xs font-medium text-ledger">({c.status})</span>}
                  </p>
                  <p className="text-sm text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
