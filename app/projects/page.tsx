import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";
import { ProjectDashboard } from "@/components/project-dashboard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Data analysis case studies by Abdulrahman Mohamed: retention, revenue and clinical data.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        title="Projects"
        intro="Each case study shows the question, how I worked through the data, the charts and what I found."
        back={{ href: "/", label: "Home" }}
      />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} className="flex flex-col">
              <ProjectDashboard data={p.dashboard} compact />
              <p className="mt-5 text-sm text-ledger">{p.kind}</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">
                <Link href={`/projects/${p.slug}`} className="hover:text-ledger">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{p.summary}</p>
              <div className="mt-4 flex gap-6 text-sm font-semibold">
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-ledger hover:decoration-ledger"
                >
                  Read the case study
                </Link>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ledger">
                    Code on GitHub
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
