import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import OurMissionSection from "@/components/about/OurMissionSection";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import AdvantageSection from "@/components/about/AdvantageSection";
import WhoWeServeSection from "@/components/about/WhoWeServeSection";
import CtaSection from "@/components/home/CtaSection";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

export default function AboutScreen() {
  const { hero, cta } = Strings.aboutPage;

  return (
    <>
      <Navbar activeHref="/about" />
      <main>
        <PageHero
          {...hero}
          image={Images.about.hero}
          imageAlt="Etica Stories strategists reviewing growth analytics on a monitor"
          overlay={0.27}
        />
        <WhoWeAreSection />
        <OurMissionSection />
        <WhatWeDoSection />
        <AdvantageSection />
        <WhoWeServeSection />
        <CtaSection
          eyebrow={cta.eyebrow}
          title={cta.title}
          body={cta.body}
          button={cta.button}
          image={Images.services.ctaHandshake}
          imageAlt="Business partners shaking hands in front of data screens"
        />
      </main>
      <Footer />
    </>
  );
}
