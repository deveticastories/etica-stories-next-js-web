import Image from "next/image";
import SectionLabel from "@/components/about/SectionLabel";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

export default function WhoWeServeSection() {
  const { whoWeServe } = Strings.aboutPage;

  return (
    <section className="bg-white px-[20px] pt-[48px] pb-[96px] lg:px-0 lg:pt-[175px] lg:pb-[171px]">
      <div className="mx-auto max-w-[1440px] text-center">
        <SectionLabel text={whoWeServe.label} />
        <h2 className="mt-[12px] font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:mt-[8px] lg:text-[52px] lg:leading-[55px]">
          {whoWeServe.titleLine1}
          <br />
          {whoWeServe.titleLine2}
        </h2>
        <p className="mx-auto mt-[20px] max-w-[645px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:mt-[25px] lg:text-[18px]">
          {whoWeServe.body}
        </p>
      </div>

      <ul className="mx-auto mt-[56px] flex max-w-[1316px] flex-wrap justify-center gap-x-[31px] gap-y-[30px] lg:mt-[115px]">
        {whoWeServe.audiences.map((audience, i) => (
          <li
            key={audience.title}
            className="w-full max-w-[418px] rounded-[14px] border border-border bg-white pt-[16px] pr-[15px] pb-[35px] pl-[15px] lg:h-[480px] lg:w-[418px]"
          >
            <div className="relative aspect-[388/192] overflow-hidden rounded-[12px]">
              <Image
                src={Images.about.serve[i]}
                alt=""
                fill
                sizes="(min-width: 1024px) 388px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="px-[19px]">
              <h3 className="mt-[40px] text-[22px] leading-[32px] font-medium tracking-[-0.01em] text-heading max-w-[310px] md:min-h-[64px] lg:mt-[54px]">
                {audience.title}
              </h3>
              <p className="mt-[17px] max-w-[320px] text-[17px] leading-[26px] font-light tracking-[-0.03em] text-body lg:text-[18px]">
                {audience.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
