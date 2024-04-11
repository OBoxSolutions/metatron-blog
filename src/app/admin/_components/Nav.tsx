import Link from "next/link";

type NavProps = {
  className?: string;
};

export default function Nav(props: NavProps) {
  return (
    <nav
      className={`flex bg-primary justify-end items-center px-5 gap-4 ${props.className}`}
    >
      <Link href="/" target="_blank">
        Ver Sitio
      </Link>
      <div className="rounded-full p-3 bg-accent">
        <p className="w-6 h-6 text-center">JG</p>
      </div>
    </nav>
  );
}
