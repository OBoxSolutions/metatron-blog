import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metatron",
  description: "Mock blog about tech and learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
