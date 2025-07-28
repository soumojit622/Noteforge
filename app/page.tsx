import CallToAction from "@/components/call-to-action";
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <Features />
      <CallToAction />
      <FAQsThree />
      <FooterSection />
    </div>
  );
}
