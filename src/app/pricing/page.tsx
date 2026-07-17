import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";

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
        <CTA />
      </main>
      <Footer />
    </>
  );
}
