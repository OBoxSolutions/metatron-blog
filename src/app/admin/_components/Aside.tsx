import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiPost,
  mdiAccountGroup,
  mdiComment,
} from "@mdi/js";

type AsideProps = {
  className?: string;
};

const links = [
  {
    icon: mdiViewDashboard,
    text: "Dashboard",
    href: "/admin",
  },
  {
    icon: mdiPost,
    text: "Posts",
    href: "/admin/posts",
  },
  {
    icon: mdiAccountGroup,
    text: "Users",
    href: "/admin/users",
  },
  {
    icon: mdiComment,
    text: "Comments",
    href: "/admin/comments",
  },
];

const Aside = (props: AsideProps) => {
  const pathname = usePathname();

  return (
    <aside className={`border-r border-gray-800 ${props.className}`}>
      <h3 className="pl-4 py-4 text-2xl">Metatron Blog</h3>
      <ul className="p-4 flex flex-col gap-2">
        {links.map((link) => {
          return (
            <li
              key={`link-${link.text}`}
              className={` rounded flex items-center px-4 ${pathname === link.href ? "bg-accent" : ""}`}
            >
              <Icon path={link.icon} size={1}></Icon>
              <Link className="p-3 block w-full" href={link.href}>
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
