"use client";

import useAuthStore from "@/stores/auth/auth.store";
import HeaderLink from "./HeaderLink";
import Button from "@/components/Button";

const links = [
  {
    icon: "",
    text: "Home",
    href: "/",
  },
  {
    icon: "",
    text: "Admin",
    href: "/admin/",
  },
  {
    icon: "",
    text: "Login",
    href: "/login/",
  },
];

export default function Header() {
  const logged = useAuthStore((state) => state.logged);
  const userName = useAuthStore((state) => state.name);
  const logout=useAuthStore(state=>state.logout)

  !logged
    ? [
        ...links.slice(0, 2),
        {
          icon: "",
          text: "Logout",
          href: "/login/",
        },
      ]
    : links;

  return (
    <header className="bg-primary py-5">
      <div className="max-w-screen-xl mx-auto flex">
        <h1 className="text-3xl mr-auto">Metatron</h1>
        <nav>
          {logged && (
            <>
              <span className="flex justify-center items-center">
                <h5 className="text-sm ml-4 ">
                  {userName} <span className="text-green-400">Logeado</span>
                </h5>
              <Button onClick={logout} className="text-red-500 hover:text-red-700 text-md bg-transparent">Logout</Button>
              </span>
            </>
          )}
          <ul className="flex gap-10 h-full items-center">
            {links.map((link) => (
              <HeaderLink
                key={`header-link-${link.href}`}
                link={link}
              ></HeaderLink>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
