import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeatureTour } from "@/components/sections/FeatureTour";
import { PageCta } from "@/components/sections/PageCta";

export const metadata: Metadata = {
  title: "Обиколка на софтуера",
  description:
    "Обиколка на софтуера — всеки екран на Wolf със снимки на реалния интерфейс: поръчки, имоти, фактури, календар, справки и администрация.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeatureTour />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
