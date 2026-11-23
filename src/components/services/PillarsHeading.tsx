"use client";

import { useEffect, useRef } from "react";

type PillarsHeadingProps = {
  label: string;
  title: string;
};

// Opacity of a word that hasn't been reached yet (reads as pale grey on white).
const DIM = 0.16;

// Eyebrow + heading that fill in word by word as they scroll up through the viewport: every word
// starts pale and darkens in reading order, finishing once the heading is a little above centre.
export default function PillarsHeading({ label, title }: PillarsHeadingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelWords = label.split(" ");
  const titleWords = title.split(" ");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-word]"));

    let frame = 0;
    const render = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = root.getBoundingClientRect().top;
      // 0 when the heading's top is 90% down the screen, 1 when it reaches 35%.
      const p = Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.55)));
      const n = words.length;
      words.forEach((el, i) => {
        const t = Math.min(1, Math.max(0, p * n - i));
        el.style.opacity = `${DIM + (1 - DIM) * t}`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Words keep their own spaces so the line wraps exactly as plain text would.
  const renderWords = (words: string[]) =>
    words.map((word, i) => (
      <span key={i} data-word className="transition-opacity duration-150 ease-out">
        {word}
        {i < words.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <div ref={rootRef} className="text-center">
      <p
        aria-label={label}
        className="text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-primary lg:text-[18px]"
      >
        <span aria-hidden>{renderWords(labelWords)}</span>
      </p>
      <h2
        aria-label={title}
        className="mt-[8px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[9px] lg:text-[54px] lg:tracking-[-0.04em] lg:leading-[55px]"
      >
        <span aria-hidden>{renderWords(titleWords)}</span>
      </h2>
    </div>
  );
}
