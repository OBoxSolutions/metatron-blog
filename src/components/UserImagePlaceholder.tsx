import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";

interface UserImagePlaceholder{
  className?:string
  size?: number | string
}

export default function UserImagePlaceholder(props:UserImagePlaceholder) {
  return (
    <div className={`rounded-full bg-gray-500 p-3 ${props.className}`}>
      <Icon path={mdiAccount} className="flex justify-center items-center" size={props.size || 1}></Icon>
    </div>
  );
}
