import type { ComponentType } from "react";
import Button from "@/components/Button";
import SectionLabel from "@/components/about/SectionLabel";
import { GrowthBoxIcon, LocationIcon, TargetIcon, TeamIcon } from "@/components/Icons";
import Strings from "@/utils/Strings";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  team: TeamIcon,
  target: TargetIcon,
  location: LocationIcon,
  growth: GrowthBoxIcon,
};

// Title offset below the icon for each card, as placed in the design.
const TITLE_GAP = ["lg:mt-[62px]", "lg:mt-[68px]", "lg:mt-[64px]", "lg:mt-[64px]"];

export default function ApproachSection() {
  const { approach } = Strings.servicesPage;

  return (
    <section className="bg-white px-[20px] pt-[96px] lg:px-0 lg:pt-[29px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[48px] lg:flex-row lg:gap-0 lg:pl-[121px]">
        <div className="lg:w-[581px] lg:shrink-0 lg:pt-[14px]">
          <SectionLabel text={approach.label} />
          <h2 className="mt-[16px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[28px] lg:text-[54px] lg:leading-[55px] lg:tracking-[-0.04em]">
            {approach.titleLine1}{" "}
            <br className="hidden lg:block" />
            {approach.titleLine2}{" "}
            <br className="hidden lg:block" />
            {approach.titleLine3}
          </h2>
          <p className="mt-[24px] max-w-[480px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:mt-[31px] lg:text-[18px]">
            {approach.body}
          </p>
          <Button label={approach.cta} className="mt-[28px] lg:mt-[31px]" />
        </div>

        <ul className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-[repeat(2,324px)] lg:gap-x-[28px] lg:gap-y-[32px]">
          {approach.cards.map((card, i) => {
            const Icon = ICONS[card.icon];
            const dark = i === 0;
            return (
              <li
                key={card.title}
                className={`rounded-[16px] px-[18px] pt-[22px] pb-[28px] lg:h-[257px] lg:pb-0 ${
                  dark ? "bg-black" : "bg-soft-card"
                }`}
              >
                <span
                  className={`flex size-[42px] items-center justify-center rounded-full ${
                    dark ? "bg-white text-primary" : "bg-icon-red text-white"
                  }`}
                >
                  <Icon className="size-[22px]" />
                </span>
                <h3
                  className={`mt-[40px] text-[20px] leading-[24px] font-medium tracking-[-0.02em] ${TITLE_GAP[i]} ${
                    dark ? "text-white" : "text-heading"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-[11px] max-w-[250px] text-[17px] leading-[22px] font-light tracking-[-0.03em] lg:text-[18px] ${
                    dark ? "text-[#E8E8E8]" : "text-soft-body"
                  }`}
                >
                  {card.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
