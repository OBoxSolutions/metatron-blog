import LocalDataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";

type DataTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
};

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
    <LocalDataTable
      columns={props.columns}
      data={props.data}
      theme="app"
    ></LocalDataTable>
  );
}
