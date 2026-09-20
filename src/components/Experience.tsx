import type { Site } from "@/content/site";
import SectionHeader from "./ui/SectionHeader";

export default function Experience({ site }: { site: Site }) {
  return (
    <section id="experiencia" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeader {...site.sections.experience} />

      <ul className="mt-20 border-t border-line">
        {site.experience.map((e) => (
          <li
            key={`${e.role}-${e.company}`}
            className="group grid items-center gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-8"
            data-reveal
          >
            <span className="text-xs uppercase tracking-[0.18em] text-muted md:col-span-3">
              {e.period}
            </span>
            <h3 className="text-xl font-medium transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-6 md:text-2xl">
              {e.role}
            </h3>
            <span className="text-muted transition-colors duration-500 group-hover:text-accent md:col-span-3 md:text-right">
              {e.company}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
