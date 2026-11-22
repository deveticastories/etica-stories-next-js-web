"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { TrendUpIcon } from "@/components/Icons";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";
import Videos from "@/utils/Videos";
import { onIntroDone } from "@/utils/introState";

// Scroll distance (px) over which the video expands, then how long it stays pinned when fully open.
const EXPAND_DISTANCE = 800;
const MOBILE_EXPAND_DISTANCE = 600;
const HOLD_DISTANCE = 220;
const DESKTOP_MIN_HEIGHT = 560;
const EDGE_GAP = 10;
const START_RADIUS = 12;
const END_RADIUS = 20;
const MAX_OVERLAY = 0.45;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

// The promo ends with the ETICA logo reveal on white (same as the intro). Expanded behind the
// dark overlay and hero text it reads as a grey, broken frame, so loop back before it starts.
const PROMO_LOOP_END = 12.6;

type Mode = "off" | "mobile" | "desktop";

// Starts only once the logo intro has finished. Muted + playsInline are required for inline
// playback on iOS; React doesn't always reflect `muted` as an attribute, so set it on the element.
function HeroVideo({ label }: { label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;

    const restartIfPastEnd = () => {
      if (video.currentTime >= PROMO_LOOP_END) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    // Per-frame check where supported; `timeupdate` only fires ~4x/sec and would let the wipe show.
    let frameHandle = 0;
    const onFrame = () => {
      restartIfPastEnd();
      frameHandle = video.requestVideoFrameCallback(onFrame);
    };
    const perFrame = typeof video.requestVideoFrameCallback === "function";
    if (perFrame) frameHandle = video.requestVideoFrameCallback(onFrame);
    else video.addEventListener("timeupdate", restartIfPastEnd);

    // Decoding a 1080p video off screen costs GPU memory the pinned scenes further down need.
    let introDone = false;
    let onScreen = true;
    const sync = () => {
      if (introDone && onScreen) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(video);

    const unsubscribe = onIntroDone(() => {
      introDone = true;
      sync();
    });

    return () => {
      unsubscribe();
      observer.disconnect();
      if (perFrame) video.cancelVideoFrameCallback(frameHandle);
      else video.removeEventListener("timeupdate", restartIfPastEnd);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={Videos.heroPromo}
      poster={Images.hero}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function HeroStat({ className = "" }: { className?: string }) {
  const { hero } = Strings;
  return (
    <div className={`relative z-20 flex-col items-center lg:mb-[-9px] lg:w-[160px] lg:shrink-0 lg:items-start ${className}`}>
      <TrendUpIcon className="h-[25px] w-[46px]" />
      <p className="hero-ink mt-[clamp(16px,3.4vh,33px)] text-[64px] leading-[64px] font-normal tracking-[-0.03em] [--ink:#171717] lg:text-[clamp(52px,7vh,72px)] lg:leading-none">
        {hero.statValue}
      </p>
      <p className="hero-ink mt-[5px] text-[16px] leading-[22px] font-light [--ink:#585151]">
        {hero.statLabel}
      </p>
    </div>
  );
}

function HeroIntro({ className = "" }: { className?: string }) {
  const { hero } = Strings;
  return (
    <div className={`relative z-20 flex-col items-center text-center lg:mb-[-3px] lg:w-[215px] lg:shrink-0 lg:items-start lg:text-left ${className}`}>
      <p className="hero-ink max-w-[215px] text-[16px] leading-[24px] font-light tracking-[-0.01em] [--ink:#585151]">
        {hero.description}
      </p>
      <Button label={hero.cta} size="lg" className="mt-[32px] lg:mt-[clamp(20px,4.5vh,44px)]" />
    </div>
  );
}

export default function HeroSection() {
  const { hero } = Strings;
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("off");
  const animated = mode !== "off";

  // Never for reduced-motion users.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMode(reduced.matches ? "off" : desktop.matches ? "desktop" : "mobile");
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const slot = slotRef.current;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    if (!animated || !outer || !sticky || !slot || !media || !overlay) return;

    let frame = 0;
    const distance = mode === "mobile" ? MOBILE_EXPAND_DISTANCE : EXPAND_DISTANCE;

    const render = () => {
      frame = 0;
      const outerTop = outer.getBoundingClientRect().top;
      const stickyRect = sticky.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();

      const t = ease(clamp(-outerTop / distance));

      const start = {
        x: slotRect.left - stickyRect.left,
        y: slotRect.top - stickyRect.top,
        w: slotRect.width,
        h: slotRect.height,
      };
      // Cover the whole pinned hero (it is one viewport tall, with a minimum height on very short screens).
      const end = {
        x: EDGE_GAP,
        y: EDGE_GAP,
        w: stickyRect.width - EDGE_GAP * 2,
        h: stickyRect.height - EDGE_GAP * 2,
      };

      media.style.left = `${lerp(start.x, end.x, t)}px`;
      media.style.top = `${lerp(start.y, end.y, t)}px`;
      media.style.width = `${lerp(start.w, end.w, t)}px`;
      media.style.height = `${lerp(start.h, end.h, t)}px`;
      media.style.borderRadius = `${lerp(START_RADIUS, END_RADIUS, t)}px`;
      overlay.style.opacity = `${t * MAX_OVERLAY}`;
      sticky.style.setProperty("--hero-p", `${t}`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      sticky.style.removeProperty("--hero-p");
    };
  }, [animated, mode]);

  // The pinned hero is one viewport tall (min 560px on desktop) so it fits any laptop screen.
  const sectionHeight =
    mode === "desktop"
      ? `calc(max(100vh, ${DESKTOP_MIN_HEIGHT}px) + ${EXPAND_DISTANCE + HOLD_DISTANCE}px)`
      : mode === "mobile"
        ? `calc(100svh + ${MOBILE_EXPAND_DISTANCE + HOLD_DISTANCE}px)`
        : undefined;

  return (
    <>
      <section ref={outerRef} className="relative bg-white" style={sectionHeight ? { height: sectionHeight } : undefined}>
        <div
          ref={stickyRef}
          className={`relative overflow-hidden bg-[radial-gradient(ellipse_760px_470px_at_50%_58%,#F9DFE3_0%,#FCEEF0_45%,#FFFFFF_100%)] pt-[120px] pb-[48px] lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-[560px] lg:flex-col lg:pt-[clamp(104px,19vh,201px)] lg:pb-[clamp(20px,4.5vh,56px)] ${
            mode === "mobile" ? "sticky top-0 flex h-svh flex-col justify-center" : ""
          }`}
        >
          {animated && (
            <div ref={mediaRef} aria-hidden className="absolute z-10 overflow-hidden bg-[#f3e6e8] [contain:strict]">
              <HeroVideo />
              <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0" />
            </div>
          )}

          <div className="relative z-20 px-[20px] text-center">
            {/* The eyebrow is the page's H1 (the SEO main heading); the large title below is visual. */}
            <h1 className="hero-ink text-[14px] leading-[22px] font-light [--ink:#828282] lg:text-[15px]">
              {hero.eyebrow}
            </h1>
            <h2 className="hero-ink mx-auto mt-[8px] max-w-[980px] font-heading text-[24px] leading-[30px] font-medium tracking-[-0.02em] text-balance [--ink:#171717] sm:text-[32px] sm:leading-[38px] lg:mt-[10px] lg:text-[clamp(28px,4.4vh,44px)] lg:leading-[1.15]">
              {hero.titleLine1} <span className="text-primary">{hero.titleLine2}</span>
            </h2>
          </div>

          <div className="hero-row mx-auto mt-[32px] flex w-full max-w-[1440px] flex-col items-center px-[20px] lg:mt-[clamp(20px,5.3vh,52px)] lg:min-h-0 lg:flex-1 lg:flex-row lg:items-end lg:justify-between lg:gap-[32px] lg:pr-[clamp(32px,8vw,158px)] lg:pl-[clamp(32px,10vw,190px)]">
            <HeroStat className="hidden lg:flex" />

            <div
              ref={slotRef}
              className={`hero-slot relative aspect-[486/273] shrink-0 overflow-hidden rounded-[12px] ${
                animated ? "invisible" : ""
              }`}
            >
              {!animated && <HeroVideo label="Etica Stories promo video" />}
            </div>

            <HeroIntro className="hidden lg:flex" />
          </div>
        </div>
      </section>

      {/* On mobile the pinned hero holds only the title and video; the rest follows once it releases. */}
      <section className="flex flex-col items-center gap-[36px] bg-white pt-[56px] pb-[60px] lg:hidden">
        <HeroStat className="flex" />
        <HeroIntro className="flex px-[20px]" />
      </section>
    </>
  );
}
