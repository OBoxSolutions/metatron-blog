import type { Metadata } from "next";
import { Hind_Siliguri, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Header from "./_components/Header";
import Footer from "./_components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-hind-siliguri",
});

const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  title: "Metatron",
  description: "Mock blog about tech and learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.variable} ${garamond.variable} bg-neutral text-text-primary mx-2 md:mx-0`}
      >
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
