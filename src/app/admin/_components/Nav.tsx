type NavProps = {
  className?: string;
};

export default function Nav(props: NavProps) {
  return (
    <nav
      className={`flex justify-end items-center px-5 gap-4 ${props.className}`}
    >
      Home
      <div className="rounded-full p-3 bg-primary">
        <p className="w-6 h-6 text-center">JG</p>
      </div>
    </nav>
  );
}
