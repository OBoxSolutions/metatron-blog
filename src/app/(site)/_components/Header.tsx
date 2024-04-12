import HeaderLink from "./HeaderLink";

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
  return (
    <header className="bg-primary py-5">
      <div className="max-w-screen-xl mx-auto flex">
        <h1 className="text-3xl mr-auto">Metatron</h1>
        <nav>
          <ul className="flex gap-10">
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
