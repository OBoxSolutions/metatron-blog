import { useState } from "react";

import Link from "next/link";

import { mdiMenu } from "@mdi/js";

import Button from "@/components/Button";
import Menu from "@/components/Menu";

type NavProps = {
  className?: string;
  onClick: () => void;
};

export default function Nav(props: NavProps) {
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

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
      <div
        className="rounded-full p-3 bg-accent cursor-pointer relative"
        ref={(ref) => setAnchorEl(ref)}
      >
        <p className="w-6 h-6 text-center">JG</p>
      </div>

      {anchorEl && (
        <Menu anchorEl={anchorEl} menu={menu} setMenu={setMenu}>
          <ul className="flex flex-col gap-5">
            <Link href="/admin/profile">Profile</Link>
            <li>Logout</li>
          </ul>
        </Menu>
      )}
    </nav>
  );
}
