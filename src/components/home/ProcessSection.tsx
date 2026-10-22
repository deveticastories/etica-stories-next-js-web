"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CodeSearchIcon, DeployIcon, OptimizeIcon } from "@/components/Icons";
import Strings from "@/utils/Strings";

// Per-card icon and text-box offsets measured from the design.
const CARDS = [
  { icon: <CodeSearchIcon className="size-[47px]" />, textOffset: "lg:pl-[7px]", textWidth: "lg:max-w-[314px]" },
  { icon: <DeployIcon className="h-[41px] w-[43px]" />, textOffset: "lg:pl-[4px]", textWidth: "lg:max-w-[280px]" },
  { icon: <OptimizeIcon className="ml-[7px] size-[37px]" />, textOffset: "lg:pl-[7px]", textWidth: "lg:max-w-[263px]" },
];

// Resting tilt (deg) and drop (px) of each card once it has landed.
const CARD_REST = [
  { rotate: -1, drop: 0 },
  { rotate: 2, drop: 14 },
  { rotate: -1.5, drop: 30 },
];

// Pixel pattern on the card backs (1 = filled square), 6 × 3.
const BACK_PATTERN = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0];

// How many viewport heights the scene stays pinned for.
const PIN_SCREENS = 6;
const CARD_HEIGHT = 443;
const CARD_ROW_WIDTH = 1102;
// Shifts the card row down so its label clears the fixed navbar.
const ROW_OFFSET = 28;

// CRT monitor geometry, as fractions of the screen width.
const SCREEN_ASPECT = 1.36;
const MONITOR_TOP = 0.085; // case above the screen
const MONITOR_BOTTOM = 0.25; // bezel + control panel + base below the screen
const MONITOR_WIDTH = 1.18;
const NAV_CLEARANCE = 45;

// A length in screen widths, resolved against the --mw custom property.
const u = (n: number) => `calc(var(--mw) * ${n})`;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
// Eased 0 → 1 progress of `p` through the [from, to] window.
const seg = (p: number, from: number, to: number) => ease(clamp((p - from) / (to - from)));

function ProcessCard({ index, className = "" }: { index: number; className?: string }) {
  const step = Strings.process[index];
  return (
    <article className={`rounded-[16px] bg-white px-[30px] pt-[31px] pb-[32px] lg:h-[443px] lg:pr-0 ${className}`}>
      <div className="flex h-[47px] items-start">{CARDS[index].icon}</div>
      <div className={`pl-[6px] ${CARDS[index].textOffset}`}>
        <h3 className="mt-[50px] text-[22px] leading-[28px] font-normal tracking-[-0.02em] text-heading">
          {step.title}
        </h3>
        <p
          className={`mt-[26px] text-[18px] leading-[26px] font-light tracking-[-0.02em] text-body ${CARDS[index].textWidth}`}
        >
          {step.body}
        </p>
      </div>
    </article>
  );
}

function CardBack({ index }: { index: number }) {
  const step = Strings.process[index];
  return (
    <div className="absolute inset-0 flex flex-col rounded-[16px] bg-[linear-gradient(160deg,#C91F32_0%,#8E1622_100%)] p-[26px] text-white backface-hidden [transform:rotateY(180deg)]">
      <div className="flex items-start justify-between">
        <div className="grid grid-cols-6 gap-[3px]">
          {BACK_PATTERN.map((on, i) => (
            <span key={i} className={`size-[9px] ${on ? "bg-white" : "bg-transparent"}`} />
          ))}
        </div>
        <svg viewBox="0 0 20 20" className="size-[20px]" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
          <circle cx="10" cy="10" r="6" />
          <path d="M10 1v5M10 14v5M1 10h5M14 10h5" />
        </svg>
      </div>
      <p className="mt-[12px] font-mono text-[11px] tracking-[0.08em] opacity-80">ETC/PRC.0{index + 1}</p>
      <p className="mt-auto font-serif text-[86px] leading-none italic">{step.title.slice(0, 3).toUpperCase()}</p>
      <div className="mt-[28px] border-t border-dashed border-white/50 pt-[14px] font-mono text-[11px] tracking-[0.08em] opacity-80">
        <div className="flex justify-between">
          <span>STEP 0{index + 1} / 03</span>
          <span>▸▸</span>
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ label, kind }: { label: string; kind: string }) {
  let glyph: ReactNode;
  if (kind === "folder") {
    glyph = (
      <div className="relative mt-[10px] h-[46px] w-[60px] rounded-[6px] bg-[#5AA9F5]">
        <span className="absolute -top-[7px] left-0 h-[10px] w-[24px] rounded-t-[4px] bg-[#5AA9F5]" />
      </div>
    );
  } else if (kind === "doc") {
    glyph = (
      <div className="flex h-[60px] w-[48px] items-end justify-center rounded-[4px] bg-white pb-[8px] text-[9px] font-semibold text-muted shadow-sm">
        MD
      </div>
    );
  } else {
    glyph = (
      <div className="size-[56px] rounded-[6px] border-[3px] border-white bg-[linear-gradient(135deg,#C91F32,#EFE4D9)] shadow-sm" />
    );
  }
  return (
    <div className="flex w-[110px] flex-col items-center gap-[6px]">
      <div className="flex h-[62px] items-end">{glyph}</div>
      <span className="text-[13px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">{label}</span>
    </div>
  );
}

// A soft rolling-hills desktop wallpaper.
function Wallpaper() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C56C8" />
          <stop offset="0.45" stopColor="#4C8FE4" />
          <stop offset="0.7" stopColor="#A9CDF2" />
        </linearGradient>
        <linearGradient id="ps-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86C552" />
          <stop offset="0.5" stopColor="#48982A" />
          <stop offset="1" stopColor="#2C6B17" />
        </linearGradient>
        <linearGradient id="ps-hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FAE47" />
          <stop offset="1" stopColor="#3F7F26" />
        </linearGradient>
        <filter id="ps-cloud" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill="url(#ps-sky)" />
      <g fill="#fff" filter="url(#ps-cloud)">
        <ellipse cx="300" cy="170" rx="120" ry="28" opacity="0.85" />
        <ellipse cx="760" cy="90" rx="220" ry="34" opacity="0.6" />
        <ellipse cx="1180" cy="230" rx="170" ry="60" opacity="0.9" />
        <ellipse cx="960" cy="420" rx="260" ry="46" opacity="0.85" />
        <ellipse cx="1350" cy="470" rx="220" ry="54" opacity="0.9" />
        <ellipse cx="220" cy="300" rx="140" ry="30" opacity="0.7" />
        <ellipse cx="640" cy="360" rx="120" ry="40" opacity="0.8" />
      </g>
      <path d="M0 640 C 380 560 820 600 1600 520 L1600 1000 L0 1000 Z" fill="url(#ps-hill-back)" />
      <path d="M0 600 C 420 520 900 620 1600 760 L1600 1000 L0 1000 Z" fill="url(#ps-hill)" />
    </svg>
  );
}

// Retro light-blue CRT built around a screen-sized box: case, stepped bezel,
// speaker/power panel and base. Everything sits outside the screen, so it stays
// off-canvas while the desktop is full screen.
function CrtBody() {
  return (
    <div aria-hidden>
      {/* Base */}
      <div
        className="absolute rounded-b-[calc(var(--mw)*0.012)] bg-[linear-gradient(180deg,#4F7EC0_0%,#6693D2_35%,#5A88C9_100%)]"
        style={{ top: `calc(100% + ${u(0.195)})`, left: u(-0.015), right: u(0.02), height: u(0.05) }}
      >
        <span className="absolute bottom-0 left-[8%] h-[18%] w-[6%] translate-y-full rounded-b-full bg-[#3E679F]" />
        <span className="absolute right-[8%] bottom-0 h-[18%] w-[6%] translate-y-full rounded-b-full bg-[#3E679F]" />
      </div>

      {/* Top of the case, seen slightly from above */}
      <div
        className="absolute rounded-t-[calc(var(--mw)*0.014)] bg-[linear-gradient(180deg,#B3D0F3_0%,#8FB6EA_100%)]"
        style={{ top: u(-0.097), left: u(-0.058), right: u(-0.063), height: u(0.03) }}
      />

      {/* Front case */}
      <div
        className="absolute rounded-[calc(var(--mw)*0.014)] bg-[linear-gradient(180deg,#93B9EA_0%,#7CA7E0_30%,#6E9AD6_100%)] shadow-[inset_0_calc(var(--mw)*0.003)_0_rgba(255,255,255,0.45),inset_calc(var(--mw)*0.004)_0_calc(var(--mw)*0.01)_rgba(255,255,255,0.15),inset_calc(var(--mw)*-0.006)_0_calc(var(--mw)*0.012)_rgba(20,50,110,0.25)]"
        style={{ top: u(-0.085), bottom: u(-0.065), left: u(-0.07), right: u(-0.075) }}
      />
      {/* Raised inner frame */}
      <div
        className="absolute rounded-[calc(var(--mw)*0.01)] bg-[linear-gradient(180deg,#86B0E6_0%,#729FDB_100%)] shadow-[0_calc(var(--mw)*0.003)_calc(var(--mw)*0.008)_rgba(20,50,110,0.35),inset_0_calc(var(--mw)*0.002)_0_rgba(255,255,255,0.4)]"
        style={{ top: u(-0.058), bottom: u(-0.04), left: u(-0.047), right: u(-0.05) }}
      />
      {/* Recessed step into the tube */}
      <div
        className="absolute rounded-[calc(var(--mw)*0.008)] bg-[linear-gradient(180deg,#567FBC_0%,#6B97D3_45%,#7BA6DF_100%)] shadow-[inset_0_calc(var(--mw)*0.01)_calc(var(--mw)*0.016)_rgba(10,30,80,0.5)]"
        style={{ top: u(-0.036), bottom: u(-0.024), left: u(-0.028), right: u(-0.03) }}
      />

      {/* Control panel: speaker grille, LED and power button */}
      <div
        className="absolute rounded-[calc(var(--mw)*0.01)] bg-[linear-gradient(180deg,#8AB3E8_0%,#77A3DE_45%,#6491D0_100%)] shadow-[0_calc(var(--mw)*-0.002)_0_rgba(20,50,110,0.45),inset_0_calc(var(--mw)*0.003)_0_rgba(255,255,255,0.45),0_calc(var(--mw)*0.012)_calc(var(--mw)*0.02)_rgba(20,50,110,0.3)]"
        style={{ top: `calc(100% + ${u(0.067)})`, left: u(-0.1), right: u(-0.08), height: u(0.13) }}
      >
        <div
          className="absolute top-[12%] bottom-[12%] overflow-hidden rounded-[calc(var(--mw)*0.004)] bg-[repeating-linear-gradient(90deg,#3D649E_0_calc(var(--mw)*0.005),#7CA7E0_calc(var(--mw)*0.005)_calc(var(--mw)*0.011))] shadow-[inset_0_calc(var(--mw)*0.004)_calc(var(--mw)*0.006)_rgba(10,30,80,0.5)]"
          style={{ left: u(0.09), width: u(0.27) }}
        />
        <span
          className="absolute rounded-full bg-[#86E39A] shadow-[0_0_calc(var(--mw)*0.006)_#86E39A]"
          style={{ top: u(0.012), right: u(0.13), width: u(0.009), height: u(0.004) }}
        />
        <div
          className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[calc(var(--mw)*0.008)] border-[#4E7CBD] bg-[linear-gradient(180deg,#86B0E6,#6E9BD8)] shadow-[inset_0_calc(var(--mw)*0.002)_0_rgba(255,255,255,0.5)]"
          style={{ right: u(0.115), width: u(0.07), height: u(0.07), borderWidth: u(0.003) }}
        >
          <svg viewBox="0 0 24 24" className="size-[45%]" fill="none" stroke="#4E7CBD" strokeWidth={2} strokeLinecap="round">
            <path d="M12 3v8" />
            <path d="M6.3 7.3a8 8 0 1 0 11.4 0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const story = Strings.processStory;
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const crtRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const wallpaperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageShadowRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headLinesRef = useRef<HTMLSpanElement>(null);
  const italicRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const extrasRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  // Desktop only, and never for reduced-motion users.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(desktop.matches && !reduced.matches);
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
    const monitor = monitorRef.current;
    const crt = crtRef.current;
    const screen = screenRef.current;
    const screenContent = screenContentRef.current;
    const glass = glassRef.current;
    const wallpaper = wallpaperRef.current;
    const stage = stageRef.current;
    const stageShadow = stageShadowRef.current;
    const blob = blobRef.current;
    const fill = fillRef.current;
    const head = headRef.current;
    const headLines = headLinesRef.current;
    const italic = italicRef.current;
    const row = rowRef.current;
    const extras = extrasRef.current;
    if (
      !animated || !outer || !sticky || !monitor || !crt || !screen || !screenContent || !glass ||
      !wallpaper || !stage || !stageShadow || !blob || !fill || !head || !headLines || !italic || !row || !extras
    )
      return;

    let frame = 0;

    if (clockRef.current) {
      clockRef.current.textContent = new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    const render = () => {
      frame = 0;
      const w = sticky.clientWidth;
      const h = sticky.clientHeight;
      const p = clamp(-outer.getBoundingClientRect().top / (outer.offsetHeight - h));
      sticky.style.setProperty("--mw", `${w}px`);

      // 1. Headline rises in while the gradient dome climbs from the bottom.
      const intro = seg(p, 0, 0.08);
      head.style.opacity = `${intro}`;
      head.style.transform = `translateY(${(1 - intro) * 40}px)`;

      // 2. The gradient grows until it floods the page.
      const rise = seg(p, 0, 0.12);
      const flood = seg(p, 0.1, 0.24);
      const blobY = lerp(lerp(h * 0.85, h * 0.32, rise), 0, flood);
      const blobScale = lerp(lerp(0.75, 1.15, rise), 2.6, flood);
      blob.style.transform = `translate(-50%, -50%) translateY(${blobY}px) scale(${blobScale})`;
      fill.style.opacity = `${seg(p, 0.16, 0.28)}`;

      // 3. Headline softens behind the incoming cards.
      const soft = seg(p, 0.22, 0.34);
      headLines.style.filter = `blur(${soft * 7}px)`;
      headLines.style.opacity = `${1 - soft * 0.35}`;
      const softItalic = seg(p, 0.46, 0.58);
      italic.style.filter = `blur(${softItalic * 6}px)`;
      italic.style.opacity = `${1 - softItalic * 0.45}`;

      // 4. Cards fly up from below and flip from their red back to the white front.
      const fit = Math.min(1, (h - 330) / CARD_HEIGHT, (w - 80) / CARD_ROW_WIDTH);
      row.style.transform = `translateY(${ROW_OFFSET}px) scale(${fit})`;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const c = seg(p, 0.26 + i * 0.06, 0.44 + i * 0.06);
        const rest = CARD_REST[i];
        const y = lerp(h * 1.1, rest.drop, c);
        card.style.transform =
          `translate3d(0, ${y}px, 0) rotateX(${(1 - c) * -28}deg) ` +
          `rotateY(${(1 - c) * 180}deg) rotateZ(${lerp(i === 1 ? -8 : 8, rest.rotate, c)}deg)`;
      });
      extras.style.opacity = `${seg(p, 0.52, 0.6)}`;

      // 5. The page shrinks into a window on a desktop.
      const winA = seg(p, 0.62, 0.72);
      const winB = seg(p, 0.72, 0.8);
      const winScale = lerp(lerp(1, 0.62, winA), 0.45, winB);
      const winX = lerp(lerp(0.5, 0.38, winA), 0.27, winB) * w - w / 2;
      const winY = lerp(lerp(0.5, 0.6, winA), 0.71, winB) * h - h / 2;
      stage.style.width = `${w}px`;
      stage.style.height = `${h}px`;
      stage.style.transform = `translate(-50%, -50%) translate(${winX}px, ${winY}px) scale(${winScale})`;
      stage.style.borderRadius = `0 0 ${winA * 18}px ${winA * 18}px`;
      stageShadow.style.opacity = `${winA}`;
      wallpaper.style.transform = `scale(${lerp(1.12, 1, winA)})`;

      // 6. The desktop shrinks into a retro CRT: the screen settles to 4:3-ish and the
      //    whole monitor zooms out, then tilts as the page moves on.
      const mon = seg(p, 0.8, 0.94);
      const tilt = seg(p, 0.94, 1);
      const screenEnd = w / SCREEN_ASPECT;
      const screenH = lerp(h, screenEnd, mon);
      // The monitor keeps a fixed size so its content is painted once; the screen's
      // changing height is only a clip over it, and everything else is transforms.
      const monitorH = Math.max(h, screenEnd);
      const clipTop = (monitorH - screenH) / 2;
      const glassTop = (monitorH - screenEnd) / 2;
      const bodyH = screenEnd + w * (MONITOR_TOP + MONITOR_BOTTOM);
      const endScale = Math.min(0.5, (h * 0.68) / bodyH, 0.56 / MONITOR_WIDTH);
      const monScale = lerp(1, endScale, mon);
      // Centre the whole monitor (not just its screen), nudged down to clear the fixed navbar.
      const monY = ((-w * (MONITOR_BOTTOM - MONITOR_TOP)) / 2 * endScale + NAV_CLEARANCE) * mon;
      monitor.style.height = `${monitorH}px`;
      crt.style.top = `${glassTop}px`;
      crt.style.height = `${screenEnd}px`;
      screen.style.top = `${clipTop}px`;
      screen.style.height = `${screenH}px`;
      screenContent.style.height = `${monitorH}px`;
      screenContent.style.transform = `translateY(${-clipTop}px)`;
      glass.style.top = `${glassTop}px`;
      glass.style.height = `${screenEnd}px`;
      glass.style.transform = `scaleY(${screenH / screenEnd})`;
      monitor.style.transform =
        `translate(-50%, -50%) translateY(${monY}px) scale(${monScale}) rotate(${tilt * -4}deg)`;
      screen.style.borderRadius = `${mon * 6}% / ${mon * 8}%`;
      glass.style.opacity = `${mon}`;
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

  if (!animated) {
    return (
      <section className="bg-beige px-[20px] py-[80px] lg:flex lg:h-[972px] lg:items-center lg:justify-center lg:py-0">
        <div className="mx-auto grid max-w-[1102px] grid-cols-1 gap-[15px] md:grid-cols-3 lg:w-[1102px]">
          {Strings.process.map((step, i) => (
            <ProcessCard key={step.title} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={outerRef} className="relative bg-white" style={{ height: `${(PIN_SCREENS + 1) * 100}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-white">
        <div ref={monitorRef} className="absolute top-1/2 left-1/2 w-full will-change-transform">
          <div ref={crtRef} className="absolute inset-x-0">
            <CrtBody />
          </div>

          {/* The screen: a desktop with the page open in a window. */}
          <div ref={screenRef} className="absolute inset-x-0 overflow-hidden bg-[#1C56C8]">
            <div ref={screenContentRef} className="absolute inset-x-0 top-0 will-change-transform">
              <div ref={wallpaperRef} aria-hidden className="absolute inset-0 will-change-transform">
                <Wallpaper />
              </div>
              <div ref={stageRef} className="absolute top-1/2 left-1/2 bg-white will-change-transform">
                <div
                  ref={stageShadowRef}
                  aria-hidden
                  className="absolute inset-0 rounded-b-[18px] opacity-0 shadow-[0_30px_80px_rgba(0,0,0,0.35)] will-change-[opacity]"
                />
                {/* Window title bar, parked above the viewport while the page is full screen. */}
                <div
                  aria-hidden
                  className="absolute bottom-full left-0 flex h-[64px] w-full items-center justify-center rounded-t-[18px] bg-white"
                >
                  <div className="absolute left-[24px] flex gap-[12px]">
                    <span className="size-[18px] rounded-full bg-primary" />
                    <span className="size-[18px] rounded-full bg-[#D9D9D9]" />
                    <span className="size-[18px] rounded-full bg-[#D9D9D9]" />
                  </div>
                  <span className="font-heading text-[26px] font-medium text-primary">{story.windowTitle}</span>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  <div
                    ref={fillRef}
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C91F32_35%,#DE5465_80%,#F09AA5_100%)] opacity-0"
                  />
                  <div
                    ref={blobRef}
                    aria-hidden
                    className="absolute top-1/2 left-1/2 h-screen w-screen bg-[radial-gradient(closest-side,#C91F32_0%,#D23447_40%,#EE8E9A_70%,rgba(255,255,255,0)_100%)] will-change-transform"
                  />

                  <div ref={headRef} className="absolute inset-0 flex items-center justify-center px-[20px] opacity-0">
                    <h2 className="text-center text-white">
                      <span ref={headLinesRef} className="block will-change-[filter,opacity] font-heading text-[64px] leading-[66px] font-normal tracking-[-0.02em]">
                        {story.titleLine1}
                        <br />
                        {story.titleLine2}
                      </span>
                      <span ref={italicRef} className="block will-change-[filter,opacity] font-serif text-[68px] leading-[80px] italic">
                        {story.titleItalic}
                      </span>
                    </h2>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div ref={rowRef} className="relative">
                      <div ref={extrasRef} className="opacity-0">
                        <p className="absolute bottom-full left-1/2 mb-[30px] -translate-x-1/2 rounded-[50%] border border-white/70 px-[26px] py-[8px] font-serif text-[20px] whitespace-nowrap text-white italic">
                          {story.label}
                        </p>
                        <div className="absolute top-full left-1/2 mt-[48px] w-[420px] -translate-x-1/2 text-center text-[14px] leading-[20px] text-white/85">
                          <p className="font-serif text-[16px] italic">{story.noteTitle}</p>
                          <p className="mt-[4px] font-light">{story.noteBody}</p>
                        </div>
                      </div>
                      <div className="grid w-[1102px] grid-cols-3 gap-[15px] perspective-[1600px]">
                        {Strings.process.map((step, i) => (
                          <div
                            key={step.title}
                            ref={(el) => {
                              cardRefs.current[i] = el;
                            }}
                            className="relative transform-3d will-change-transform"
                          >
                            <ProcessCard index={i} className="backface-hidden shadow-[0_20px_50px_rgba(60,0,10,0.25)]" />
                            <CardBack index={i} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CRT glass: vignette and scanlines fade in as the monitor appears. */}
              <div
                ref={glassRef}
                aria-hidden
                className="pointer-events-none absolute inset-x-0 rounded-[6%/8%] will-change-[transform,opacity] bg-[radial-gradient(ellipse_at_28%_12%,rgba(255,255,255,0.22),transparent_45%),repeating-linear-gradient(0deg,rgba(0,0,0,0.07)_0_2px,transparent_2px_5px)] opacity-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.6),inset_0_0_0_10px_rgba(0,0,0,0.85)]"
              />
            </div>

            <div aria-hidden className="absolute top-[6%] right-[2.5%] flex flex-col gap-[22px]">
              {story.desktopIcons.map((icon) => (
                <DesktopIcon key={icon.label} label={icon.label} kind={icon.kind} />
              ))}
            </div>
            <div
              ref={clockRef}
              aria-hidden
              className="absolute right-[2.5%] bottom-[2.5%] text-[15px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
