type SectionProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Section(props: SectionProps) {
  return (
    <section className="max-w-6xl mx-auto mt-10">
      {props.title && <h2 className="text-3xl mb-2">Posts</h2>}
      {props.children}
    </section>
  );
}
