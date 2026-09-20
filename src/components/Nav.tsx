"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { onLoaded } from "@/lib/loaded";
import Magnetic from "./ui/Magnetic";
import Clock from "./ui/Clock";

/**
 * Navegación en dos piezas:
 * - Fila superior mínima: logo, reloj y cambio de idioma.
 * - Píldora flotante inferior (como la referencia): inicio, enlaces y botón de contacto.
 */
export default function Nav({ site }: { site: Site }) {
  const top = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const otherLocale = site.locale === "es" ? "en" : "es";

  const links = site.nav.filter((item) => item.href !== "#contacto");
  const contact = site.nav.find((item) => item.href === "#contacto");

  // Entrada tras el preloader
  useEffect(() => {
    return onLoaded(() => {
      gsap.to(top.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.to(pill.current, { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.4 });
    });
  }, []);

  // La píldora se esconde al bajar y vuelve al subir
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      if (open) return;
      const y = window.scrollY;
      const hide = y > last && y > 120;
      gsap.to(pill.current, { y: hide ? 140 : 0, duration: 0.6, ease: "power3.out" });
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
      const items = el.querySelectorAll(".menu-link > span");
      if (open) {
        getLenis()?.stop();
        gsap.set(el, { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
          .to(items, { y: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 }, "-=0.4");
      } else {
        getLenis()?.start();
        gsap
          .timeline({ onComplete: () => gsap.set(el, { pointerEvents: "none" }) })
          .to(items, { y: "110%", duration: 0.5, ease: "power3.in", stagger: 0.03 })
          .to(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" }, "-=0.2");
      }
    },
    { dependencies: [open] }
  );

  const go = (href: string) => {
    setOpen(false);
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
      {/* Fila superior */}
      <div
        ref={top}
        className="gsap-fade pointer-events-none fixed inset-x-0 top-0 z-[100] mix-blend-difference"
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Magnetic className="pointer-events-auto">
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
          <div className="pointer-events-auto flex items-center gap-6">
            <Clock className="text-xs uppercase tracking-[0.18em] text-fg/70" />
            {langSwitch}
          </div>
        </div>
      </div>

      {/* Píldora inferior */}
      <nav
        ref={pill}
        aria-label="Principal"
        className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 opacity-0 md:bottom-7"
        style={{ transform: "translateY(40px)" }}
      >
        <div className="flex items-center gap-1 rounded-full border border-fg/10 bg-[#161616]/90 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => go("#inicio")}
            className="flex size-10 items-center justify-center rounded-full text-fg/80 transition-colors duration-300 hover:bg-fg/10 hover:text-fg"
            aria-label={site.ui.goHome}
          >
            <HomeIcon />
          </button>

          {/* Enlaces (escritorio) */}
          <ul className="hidden items-center md:flex">
            {links.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-fg/80 transition-colors duration-300 hover:bg-fg/10 hover:text-fg"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Menú (móvil) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium tracking-wide text-fg/80 transition-colors duration-300 hover:bg-fg/10 hover:text-fg md:hidden"
            aria-label={open ? site.ui.closeMenu : site.ui.openMenu}
            aria-expanded={open}
          >
            {open ? site.ui.close : site.ui.menu}
          </button>

          {contact && (
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => go(contact.href)}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform duration-500 ease-out-expo hover:scale-[1.04]"
              >
                {contact.label}
              </button>
            </Magnetic>
          )}
        </div>
      </nav>

      {/* Overlay móvil (se abre desde abajo) */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg-2 px-6 pb-28 pt-24"
        style={{ clipPath: "inset(100% 0% 0% 0%)", pointerEvents: "none" }}
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

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 11.5 12 4l9 7.5M5.5 10v9.5h4.5V14h4v5.5h4.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
