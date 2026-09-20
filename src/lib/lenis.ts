import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(target: string | HTMLElement | number, offset = 0) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el instanceof HTMLElement) el.scrollIntoView({ behavior: "smooth" });
}
