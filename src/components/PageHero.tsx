import Image from "next/image";
import Button from "@/components/Button";

type PageHeroProps = {
  titleLine1: string;
  titleLine2: string;
  subtitle?: string;
  body: string;
  bodyNote?: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  imageAlt: string;
  // Strength of the black overlay laid over the photo (0–1).
  overlay: number;
};

// Full-bleed photo hero used at the top of the inner pages (About, Services).
export default function PageHero({
  titleLine1,
  titleLine2,
  subtitle,
  body,
  bodyNote,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  overlay,
}: PageHeroProps) {
  return (
    <section className="relative flex h-[680px] flex-col justify-end overflow-hidden bg-black px-[20px] pb-[64px] lg:h-[979px] lg:px-0 lg:pb-[151px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[30%_center] lg:object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />

      <div className="relative mx-auto w-full max-w-[1440px] lg:pl-[97px]">
        <h1 className="font-heading text-[38px] leading-[42px] font-medium tracking-[-0.02em] text-white sm:text-[48px] sm:leading-[52px] lg:text-[58px] lg:leading-[60px]">
          {titleLine1}{" "}
          <br className="hidden sm:block" />
          {titleLine2}
        </h1>
        {subtitle && (
          <p className="mt-[14px] text-[17px] leading-[24px] font-normal tracking-[-0.03em] text-hero-subtitle lg:pl-[15px] lg:text-[18px]">
            {subtitle}
          </p>
        )}
        <p
          className={`max-w-[620px] text-[16px] leading-[24px] font-light tracking-[-0.03em] text-white ${
            subtitle ? "mt-[24px] lg:mt-[22px]" : "mt-[24px] lg:mt-[40px]"
          }`}
        >
          {body}
          {bodyNote && (
            <>
              <br />
              {bodyNote}
            </>
          )}
        </p>
        <div className="mt-[25px] flex flex-wrap gap-[18px]">
          <Button label={primaryCta} />
          <Button label={secondaryCta} href="#" variant="outline" />
        </div>
      </div>
    </section>
  );
}
