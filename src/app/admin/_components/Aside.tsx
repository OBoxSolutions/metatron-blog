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
    href: "/posts",
  },
  {
    icon: "",
    text: "Users",
    href: "/users",
  },
  {
    icon: "",
    text: "Comments",
    href: "/comments",
  },
];

const Aside = (props: AsideProps) => {
  return (
    <aside className={props.className}>
      <ul className="p-4 flex flex-col gap-5">
        {links.map((link) => {
          return (
            <li key={`link-${link.text}`} className="mb-10">
              {link.text}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
