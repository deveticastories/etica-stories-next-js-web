import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServicesIntroSection from "@/components/services/ServicesIntroSection";
import PillarsSection from "@/components/services/PillarsSection";
import StrategySection from "@/components/services/StrategySection";
import ApproachSection from "@/components/services/ApproachSection";
import LocationsSection from "@/components/services/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

export default function ServicesScreen() {
  const { hero, cta } = Strings.servicesPage;

  return (
    <>
      <Navbar activeHref="/services" />
      <main>
        <PageHero
          {...hero}
          image={Images.services.hero}
          imageAlt="Laptop showing a marketing analytics dashboard"
          overlay={0.44}
        />
        <ServicesIntroSection />
        <PillarsSection />
        <StrategySection />
        <ApproachSection />
        <LocationsSection />
        <CtaSection
          eyebrow={cta.eyebrow}
          title={cta.title}
          body={cta.body}
          button={cta.button}
          image={Images.services.ctaHandshake}
          imageAlt="Business partners shaking hands in front of data screens"
          bodyClassName="max-w-[470px] tracking-[-0.03em]! lg:mt-[23px]!"
        />
      </main>
      <Footer />
    </>
  );
}
