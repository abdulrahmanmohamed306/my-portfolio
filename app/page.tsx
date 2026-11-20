import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { profile, ledger, projects, experience, skillGroups } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { ProjectDashboard } from "@/components/project-dashboard";

function LedgerStatement() {
  return (
    <figure className="border border-rule-strong bg-sheet shadow-[0_1px_0_var(--color-rule)]">
      <figcaption className="flex items-baseline justify-between border-b border-rule-strong px-5 py-3">
        <span className="font-serif text-lg text-ink">Statement of experience</span>
        <span className="text-xs text-muted">2017 – 2026</span>
      </figcaption>
      <table className="w-full text-sm">
        <tbody>
          {ledger.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-bar" : ""}>
              <th scope="row" className="px-5 py-3 text-left font-normal text-ink-soft">
                {row.label}
              </th>
              <td className="figure px-5 py-3 text-right font-serif text-xl font-semibold text-ink">{row.value}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="px-5 pb-4 pt-4 text-left font-semibold text-ink">
              Open to
            </th>
            <td className="px-5 pb-4 pt-4 text-right">
              <span className="double-rule whitespace-nowrap pb-0.5 font-semibold text-ledger">Finance &amp; BI roles</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </figure>
  );
}

const textLink =
  "text-sm font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:text-ledger hover:decoration-ledger";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="ruled border-b border-rule">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={profile.photo}
                alt={profile.fullName}
                width={72}
                height={72}
                className="h-16 w-16 rounded-full border border-rule-strong object-cover sm:h-[72px] sm:w-[72px]"
              />
              <p className="text-sm leading-snug text-muted">
                {profile.role}
                <br />
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden /> {profile.location}
                </span>
              </p>
            </div>

            <h1 className="mt-8 font-serif text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
              I make the numbers add up, then make them explain themselves.
            </h1>

            <p className="prose-measure mt-6 text-lg leading-relaxed text-ink-soft">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ledger"
              >
                See my projects
              </Link>
              <Link
                href="#contact"
                className="rounded-sm border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ledger hover:text-ledger"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <LedgerStatement />
        </div>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading
          id="projects"
          title="Selected projects"
          intro="Analyses I built end to end, from raw data to the charts and findings a manager would read."
        />

        <div className="divide-y divide-rule border-y border-rule">
          {projects.map((p) => (
            <article key={p.slug} className="grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-12">
              <ProjectDashboard data={p.dashboard} compact />

              <div className="flex flex-col">
                <p className="text-sm text-ledger">{p.kind}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  <Link href={`/projects/${p.slug}`} className="hover:text-ledger">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.summary}</p>

                <ul className="mt-6 space-y-3 border-t border-rule pt-5">
                  {p.findings.slice(0, 3).map((f) => (
                    <li key={f} className="border-l-2 border-ledger pl-3 text-sm leading-relaxed text-ink-soft">
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm font-semibold">
                  <Link href={`/projects/${p.slug}`} className={textLink}>
                    Read the case study
                  </Link>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ledger">
                      Code on GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="border-y border-rule bg-sheet">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading
            id="skills"
            title="Two sides of the same ledger"
            intro="The accounting work I do every day, and the data tools I use to analyse it."
          />
          <div className="grid gap-12 md:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="border-b-2 border-ink pb-2 font-serif text-xl font-semibold text-ink">{g.title}</h3>
                <ul className="divide-y divide-rule">
                  {g.items.map((s) => (
                    <li key={s.name} className="py-3">
                      <p className="font-medium text-ink">{s.name}</p>
                      <p className="text-sm text-muted">{s.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/skills" className={`mt-10 inline-block ${textLink}`}>
            Skills, certifications and training in full
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading id="experience" title="Experience" />
        <ol className="border-t border-ink">
          {experience.map((job) => (
            <li key={job.role + job.period} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <p className="figure text-sm text-muted sm:pt-1">{job.period}</p>
              <div>
                <p className="font-serif text-lg font-semibold text-ink">{job.role}</p>
                <p className="text-sm text-ink-soft">{job.company}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href="/about" className={`mt-8 inline-block ${textLink}`}>
          Full background and education
        </Link>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 id="contact" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&rsquo;s talk
            </h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-paper/75">
              I&rsquo;m open to senior accounting, financial analysis and BI roles, and to freelance analysis projects.
            </p>
            <ul className="mt-8 space-y-4 text-base">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 break-all hover:underline">
                  <Mail className="h-5 w-5 shrink-0 text-paper/60" aria-hidden /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="figure inline-flex items-center gap-3 hover:underline">
                  <Phone className="h-5 w-5 shrink-0 text-paper/60" aria-hidden /> {profile.phone}
                </a>
              </li>
              <li>
                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:underline">
                  <MessageCircle className="h-5 w-5 shrink-0 text-paper/60" aria-hidden /> Message on WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-8 flex gap-6 text-sm">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-bar">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-bar">
                GitHub
              </a>
              <a href={profile.cv} download className="underline underline-offset-4 hover:text-bar">
                Download CV
              </a>
            </p>
          </div>
          <div className="bg-paper p-6 text-ink sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
