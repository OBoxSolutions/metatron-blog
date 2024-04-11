type AsideProps = {
  className?: string;
};

const links = [
  {
    icon: "",
    text: "Dashboard",
  },
  {
    icon: "",
    text: "Posts",
  },
  {
    icon: "",
    text: "Users",
  },
  {
    icon: "",
    text: "Comments",
  },
];

const Aside = (props: AsideProps) => {
  return (
    <aside className={props.className}>
      <ul>
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
