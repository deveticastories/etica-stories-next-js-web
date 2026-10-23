import Image from "next/image";
import DecorStripes from "@/components/DecorStripes";
import SectionLabel from "@/components/about/SectionLabel";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

type Location = { label: string; title: string; body: string };

const STRIPES = [
  [115, 36, 260, 136],
  [65, 101, 210, 196],
  [20, 156, 120, 225],
] as const;

function LocationCard({
  location,
  tone,
  className,
  bodyClassName = "",
}: {
  location: Location;
  tone: "light" | "red" | "dark";
  className: string;
  bodyClassName?: string;
}) {
  const surface = { light: "bg-soft-card", red: "bg-primary", dark: "bg-black" }[tone];
  const label = tone === "red" ? "text-[#DDDDDD]" : "text-primary";
  const title = tone === "light" ? "text-heading" : "text-white";
  const body = { light: "text-soft-body", red: "text-[#E8E8E8]", dark: "text-[#D8D8D8]" }[tone];

  return (
    <div className={`relative z-20 rounded-[20px] px-[28px] py-[28px] lg:absolute lg:pb-0 ${surface} ${className}`}>
      <p className={`text-[10px] leading-[10px] font-bold tracking-[0.15em] ${label}`}>{location.label}</p>
      <h3 className={`mt-[3px] text-[20px] leading-[22px] font-medium tracking-[-0.02em] ${title}`}>
        {location.title}
      </h3>
      <p
        className={`mt-[17px] ${location.body.includes("\n") ? "" : "max-w-[230px]"} text-[17px] leading-[22px] font-light tracking-[-0.03em] whitespace-pre-line lg:text-[18px] ${body} ${bodyClassName}`}
      >
        {location.body}
      </p>
    </div>
  );
}

// Overlapping collage of the city photo and four location cards (996×741 on desktop).
export default function LocationsSection() {
  const { locations } = Strings.servicesPage;

  return (
    <section className="overflow-hidden bg-white px-[20px] pt-[96px] pb-[96px] lg:px-0 lg:pt-[237px] lg:pb-[202px]">
      <div className="text-center">
        <SectionLabel text={locations.label} />
        <h2 className="mt-[12px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[22px] lg:text-[54px] lg:leading-[55px] lg:tracking-[-0.04em]">
          {locations.titleLine1}
          <br />
          {locations.titleLine2}
        </h2>
      </div>

      <div className="relative mx-auto mt-[48px] flex max-w-[996px] flex-col gap-[16px] lg:mt-[112px] lg:ml-[calc(50%-500px)] lg:block lg:h-[741px]">
        <DecorStripes
          viewBox="0 0 280 240"
          lines={STRIPES}
          className="top-[-84px] left-[580px] hidden w-[280px] lg:block"
        />
        <div className="relative z-10 aspect-[427/545] w-full overflow-hidden rounded-[16px] lg:absolute lg:top-[59px] lg:left-[286px] lg:h-[545px] lg:w-[427px] lg:aspect-auto">
          <Image
            src={Images.services.locationCity}
            alt="City skyline at sunset"
            fill
            sizes="(min-width: 1024px) 427px, 100vw"
            className="object-cover"
          />
        </div>

        <LocationCard
          location={locations.headquarters}
          tone="light"
          className="lg:top-0 lg:left-0 lg:h-[192px] lg:w-[349px] lg:pt-[40px] lg:pl-[41px]"
        />
        <LocationCard
          location={locations.kerala}
          tone="red"
          className="lg:top-[111px] lg:left-[672px] lg:h-[191px] lg:w-[324px] lg:pt-[30px] lg:pl-[47px]"
        />
        <LocationCard
          location={locations.dubai}
          tone="dark"
          className="lg:top-[384px] lg:left-[41px] lg:h-[191px] lg:w-[324px] lg:pt-[28px] lg:pl-[29px]"
          bodyClassName="lg:mt-[12px]"
        />
        <LocationCard
          location={locations.global}
          tone="light"
          className="lg:top-[549px] lg:left-[600px] lg:h-[192px] lg:w-[324px] lg:pt-[34px] lg:pl-[46px]"
        />
      </div>
    </section>
  );
}
