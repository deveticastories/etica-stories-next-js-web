"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { TrendUpIcon } from "@/components/Icons";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";
import Videos from "@/utils/Videos";
import { onIntroDone } from "@/utils/introState";

const CLIENTS = [
  { name: "FAB", src: Images.clients.fab, width: 83, height: 29 },
  { name: "Saaz International", src: Images.clients.saaz, width: 83, height: 32 },
  { name: "Emphz", src: Images.clients.emphz, width: 125, height: 35 },
  { name: "Swaah Juniors", src: Images.clients.swaahJuniors, width: 106, height: 41 },
  { name: "Introlines Merchant Exports", src: Images.clients.introlines, width: 163, height: 52 },
];

// Scroll distance (px) over which the video expands, then how long it stays pinned when fully open.
const EXPAND_DISTANCE = 900;
const MOBILE_EXPAND_DISTANCE = 600;
const HOLD_DISTANCE = 220;
const EDGE_GAP = 10;
const START_RADIUS = 12;
const END_RADIUS = 20;
const MAX_OVERLAY = 0.45;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

type Mode = "off" | "mobile" | "desktop";

// Starts only once the logo intro has finished. Muted + playsInline are required for inline
// playback on iOS; React doesn't always reflect `muted` as an attribute, so set it on the element.
function HeroVideo({ label }: { label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    return onIntroDone(() => {
      video.play().catch(() => {});
    });
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
    <div className={`relative z-20 flex-col items-center lg:mb-[-9px] lg:w-[160px] lg:items-start ${className}`}>
      <TrendUpIcon className="h-[25px] w-[46px]" />
      <p className="hero-ink mt-[33px] text-[64px] leading-[64px] font-normal tracking-[-0.03em] [--ink:#171717] lg:text-[72px] lg:leading-[72px]">
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
    <div className={`relative z-20 flex-col items-center text-center lg:mb-[-3px] lg:w-[215px] lg:items-start lg:text-left ${className}`}>
      <p className="hero-ink max-w-[215px] text-[16px] leading-[24px] font-light tracking-[-0.01em] [--ink:#585151]">
        {hero.description}
      </p>
      <Button label={hero.cta} size="lg" className="mt-[44px]" />
    </div>
  );
}

function TrustedBy({ className = "" }: { className?: string }) {
  const { hero } = Strings;
  return (
    <div className={`relative z-20 px-[20px] ${className}`}>
      <p className="hero-ink text-center text-[18px] leading-[24px] font-light tracking-[-0.01em] [--ink:#171717] lg:translate-x-[-14px]">
        {hero.trustedBy}
      </p>
      {/* Marquee: the track holds two identical halves and slides -50%, so the loop is seamless.
          Each half repeats the logo set so it always spans wider than the viewport. */}
      <div className="marquee mx-auto mt-[32px] max-w-[1147px] overflow-hidden lg:translate-x-[-14px]">
        <ul className="marquee-track flex w-max items-center">
          {[0, 1].map((half) =>
            [...CLIENTS, ...CLIENTS].map((client, i) => (
              <li
                key={`${half}-${i}`}
                aria-hidden={half === 1 || i >= CLIENTS.length || undefined}
                className="shrink-0 px-[24px] lg:px-[48px]"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="hero-logo max-w-none"
                  style={{ width: client.width, height: client.height }}
                />
              </li>
            ))
          )}
        </ul>
      </div>
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
      const end = {
        x: EDGE_GAP,
        y: EDGE_GAP,
        w: stickyRect.width - EDGE_GAP * 2,
        h: Math.min(window.innerHeight, stickyRect.height) - EDGE_GAP * 2,
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

  const sectionHeight =
    mode === "desktop"
      ? `${979 + EXPAND_DISTANCE + HOLD_DISTANCE}px`
      : mode === "mobile"
        ? `calc(100svh + ${MOBILE_EXPAND_DISTANCE + HOLD_DISTANCE}px)`
        : undefined;

  return (
    <>
      <section ref={outerRef} className="relative bg-white" style={sectionHeight ? { height: sectionHeight } : undefined}>
        <div
          ref={stickyRef}
          className={`relative overflow-hidden bg-[radial-gradient(ellipse_760px_470px_at_50%_58%,#F9DFE3_0%,#FCEEF0_45%,#FFFFFF_100%)] pt-[130px] pb-[60px] lg:sticky lg:top-0 lg:block lg:h-[979px] lg:pt-[201px] lg:pb-0 ${
            mode === "mobile" ? "sticky top-0 flex h-svh flex-col justify-center" : ""
          }`}
        >
          {animated && (
            <div ref={mediaRef} aria-hidden className="absolute z-10 overflow-hidden will-change-[left,top,width,height]">
              <HeroVideo />
              <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0" />
            </div>
          )}

          <div className="relative z-20 px-[20px] text-center">
            <p className="hero-ink text-[14px] leading-[22px] font-light [--ink:#828282] lg:text-[15px]">
              {hero.eyebrow}
            </p>
            <h1 className="hero-ink mt-[6px] font-heading text-[34px] leading-[38px] font-medium tracking-[-0.02em] [--ink:#171717] sm:text-[48px] sm:leading-[50px] lg:mt-[4px] lg:text-[60px] lg:leading-[60px]">
              {hero.titleLine1}
              <br />
              <span className="text-primary">{hero.titleLine2}</span>
            </h1>
          </div>

          <div className="mx-auto mt-[40px] flex max-w-[1440px] flex-col items-center px-[20px] lg:mt-[52px] lg:flex-row lg:items-end lg:justify-between lg:pr-[158px] lg:pl-[190px]">
            <HeroStat className="hidden lg:flex" />

            <div
              ref={slotRef}
              className={`relative aspect-[486/273] w-full max-w-[660px] overflow-hidden rounded-[12px] ${
                animated ? "invisible" : ""
              }`}
            >
              {!animated && <HeroVideo label="Etica Stories promo video" />}
            </div>

            <HeroIntro className="hidden lg:flex" />
          </div>

          <TrustedBy className="mt-[88px] hidden lg:block" />
        </div>
      </section>

      {/* On mobile the pinned hero holds only the title and video; the rest follows once it releases. */}
      <section className="flex flex-col items-center gap-[36px] bg-white pt-[56px] pb-[60px] lg:hidden">
        <HeroStat className="flex" />
        <HeroIntro className="flex px-[20px]" />
        <TrustedBy className="mt-[28px] w-full" />
      </section>
    </>
  );
}
