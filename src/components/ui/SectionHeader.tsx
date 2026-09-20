/**
 * Encabezado de sección: etiqueta pequeña + título grande en dos líneas.
 */
export default function SectionHeader({
  label,
  title,
  aside,
}: {
  label: string;
  title: readonly [string, string];
  aside?: string;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <span className="section-label" data-reveal>
          {label}
        </span>
        <h2 className="display mt-6 text-[clamp(2.8rem,7.5vw,7.5rem)]">
          {title.map((line, i) => (
            <span key={line} className="block" data-reveal>
              {i === 1 ? <span className="text-muted">{line}</span> : line}
            </span>
          ))}
        </h2>
      </div>
      {aside && (
        <p className="text-base leading-relaxed text-muted md:col-span-4" data-reveal>
          {aside}
        </p>
      )}
    </div>
  );
}
