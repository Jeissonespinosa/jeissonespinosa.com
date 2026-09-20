"use client";

import type { Site } from "@/content/site";
import { scrollToTarget } from "@/lib/lenis";
import ContactActions from "./ContactActions";
import Clock from "./ui/Clock";

export default function Contact({ site }: { site: Site }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="relative overflow-hidden px-6 pt-28 md:px-10 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[50vh] w-[120vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_bottom,rgba(212,255,63,0.12)_0%,rgba(212,255,63,0)_60%)]"
      />

      <span className="section-label" data-reveal>
        {site.contact.label}
      </span>
      <h2 className="display mt-6 text-[clamp(3.2rem,11vw,11rem)]">
        {site.contact.title.map((line, i) => (
          <span key={line} className="block" data-reveal>
            {i === 1 ? <span className="text-muted">{line}</span> : line}
          </span>
        ))}
      </h2>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
        <p className="max-w-md text-lg leading-relaxed text-muted md:col-span-5" data-reveal>
          {site.contact.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4 md:col-span-7 md:justify-end" data-reveal>
          <ContactActions site={site} large />
        </div>
      </div>

      <div className="mt-28 flex flex-wrap items-end justify-between gap-8 border-t border-line py-8 text-xs uppercase tracking-[0.18em] text-muted">
        <div className="flex flex-col gap-1">
          <span className="text-fg">{site.name}</span>
          <span>
            © {year} · {site.country}
          </span>
          <Clock />
        </div>
        <ul className="flex flex-wrap gap-5">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="link-underline text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group inline-flex items-center gap-3"
        >
          <span className="link-underline">{site.ui.backToTop}</span>
          <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
