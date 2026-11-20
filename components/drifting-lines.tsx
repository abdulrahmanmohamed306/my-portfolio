"use client";

import { useEffect, useRef } from "react";

type Series = { base: number; amp: number; f1: number; f2: number; speed: number; phase: number; color: string; width: number };

const SERIES: Series[] = [
  { base: 0.22, amp: 0.06, f1: 1.6, f2: 3.7, speed: 0.05, phase: 0.0, color: "29,106,82", width: 1.5 },
  { base: 0.4, amp: 0.08, f1: 1.1, f2: 2.9, speed: 0.035, phase: 1.7, color: "19,36,58", width: 1.2 },
  { base: 0.58, amp: 0.07, f1: 2.1, f2: 4.3, speed: 0.045, phase: 3.1, color: "29,106,82", width: 1.2 },
  { base: 0.76, amp: 0.06, f1: 1.4, f2: 3.3, speed: 0.03, phase: 4.6, color: "19,36,58", width: 1 },
  { base: 0.9, amp: 0.05, f1: 2.6, f2: 5.1, speed: 0.04, phase: 2.4, color: "29,106,82", width: 1 },
];
const STEP = 28; // px between chart points
const RADIUS = 220; // how far the mouse reaches
const PULL = 0.28; // how strongly lines lean toward the mouse

/**
 * Faint chart lines drifting very slowly behind a section, leaning gently toward the mouse.
 * Pauses off-screen; draws a still frame when reduced motion is requested.
 */
export function DriftingLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let w = 0;
    let h = 0;
    let offsets: number[][] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.ceil(w / STEP) + 2;
      offsets = SERIES.map(() => new Array(n).fill(0));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      SERIES.forEach((s, si) => {
        const off = offsets[si];
        ctx.beginPath();
        for (let i = 0; i < off.length; i++) {
          const x = i * STEP - STEP;
          const u = x / Math.max(w, 1);
          const time = t * s.speed;
          const y =
            h * (s.base + s.amp * Math.sin(u * Math.PI * s.f1 + time + s.phase) + s.amp * 0.5 * Math.sin(u * Math.PI * s.f2 - time * 1.3 + s.phase));

          // Lean toward the mouse, easing in and out
          let target = 0;
          if (mouse.active) {
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            if (d < RADIUS) {
              const k = 1 - d / RADIUS;
              target = (mouse.y - y) * PULL * k * k;
            }
          }
          off[i] += (target - off[i]) * 0.06;

          const yy = y + off[i];
          if (i === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.strokeStyle = `rgba(${s.color},0.13)`;
        ctx.lineWidth = s.width;
        ctx.lineJoin = "round";
        ctx.stroke();
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    if (calm) {
      draw(0);
      return () => ro.disconnect();
    }

    let frame = 0;
    let visible = false;
    let last = performance.now();
    let clock = 0;
    const loop = (now: number) => {
      clock += Math.min(now - last, 50) / 1000;
      last = now;
      draw(clock);
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    });
    io.observe(host);

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const leave = () => {
      mouse.active = false;
    };
    if (fine) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-0" />;
}
