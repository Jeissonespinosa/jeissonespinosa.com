"use client";

import { useEffect, useState } from "react";
import { common } from "@/content/site";

/** Hora local de Colombia, actualizada cada segundo. */
export default function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: common.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time} {common.timezoneLabel}
    </span>
  );
}
