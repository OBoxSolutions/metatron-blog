import Link from "next/link";

import { AppLink } from "@/types/AppLink";

type HeaderLinkProp = {
  link: AppLink;
  active?: boolean;
};

export default function HeaderLink(props: HeaderLinkProp) {
  return (
    <li key={`site-link-${props.link.href}`}>
      <Link className="hover:opacity-80" href={props.link.href}>{props.link.text}</Link>
    </li>
  );
}
