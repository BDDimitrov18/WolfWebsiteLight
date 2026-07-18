import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Film } from "@/components/sections/Film";
import { Pillars } from "@/components/sections/Pillars";
import { FreshStart } from "@/components/sections/FreshStart";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Film />
        <Pillars />
        <Story />
        <FreshStart />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
