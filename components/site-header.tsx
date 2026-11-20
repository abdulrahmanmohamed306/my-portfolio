"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { nav, profile } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-ink" onClick={() => setOpen(false)}>
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink-soft transition-colors hover:text-ledger">
              {item.label}
            </Link>
          ))}
          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-2 rounded-sm border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download CV
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-rule bg-paper px-5 pb-6 pt-2 md:hidden">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link href={item.href} className="block py-3 text-base text-ink" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={profile.cv}
            download
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-4 py-3 text-sm font-medium text-paper"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
