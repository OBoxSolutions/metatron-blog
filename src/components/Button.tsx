import Icon from "@mdi/react";
import Link from "next/link";
import { ElementType } from "react";

type ButtonProps = {
  icon?: string;
  iconSize?: number;
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

export default function Button(props: ButtonProps) {
  let buttonClasses = "";

  const Parent: ElementType = props.href ? Link : "button";

  const parentProps = props.href ? { href: props.href } : {};

  if (props.icon) {
    buttonClasses += "p-4 rounded-full bg-accent";
  } else {
    buttonClasses += "px-4 py-2 rounded bg-accent";
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
