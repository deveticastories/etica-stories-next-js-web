import Image from "next/image";
import Button from "@/components/Button";
import Colors from "@/utils/Colors";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

function BackgroundShapes() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 662"
      preserveAspectRatio="xMaxYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <circle cx={1031} cy={182} r={108} fill={Colors.primarySoft} />
      <line
        x1={1210}
        y1={392}
        x2={1560}
        y2={780}
        stroke={Colors.primarySoft}
        strokeWidth={194}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CtaSection() {
  const { cta } = Strings;

  return (
    <section className="relative overflow-hidden bg-primary-dark px-[20px] py-[72px] lg:h-[662px] lg:px-0 lg:py-0">
      <BackgroundShapes />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-[48px] lg:flex-row lg:items-start lg:gap-0 lg:pt-[76px] lg:pl-[71px]">
        <div className="relative aspect-[537/510] w-full max-w-[537px] shrink-0 overflow-hidden rounded-[16px] lg:w-[537px]">
          <Image
            src={Images.ctaLaptop}
            alt="Laptop showing an analytics dashboard"
            fill
            sizes="(min-width: 1024px) 537px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:ml-[122px] lg:pt-[129px]">
          <h2 className="max-w-[600px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-white lg:text-[52px] lg:leading-[56px]">
            {cta.title}
          </h2>
          <p className="mt-[20px] max-w-[520px] text-[17px] leading-[26px] font-light tracking-[-0.01em] text-white lg:mt-[16px] lg:text-[18px]">
            {cta.body}
          </p>
          <Button label={cta.button} variant="light" className="mt-[28px] lg:mt-[27px]" />
        </div>
      </div>
    </section>
  );
}
