"use client";

import { useEffect, useRef } from "react";
import type { Site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { onLoaded } from "@/lib/loaded";
import { scrollToTarget } from "@/lib/lenis";
import Clock from "./ui/Clock";

export default function Hero({ site }: { site: Site }) {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // Animación de entrada (espera al preloader)
  useEffect(() => {
    return onLoaded(() => {
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(q(".hero-line > span"), { y: 0, duration: 1.4, stagger: 0.12 }, 0)
        .to(q(".hero-fade"), { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.5);
    });
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !glow.current) return;

      // Resplandor que sigue al mouse
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine) {
        const xTo = gsap.quickTo(glow.current, "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(glow.current, "y", { duration: 1.2, ease: "power3" });
        const move = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("mousemove", move, { passive: true });
        return () => window.removeEventListener("mousemove", move);
      }
    },
    { scope: root }
  );

  // Parallax suave del título al hacer scroll
  useGSAP(
    () => {
      gsap.to(".hero-title", {
        yPercent: 18,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="inicio"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-24 pt-28 md:px-10 md:pb-8 md:pt-32"
    >
      {/* Fondo */}
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10 size-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,63,0.10)_0%,rgba(212,255,63,0)_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(242,240,235,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,240,235,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      {/* Arriba */}
      <div className="hero-fade gsap-fade flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>{site.role}</span>
        <span className="hidden items-center gap-2 md:inline-flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {site.availability}
        </span>
      </div>

      {/* Título: nombre / intro / apellido (como en la referencia) */}
      <div className="hero-title my-12 flex flex-col md:my-0">
        <h1 className="display contents text-[clamp(3.6rem,14vw,14rem)]">
          <span className="hero-line line-mask order-1">
            <span>{site.firstName}</span>
          </span>
          <span className="hero-line line-mask order-3 text-right">
            <span>{site.lastName}</span>
          </span>
        </h1>
        <p className="hero-fade gsap-fade order-2 max-w-md py-4 text-base leading-relaxed text-muted md:py-6 md:text-lg">
          {site.intro}
        </p>
      </div>

      {/* Abajo */}
      <div className="hero-fade gsap-fade flex flex-wrap items-end justify-between gap-6 text-xs uppercase tracking-[0.2em] text-muted">
        <div className="flex flex-col gap-1">
          <span>{site.country}</span>
          <Clock className="text-fg" />
        </div>
        <button
          type="button"
          onClick={() => scrollToTarget("#servicios")}
          className="group hidden items-center gap-3 md:inline-flex"
        >
          <span className="link-underline">{site.ui.scroll}</span>
          <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-y-1">
            ↓
          </span>
        </button>
        <ul className="flex gap-5">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
