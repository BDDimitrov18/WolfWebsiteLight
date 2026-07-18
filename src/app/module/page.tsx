import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TitleChain } from "@/components/sections/TitleChain";
import { PageCta } from "@/components/sections/PageCta";

export const metadata: Metadata = {
  title: "Специализиран модул",
  description:
    "Специализираният модул на Wolf за проектантски данни — имоти, документи за собственост, собственици и пълномощни, свързани както в действителност.",
};

export default function ModulePage() {
  return (
    <>
      <Navbar />
      <main>
        <TitleChain />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
