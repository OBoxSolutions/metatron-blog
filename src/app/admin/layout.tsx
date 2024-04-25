"use client";

import { useState } from "react";

import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Aside from "./_components/Aside";
import Nav from "./_components/Nav";

import { Toaster } from "sonner";

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
  const [asideState, setAsideState] = useState(true);

  const gridColumns = asideState
    ? "grid-cols-[0px_1fr] md:grid-cols-[300px_1fr]"
    : "grid-cols-[0px_1fr]";

  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.className} transition-all h-screen bg-neutral text-text-primary grid grid-rows-[64px_1fr] ${gridColumns}`}
      >
        <div
          className={`col-span-1 row-span-2 overflow-x-hidden transition-all ${
            asideState ? "" : "-scale-x-full"
          }`}
        >
          <Aside></Aside>
        </div>

        <Nav
          className="col-start-2"
          onClick={() => setAsideState(!asideState)}
        ></Nav>

        <main className="col-start-2">{children}</main>

        <Toaster expand={true}></Toaster>
      </body>
    </html>
  );
}
