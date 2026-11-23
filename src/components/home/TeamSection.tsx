"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";
import { isLowEndDevice } from "@/utils/device";

// Initial pinned length (viewport heights) before JS sizes it to the card row's travel.
const PIN_SCREENS = 4;
// Gap between neighbouring cards in the row, as a fraction of the stage width.
const CARD_GAP = 0.07;
// Scroll pixels per pixel of card travel (1 = the row moves exactly with the scroll).
const SCROLL_RATIO = 1;
// Row centre below the stage centre, as a fraction of its height (cards sit over the headline).
const ROW_DROP = 0.05;
// Tilt (deg) and turn (deg) per stage width away from the centre: cards lean in as they arrive
// from the right, straighten in the middle and lean the other way as they leave on the left.
const TILT = -10;
const TURN = 16;
// Slight per-card wobble so the row doesn't look machine-perfect.
const CARD_JITTER = [
  { rotate: 0.6, y: 0 },
  { rotate: -0.8, y: 0.012 },
  { rotate: 0.4, y: -0.008 },
  { rotate: -0.5, y: 0.01 },
  { rotate: 0.7, y: -0.004 },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);
// Eased 0 → 1 progress of `p` through the [from, to] window.
const seg = (p: number, from: number, to: number) => ease(clamp((p - from) / (to - from)));

// GPU layers are only requested while a piece is moving (see ProcessSection for why).
function setLayer(el: HTMLElement, on: boolean) {
  const value = on ? "transform" : "auto";
  if (el.style.willChange !== value) el.style.willChange = value;
}

function setShown(el: HTMLElement, shown: boolean) {
  const value = shown ? "visible" : "hidden";
  if (el.style.visibility !== value) el.style.visibility = value;
}

// Slow drifting brand-red glow behind the headline.
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[15%] bg-[radial-gradient(45%_40%_at_30%_35%,rgba(201,31,50,0.32),transparent_70%),radial-gradient(40%_45%_at_72%_68%,rgba(101,13,13,0.6),transparent_70%),radial-gradient(35%_30%_at_80%_20%,rgba(238,54,74,0.14),transparent_70%)] motion-safe:animate-team-glow" />
    </div>
  );
}

// Full-bleed portrait card: the photo fills the card at its own 443 × 536 ratio (nothing cropped),
// with a brand-maroon fade at the bottom carrying the name and role.
function MemberCard({ index, className = "" }: { index: number; className?: string }) {
  const member = Strings.team.members[index];
  return (
    <article
      className={`relative aspect-[443/536] overflow-hidden rounded-[20px] bg-[#140406] shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)] ring-1 ring-white/15 ${className}`}
    >
      <Image
        src={Images.teamMembers[index]}
        alt={`${member.name}, ${member.role}`}
        fill
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 48vw, 74vw"
        className="object-cover object-top"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(201,31,50,0.10)_0%,transparent_30%,transparent_48%,rgba(60,6,12,0.6)_70%,rgba(26,3,6,0.96)_100%)]"
      />
      {/* Thin glassy highlight along the top edge */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
      <div className="absolute inset-x-0 bottom-0 px-[clamp(18px,1.8vw,28px)] pb-[clamp(18px,1.8vw,28px)] text-left">
        <span aria-hidden className="block h-[3px] w-[32px] rounded-full bg-primary" />
        <h3 className="mt-[clamp(10px,1vw,14px)] font-display text-[clamp(28px,2.6vw,42px)] leading-[0.95] tracking-[0.01em] text-white uppercase">
          {member.name}
        </h3>
        <p className="mt-[8px] text-[13px] leading-[18px] font-medium tracking-[0.08em] text-white/75 uppercase lg:text-[14px]">
          {member.role}
        </p>
      </div>
    </article>
  );
}

function Headline({ lineRefs }: { lineRefs?: React.RefObject<(HTMLSpanElement | null)[]> }) {
  const { team } = Strings;
  return (
    <h2 aria-label={team.title} className="font-display text-[clamp(48px,13vw,84px)] leading-[0.95] tracking-[0.005em] uppercase sm:text-[min(9vw,150px)]">
      {team.titleLines.map((line, i) => (
        // Each line slides up out of its own mask; pb keeps the Q's tail inside it.
        <span key={line} aria-hidden className="block overflow-hidden pb-[0.04em]">
          <span
            ref={(el) => {
              if (lineRefs) lineRefs.current[i] = el;
            }}
            className={`block ${i === 0 ? "text-white" : "text-hero-subtitle"}`}
          >
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

function Intro({ introRef }: { introRef?: React.RefObject<HTMLDivElement | null> }) {
  const { team } = Strings;
  return (
    <div ref={introRef} className="mt-[22px] flex flex-col items-center lg:mt-[30px]">
      <p className="max-w-[460px] text-[16px] leading-[24px] font-light tracking-[-0.01em] text-white/70 lg:text-[18px] lg:leading-[27px]">
        {team.body}
      </p>
      <Button label={team.cta} className="mt-[20px] lg:mt-[24px]" />
    </div>
  );
}

export default function TeamSection() {
  const { members } = Strings.team;
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  // The scroll scene runs everywhere except for reduced-motion users and low-end devices.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowEnd = isLowEndDevice();
    const update = () => setAnimated(!reduced.matches && !lowEnd);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const intro = introRef.current;
    if (!animated || !outer || !sticky || !intro) return;

    const lines = lineRefs.current.filter((el): el is HTMLSpanElement => !!el);
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);

    // Sizes are cached so the scroll loop never forces a layout.
    let W = 0;
    let H = 0;
    let cardW = 0;
    let spacing = 0;
    let startX = 0;
    let travel = 0;
    const measure = () => {
      W = sticky.clientWidth;
      H = sticky.clientHeight;
      cardW = cards[0]?.offsetWidth ?? 0;
      spacing = cardW + W * CARD_GAP;
      // The row starts with its first card just off the right edge and ends once the last card
      // has fully left on the left (with room for the tilt).
      startX = W / 2 + cardW * 0.65;
      travel = 2 * startX + spacing * (cards.length - 1);
      outer.style.height = `${H + travel * SCROLL_RATIO}px`;
    };

    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = outer.getBoundingClientRect();
      const total = Math.max(1, outer.offsetHeight - H);

      // Headline: revealed while the section scrolls up into view, finished as it pins.
      const enter = clamp((H - rect.top) / H);
      lines.forEach((el, i) => {
        const t = seg(enter, 0.3 + i * 0.15, 0.8 + i * 0.15);
        el.style.transform = `translate3d(0, ${(1 - t) * 105}%, 0)`;
        setLayer(el, t > 0 && t < 1);
      });
      const introT = seg(enter, 0.6, 1);
      intro.style.opacity = `${introT}`;
      intro.style.transform = `translate3d(0, ${(1 - introT) * 24}px, 0)`;

      // Cards: one row sliding right → left with the scroll while the stage is pinned.
      const p = clamp(-rect.top / total);
      const offset = startX - p * travel;
      cards.forEach((el, i) => {
        const x = offset + i * spacing;
        const shown = Math.abs(x) < W / 2 + cardW;
        setShown(el, shown);
        setLayer(el, shown);
        if (!shown) return;
        // −0.5 (left edge) … 0 (centre) … 0.5 (right edge); capped so the wide cards on phones,
        // which sit further out relative to the stage, don't over-tilt at the edges.
        const n = Math.max(-0.6, Math.min(0.6, x / W));
        const jitter = CARD_JITTER[i % CARD_JITTER.length];
        const y = H * (ROW_DROP + jitter.y + Math.abs(n) * 0.06);
        const rotate = n * TILT + jitter.rotate;
        const turn = n * TURN;
        el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) perspective(1400px) rotateY(${turn}deg) rotate(${rotate}deg)`;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [animated]);

  if (!animated) {
    return (
      <section className="relative overflow-hidden bg-[#0e0305] px-[16px] py-[110px] text-center lg:py-[150px]">
        <Backdrop />
        <div className="relative mx-auto max-w-[1440px]">
          <Headline />
          <Intro />
          <div className="mt-[56px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto pb-[12px] max-sm:-mx-[16px] max-sm:px-[16px] sm:flex-wrap sm:justify-center sm:gap-[24px] lg:mt-[80px]">
            {members.map((member, i) => (
              <MemberCard key={member.name} index={i} className="w-[min(78vw,320px)] shrink-0 snap-center sm:w-[300px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={outerRef} className="relative bg-[#0e0305]" style={{ height: `${(PIN_SCREENS + 1) * 100}svh` }}>
      <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <Backdrop />
        <div className="relative flex h-full flex-col items-center justify-center px-[16px] text-center">
          <Headline lineRefs={lineRefs} />
          <Intro introRef={introRef} />
        </div>
        <div className="pointer-events-none absolute inset-0">
          {members.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="invisible absolute top-1/2 left-1/2 w-[min(74vw,340px,44svh)] sm:w-[min(48vw,380px,44svh)] lg:w-[min(max(280px,27vw),420px,46svh)]"
            >
              <MemberCard index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
