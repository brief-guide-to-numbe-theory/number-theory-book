"use client";

import { useEffect } from "react";

// Adds `.in-view` to any [data-reveal] element immediately on mount for instant text visibility,
// and ensures touch animations close immediately when the finger is lifted on mobile.
export default function ScrollReveal() {
  useEffect(() => {
    // 1. Immediately reveal all data-reveal elements on mount (no fade-in delay)
    document.documentElement.classList.add("reveal-ready");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => el.classList.add("in-view"));

    // 2. Mobile Finger Lift Handler: Remove sticky hover/focus when finger lifts
    const handleTouchEnd = () => {
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }
    };

    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return null;
}
