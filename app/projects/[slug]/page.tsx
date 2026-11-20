import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";
import { ChartGallery } from "@/components/chart-gallery";
import { ProjectDashboard } from "@/components/project-dashboard";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <PageIntro title={p.title} intro={p.description} back={{ href: "/projects", label: "All projects" }}>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ledger"
            >
              View the code on GitHub
            </a>
          )}
          <p className="text-sm text-muted">
            <span className="text-ink-soft">Tools:</span> {p.tools.join(", ")}
          </p>
        </div>
      </PageIntro>

      <div className="mx-auto max-w-6xl space-y-20 px-5 py-16 sm:px-8">
        <section aria-labelledby="dashboard">
          <h2 id="dashboard" className="sr-only">
            Results at a glance
          </h2>
          <ProjectDashboard data={p.dashboard} />
        </section>

        <section aria-labelledby="method">
          <h2 id="method" className="font-serif text-3xl font-semibold text-ink">
            How I worked
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-4">
                <p className="figure font-serif text-sm text-ledger">Step {i + 1}</p>
                <p className="mt-1 font-serif text-xl font-semibold text-ink">{s.title}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {p.findings.length > 0 && (
          <section aria-labelledby="findings" className="border border-rule-strong bg-sheet p-6 sm:p-10">
            <h2 id="findings" className="font-serif text-3xl font-semibold text-ink">
              What I found
            </h2>
            <ul className="mt-6 space-y-4">
              {p.findings.map((f) => (
                <li key={f} className="prose-measure border-l-2 border-ledger pl-4 text-lg leading-relaxed text-ink-soft">
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {p.visuals.length > 0 && (
          <section aria-labelledby="charts">
            <h2 id="charts" className="font-serif text-3xl font-semibold text-ink">
              Charts
            </h2>
            <p className="mb-8 mt-2 text-muted">Select a chart to see it full size.</p>
            <ChartGallery visuals={p.visuals} />
          </section>
        )}

        <nav aria-label="Next project" className="border-t border-rule pt-8">
          <p className="text-sm text-muted">Next project</p>
          <Link href={`/projects/${next.slug}`} className="mt-1 inline-block font-serif text-2xl font-semibold text-ink hover:text-ledger">
            {next.title}
          </Link>
        </nav>
      </div>
    </>
  );
}
