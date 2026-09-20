import type { Site } from "@/content/site";
import SectionHeader from "./ui/SectionHeader";

export default function Services({ site }: { site: Site }) {
  return (
    <section id="servicios" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeader {...site.sections.services} />

      <ul className="mt-20 border-t border-line">
        {site.services.map((s) => (
          <li key={s.number} className="group border-b border-line" data-reveal>
            <div className="grid gap-6 py-10 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-14">
              <div className="flex items-start gap-4 md:col-span-4">
                <span className="mt-1 font-mono text-xs text-muted">{s.number}</span>
                <div>
                  <span className="mb-3 block text-xs uppercase tracking-[0.18em] text-accent">
                    {s.kicker}
                  </span>
                  <h3 className="display text-[clamp(1.8rem,3.6vw,3.2rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                    {s.title}
                  </h3>
                </div>
              </div>
              <p className="max-w-md text-base leading-relaxed text-muted transition-colors duration-500 group-hover:text-fg md:col-span-5 md:col-start-5">
                {s.description}
              </p>
              <ul className="flex flex-wrap content-start items-start gap-2 md:col-span-3 md:col-start-10 md:justify-end">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors duration-500 group-hover:border-fg/40 group-hover:text-fg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
