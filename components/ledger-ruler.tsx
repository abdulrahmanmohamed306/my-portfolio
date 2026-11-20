"use client";

import { useEffect, useRef, useState } from "react";

const LINE = 32; // matches the 2rem ruled lines in .ruled

/**
 * A reading ruler for the ruled hero: a pale green band that snaps to the
 * ledger line under the mouse, the way an accountant slides a ruler down a page.
 * Mouse only; hidden on touch screens and when reduced motion is requested.
 */
export function LedgerRuler() {
  const ref = useRef<HTMLDivElement>(null);
  const [row, setRow] = useState<number | null>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const move = (e: PointerEvent) => {
      const y = e.clientY - host.getBoundingClientRect().top;
      setRow(Math.floor(y / LINE));
    };
    const leave = () => setRow(null);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-x-0 border-b border-ledger/25 bg-ledger/[0.06] transition-[transform,opacity] duration-200 ease-out"
        style={{
          height: LINE,
          transform: `translateY(${(row ?? 0) * LINE}px)`,
          opacity: row === null ? 0 : 1,
        }}
      />
    </div>
  );
}
