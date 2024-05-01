import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-hind-siliguri",
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={`${hindSiliguri.className}`}>
      <div className="min-h-screen flex flex-col justify-center bg-neutral items-center gap-10 text-white">
        <Link
          href="/"
          className="text-accent text-xl fixed top-10 flex items-center gap-3"
        >
          <Icon path={mdiArrowLeft} size={1}></Icon>
          Go Home
        </Link>
        <h1 className="text-white text-5xl">Metatron</h1>
        <div className="max-w-md w-full mx-auto">{children}</div>
      </div>
    </body>
  );
}
