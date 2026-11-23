"use client";

import { useEffect, useRef, useState } from "react";
import Strings from "@/utils/Strings";
import Videos from "@/utils/Videos";
import { isLowEndDevice } from "@/utils/device";

// How many viewport heights the scene stays pinned for.
const PIN_SCREENS = 4;

// Timeline, as fractions of the pinned scroll.
const REVEAL_END = 0.4; // statement words light up
const STATEMENT_OUT: [number, number] = [0.42, 0.52];
const VIDEO_IN: [number, number] = [0.46, 0.6]; // full-screen video fades in, then holds

// Statement words start dim and light up as the scroll reaches them.
const WORD_DIM = "#3a3a3a";
const WORD_LIT = "#ffffff";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const seg = (p: number, from: number, to: number) => ease(clamp((p - from) / (to - from)));

function setShown(el: HTMLElement, shown: boolean) {
  const value = shown ? "visible" : "hidden";
  if (el.style.visibility !== value) el.style.visibility = value;
}

// Whole-pixel blur steps, so text re-rasterises a handful of times instead of every frame.
const blur = (amount: number, max: number) => {
  const px = Math.round(amount * max);
  return px > 0 ? `blur(${px}px)` : "none";
};

// Splits copy into word spans the scroll can light up one by one.
function Words({ text, offset }: { text: string; offset: number }) {
  return text.split(" ").map((word, i) => (
    <span key={i} data-word={offset + i} style={{ color: WORD_DIM, transition: "color 0.35s ease-out" }}>
      {word}{" "}
    </span>
  ));
}

// Plays only while on screen (and, in the pinned scene, once the card has started to appear).
// Muted + playsInline are required for inline playback on iOS; React doesn't always reflect
// `muted` as an attribute, so set it on the element.
function useShowreel(ref: React.RefObject<HTMLVideoElement | null>, mounted = true) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      video.dataset.onScreen = entry.isIntersecting ? "1" : "";
      if (entry.isIntersecting && video.dataset.wanted !== "0") video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref, mounted]);
}

function StaticAbout() {
  const { about } = Strings;
  const videoRef = useRef<HTMLVideoElement>(null);
  useShowreel(videoRef);

  return (
    <section className="bg-black px-[20px] py-[100px] lg:py-[140px]">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="font-heading text-[32px] leading-[38px] font-medium tracking-[-0.02em] text-white lg:text-[48px] lg:leading-[54px]">
          {about.title}
        </h2>
        <p className="mt-[24px] text-[19px] leading-[30px] font-light tracking-[-0.02em] text-white/80 lg:mt-[32px] lg:text-[26px] lg:leading-[40px]">
          {about.body}
        </p>
        <div className="relative mt-[56px] aspect-video overflow-hidden rounded-[16px] bg-[#111] lg:mt-[80px]">
          <video
            ref={videoRef}
            src={Videos.showreel}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={about.showreelLabel}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default function AboutSection() {
  const { about } = Strings;
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animated, setAnimated] = useState(false);

  const titleWords = about.title.split(" ").length;

  // Desktop screens tall enough for the scene only; never for reduced motion or low-end devices.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (min-height: 600px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowEnd = isLowEndDevice();
    const update = () => setAnimated(desktop.matches && !reduced.matches && !lowEnd);
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useShowreel(videoRef, animated);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const statement = statementRef.current;
    const media = mediaRef.current;
    const video = videoRef.current;
    if (!animated || !outer || !sticky || !statement || !media || !video) return;

    const words = Array.from(statement.querySelectorAll<HTMLElement>("[data-word]"));
    let lit = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      const h = sticky.clientHeight;
      const rect = outer.getBoundingClientRect();
      const p = clamp(-rect.top / (outer.offsetHeight - h));

      // 1. Statement lights up word by word, then blurs away.
      const target = Math.round(clamp(p / REVEAL_END) * words.length);
      if (target !== lit) {
        const [from, to] = target > lit ? [lit, target] : [target, lit];
        for (let i = from; i < to; i++) words[i].style.color = target > lit ? WORD_LIT : WORD_DIM;
        lit = target;
      }
      const out = seg(p, STATEMENT_OUT[0], STATEMENT_OUT[1]);
      statement.style.opacity = `${1 - out}`;
      statement.style.filter = blur(out, 14);
      statement.style.transform = `translateY(${-out * 50}px)`;
      setShown(statement, out < 1);

      // 2. The video fades in full screen, settling from a slight zoom.
      const appear = seg(p, VIDEO_IN[0], VIDEO_IN[1]);
      media.style.opacity = `${appear}`;
      video.style.transform = `scale(${lerp(1.08, 1, appear)})`;
      setShown(media, appear > 0);

      const wanted = appear > 0;
      video.dataset.wanted = wanted ? "1" : "0";
      if (wanted && video.paused && video.dataset.onScreen) video.play().catch(() => {});
      else if (!wanted && !video.paused) video.pause();
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
    };
  }, [animated]);

  if (!animated) return <StaticAbout />;

  return (
    <section ref={outerRef} className="relative bg-black" style={{ height: `${(PIN_SCREENS + 1) * 100}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Statement */}
        <div ref={statementRef} className="absolute inset-0 flex items-center px-[48px] pt-[60px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <h2 className="font-heading text-[clamp(32px,5.4vh,52px)] leading-[1.12] font-medium tracking-[-0.02em]">
              <Words text={about.title} offset={0} />
            </h2>
            <p className="mt-[clamp(20px,3.6vh,36px)] text-[clamp(19px,3vh,28px)] leading-[1.55] font-light tracking-[-0.02em]">
              <Words text={about.body} offset={titleWords} />
            </p>
          </div>
        </div>

        {/* Showreel, full screen */}
        <div ref={mediaRef} className="invisible absolute inset-0 overflow-hidden bg-black opacity-0">
          <video
            ref={videoRef}
            src={Videos.showreel}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={about.showreelLabel}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
