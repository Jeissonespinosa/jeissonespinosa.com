import type { Site } from "@/content/site";
import Marquee from "./Marquee";
import ScrollWords from "./ui/ScrollWords";
import SectionHeader from "./ui/SectionHeader";
import ContactActions from "./ContactActions";

export default function About({ site }: { site: Site }) {
  return (
    <section id="sobre-mi" className="py-28 md:py-40">
      <div className="px-6 md:px-10">
        <SectionHeader label={site.about.label} title={site.about.title} />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:mt-24">
          <div className="md:col-span-8 md:col-start-5">
            <ScrollWords
              text={site.about.statement}
              className="text-[clamp(1.4rem,2.8vw,2.6rem)] font-medium leading-[1.25] tracking-tight"
            />
            <p className="mt-8 text-lg text-accent" data-reveal>
              {site.about.closing}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4" data-reveal>
              <ContactActions site={site} showEmail={false} />
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
