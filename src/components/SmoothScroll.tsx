"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Inertia smooth scrolling for the whole page (skipped for reduced-motion users).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      anchors: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
