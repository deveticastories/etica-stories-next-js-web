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

type CtaSectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  button?: string;
  image?: string;
  imageAlt?: string;
  bodyClassName?: string;
};

export default function CtaSection({
  eyebrow,
  title = Strings.cta.title,
  body = Strings.cta.body,
  button = Strings.cta.button,
  image = Images.ctaLaptop,
  imageAlt = "Laptop showing an analytics dashboard",
  bodyClassName = "max-w-[520px]",
}: CtaSectionProps) {

  return (
    <section className="relative overflow-hidden bg-primary-dark px-[20px] py-[72px] lg:h-[662px] lg:px-0 lg:py-0">
      <BackgroundShapes />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-[48px] lg:flex-row lg:items-start lg:gap-0 lg:pt-[76px] lg:pl-[71px]">
        <div className="relative aspect-[537/510] w-full max-w-[537px] shrink-0 overflow-hidden rounded-[16px] lg:w-[537px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 537px, 100vw"
            className="object-cover"
          />
        </div>
        <div className={`lg:ml-[122px] ${eyebrow ? "lg:pt-[35px]" : "lg:pt-[129px]"}`}>
          {eyebrow && (
            <p className="mb-[12px] text-[18px] leading-[24px] font-normal tracking-[-0.01em] text-white lg:mb-[8px]">
              {eyebrow}
            </p>
          )}
          <h2 className="max-w-[600px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-white lg:text-[52px] lg:leading-[56px]">
            {title}
          </h2>
          <p className={`mt-[20px] ${bodyClassName} text-[17px] leading-[26px] font-light tracking-[-0.01em] text-white lg:mt-[16px] lg:text-[18px]`}>
            {body}
          </p>
          <Button label={button} variant="light" className="mt-[28px] lg:mt-[27px]" />
        </div>
      </div>
    </section>
  );
}
