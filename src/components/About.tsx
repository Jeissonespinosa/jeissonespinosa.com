import type { Site } from "@/content/site";
import Marquee from "./Marquee";
import ScrollWords from "./ui/ScrollWords";
import ContactActions from "./ContactActions";

export default function About({ site }: { site: Site }) {
  return (
    <section id="sobre-mi" className="py-28 md:py-40">
      <div className="px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="section-label" data-reveal>
              {site.about.label}
            </span>
            <h2 className="display mt-6 text-[clamp(2.8rem,7.5vw,7.5rem)]">
              {site.about.title.map((line, i) => (
                <span key={line} className="block" data-reveal>
                  {i === 1 ? <span className="text-muted">{line}</span> : line}
                </span>
              ))}
            </h2>
          </div>

          <div className="md:col-span-8 md:pt-4">
            <ScrollWords
              text={site.about.statement}
              className="text-[clamp(1.4rem,2.8vw,2.6rem)] font-medium leading-[1.25] tracking-tight"
            />
            <p className="mt-8 text-lg text-accent" data-reveal>
              {site.about.closing}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4" data-reveal>
              <ContactActions site={site} />
            </div>

            <div className="mt-14 flex items-center gap-5" data-reveal>
              <span className="display text-5xl">{site.about.rating}</span>
              <div className="text-sm leading-snug text-muted">
                <span className="mb-1 block text-accent" aria-label={site.ui.stars}>
                  ★★★★★
                </span>
                {site.about.trusted}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 border-y border-line py-6" data-reveal>
        <Marquee
          items={site.stats}
          duration={45}
          className="display text-[clamp(1.6rem,4vw,3.5rem)] text-fg/90"
        />
      </div>
    </section>
  );
}
