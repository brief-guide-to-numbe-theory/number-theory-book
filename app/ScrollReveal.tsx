"use client";

import { useEffect } from "react";

// Adds `.in-view` to any [data-reveal] element as it scrolls into view,
// and ensures touch animations close immediately when the finger is lifted on mobile.
export default function ScrollReveal() {
  useEffect(() => {
    // 1. Intersection Observer for Scroll Reveal
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let io: IntersectionObserver | null = null;

    if (els.length) {
      document.documentElement.classList.add("reveal-ready");

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        els.forEach((el) => el.classList.add("in-view"));
      } else {
        io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                io?.unobserve(entry.target);
              }
            }
          },
          { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
        );
        els.forEach((el) => io?.observe(el));
      }
    }

    // 2. Mobile Finger Lift Handler: Remove sticky hover/focus when finger lifts
    const handleTouchEnd = () => {
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }
    };

    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return null;
}
