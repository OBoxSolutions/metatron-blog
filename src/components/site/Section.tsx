type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Section = (props: SectionProps) => {
  return (
    <section className={`my-5 ${props.className}`}>
      {props?.title && <h2 className="text-5xl">{props.title}</h2>}
      {props.children}
    </section>
  );
};

export default Section;
