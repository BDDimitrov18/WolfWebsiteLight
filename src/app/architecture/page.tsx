import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Architecture } from "@/components/sections/Architecture";
import { PageCta } from "@/components/sections/PageCta";

export const metadata: Metadata = {
  title: "Как работи",
  description:
    "Архитектурата на Wolf — вашият сървър, вашата база данни, целият екип в реално време.",
};

export default function ArchitecturePage() {
  return (
    <>
      <Navbar />
      <main>
        <Architecture />
        <PageCta />
      </main>
      <Footer />
    </>
  );
}
