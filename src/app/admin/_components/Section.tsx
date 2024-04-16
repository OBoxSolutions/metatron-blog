type SectionProps = {
  title?: string;
  children?: React.ReactNode;
  width?: string;
};

export default function Section(props: SectionProps) {
  const localWidth = props.width ?? "max-w-6xl";

  return (
    <section className={`mx-auto mt-10 ${localWidth}`}>
      {props.title && <h2 className="text-3xl mb-2">Posts</h2>}
      {props.children}
    </section>
  );
}
