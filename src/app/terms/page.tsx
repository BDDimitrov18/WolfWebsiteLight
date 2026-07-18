import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsArticle } from "@/components/sections/TermsArticle";

export const metadata: Metadata = {
  title: "Общи условия",
  description:
    "Общи условия за ползване на софтуерната система Wolf — лицензи, абонамент, лицензионна услуга, данни и отговорност.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TermsArticle />
      </main>
      <Footer />
    </>
  );
}
