import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrivacyArticle } from "@/components/sections/PrivacyArticle";

export const metadata: Metadata = {
  title: "Поверителност",
  description:
    "Политика за поверителност на сайта на Wolf — какви данни се събират и как се използват.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyArticle />
      </main>
      <Footer />
    </>
  );
}
