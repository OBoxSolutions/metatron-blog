import Link from "next/link";
import { usePathname } from "next/navigation";

type AsideProps = {
  className?: string;
};

const links = [
  {
    icon: "",
    text: "Dashboard",
    href: "/admin",
  },
  {
    icon: "",
    text: "Posts",
    href: "/admin/posts",
  },
  {
    icon: "",
    text: "Users",
    href: "/admin/users",
  },
  {
    icon: "",
    text: "Comments",
    href: "/admin/comments",
  },
];

const Aside = (props: AsideProps) => {
  const pathname = usePathname();

  return (
    <aside className={props.className}>
      <h3 className="pl-4 py-4 text-2xl">Metatron Blog</h3>
      <ul className="p-4 flex flex-col gap-2">
        {links.map((link) => {
          return (
            <li
              key={`link-${link.text}`}
              className={` rounded ${pathname === link.href ? "bg-primary" : ""}`}
            >
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
