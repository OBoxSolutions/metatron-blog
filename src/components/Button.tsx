import Icon from "@mdi/react";
import Link from "next/link";
import { ElementType, MouseEvent } from "react";
import { mdiLoading } from "@mdi/js";

type ButtonProps = {
  icon?: string;
  iconSize?: number;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  loading?: boolean;
  onClick?: (e: MouseEvent) => void;
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
      className={`relative ${buttonClasses} ${props.className}` || ""}
      {...parentProps}
      onClick={props.onClick}
    >
      {props.loading && (
        <span className="absolute inset-0 bg-accent">
          <Icon
            path={mdiLoading}
            size={props.iconSize}
            className="animate-spin h-full w-full"
          ></Icon>
        </span>
      )}

      {props.icon && <Icon path={props.icon} size={props.iconSize}></Icon>}
      {props.children}
    </Parent>
  );
}
