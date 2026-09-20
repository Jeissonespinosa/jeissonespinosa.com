import type { ReactNode } from "react";

/**
 * Cinta infinita. Duplica el contenido para lograr el loop sin cortes.
 */
export default function Marquee({
  items,
  duration = 40,
  className = "",
  separator = "/",
  render,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  separator?: ReactNode;
  render?: (item: string) => ReactNode;
}) {
  const list = [...items, ...items];
  return (
    <div
      className={`marquee overflow-hidden ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        {list.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= items.length}>
            {render ? render(item) : item}
            <span className="mx-8 text-accent">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
