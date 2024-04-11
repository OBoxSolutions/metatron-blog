import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";

export default function TableActions() {
  return (
    <div className="flex gap-1">
      <button className="bg-accent rounded-full p-2">
        <Icon path={mdiPencil} size={1}></Icon>
      </button>
      <button className="bg-accent rounded-full p-2">
        <Icon path={mdiTrashCan} size={1}></Icon>
      </button>
    </div>
  );
}
