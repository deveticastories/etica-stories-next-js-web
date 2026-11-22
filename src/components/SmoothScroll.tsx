"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { isLowEndDevice, isSafari } from "@/utils/device";
import { setScroller } from "@/utils/introState";

// Inertia smooth scrolling for the whole page. Skipped for reduced-motion users, low-end devices
// (the extra per-frame scroll work makes the pinned scenes stutter) and Safari, whose native
// scrolling is already smooth and must stay native to avoid blank white areas while scrolling.
export default function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      isLowEndDevice() ||
      isSafari()
    )
      return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
      autoRaf: true,
    });
    // The intro stops/starts it directly. (Lenis' autoToggle relies on transitioning `overflow`,
    // which Safari < 17.4 can't do, so wheel input there scrolled the page under the intro.)
    setScroller(lenis);

    return () => {
      setScroller(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
