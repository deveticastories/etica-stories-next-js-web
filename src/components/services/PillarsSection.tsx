import Image from "next/image";
import Button from "@/components/Button";
import PillarsHeading from "@/components/services/PillarsHeading";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

// Per-card layout from the design: cards alternate black / grey with the photo
// switching sides; body widths differ slightly card to card.
const LAYOUT = [
  { dark: true, imageRight: false, imageWidth: 619, bodyWidth: 500, servicesGap: 42, buttonGap: 24 },
  { dark: false, imageRight: true, imageWidth: 619, bodyWidth: 462, servicesGap: 42, buttonGap: 36 },
  { dark: true, imageRight: false, imageWidth: 619, bodyWidth: 540, servicesGap: 68, buttonGap: 24 },
  { dark: false, imageRight: true, imageWidth: 638, bodyWidth: 462, servicesGap: 42, buttonGap: 24 },
  { dark: true, imageRight: false, imageWidth: 619, bodyWidth: 480, servicesGap: 68, buttonGap: 30 },
] as const;

// Stacking cards: on desktop screens tall enough to hold a whole card, each card sticks just under
// the navbar, a little lower than the one before, so the next card slides up over it and the
// earlier cards' top edges stay visible as a stack.
const STACK_TOP = 110;
const STACK_STEP = 16;

function Bullet() {
  return (
    <span className="mt-[5px] flex size-[13px] shrink-0 items-center justify-center rounded-full bg-bullet-ring">
      <span className="size-[7px] rounded-full bg-bullet-dot" />
    </span>
  );
}

export default function PillarsSection() {
  const { pillars } = Strings.servicesPage;

  return (
    <section className="bg-white px-[20px] pt-[96px] lg:px-0 lg:pt-[234px]">
      <PillarsHeading label={pillars.label} title={pillars.title} />

      <ul className="mx-auto mt-[48px] flex max-w-[1312px] flex-col gap-[24px] lg:mt-[89px] lg:ml-[calc(50%-652px)] lg:gap-[46px]">
        {pillars.items.map((pillar, i) => {
          const layout = LAYOUT[i];
          return (
            <li
              key={pillar.title}
              className={`flex flex-col gap-[32px] rounded-[20px] p-[16px] pb-[40px] lg:h-[679px] lg:gap-0 lg:first:mb-[4px] lg:p-0 lg:[@media(min-height:860px)]:sticky lg:[@media(min-height:860px)]:top-[var(--stack-top)] lg:[@media(min-height:860px)]:shadow-[0_-24px_48px_-28px_rgba(0,0,0,0.45)] ${
                layout.dark ? "bg-black" : "bg-pillar-gray"
              } ${layout.imageRight ? "lg:flex-row-reverse lg:justify-between lg:pr-[30px]" : "lg:flex-row lg:pl-[25px]"}`}
              style={{ "--stack-top": `${STACK_TOP + i * STACK_STEP}px` } as React.CSSProperties}
            >
              <div
                className="relative aspect-[619/632] w-full shrink-0 overflow-hidden rounded-[16px] lg:mt-[25px] lg:h-[632px] lg:w-[var(--pillar-image)] lg:aspect-auto"
                style={{ "--pillar-image": `${layout.imageWidth}px` } as React.CSSProperties}
              >
                <Image
                  src={Images.services.pillars[i]}
                  alt=""
                  fill
                  sizes={`(min-width: 1024px) ${layout.imageWidth}px, 100vw`}
                  className="object-cover"
                />
              </div>

              <div
                className={`px-[8px] lg:px-0 ${
                  layout.imageRight ? "lg:pt-[69px] lg:pl-[51px]" : "lg:pt-[58px] lg:pl-[64px]"
                }`}
              >
                <span
                  className={`inline-flex h-[38px] items-center rounded-[10px] px-[16px] text-[17px] tracking-[-0.02em] lg:px-[17px] lg:text-[18px] ${
                    layout.dark ? "bg-pillar-pill text-white" : "bg-white text-black"
                  }`}
                >
                  {pillar.number} • SERVICE PILLAR
                </span>
                <h3 className="mt-[12px] text-[30px] leading-[40px] font-normal text-white lg:mt-[17px] lg:ml-[4px] lg:text-[36px] lg:leading-[44px]">
                  {pillar.title}
                </h3>
                <p
                  className="mt-[20px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-white lg:mt-[23px] lg:ml-[4px] lg:max-w-[var(--pillar-body)] lg:text-[18px]"
                  style={{ "--pillar-body": `${layout.bodyWidth}px` } as React.CSSProperties}
                >
                  {pillar.body}
                </p>
                <p
                  className="mt-[32px] text-[17px] leading-[24px] font-normal tracking-[-0.03em] text-white lg:mt-[var(--services-gap)] lg:ml-[1px] lg:text-[18px]"
                  style={{ "--services-gap": `${layout.servicesGap}px` } as React.CSSProperties}
                >
                  {pillars.servicesIncluded}
                </p>
                <ul className="mt-[20px] flex flex-col gap-[14px] sm:hidden">
                  {pillar.services.map((service) => (
                    <li key={service} className="flex gap-[8px]">
                      <Bullet />
                      <span className="text-[17px] leading-[23px] tracking-[0.01em] text-white">
                        {service.replace("\n", " ")}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Two independent columns: items alternate left/right, as in the design */}
                <div className="hidden sm:mt-[20px] sm:flex lg:mt-[31px]">
                  {[0, 1].map((col) => (
                    <ul key={col} className={`flex flex-col gap-[14px] lg:gap-[18px] ${col === 0 ? "sm:w-[263px]" : ""}`}>
                      {pillar.services
                        .filter((_, j) => j % 2 === col)
                        .map((service) => (
                          <li key={service} className="flex gap-[8px]">
                            <Bullet />
                            <span className="text-[17px] leading-[23px] font-normal tracking-[0.01em] whitespace-pre-line text-white lg:text-[18px]">
                              {service}
                            </span>
                          </li>
                        ))}
                    </ul>
                  ))}
                </div>
                <div
                  className="mt-[28px] lg:mt-[var(--button-gap)]"
                  style={{ "--button-gap": `${layout.buttonGap}px` } as React.CSSProperties}
                >
                  <Button label={pillars.cta} showArrow={false} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
