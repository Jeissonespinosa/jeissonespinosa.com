"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onLoaded } from "@/lib/loaded";

/**
 * Anima cualquier elemento con `data-reveal` cuando entra en el viewport.
 * El estado inicial (opacidad 0, y+40) está en globals.css.
 */
export default function ScrollReveal() {
  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const off = onLoaded(() => {
      triggers = ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "will-change",
          }),
      });
      ScrollTrigger.refresh();
    });
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
