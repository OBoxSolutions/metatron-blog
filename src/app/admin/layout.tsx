"use client";

import { Hind_Siliguri } from "next/font/google";

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
      <body className={hindSiliguri.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
