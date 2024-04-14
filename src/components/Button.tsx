import Icon from "@mdi/react";

type ButtonProps = {
  icon?: string;
  iconSize?: number;
  children?: React.ReactNode;
  className?: string;
};

export default function Button(props: ButtonProps) {
  let buttonClasses = "";

  if (props.icon) {
    buttonClasses += "p-4 rounded-full bg-accent";
  }

  return (
    <button className={`${buttonClasses} ${props.className}`}>
      {props.icon && <Icon path={props.icon} size={props.iconSize}></Icon>}
      {props.children}
    </button>
  );
}
