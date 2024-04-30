"use client";

import { useState } from "react";

import Link from "next/link";

import useAuthStore from "@/stores/auth/auth.store";

import HeaderLink from "./HeaderLink";

import Menu from "@/components/Menu";
import Image from "next/image";

export default function Header() {
  const logged = useAuthStore((state) => state.logged);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const userName = useAuthStore((state) => state.name);
  const logout = useAuthStore((state) => state.logout);
  const [menu, setMenu] = useState(false);
  const userId = useAuthStore((state) => state.uid);

  const userNameInitials = userName
    ? userName
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("")
    : "";

  let links = [
    {
      icon: "",
      text: "Home",
      href: "/",
    },
    {
      icon: "",
      text: "Search",
      href: "/search/",
    },
    {
      icon: "",
      text: "Admin",
      href: "/admin/",
    },
  ];

  if (!logged) {
    links.push({
      icon: "",
      text: "Login",
      href: "/login",
    });
  }

  return (
    <header className="bg-primary py-5">
      <div className="max-w-screen-xl mx-auto flex">
        <div className="flex items-center flex-1">
          <Link className="hover:opacity-75 cursor-pointer" href={"/"}>
            <Image
              src={"/simple_logo.svg"}
              alt="Metatron"
              className="mr-4"
              width={64}
              height={64}
            />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-10 h-full items-center ">
            {links.map((link) => (
              <HeaderLink
                key={`header-link-${link.href}`}
                link={link}
              ></HeaderLink>
            ))}

            {logged && (
              <div
                className="rounded-full p-3 bg-accent cursor-pointer relative"
                ref={(ref) => setAnchorEl(ref)}
              >
                <p className="w-6 h-6 text-center">{userNameInitials}</p>
              </div>
            )}
            {anchorEl && (
              <Menu anchorEl={anchorEl} menu={menu} setMenu={setMenu}>
                <ul className="flex flex-col gap-5">
                  <Link href={`/profile/${userId}`}>Profile</Link>
                  <li onClick={logout}>Logout</li>
                </ul>
              </Menu>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
