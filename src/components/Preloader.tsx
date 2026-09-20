"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markLoaded } from "@/lib/loaded";
import type { Site } from "@/content/site";

export default function Preloader({ site }: { site: Site }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(root.current, { display: "none" });
      markLoaded();
      return;
    }

    window.scrollTo(0, 0);

    const state = { n: 0 };
    const names = root.current?.querySelectorAll<HTMLElement>(".preloader-name > span") ?? [];

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        markLoaded();
      },
    });

    tl.to(state, {
      n: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter.current) counter.current.textContent = String(Math.round(state.n));
      },
    })
      .to(names, { y: 0, duration: 1, ease: "power4.out", stagger: 0.08 }, 0.2)
      .to(names, { y: "-110%", duration: 0.8, ease: "power4.in", stagger: 0.05 }, "+=0.2")
      .to(counter.current, { opacity: 0, duration: 0.4 }, "<")
      .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-bg px-6 py-6 md:px-10"
      aria-hidden
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>{site.role}</span>
        <span>{site.country}</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <h2 className="display text-[clamp(2.5rem,9vw,8rem)]">
          <span className="preloader-name line-mask">
            <span>{site.firstName}</span>
          </span>
          <span className="preloader-name line-mask">
            <span>{site.lastName}</span>
          </span>
        </h2>
        <span
          ref={counter}
          className="display text-[clamp(2rem,6vw,5rem)] tabular-nums text-muted"
        >
          0
        </span>
      </div>
    </div>
  );
}
