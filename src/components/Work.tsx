"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeader from "./ui/SectionHeader";

export default function Work({ site }: { site: Site }) {
  const root = useRef<HTMLElement>(null);

  // Parallax interno de cada imagen
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".work-media").forEach((media) => {
        gsap.fromTo(
          media,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: media.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="proyectos" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeader {...site.sections.work} />

      <ul className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
        {site.projects.map((p, i) => (
          <li key={p.title} className={i % 2 === 1 ? "md:mt-32" : ""} data-reveal>
            <a
              href={p.href}
              className="group block"
              data-cursor={site.ui.view}
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-2">
                <div className="work-media absolute -inset-y-[10%] inset-x-0 transition-transform duration-1000 ease-out-expo group-hover:scale-[1.04]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                    priority={i < 2}
                  />
                </div>
                <span className="absolute left-5 top-5 rounded-full border border-fg/20 bg-bg/60 px-3 py-1 text-xs tracking-[0.08em] text-fg backdrop-blur-sm">
                  {p.domain}
                </span>
              </div>

              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="display text-[clamp(1.6rem,2.6vw,2.4rem)] transition-colors duration-500 group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                    {p.category}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mt-2 shrink-0 text-xl transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{p.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
