"use client";

import { useState } from "react";
import type { Site } from "@/content/site";
import { Button, ButtonLink } from "./ui/Button";

/** CTAs de contacto: copiar email (opcional) y LinkedIn. */
export default function ContactActions({
  site,
  large = false,
  showEmail = true,
}: {
  site: Site;
  large?: boolean;
  showEmail?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const linkedin = site.socials.find((s) => s.label === "LinkedIn");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const size = large ? "px-8 py-5 text-base" : "";

  return (
    <>
      {showEmail && (
        <Button onClick={copy} className={size} aria-live="polite">
          {copied ? site.contact.copied : site.contact.copyEmail}
        </Button>
      )}
      {linkedin && (
        <ButtonLink
          href={linkedin.href}
          target="_blank"
          rel="noreferrer"
          variant={showEmail ? "outline" : "solid"}
          className={size}
        >
          {site.contact.linkedin}
          <span aria-hidden>↗</span>
        </ButtonLink>
      )}
    </>
  );
}
