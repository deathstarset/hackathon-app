import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./table-actions";

export type Suggestion = {
  id: number;
  field: string;
  activity: string;
  machineDecision: "accepted" | "rejected";
  description: string;
};

export const columns: ColumnDef<Suggestion>[] = [
  {
    accessorKey: "field",
    header: "Field",
  },
  {
    accessorKey: "activity",
    header: "Activity",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "machineDecision",
    header: "Machine Decision",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TableActions suggestion={row.original} />,
  },
];
