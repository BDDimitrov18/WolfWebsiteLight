import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Film } from "@/components/sections/Film";
import { Pillars } from "@/components/sections/Pillars";
import { FeatureTour } from "@/components/sections/FeatureTour";
import { TitleChain } from "@/components/sections/TitleChain";
import { Architecture } from "@/components/sections/Architecture";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Film />
        <Pillars />
        <FeatureTour />
        <TitleChain />
        <Architecture />
        <Pricing />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
