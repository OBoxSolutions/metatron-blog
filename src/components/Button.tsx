import Icon from "@mdi/react";
import Link from "next/link";
import { ElementType } from "react";

type ButtonProps = {
  icon?: string;
  iconSize?: number;
  children?: React.ReactNode;
  className?: string;
  link?: string;
};

export default function Button(props: ButtonProps) {
  let buttonClasses = "";

  const Parent: ElementType = props.link ? Link : "button";

  const parentProps = props.link ? { href: props.link } : {};

  if (props.icon) {
    buttonClasses += "p-4 rounded-full bg-accent";
  }

  return (
    <Parent
      className={`${buttonClasses} ${props.className}` || ""}
      {...parentProps}
    >
      {props.icon && <Icon path={props.icon} size={props.iconSize}></Icon>}
      {props.children}
    </Parent>
  );
}
