import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";

export default function UserImagePlaceholder() {
  return (
    <div className="rounded-full bg-gray-500 p-3">
      <Icon path={mdiAccount} size={1}></Icon>
    </div>
  );
}
