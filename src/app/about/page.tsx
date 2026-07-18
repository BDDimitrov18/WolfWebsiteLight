import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Story } from "@/components/sections/Story";
import { PageCta } from "@/components/sections/PageCta";

export const metadata: Metadata = {
  title: "За нас",
  description:
    "Практиката зад Wolf — „Геопроект Приморско“ ЕООД: три десетилетия геодезия по Южното Черноморие и системата, родена от растежа на бюрото.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* The fixed navbar overlays the top 64px — the Story band's own
          generous padding absorbs it on every viewport. */}
      <main className="pt-16">
        <Story />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
