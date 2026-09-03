"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// Comprehensive Number Theory LaTeX formulas rendered via KaTeX
const LATEX_FORMULAS = [
  "x^2 - dy^2 = 1",
  "p_n \\approx n \\log n",
  "\\sum_{d \\mid n} \\varphi(d) = n",
  "a^{\\varphi(n)} \\equiv 1 \\pmod n",
  "x^2 \\equiv a \\pmod p",
  "f: \\mathbb{N} \\to \\mathbb{N}",
  "a - b \\mid P(a) - P(b)",
  "\\left(\\frac{p}{q}\\right)\\left(\\frac{q}{p}\\right) = (-1)^{\\frac{p-1}{2}\\frac{q-1}{2}}",
  "\\sum_{p} \\frac{1}{p} \\to \\infty",
  "n = \\prod_{i=1}^k p_i^{\\alpha_i}",
  "a \\equiv b \\pmod m",
  "\\gcd(a, b) \\cdot \\operatorname{lcm}(a, b) = ab",
  "\\phi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)",
  "e^{i\\theta} = \\cos \\theta +i\\sin\\theta",
  "\\pi(x) \\sim \\frac{x}{\\ln x}",
  "\\lambda(n)",
  "\\mu(n)",
  "\\sigma(n) = \\prod_{i=1}^k \\frac{p_i^{\alpha_i+1}-1}{p_i-1}",
  "\\mathbb{Z}",
  "\\mathbb{N}",
  "\\left(\\frac{a}{p}\\right) \\equiv a^{\\frac{p-1}{2}} \\pmod p",
  "\\tau(n) = \\sum_{d \\mid n} 1",
  "\\sigma_k(n) = \\sum_{d \\mid n} d^k",
  "v_p(n!) = \\sum_{k=1}^\\infty \\left\\lfloor \\frac{n}{p^k} \\right\\rfloor",
  "x^n + y^n \\ne z^n",
];

type FormulaParticle = {
  id: number;
  html: string;
  x: number;
  y: number;
  vy: number;
  scale: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
  colIndex: number;
};

export default function MathBackground({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Render KaTeX HTML snippets
    const rendered = LATEX_FORMULAS.map((formula) => {
      try {
        return katex.renderToString(formula, {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        return formula;
      }
    });

    const rect = container.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || 800;

    const count = Math.max(8, Math.min(15, Math.round((w * h) / 62000)));
    const numColumns = Math.max(4, Math.min(6, Math.floor(count / 2) || 4));

    const particles: FormulaParticle[] = Array.from({ length: count }, (_, i) => {
      const colIndex = i % numColumns;
      const colWidth = 80 / numColumns;
      const xBase = 5 + colIndex * colWidth;
      const xJitter = Math.random() * (colWidth * 0.7);

      const yBase = (i / count) * h;
      const yJitter = (Math.random() - 0.5) * (h / count) * 0.8;

      return {
        id: i,
        html: rendered[i % rendered.length],
        x: Math.min(85, Math.max(5, xBase + xJitter)),
        y: yBase + yJitter,
        vy: Math.random() * 0.18 + 0.1,
        scale: Math.random() * 0.25 + 0.9, // slightly larger scale range
        alpha: Math.random() * 0.25 + 0.22, // slightly higher opacity base
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.007,
        colIndex,
      };
    });

    const elements: HTMLDivElement[] = [];
    particles.forEach((p) => {
      const el = document.createElement("div");
      el.className = `math-latex-item ${variant === "dark" ? "text-white" : "text-navy"}`;
      el.innerHTML = p.html;
      el.style.position = "absolute";
      el.style.left = `${p.x}%`;
      el.style.top = `${p.y}px`;
      el.style.transform = `scale(${p.scale})`;
      el.style.opacity = `${p.alpha}`;
      el.style.pointerEvents = "none";
      el.style.userSelect = "none";
      el.style.whiteSpace = "nowrap";
      el.style.willChange = "transform, opacity";
      container.appendChild(el);
      elements.push(el);
    });

    let raf = 0;
    let lastTime = 0;

    function animate(ts: number) {
      if (!lastTime) lastTime = ts;
      const dt = Math.min((ts - lastTime) / 16.67, 3);
      lastTime = ts;

      const containerHeight = container?.clientHeight || h;

      particles.forEach((p, i) => {
        const el = elements[i];
        if (!el) return;

        p.y -= p.vy * dt;
        p.pulse += p.pulseSpeed * dt;

        if (p.y < -70) {
          p.y = containerHeight + 30 + Math.random() * 40;
          const colWidth = 80 / numColumns;
          const xBase = 5 + p.colIndex * colWidth;
          p.x = Math.min(85, Math.max(5, xBase + Math.random() * (colWidth * 0.7)));
        }

        const currentAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

        el.style.top = `${p.y}px`;
        el.style.left = `${p.x}%`;
        el.style.opacity = `${currentAlpha}`;
      });

      if (!reduce) {
        raf = requestAnimationFrame(animate);
      }
    }

    if (!reduce) {
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      elements.forEach((el) => el.remove());
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className="math-bg math-latex-container"
      aria-hidden="true"
    />
  );
}
