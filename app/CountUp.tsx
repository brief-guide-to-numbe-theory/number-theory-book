"use client";

import { useEffect, useRef, useState } from "react";

// Counts from 0 to `end` once the element scrolls into view.
export default function CountUp({
  end,
  duration = 1400,
}: {
  end: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      raf = requestAnimationFrame(() => setValue(end));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            let start = 0;
            const step = (ts: number) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(eased * end));
              if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [end, duration]);

  // Reserve the width of the final value so following text never shifts as
  // the digit count grows. The animating number is overlaid on the reserver.
  return (
    <span
      ref={ref}
      style={{
        position: "relative",
        display: "inline-block",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span aria-hidden="true" style={{ visibility: "hidden" }}>
        {end}
      </span>
      <span style={{ position: "absolute", left: 0, top: 0 }}>{value}</span>
    </span>
  );
}
