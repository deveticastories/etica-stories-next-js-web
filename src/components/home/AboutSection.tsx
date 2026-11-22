"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Strings from "@/utils/Strings";
import { isLowEndDevice } from "@/utils/device";
import IridescentObject, { type ObjectState } from "@/components/home/IridescentObject";

// How many viewport heights the scene stays pinned for.
const PIN_SCREENS = 6;

// Timeline, as fractions of the pinned scroll.
const REVEAL_END = 0.24; // statement words light up
const STATEMENT_OUT: [number, number] = [0.25, 0.32];
const WORD_STARTS = [0.29, 0.52, 0.75]; // each big word blurs in here (and the previous one out)
const WORD_FADE = 0.07;

// Where each word's object floats, as a fraction of that word's box (x, y = its centre).
const ANCHORS = [
  { x: 0.98, y: 0.12 },
  { x: -0.06, y: 0.5 },
  { x: 0.9, y: -0.02 },
];

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

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 10" className="h-[9px] w-[14px]" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
      <path d="M0 5h15M11 1l4 4-4 4" />
    </svg>
  );
}

function LearnMore({ href, word }: { href: string; word: string }) {
  return (
    <Link
      href={href}
      aria-label={`${Strings.about.learnMore} about ${word}`}
      className="mt-[18px] inline-flex items-center gap-[10px] text-[13px] tracking-[0.01em] text-white/80 transition-colors hover:text-white"
    >
      {Strings.about.learnMore}
      <ArrowRight />
    </Link>
  );
}

// Splits copy into word spans the scroll can light up one by one.
function Words({ text, offset }: { text: string; offset: number }) {
  return text.split(" ").map((word, i) => (
    <span key={i} data-word={offset + i} style={{ color: WORD_DIM, transition: "color 0.35s ease-out" }}>
      {word}{" "}
    </span>
  ));
}

function StaticAbout() {
  const { about } = Strings;
  return (
    <section className="bg-black px-[20px] py-[100px] lg:py-[140px]">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="font-heading text-[32px] leading-[38px] font-medium tracking-[-0.02em] text-white lg:text-[48px] lg:leading-[54px]">
          {about.title}
        </h2>
        <p className="mt-[24px] text-[19px] leading-[30px] font-light tracking-[-0.02em] text-white/80 lg:mt-[32px] lg:text-[26px] lg:leading-[40px]">
          {about.body}
        </p>
        <div className="mt-[80px] grid gap-[64px] md:grid-cols-3 md:gap-[40px]">
          {about.pillars.map((pillar) => (
            <div key={pillar.word}>
              <h3 className="text-[64px] leading-none font-extralight tracking-[-0.04em] text-white">{pillar.word}</h3>
              <p className="mt-[18px] max-w-[320px] text-[15px] leading-[23px] font-light text-white/75">{pillar.body}</p>
              <LearnMore href={pillar.href} word={pillar.word} />
            </div>
          ))}
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
  const objectWrapRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const objectState = useRef<ObjectState>({ shape: 0, spin: 0, alpha: 0 });
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

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const statement = statementRef.current;
    const objectWrap = objectWrapRef.current;
    const pillars = pillarRefs.current;
    if (!animated || !outer || !sticky || !statement || !objectWrap || pillars.some((el) => !el)) return;

    const words = Array.from(statement.querySelectorAll<HTMLElement>("[data-word]"));
    let lit = 0;
    let frame = 0;
    // Object anchor per word, in the sticky box's coordinates. Measured from layout (offsets
    // ignore the transforms applied below), so it only changes on resize.
    let anchors: { x: number; y: number }[] = [];
    let objectSize = 0;

    const measure = () => {
      objectSize = objectWrap.offsetWidth;
      anchors = pillars.map((block, i) => {
        const inner = block!.firstElementChild as HTMLElement;
        const word = inner.firstElementChild as HTMLElement;
        return {
          x: inner.offsetLeft + word.offsetLeft + word.offsetWidth * ANCHORS[i].x,
          y: inner.offsetTop + word.offsetTop + word.offsetHeight * ANCHORS[i].y,
        };
      });
    };

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

      // 2. Big words cross-fade through a blur; each one's copy follows a beat later.
      let shape = 0;
      pillars.forEach((block, i) => {
        const inP = seg(p, WORD_STARTS[i], WORD_STARTS[i] + WORD_FADE);
        const next = WORD_STARTS[i + 1];
        const outP = next === undefined ? 0 : seg(p, next, next + WORD_FADE);
        const vis = inP * (1 - outP);
        const inner = block!.firstElementChild as HTMLElement;
        const word = inner.firstElementChild as HTMLElement;
        const copy = inner.lastElementChild as HTMLElement;
        word.style.opacity = `${vis}`;
        word.style.filter = blur(1 - vis, 16);
        word.style.transform = `scale(${lerp(0.94, 1, inP) * lerp(1, 1.05, outP)})`;
        const copyIn = seg(p, WORD_STARTS[i] + 0.03, WORD_STARTS[i] + 0.03 + WORD_FADE);
        const copyVis = copyIn * (1 - outP);
        copy.style.opacity = `${copyVis}`;
        copy.style.filter = blur(1 - copyVis, 8);
        copy.style.transform = `translateY(${(1 - copyIn) * 14}px)`;
        setShown(block!, vis > 0);
        if (i > 0) shape += inP;
      });

      // 3. One object follows the words: it flies between their anchors while morphing shape.
      const appear = seg(p, WORD_STARTS[0], WORD_STARTS[0] + WORD_FADE);
      const from = Math.min(Math.floor(shape), anchors.length - 1);
      const to = Math.min(from + 1, anchors.length - 1);
      const f = shape - from;
      const a = anchors[from];
      const b = anchors[to];
      if (a && b) {
        // A dip in scale mid-morph keeps the shape change from looking like a glitch.
        const scale = lerp(0.55, 1, appear) * (1 - 0.18 * Math.sin(Math.PI * f));
        const x = lerp(a.x, b.x, f) - objectSize / 2;
        const y = lerp(a.y, b.y, f) - objectSize / 2 - (1 - appear) * 60;
        objectWrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }
      objectState.current.shape = shape;
      objectState.current.spin = p * Math.PI * 3;
      objectState.current.alpha = appear;
      setShown(objectWrap, appear > 0);
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
    document.fonts?.ready.then(onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
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

        {/* Big words, one at a time */}
        {about.pillars.map((pillar, i) => (
          <div
            key={pillar.word}
            ref={(el) => {
              pillarRefs.current[i] = el;
            }}
            className="invisible absolute inset-0 flex items-center justify-center pt-[40px]"
          >
            <div className="relative">
              <h3 className="text-[clamp(110px,22vh,210px)] leading-[0.95] font-extralight tracking-[-0.045em] text-white opacity-0">
                {pillar.word}
              </h3>
              <div className="mt-[clamp(14px,2.6vh,26px)] ml-[clamp(20px,3.6vh,40px)] max-w-[300px] opacity-0">
                <p className="text-[15px] leading-[23px] font-light text-white/80">{pillar.body}</p>
                <LearnMore href={pillar.href} word={pillar.word} />
              </div>
            </div>
          </div>
        ))}

        {/* The 3D object, drawn above the words like the glass sits in front of the type. */}
        <div
          ref={objectWrapRef}
          className="pointer-events-none invisible absolute top-0 left-0 size-[clamp(260px,44vh,460px)] will-change-transform"
        >
          <IridescentObject stateRef={objectState} />
        </div>
      </div>
    </section>
  );
}
