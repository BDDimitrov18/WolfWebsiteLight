import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Film } from "@/components/sections/Film";
import { Pillars } from "@/components/sections/Pillars";
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
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
