import type { Site } from "@/content/site";
import SectionHeader from "./ui/SectionHeader";

export default function Experience({ site }: { site: Site }) {
  return (
    <section id="experiencia" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeader {...site.sections.experience} />

      <ul className="mt-20 border-t border-line">
        {site.experience.map((e) => (
          <li
            key={`${e.role}-${e.company}-${e.period}`}
            className="group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
            data-reveal
          >
            <div className="flex flex-col gap-1 text-xs uppercase tracking-[0.18em] text-muted md:col-span-3">
              <span className="text-fg/80">{e.period}</span>
              <span>{e.location}</span>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-xl font-medium transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:text-2xl">
                {e.role}
              </h3>
              <p className="mt-1 text-muted transition-colors duration-500 group-hover:text-accent">
                {e.company}
              </p>
            </div>

            <div className="md:col-span-5">
              <p className="max-w-lg text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-fg md:text-base">
                {e.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((t) => (
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
