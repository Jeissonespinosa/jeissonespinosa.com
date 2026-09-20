"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { onLoaded } from "@/lib/loaded";
import Magnetic from "./ui/Magnetic";
import Clock from "./ui/Clock";

export default function Nav({ site }: { site: Site }) {
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const otherLocale = site.locale === "es" ? "en" : "es";

  // Entrada tras el preloader
  useEffect(() => {
    return onLoaded(() => {
      gsap.to(bar.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 });
    });
  }, []);

  // Ocultar al bajar, mostrar al subir
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      if (open) return;
      const y = window.scrollY;
      const hide = y > last && y > 120;
      gsap.to(bar.current, { y: hide ? -100 : 0, duration: 0.6, ease: "power3.out" });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Menú móvil
  useGSAP(
    () => {
      const el = overlay.current;
      if (!el) return;
      const links = el.querySelectorAll(".menu-link > span");
      if (open) {
        getLenis()?.stop();
        gsap.set(el, { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
          .to(links, { y: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 }, "-=0.4");
      } else {
        getLenis()?.start();
        gsap
          .timeline({ onComplete: () => gsap.set(el, { pointerEvents: "none" }) })
          .to(links, { y: "110%", duration: 0.5, ease: "power3.in", stagger: 0.03 })
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "power4.inOut" }, "-=0.2");
      }
    },
    { dependencies: [open] }
  );

  const go = (href: string) => {
    setOpen(false);
    // Espera a que el overlay se cierre para desplazar
    setTimeout(() => scrollToTarget(href), open ? 500 : 0);
  };

  const langSwitch = (
    <Link
      href={`/${otherLocale}`}
      hrefLang={otherLocale}
      className="link-underline text-xs font-semibold uppercase tracking-[0.18em]"
      aria-label={otherLocale === "en" ? "Switch to English" : "Cambiar a español"}
    >
      {site.ui.switchLang}
    </Link>
  );

  return (
    <>
      <header
        ref={bar}
        className="gsap-fade fixed inset-x-0 top-0 z-[100] mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-10">
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="font-display text-lg font-semibold uppercase tracking-tight"
              aria-label={site.ui.goHome}
            >
              {site.firstName[0]}
              {site.lastName[0]}
              <span className="text-accent">.</span>
            </button>
          </Magnetic>

          <ul className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  className="link-underline text-sm font-medium tracking-wide"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 md:flex">
            <Clock className="text-xs uppercase tracking-[0.18em] text-fg/70" />
            {langSwitch}
          </div>

          <div className="flex items-center gap-5 md:hidden">
            {langSwitch}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative flex size-10 items-center justify-center"
              aria-label={open ? site.ui.closeMenu : site.ui.openMenu}
              aria-expanded={open}
            >
              <span
                className={`absolute h-px w-6 bg-fg transition-transform duration-500 ease-out-expo ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-fg transition-transform duration-500 ease-out-expo ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay móvil */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg-2 px-6 pb-8 pt-28"
        style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-2">
          {site.nav.map((item, i) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => go(item.href)}
                className="menu-link line-mask display text-left text-[clamp(2.5rem,12vw,5rem)]"
              >
                <span>
                  <span className="mr-4 align-top font-sans text-xs text-muted">0{i + 1}</span>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-4 text-xs uppercase tracking-[0.18em] text-muted">
          <div className="flex flex-col gap-1">
            <span>{site.country}</span>
            <Clock />
          </div>
          <ul className="flex gap-4">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
