"use client";

import { useEffect, useRef } from "react";

// Polar prime plot: each prime n is placed at angle = n radians, radius = k·√n.
// Plotting primes this way reveals the striking spiral arms / rays.
const N = 8000;

function primeAngles(limit: number) {
  const sieve = new Uint8Array(limit + 1);
  const pts: { n: number; ang: number }[] = [];
  const TAU = Math.PI * 2;
  for (let i = 2; i <= limit; i++) {
    if (!sieve[i]) {
      for (let j = i * i; j <= limit; j += i) sieve[j] = 1;
      // polar prime plot: angle = n radians, radius = n
      pts.push({ n: i, ang: i % TAU });
    }
  }
  return pts;
}

export default function PrimeSpiral() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const TAU = Math.PI * 2;
    const points = primeAngles(N);
    const maxN = N;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let scale = 1;

    function resize() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // dead center of the hero section
      cx = w * 0.5;
      cy = h * 0.5;
      const maxR = Math.hypot(w, h) * 0.55;
      scale = maxR / maxN;
    }

    function render(t: number, revealFrac: number) {
      ctx!.clearRect(0, 0, w, h);
      const rot = reduce ? 0 : t * 0.03;
      const sweep = ((t * 0.55) % TAU) - Math.PI;
      const revealN = revealFrac * maxN;
      // normal compositing: overlapping primes don't stack into a bright blob
      ctx!.globalCompositeOperation = "source-over";
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.n > revealN) continue;
        const ang = p.ang + rot;
        const r = scale * p.n;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;

        // angular distance to the sweep line (radar highlight)
        let d = (((ang - sweep) % TAU) + TAU) % TAU;
        if (d > Math.PI) d = TAU - d;
        const boost = reduce ? 0 : Math.max(0, 1 - d / 0.5);
        const twinkle = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t * 2 + p.n * 0.7);

        const alpha = 0.11 + boost * 0.26 + twinkle * 0.07;
        const size = 1.7 + boost * 0.9;
        // glow halo under every dot
        ctx!.fillStyle = `rgba(217,43,140,${alpha * 0.18})`;
        ctx!.beginPath();
        ctx!.arc(x, y, size * 2.8, 0, TAU);
        ctx!.fill();
        // bright core
        ctx!.fillStyle = `rgba(230,80,165,${alpha})`;
        ctx!.beginPath();
        ctx!.arc(x, y, size, 0, TAU);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    let start = 0;
    if (reduce) {
      render(0, 1);
    } else {
      const loop = (ts: number) => {
        if (!start) start = ts;
        const t = (ts - start) / 1000;
        const reveal = Math.min(t / 2.6, 1);
        const eased = 1 - Math.pow(1 - reveal, 3);
        render(t, eased);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="math-bg prime-spiral" aria-hidden="true" />;
}
