import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./table-actions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Suggestion = {
  id: number;
  field: string;
  activity: string;
  machine: "accepted" | "rejected";
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
    accessorKey: "machine",
    header: "Machine",
    cell: ({ row }) => {
      const decision = row.original.machine;
      return (
        <Badge
          className={cn(
            decision === "accepted" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {decision}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TableActions suggestion={row.original} />,
  },
];
