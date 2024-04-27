import Icon from "@mdi/react";
import Link from "next/link";
import { ElementType, MouseEvent } from "react";
import { mdiLoading } from "@mdi/js";

type ButtonProps = {
  icon?: string;
  iconSize?: number;
  iconPadding?: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  loading?: boolean;
  floating?: boolean;
  outline?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export default function Button(props: ButtonProps) {
  let buttonClasses = "";
  let loadingClasses = "";

  const Parent: ElementType = props.href ? Link : "button";

  const parentProps = props.href ? { href: props.href } : {};

  if (props.icon) {
    buttonClasses += `${props.iconPadding || "p-4"} rounded-full bg-accent`;
    loadingClasses += "rounded-full";
  } else {
    buttonClasses += "px-4 py-2 rounded bg-accent";
    loadingClasses += "rounded";
  }

  buttonClasses += props.floating ? " fixed" : " relative";

  buttonClasses += props.outline
    ? " outline outline-1 outline-accent bg-primary"
    : " bg-accent";

  loadingClasses += props.outline ? " bg-primary" : " bg-accent";

  return (
    <Parent
      className={`${buttonClasses} ${props.className}` || ""}
      {...parentProps}
      onClick={props.onClick}
    >
      {props.loading && (
        <span className={` absolute inset-0 ${loadingClasses}`}>
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
