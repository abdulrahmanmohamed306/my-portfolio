import Link from "next/link";

export function PageIntro({
  title,
  intro,
  back,
  children,
}: {
  title: string;
  intro?: string;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="ruled border-b border-rule">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
        {back && (
          <Link href={back.href} className="text-sm text-muted hover:text-ledger">
            ← {back.label}
          </Link>
        )}
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="prose-measure mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
