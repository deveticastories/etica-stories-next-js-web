"use client";

import { useEffect, useRef, useState } from "react";
import Videos from "@/utils/Videos";
import { markIntroDone, markIntroPlaying } from "@/utils/introState";

const INTRO_MS = 4000;
const FADE_MS = 600;

// Full-screen logo intro shown on every load/refresh, then fades out to the page.
export default function IntroVideo() {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    markIntroPlaying();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Muted autoplay can still be rejected; skip the intro if so.
    videoRef.current?.play().catch(() => setPhase("fading"));

    const timer = setTimeout(() => setPhase("fading"), INTRO_MS);
    return () => {
      clearTimeout(timer);
      root.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    markIntroDone();
    document.documentElement.style.overflow = "";
    const timer = setTimeout(() => setPhase("done"), FADE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity ease-out"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      <video
        ref={videoRef}
        src={Videos.intro}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setPhase("fading")}
        className="w-[80vw] max-w-[520px] bg-white object-contain"
      />
    </div>
  );
}
