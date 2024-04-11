import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";

export default function TableActions() {
  return (
    <div className="flex gap-3">
      <button>
        <Icon path={mdiPencil} size={1}></Icon>
      </button>
      <button>
        <Icon path={mdiTrashCan} size={1}></Icon>
      </button>
    </div>
  );
}
