import SectionLabel from "@/components/about/SectionLabel";
import Strings from "@/utils/Strings";

export default function AdvantageSection() {
  const { advantage } = Strings.aboutPage;

  return (
    <section className="bg-white px-[20px] pt-[96px] lg:px-0 lg:pt-[143px]">
      <div className="mx-auto max-w-[1440px] lg:pr-[71px] lg:pl-[62px]">
        <SectionLabel text={advantage.label} />
        <h2 className="mt-[16px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[16px] lg:text-[52px] lg:leading-[55px]">
          {advantage.titleLine1}
          <br />
          {advantage.titleLine2}
        </h2>
        <p className="mt-[16px] max-w-[650px] lg:mt-[20px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:text-[18px]">
          {advantage.body}
        </p>

        <ul className="mt-[56px] lg:mt-[100px]">
          {advantage.items.map((item) => (
            <li
              key={item.title}
              className="grid grid-cols-1 gap-[12px] border-t border-about-divider pt-[16px] pb-[48px] lg:grid-cols-[570px_1fr] lg:gap-0 lg:min-h-[177px] lg:pt-[13px] lg:pb-[81px]"
            >
              <h3 className="text-[20px] leading-[26px] font-normal tracking-[-0.01em] text-heading lg:pt-[2px] lg:pl-[3px] lg:text-[22px]">
                {item.title}
              </h3>
              <p className="max-w-[440px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:text-[18px]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
