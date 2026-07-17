import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeatureTour } from "@/components/sections/FeatureTour";
import { TitleChain } from "@/components/sections/TitleChain";

export const metadata: Metadata = {
  title: "Функционалности",
  description:
    "Обиколка на продукта — всеки екран на Wolf със снимки на реалния интерфейс, плюс специализираният модул за вериги на собственост.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeatureTour />
        <TitleChain />
      </main>
      <Footer />
    </>
  );
}
