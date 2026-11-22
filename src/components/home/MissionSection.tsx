import Image from "next/image";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";
import ClientLogos from "@/components/home/ClientLogos";

export default function MissionSection() {
  const { mission } = Strings;

  return (
    <section className="relative overflow-hidden bg-white pt-[120px] pb-[80px] xl:min-h-[1039px] lg:pt-[clamp(160px,17vw,251px)] lg:pb-[100px]">
      <span
        aria-hidden
        className="pointer-events-none absolute top-[-20px] left-1/2 -translate-x-1/2 font-sans text-[150px] leading-none font-[450] tracking-[-0.04em] whitespace-nowrap text-mission-watermark select-none [font-variation-settings:'opsz'_14] lg:top-[-76px] lg:left-[-321px] lg:translate-x-0 lg:text-[340px]"
      >
        {mission.watermark}
      </span>

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-[64px] px-[20px] lg:flex-row lg:items-start lg:justify-between lg:gap-[48px] lg:px-[48px] xl:gap-0 xl:pr-[103px] xl:pl-[132px]">
        <div className="flex min-w-0 flex-col gap-[64px] lg:flex-1 lg:gap-[clamp(80px,10vw,140px)]">
          {mission.blocks.map((block, i) => (
            <div key={block.title}>
              <h2 className="max-w-[600px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:text-[44px] lg:leading-[48px] xl:text-[52px] xl:leading-[55px]">
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

        <div className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:w-[42%] lg:shrink-0 xl:w-[500px]">
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

      <ClientLogos className="mx-auto mt-[80px] max-w-[1440px] px-[20px] lg:mt-[clamp(100px,9vw,140px)] lg:px-[48px]" />
    </section>
  );
}
