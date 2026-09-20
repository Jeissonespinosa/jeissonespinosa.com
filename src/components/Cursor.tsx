"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Cursor personalizado: punto + anillo que sigue con retraso.
 * Solo se activa en dispositivos con puntero fino (mouse).
 * Elementos con `data-cursor="texto"` muestran ese texto dentro del anillo.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || !dot.current || !ring.current) return;

    document.documentElement.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const move = (e: MouseEvent) => {
      if (!shown) {
        // Coloca el cursor en su sitio antes de mostrarlo por primera vez
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      const text = target?.dataset.cursor ?? "";
      if (label.current) label.current.textContent = text;

      if (target) {
        gsap.to(ring.current, {
          scale: text ? 3.4 : 2,
          backgroundColor: text ? "rgba(212,255,63,1)" : "rgba(242,240,235,0.14)",
          borderColor: text ? "rgba(212,255,63,1)" : "rgba(242,240,235,0.4)",
          duration: 0.45,
          ease: "power3.out",
        });
        gsap.to(dot.current, { scale: text ? 0 : 0.5, duration: 0.3 });
      } else {
        gsap.to(ring.current, {
          scale: 1,
          backgroundColor: "rgba(242,240,235,0)",
          borderColor: "rgba(242,240,235,0.4)",
          duration: 0.45,
          ease: "power3.out",
        });
        gsap.to(dot.current, { scale: 1, duration: 0.3 });
      }
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => {
      if (shown) gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg opacity-0 [.has-cursor_&]:block"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/40 opacity-0 [.has-cursor_&]:flex"
      >
        <span
          ref={label}
          className="text-[3.2px] font-semibold uppercase tracking-[0.15em] text-bg"
        />
      </div>
    </>
  );
}
