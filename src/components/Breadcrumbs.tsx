import Link from "next/link";

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
  className?: string;
};

type Breadcrumb = {
  href: string;
  text: string;
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const lastIndex = props.breadcrumbs.length - 1;

  return (
    <div className={`flex ${props.className}`}>
      {props.breadcrumbs.map((breadcrumb, index) => (
        <div key={`breadcrumb-${breadcrumb.href}`} className="flex gag-10">
          <Link
            href={breadcrumb.href}
            className={`${index !== lastIndex ? "text-accent" : "text-gray-400"}`}
          >
            {breadcrumb.text}
          </Link>
          {index !== lastIndex && <div>/</div>}
        </div>
      ))}
    </div>
  );
}
