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

  const gridColumns = asideState ? "grid-cols-[300px_1fr]" : "grid-cols-1";

  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.className} h-screen bg-neutral text-text-primary grid grid-rows-[64px_1fr] ${gridColumns}`}
      >
        <Aside
          className={`col-span-1 row-span-2 ${asideState ? "" : "hidden"}`}
        ></Aside>

        <Nav
          className={`${asideState ? "col-start-2" : "col-span-1"}`}
          onClick={() => setAsideState(!asideState)}
        ></Nav>

        <main className={`${asideState ? "col-start-2" : "col-span-1"}`}>
          {children}
        </main>

        <Toaster expand={true}></Toaster>
      </body>
    </html>
  );
}
