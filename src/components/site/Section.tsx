type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

const Section = (props: SectionProps) => {
  return (
    <section>
      {props?.title && <h2 className="text-3xl">{props.title}</h2>}
      {props.children}
    </section>
  );
};

export default Section;
