import Image from "next/image";
import DecorStripes from "@/components/DecorStripes";
import SectionLabel from "@/components/about/SectionLabel";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

const STRIPES = [
  [85, 44, 232, 150],
  [45, 116, 180, 214],
] as const;

function QuoteMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute font-serif text-[91px] leading-none font-bold text-primary select-none ${className}`}
    >
      {className.includes("closing") ? "”" : "“"}
    </span>
  );
}

export default function ServicesIntroSection() {
  const { intro } = Strings.servicesPage;

  return (
    <section className="relative overflow-hidden bg-white px-[20px] pt-[96px] lg:px-0 lg:pt-[157px]">
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-[56px] lg:block lg:h-[603px]">
        {/* Photo collage — positions from the 1440px design */}
        <div className="relative mx-auto aspect-[672/603] w-full max-w-[672px] lg:absolute lg:top-0 lg:left-[67px] lg:mx-0 lg:w-[672px]">
          <DecorStripes
            viewBox="0 0 300 300"
            lines={STRIPES}
            className="top-[-9.95%] left-[46.58%] w-[44.64%]"
          />
          <div className="absolute top-0 left-0 h-[70.81%] w-[49.11%] overflow-hidden rounded-[16px]">
            <Image
              src={Images.services.approachTeam}
              alt="Etica Stories team reviewing work on a laptop"
              fill
              sizes="(min-width: 1024px) 330px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-[29.19%] left-[51.79%] h-[70.81%] w-[48.21%] overflow-hidden rounded-[16px]">
            <Image
              src={Images.services.approachDesk}
              alt="Finance dashboard on a desktop computer"
              fill
              sizes="(min-width: 1024px) 324px, 50vw"
              className="object-cover"
            />
          </div>
          <span className="absolute top-[57.05%] left-[37.95%] flex size-[20.24%] items-center justify-center rounded-full bg-white">
            <span className="size-[52.94%] rounded-full bg-primary" />
          </span>
        </div>

        <div className="lg:absolute lg:top-[36px] lg:left-[802px] lg:w-[544px]">
          <SectionLabel text={intro.label} />
          <h2 className="mt-[12px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[14px] lg:text-[54px] lg:tracking-[-0.04em] lg:leading-[55px]">
            {intro.titleLine1}
            <br />
            {intro.titleLine2}
          </h2>
          <p className="mt-[24px] max-w-[540px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:mt-[27px] lg:text-[18px]">
            {intro.body}
          </p>

          <blockquote className="relative mt-[48px] rounded-[16px] bg-black px-[32px] pt-[64px] pb-[56px] lg:mt-[95px] lg:h-[195px] lg:pt-[44px] lg:pr-[110px] lg:pb-0 lg:pl-[124px]">
            <QuoteMark className="top-[6px] left-[24px] lg:left-[43px]" />
            <p className="text-[17px] leading-[26px] font-light tracking-[-0.03em] text-[#EDEDED] lg:max-w-[310px] lg:text-[18px]">
              <strong className="font-medium text-white">{intro.quoteLead}</strong>
              {intro.quoteRest}
            </p>
            <QuoteMark className="closing right-[24px] bottom-[-34px] lg:top-[97px] lg:right-auto lg:bottom-auto lg:left-[445px]" />
          </blockquote>
        </div>
      </div>
    </section>
  );
}
