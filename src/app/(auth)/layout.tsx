import "./globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-neutral items-center gap-10">
      <h1 className="text-white text-5xl">Metatron</h1>
      <div className="max-w-md w-full mx-auto">{children}</div>
    </div>
  );
}
