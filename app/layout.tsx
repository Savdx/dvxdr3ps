import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import Navbar, { MobileNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopupModal from "@/components/PopupModal";

export const metadata: Metadata = {
  title: "DvxdR3ps — Curated Chinese Reps & 700€ in LoveGoBuy Coupons",
  description:
    "Browse 400+ verified products from trusted sellers. Sign up via our link and unlock 700€ in LoveGoBuy welcome coupons.",
  metadataBase: new URL("https://dvxdr3ps.vercel.app"),
  openGraph: {
    title: "DvxdR3ps — Curated Chinese Reps",
    description:
      "400+ verified products. 700€ in welcome coupons on LoveGoBuy.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen overflow-x-hidden bg-bg text-t1">
        <LangProvider>
          <PopupModal />
          <Navbar />
          <main className="relative z-[1]">{children}</main>
          <Footer />
          <MobileNav />
        </LangProvider>
      </body>
    </html>
  );
}
