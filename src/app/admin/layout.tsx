"use client";

import { useEffect, useState } from "react";

import { Hind_Siliguri } from "next/font/google";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import "./globals.css";

import Aside from "./_components/Aside";
import Nav from "./_components/Nav";

import { Toaster } from "sonner";
import Loading from "./loading";

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
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [asideState, setAsideState] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");

    const handleBreakpointChange = (
      e: MediaQueryListEvent | MediaQueryList,
    ) => {
      setIsScreenSmall(e.matches);
    };

    query.addEventListener("change", handleBreakpointChange);
    handleBreakpointChange(query);

    return () => query.removeEventListener("change", handleBreakpointChange);
  });

  const gridColumns = asideState
    ? "grid-cols-[0px_1fr] md:grid-cols-[300px_1fr]"
    : "grid-cols-[0px_1fr]";

  return (
    <body
      className={`${hindSiliguri.className} transition-all h-screen bg-neutral text-text-primary grid grid-rows-[64px_1fr] ${gridColumns}`}
    >
      <div className={`col-span-1 row-span-2 overflow-x-hidden transition-all`}>
        <Aside
          floating={isScreenSmall}
          isShowing={asideState}
          setIsShowing={setAsideState}
        ></Aside>
      </div>

      <Nav
        className="col-start-2"
        onClick={() => setAsideState(!asideState)}
      ></Nav>

      <main className="col-start-2 mx-3 lg:mx-0 relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>

      <Toaster expand={true}></Toaster>
    </body>
  );
}
