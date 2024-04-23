import Link from "next/link";

import { mdiMenu } from "@mdi/js";

import Button from "@/components/Button";

type NavProps = {
  className?: string;
  onClick: () => void;
};

export default function Nav(props: NavProps) {
  return (
    <nav
      className={`flex bg-primary items-center px-5 gap-4 ${props.className}`}
    >
      <Button
        icon={mdiMenu}
        iconSize={1}
        className="mr-auto"
        onClick={props.onClick}
      ></Button>
      <Link href="/" target="_blank">
        See Site
      </Link>
      <div className="rounded-full p-3 bg-accent">
        <p className="w-6 h-6 text-center">JG</p>
      </div>
    </nav>
  );
}
