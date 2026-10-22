import Logo from "@/components/Logo";
import { CheckCircleIcon, CrossCircleIcon } from "@/components/Icons";
import Strings from "@/utils/Strings";

function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 60" fill="none" className={className} aria-hidden>
      <path
        d="M3 57C8 38 25 31 50 31C72 31 76 34 100 32C120 30 138 24 154 13M154 13L141 14M154 13L149 25"
        stroke="#A6A6A6"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhyChooseSection() {
  const { whyChoose } = Strings;

  return (
    <section className="relative overflow-hidden bg-black px-[20px] pt-[96px] pb-[140px] lg:h-[1040px] lg:px-0 lg:pt-[125px] lg:pb-0">
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-40px] left-[-100px] bg-[linear-gradient(180deg,#000000_10%,#070707_13%,#1C1C1C_74%)] bg-clip-text font-sans text-[160px] leading-none font-[550] tracking-[-0.02em] whitespace-nowrap text-transparent select-none lg:bottom-[-97px] lg:left-[-234px] lg:text-[368px]"
      >
        {whyChoose.watermark}
      </span>

      <div className="relative text-center lg:translate-x-[-24px]">
        <h2 className="font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-white lg:text-[52px] lg:leading-[55px]">
          {whyChoose.titleStart}
          <span className="text-primary">{whyChoose.titleBrand}</span>
          <br />
          {whyChoose.titleEnd}
        </h2>
        <p className="mx-auto mt-[24px] max-w-[490px] text-[17px] leading-[26px] font-light tracking-[-0.01em] text-light-text lg:mt-[37px] lg:text-[18px]">
          {whyChoose.subtitle}
        </p>
      </div>

      <div className="relative mx-auto mt-[56px] flex max-w-[940px] flex-col items-center gap-[32px] lg:mt-[171px] lg:translate-x-[-12px] lg:flex-row lg:items-stretch lg:gap-[120px]">
        <div className="relative w-full max-w-[416px] lg:w-[416px]">
          <div className="absolute -top-[56px] left-[95px] hidden lg:block">
            <CurvedArrow className="h-[60px] w-[160px]" />
          </div>
          <p className="mb-[16px] text-center text-[22px] font-light text-italic-text italic lg:absolute lg:-top-[82px] lg:left-[272px] lg:mb-0 lg:text-[24px] lg:whitespace-nowrap">
            {whyChoose.otherCompaniesLabel}
          </p>
          <ul className="flex h-full flex-col justify-center gap-[20px] rounded-[20px] bg-dark-card py-[48px] pr-[40px] pl-[35px] lg:h-[444px] lg:py-0">
            {whyChoose.others.map((item) => (
              <li key={item} className="flex items-start gap-[20px]">
                <CrossCircleIcon className="mt-[1px] size-[20px] shrink-0" />
                <span className="text-[18px] leading-[22px] font-normal text-light-text">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-[404px] rounded-[20px] bg-white px-[32px] pt-[27px] pb-[48px] lg:h-[444px] lg:w-[404px] lg:pr-[24px] lg:pb-0">
          <Logo className="mx-auto h-[34px] w-auto" />
          <ul className="mt-[25px] flex flex-col gap-[20px]">
            {whyChoose.etica.map((item) => (
              <li key={item} className="flex items-start gap-[19px]">
                <CheckCircleIcon className="mt-[1px] size-[20px] shrink-0" />
                <span className="text-[18px] leading-[22px] font-normal text-heading">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
