"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { isLowEndDevice } from "@/utils/device";

// Inertia smooth scrolling for the whole page (skipped for reduced-motion users and low-end devices,
// where the extra per-frame scroll work makes the pinned scenes stutter).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowEndDevice()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
      autoRaf: true,
      // Pauses while the intro locks the page (overflow: hidden on <html>), so wheel input
      // queued during the intro can't make the page jump once it unlocks.
      autoToggle: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
