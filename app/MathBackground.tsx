"use client";

import { useEffect, useRef } from "react";

// A drifting field of number-theory glyphs and micro-formulas.
const TOKENS = [
  "∑", "∏", "∫", "√", "π", "φ", "θ", "λ", "∞", "≡", "≠", "≤", "≥",
  "∈", "∀", "∃", "∤", "∣", "ℤ", "ℕ", "ℚ", "ℝ", "≅", "⌊x⌋", "gcd", "lcm",
  "mod p", "aᵖ⁻¹", "x²+y²", "p∤n", "φ(n)", "a≡b", "∑1/n", "2ⁿ−1",
  "2", "3", "5", "7", "11", "13", "17", "19", "23", "29", "d∣n",
];

type Particle = {
  x: number;
  y: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  alpha: number;
  token: string;
  pulse: number;
  pulseSpeed: number;
};

export default function MathBackground({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // gold-ish on dark backgrounds, ink on light ones
    const rgb = variant === "dark" ? "214,154,54" : "16,37,59";

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    function spawn(initial: boolean): Particle {
      const size = Math.random() * 20 + 13;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + size,
        vy: Math.random() * 0.22 + 0.1,
        size,
        rot: (Math.random() - 0.5) * 0.5,
        vr: (Math.random() - 0.5) * 0.003,
        alpha: Math.random() * 0.3 + 0.05,
        token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      };
    }

    function resize() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(10, Math.min(55, Math.round((w * h) / 27000)));
      particles = Array.from({ length: count }, () => spawn(true));
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, w, h);
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const p of particles) {
        p.y -= p.vy * dt;
        p.rot += p.vr * dt;
        p.pulse += p.pulseSpeed * dt;
        if (p.y < -p.size - 10) {
          Object.assign(p, spawn(false));
        }
        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.pulse));
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot);
        ctx!.font = `${p.size}px Georgia, "Times New Roman", serif`;
        ctx!.fillStyle = `rgba(${rgb},${a})`;
        ctx!.fillText(p.token, 0, 0);
        ctx!.restore();
      }
    }

    let raf = 0;
    let last = 0;
    function frame(ts: number) {
      const dt = last ? Math.min((ts - last) / 16.67, 3) : 1;
      last = ts;
      draw(dt);
      raf = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant]);

  return <canvas ref={ref} className="math-bg" aria-hidden="true" />;
}
