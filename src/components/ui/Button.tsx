"use client";

import type { ComponentProps, ReactNode } from "react";
import Magnetic from "./Magnetic";

type Variant = "solid" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  solid:
    "bg-fg text-bg hover:bg-accent hover:text-bg border border-fg hover:border-accent",
  outline: "border border-fg/30 text-fg hover:border-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg hover:text-accent",
};

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500 ease-out-expo";

export function ButtonLink({
  variant = "solid",
  children,
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant; children: ReactNode }) {
  return (
    <Magnetic>
      <a className={`${base} ${styles[variant]} ${className}`} {...props}>
        <Label>{children}</Label>
      </a>
    </Magnetic>
  );
}

export function Button({
  variant = "solid",
  children,
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; children: ReactNode }) {
  return (
    <Magnetic>
      <button type="button" className={`${base} ${styles[variant]} ${className}`} {...props}>
        <Label>{children}</Label>
      </button>
    </Magnetic>
  );
}

/** Texto con efecto de "deslizamiento" vertical al hacer hover. */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
