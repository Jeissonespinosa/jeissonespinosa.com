import type { Site } from "@/content/site";

export default function Testimonials({ site }: { site: Site }) {
  const { label, title } = site.sections.testimonials;
  const list = [...site.testimonials, ...site.testimonials];
  return (
    <section id="testimonios" className="overflow-hidden py-28 md:py-40">
      <div className="px-6 md:px-10">
        <span className="section-label" data-reveal>
          {label}
        </span>
        <h2 className="display mt-6 text-[clamp(2.8rem,7.5vw,7.5rem)]" data-reveal>
          {title[0]} <span className="text-muted">{title[1]}</span>
        </h2>
      </div>

      <div className="marquee mt-16" style={{ "--marquee-duration": "60s" } as React.CSSProperties}>
        <div className="marquee-track gap-6 px-6 md:px-10">
          {list.map((t, i) => (
            <figure
              key={i}
              aria-hidden={i >= site.testimonials.length}
              className="flex w-[min(85vw,26rem)] shrink-0 flex-col justify-between rounded-2xl border border-line bg-bg-2 p-8 transition-colors duration-500 hover:border-fg/30"
            >
              <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="block font-medium">{t.author}</span>
                <span className="text-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
