import type { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FCFAF6]">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}