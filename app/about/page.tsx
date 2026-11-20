import type { Metadata } from "next";
import { profile, experience, education, certifications, languages } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience and education of Abdulrahman Mohamed, Senior General Accountant and financial data analyst.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title={profile.fullName} back={{ href: "/", label: "Home" }}>
        <div className="mt-8 grid gap-8 md:grid-cols-[180px_1fr] md:items-start">
          <img
            src={profile.photo}
            alt={profile.fullName}
            width={180}
            height={180}
            className="h-40 w-40 border border-rule-strong object-cover md:h-[180px] md:w-[180px]"
          />
          <div>
            <p className="font-medium text-ledger">{profile.role}</p>
            <p className="prose-measure mt-3 text-lg leading-relaxed text-ink-soft">
              I started in retail operations, moved into accounting in 2019 and have worked across the general ledger, banking and
              treasury, and e-invoicing since. Along the way I trained as a data analyst through Egypt&rsquo;s Digital Egypt Pioneers
              Initiative, so I can take a company&rsquo;s financial records further than the trial balance: clean them, analyse them
              and present what they mean.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={profile.cv}
                download
                className="rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ledger"
              >
                Download CV (PDF)
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-sm border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ledger hover:text-ledger"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      </PageIntro>

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-16 sm:px-8">
        <section aria-labelledby="experience">
          <h2 id="experience" className="font-serif text-3xl font-semibold text-ink">
            Experience
          </h2>
          <ol className="mt-8 border-t border-ink">
            {experience.map((job) => (
              <li key={job.role + job.period} className="grid gap-2 border-b border-rule py-7 md:grid-cols-[13rem_1fr] md:gap-10">
                <p className="figure text-sm text-muted md:pt-1">{job.period}</p>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{job.role}</h3>
                  <p className="text-ink-soft">{job.company}</p>
                  <ul className="prose-measure mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-rule-strong">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="certs" className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 id="certs" className="font-serif text-3xl font-semibold text-ink">
              Certifications and training
            </h2>
            <ul className="mt-8 divide-y divide-rule border-y border-rule">
              {certifications.map((c) => (
                <li key={c.name} className="py-5">
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="text-sm text-ledger">{c.issuer}</p>
                  <p className="mt-1 text-ink-soft">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Education</h2>
              <div className="mt-4 border-t-2 border-ink pt-4">
                <p className="font-semibold text-ink">{education.degree}</p>
                <p className="text-ink-soft">{education.school}</p>
                <p className="figure mt-1 text-sm text-muted">Graduated {education.year}</p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink">Languages</h2>
              <p className="mt-4 border-t-2 border-ink pt-4 text-ink-soft">{languages}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
