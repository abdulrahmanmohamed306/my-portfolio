"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Visual } from "@/lib/site";

export function ChartGallery({ visuals }: { visuals: Visual[] }) {
  const [active, setActive] = useState<Visual | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {visuals.map((v) => (
          <li key={v.file} className="min-w-0">
            <button
              type="button"
              onClick={() => setActive(v)}
              className="group block w-full text-left"
              aria-label={`Open full-size chart: ${v.title}`}
            >
              <div className="aspect-[16/10] overflow-hidden border border-rule bg-sheet p-3 transition-colors group-hover:border-ledger">
                <img src={`/${v.file}`} alt={v.title} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <p className="mt-3 font-medium text-ink group-hover:text-ledger">{v.title}</p>
              <p className="mt-1 text-sm text-muted">{v.desc}</p>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-5xl bg-sheet p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-xl text-ink">{active.title}</p>
                <p className="text-sm text-muted">{active.desc}</p>
              </div>
              <button type="button" onClick={() => setActive(null)} className="p-1 text-ink hover:text-ledger" aria-label="Close" autoFocus>
                <X className="h-6 w-6" />
              </button>
            </div>
            <img src={`/${active.file}`} alt={active.title} className="max-h-[75vh] w-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
