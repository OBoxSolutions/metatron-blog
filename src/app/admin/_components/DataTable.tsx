import LocalDataTable, {
  createTheme,
  TableProps,
} from "react-data-table-component";

import TableActions, { TableActionsProps } from "./TableActions";

type DataTableProps<T> = TableActionsProps & TableProps<T>;

createTheme("app", {
  text: {
    primary: "#ffffff",
    secondary: "#ffffff",
  },
  background: {
    default: "#052035",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

export default function DataTable<T>(props: DataTableProps<T>) {
  return (
    <div>
      <TableActions
        onUpdate={props.onUpdate}
        onDestroy={props.onDestroy}
      ></TableActions>
      <LocalDataTable
        selectableRows={true}
        theme="app"
        {...props}
      ></LocalDataTable>
    </div>
  );
}
