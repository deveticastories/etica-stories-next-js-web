import type { ComponentType } from "react";
import Image from "next/image";
import SectionLabel from "@/components/about/SectionLabel";
import {
  DigitalStrategyIcon,
  GrowthMarketingIcon,
  WebSolutionsIcon,
} from "@/components/Icons";
import Colors from "@/utils/Colors";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

function BackgroundShapes() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 957"
      preserveAspectRatio="xMinYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <circle cx={441} cy={569} r={107} fill={Colors.aboutMissionShape} />
      <line
        x1={235}
        y1={824}
        x2={-200}
        y2={1260}
        stroke={Colors.aboutMissionShape}
        strokeWidth={190}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Badge({
  label,
  Icon,
  className,
}: {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  className: string;
}) {
  return (
    <span
      className={`absolute flex h-[40px] items-center gap-[8px] rounded-[8px] bg-white px-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.12)] lg:h-[52px] lg:gap-[10px] lg:px-[14px] ${className}`}
    >
      <Icon className="size-[18px] shrink-0 lg:size-[22px]" />
      <span className="font-heading text-[12px] font-medium whitespace-nowrap text-heading lg:text-[14px]">
        {label}
      </span>
    </span>
  );
}

// Positions are percentages of the 715×614 collage frame from the design.
export default function OurMissionSection() {
  const { mission } = Strings.aboutPage;

  return (
    <section className="relative overflow-hidden bg-black px-[20px] py-[96px] lg:h-[957px] lg:px-0 lg:py-0">
      <BackgroundShapes />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-[64px] lg:block lg:pt-[166px] lg:pl-[75px]">
        <div className="lg:pt-[47px]">
          <SectionLabel text={mission.label} />
          <h2 className="mt-[16px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-white lg:mt-[19px] lg:whitespace-nowrap lg:text-[52px] lg:leading-[55px]">
            {mission.titleLine1}{" "}
            <br className="hidden sm:block" />
            {mission.titleLine2}
          </h2>
          <div className="mt-[20px] max-w-[500px] lg:mt-[18px]">
            {mission.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-[17px] leading-[26px] font-light tracking-[-0.03em] text-white lg:text-[18px] ${
                  i > 0 ? "mt-[26px]" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[715/614] w-full max-w-[715px] lg:absolute lg:top-[166px] lg:left-[661px] lg:mx-0 lg:w-[715px]">
          <div className="absolute top-[4.23%] left-[12.31%] h-[50.49%] w-[51.05%] overflow-hidden rounded-[12px]">
            <Image
              src={Images.about.missionWeb}
              alt="Developer writing code on a desktop computer"
              fill
              sizes="(min-width: 1024px) 365px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-[57.65%] left-[12.45%] h-[42.35%] w-[87.55%] overflow-hidden rounded-[14px]">
            <Image
              src={Images.about.missionStrategy}
              alt="Strategist presenting business analytics to the team"
              fill
              sizes="(min-width: 1024px) 626px, 90vw"
              className="object-cover"
            />
          </div>

          <Badge label={mission.badges.web} Icon={WebSolutionsIcon} className="top-0 left-[5.03%]" />
          <Badge
            label={mission.badges.strategy}
            Icon={DigitalStrategyIcon}
            className="top-[53.42%] right-[1.68%]"
          />
          <Badge
            label={mission.badges.growth}
            Icon={GrowthMarketingIcon}
            className="top-[88.44%] left-0"
          />
        </div>
      </div>
    </section>
  );
}
