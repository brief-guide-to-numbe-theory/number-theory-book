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
  "\\sum_{p \\le x} \\frac{1}{p} = \\ln \\ln x + C",
  "n = \\prod_{i=1}^k p_i^{\\alpha_i}",
  "a \\equiv b \\pmod m",
  "\\gcd(a, b) \\cdot \\operatorname{lcm}(a, b) = ab",
  "\\phi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)",
  "\\zeta(s) = \\sum_{n=1}^\\infty \\frac{1}{n^s}",
  "e^{i\\pi} + 1 = 0",
  "\\pi(x) \\sim \\frac{x}{\\ln x}",
  "\\lambda(n)",
  "\\mu(n)",
  "\\sigma(n)",
  "\\mathbb{Z} / n\\mathbb{Z}",
  "\\left(\\frac{a}{p}\\right) \\equiv a^{\\frac{p-1}{2}} \\pmod p",
  "L(s, \\chi) = \\sum_{n=1}^\\infty \\frac{\\chi(n)}{n^s}",
  "\\tau(n) = \\sum_{d \\mid n} 1",
  "\\sigma_k(n) = \\sum_{d \\mid n} d^k",
  "v_p(n!) = \\sum_{k=1}^\\infty \\left\\lfloor \\frac{n}{p^k} \\right\\rfloor",
  "x^n + y^n \\ne z^n",
  "\\binom{n}{k} \\equiv \\prod_{i=0}^m \\binom{a_i}{b_i} \\pmod p",
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

    // Render every formula to HTML using KaTeX
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

    const count = Math.max(12, Math.min(28, Math.round((w * h) / 35000)));

    const particles: FormulaParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      html: rendered[i % rendered.length],
      x: Math.random() * 82 + 5,
      y: Math.random() * h,
      vy: Math.random() * 0.22 + 0.12,
      scale: Math.random() * 0.3 + 0.85,
      alpha: Math.random() * 0.28 + 0.12,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.018 + 0.008,
    }));

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
          p.y = containerHeight + 40;
          p.x = Math.random() * 82 + 5;
        }

        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        el.style.top = `${p.y}px`;
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
