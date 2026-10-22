import Colors from "@/utils/Colors";
import Strings from "@/utils/Strings";

function DiagonalShapes() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 866"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <g stroke={Colors.aboutShape} strokeWidth={190} strokeLinecap="round">
        <line x1={713} y1={45} x2={277} y2={445} />
        <line x1={907} y1={275} x2={473} y2={668} />
        <line x1={1105} y1={500} x2={560} y2={1000} />
      </g>
    </svg>
  );
}

export default function AboutSection() {
  const { about } = Strings;

  return (
    <section className="relative overflow-hidden bg-black py-[100px] lg:h-[866px] lg:py-0">
      <DiagonalShapes />
      <div className="relative mx-auto max-w-[1440px] px-[20px] lg:pt-[226px] lg:pl-[218px]">
        <p className="max-w-[1000px] text-[24px] leading-[38px] font-light tracking-[-0.025em] lg:text-[36px] lg:leading-[55px]">
          <span className="text-white">{about.highlight} </span>
          <span className="text-about-dim">{about.rest}</span>
        </p>
      </div>
    </section>
  );
}
