import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";

export type TableActionsProps = {
  onDestroy?: () => void;
  onUpdate?: () => void;
};

export default function TableActions(props: TableActionsProps) {
  return (
    <div className="flex gap-1">
      <button className="bg-accent rounded-full p-2" onClick={props.onUpdate}>
        <Icon path={mdiPencil} size={1}></Icon>
      </button>
      <button className="bg-accent rounded-full p-2" onClick={props.onDestroy}>
        <Icon path={mdiTrashCan} size={1}></Icon>
      </button>
    </div>
  );
}
