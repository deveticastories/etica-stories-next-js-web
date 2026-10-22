import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroVideo from "@/components/IntroVideo";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import MissionSection from "@/components/home/MissionSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TeamSection from "@/components/home/TeamSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomeScreen() {
  return (
    <>
      <IntroVideo />
      <Navbar activeHref="/" />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ProcessSection />
        <WhyChooseSection />
        <TeamSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
