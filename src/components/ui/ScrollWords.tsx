"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Texto que se "enciende" palabra por palabra a medida que se hace scroll.
 */
export default function ScrollWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.to(".word", {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="word inline-block opacity-15 will-change-[opacity]">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
