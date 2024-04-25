import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

type LoadingIndicatorProps = {
  iconSize: number;
  className: string;
};

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  return (
    <span
      className={`absolute inset-0 flex justify-center items-center ${props.className}`}
    >
      <Icon
        path={mdiLoading}
        size={props.iconSize}
        className="animate-spin h-full w-full"
      ></Icon>
    </span>
  );
}
