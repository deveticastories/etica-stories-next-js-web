import Image from "next/image";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

export default function MissionSection() {
  const { mission } = Strings;

  return (
    <section className="relative overflow-hidden bg-white pt-[120px] pb-[80px] lg:h-[1039px] lg:pt-[251px] lg:pb-0">
      <span
        aria-hidden
        className="pointer-events-none absolute top-[-20px] left-1/2 -translate-x-1/2 font-sans text-[150px] leading-none font-[450] tracking-[-0.04em] whitespace-nowrap text-mission-watermark select-none [font-variation-settings:'opsz'_14] lg:top-[-76px] lg:left-[-321px] lg:translate-x-0 lg:text-[340px]"
      >
        {mission.watermark}
      </span>

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-[64px] px-[20px] lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:pr-[103px] lg:pl-[132px]">
        <div className="flex flex-col gap-[64px] lg:gap-[140px]">
          {mission.blocks.map((block, i) => (
            <div key={block.title}>
              <h2 className="max-w-[600px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:text-[52px] lg:leading-[55px]">
                {block.title}
              </h2>
              <p
                className={`mt-[24px] text-[17px] leading-[26px] font-light tracking-[-0.01em] text-body lg:text-[18px] ${
                  i === 0 ? "max-w-[535px] lg:mt-[34px]" : "max-w-[640px] lg:mt-[24px]"
                }`}
              >
                {block.body}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:w-[500px] lg:shrink-0">
          <div className="relative aspect-[500/619] overflow-hidden rounded-[18px]">
            <Image
              src={Images.mission}
              alt="Etica Stories strategist presenting growth analytics to the team"
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
            />
          </div>
          <span className="absolute top-0 left-1/2 flex size-[132px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
            <span className="size-[72px] rounded-full bg-primary" />
          </span>
        </div>
      </div>
    </section>
  );
}
