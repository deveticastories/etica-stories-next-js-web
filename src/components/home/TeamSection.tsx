import Image from "next/image";
import Button from "@/components/Button";
import Fonts from "@/utils/Fonts";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

function CircularBadge({ text, className }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} aria-hidden>
      <defs>
        <path id="badge-circle" d="M90 90m-72 0a72 72 0 1 1 144 0a72 72 0 1 1 -144 0" />
      </defs>
      <text
        fill="#9B9999"
        fontFamily={Fonts.serif}
        fontSize={17}
        letterSpacing={7.4}
      >
        <textPath href="#badge-circle" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export default function TeamSection() {
  const { team } = Strings;

  return (
    <section className="bg-white px-[20px] pt-[96px] lg:px-0 lg:pt-[126px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[48px] lg:flex-row lg:items-start lg:justify-between lg:pr-[191px] lg:pl-[130px]">
        <div className="lg:pt-[153px]">
          <h2 className="max-w-[440px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:text-[52px] lg:leading-[54px]">
            {team.title}
          </h2>
          <p className="mt-[24px] max-w-[425px] text-[17px] leading-[26px] font-light tracking-[-0.01em] text-body lg:mt-[34px] lg:text-[18px]">
            {team.body}
          </p>
          <Button label={team.cta} className="mt-[24px] lg:mt-[19px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[443px] lg:mx-0 lg:w-[443px]">
          <div className="relative aspect-[443/536] overflow-hidden rounded-[16px] bg-black">
            <Image
              src={Images.team}
              alt="Etica Stories team lead"
              fill
              sizes="(min-width: 1024px) 443px, 100vw"
              className="object-cover"
            />
          </div>
          <CircularBadge
            text={team.badge}
            className="absolute -right-[81px] -bottom-[99px] size-[180px] motion-safe:animate-badge-spin max-lg:right-0 max-lg:-bottom-[90px] max-lg:size-[140px]"
          />
        </div>
      </div>
    </section>
  );
}
