import Colors from "@/utils/Colors";
import Strings from "@/utils/Strings";
import SectionLabel from "@/components/about/SectionLabel";

export default function WhoWeAreSection() {
  const { whoWeAre } = Strings.aboutPage;

  return (
    <section className="relative overflow-hidden bg-white px-[20px] pt-[150px] pb-[96px] lg:px-0 lg:pt-[224px] lg:pb-[141px]">
      <span
        aria-hidden
        className="pointer-events-none absolute top-[-40px] left-1/2 -translate-x-1/2 font-sans text-[150px] leading-none font-medium tracking-[-0.045em] whitespace-nowrap text-mission-watermark select-none [font-variation-settings:'opsz'_14] lg:top-[-100px] lg:ml-[-61px] lg:text-[340px]"
      >
        {whoWeAre.watermark}
      </span>

      <div className="relative mx-auto max-w-[1440px] lg:pr-[105px] lg:pl-[62px]">
        <SectionLabel text={whoWeAre.label} className="lg:pl-[3px]" />

        <p className="mt-[32px] max-w-[1100px] text-[24px] leading-[38px] font-light tracking-[-0.035em] [font-variation-settings:'opsz'_14] lg:mt-[58px] lg:text-[36px] lg:leading-[55px]">
          <span className="text-black">
            {whoWeAre.highlightLine1}
            <br className="hidden lg:block" /> {whoWeAre.highlightLine2}{" "}
          </span>
          <span className="text-about-dim">{whoWeAre.rest}</span>
        </p>

        <hr className="mt-[48px] border-0 border-t border-about-rule lg:mt-[79px]" />

        <p className="mt-[34px] max-w-[1260px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:text-[18px]">
          {whoWeAre.bodyStart}
          <span className="text-primary">{whoWeAre.bodyHighlight}</span>
          {whoWeAre.bodyEnd}
        </p>

        <div className="mt-[44px] flex items-center gap-[18px]">
          <div className="flex shrink-0">
            {Colors.avatars.map((color, i) => (
              <span
                key={color}
                className={`size-[30px] rounded-full ${i > 0 ? "-ml-[6px]" : ""}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div>
            <p className="font-heading text-[14px] leading-[18px] font-medium text-black">
              {whoWeAre.creatorsTitle}
            </p>
            <p className="text-[11px] leading-[16px] font-light text-muted">
              {whoWeAre.creatorsBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
