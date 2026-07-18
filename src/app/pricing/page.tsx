import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { PageCta } from "@/components/sections/PageCta";

export const metadata: Metadata = {
  title: "Цени",
  description:
    "Цените на Wolf — месечна цена за цялата практика, не на потребител, или еднократен лиценз.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Pricing />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
