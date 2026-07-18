import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoRequest } from "@/components/sections/DemoRequest";

export const metadata: Metadata = {
  title: "Демонстративна среща",
  description:
    "Запазете демонстративна среща — 30 минути разговор и демонстрация на Wolf на живо върху вашите работни процеси, без ангажимент.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main>
        <DemoRequest />
      </main>
      <Footer />
    </>
  );
}
