"use client";

import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Aside from "./_components/Aside";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-hind-siliguri",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.className} bg-neutral text-text-primary grid grid-cols-[300px_1fr] grid-rows-[64px_1fr]`}
      >
        <Aside className="col-span-1 row-span-2"></Aside>
        <header className="col-start-2">Some Header</header>
        <main className="col-start-2">{children}</main>
      </body>
    </html>
  );
}
