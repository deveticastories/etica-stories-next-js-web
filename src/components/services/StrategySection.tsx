import Image from "next/image";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

export default function StrategySection() {
  const { strategy } = Strings.servicesPage;

  return (
    <section className="relative overflow-hidden bg-white px-[20px] pt-[96px] pb-[40px] lg:h-[1048px] lg:px-0 lg:pt-[273px] lg:pb-0">
      <span
        aria-hidden
        className="pointer-events-none absolute top-[250px] left-1/2 -translate-x-1/2 font-heading text-[120px] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-strategy-watermark select-none lg:top-[363px] lg:ml-[13px] lg:text-[370px]"
      >
        {strategy.watermark}
      </span>

      <h2 className="relative z-20 text-center font-heading tracking-[-0.02em]">
        <span className="block text-[40px] leading-[44px] font-normal text-heading lg:text-[78px] lg:leading-[80px] lg:tracking-[-0.05em]">
          {strategy.titleLine1}
        </span>
        <span className="block text-[44px] leading-[48px] font-semibold text-primary lg:text-[85px] lg:leading-[85px] lg:tracking-[-0.045em]">
          {strategy.titleLine2}
        </span>
      </h2>

      <div className="relative z-10 mx-auto mt-[16px] aspect-[779/530] w-full max-w-[779px] lg:absolute lg:top-[353px] lg:left-[calc(50%-351px)] lg:mt-0 lg:w-[779px]">
        <Image
          src={Images.services.strategyChess}
          alt="Chess pieces balanced on a seesaw, the red king outweighing the black pieces"
          fill
          sizes="(min-width: 1024px) 779px, 100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}
