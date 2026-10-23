import type { ComponentType } from "react";
import SectionLabel from "@/components/about/SectionLabel";
import {
  BrandingIcon,
  CubeIcon,
  GrowthChartIcon,
  SeoIcon,
  SocialClickIcon,
} from "@/components/Icons";
import Strings from "@/utils/Strings";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  branding: BrandingIcon,
  growth: GrowthChartIcon,
  social: SocialClickIcon,
  seo: SeoIcon,
  software: CubeIcon,
};

export default function WhatWeDoSection() {
  const { whatWeDo } = Strings.aboutPage;

  return (
    <section className="bg-white px-[20px] pt-[96px] lg:px-0 lg:pt-[122px]">
      <div className="mx-auto max-w-[1440px] lg:pr-[54px] lg:pl-[62px]">
        <div className="flex flex-col gap-[24px] lg:max-w-[1307px] lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div>
            <SectionLabel text={whatWeDo.label} />
            <h2 className="mt-[16px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[17px] lg:text-[52px] lg:leading-[55px]">
              {whatWeDo.titleLine1}
              <br />
              {whatWeDo.titleLine2}
            </h2>
          </div>
          <p className="max-w-[540px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:pb-[7px] lg:text-[18px]">
            {whatWeDo.body}
          </p>
        </div>

        <hr className="mt-[32px] border-0 border-t border-about-divider lg:mt-[31px] lg:max-w-[1307px]" />

        <ul className="mt-[40px] grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:mt-[54px] lg:grid-cols-[repeat(3,418px)] lg:gap-x-[35px] lg:gap-y-[37px]">
          {whatWeDo.services.map((service) => {
            const Icon = ICONS[service.icon];
            // Two-line titles sit tighter to the icon and body, as in the design.
            const multiline = service.title.includes("\n");
            return (
              <li
                key={service.title}
                className="rounded-[10px] bg-service-card pt-[21px] pr-[18px] pb-[22px] pl-[17px]"
              >
                <span className="flex h-[64px] w-[61px] items-center justify-center rounded-[3px] bg-white">
                  <Icon className="size-[22px]" />
                </span>
                <h3 className={`${multiline ? "mt-[17px]" : "mt-[24px]"} text-[22px] leading-[23px] font-medium tracking-[-0.01em] whitespace-pre-line text-heading`}>
                  {service.title}
                </h3>
                <p className={`${multiline ? "mt-[17px]" : "mt-[20px]"} text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:text-[18px]`}>
                  {service.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
