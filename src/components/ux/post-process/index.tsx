import { DataTable } from "./data-table";
import { columns } from "./columns";
import { data } from "../post-process/data";

// data should be gotten from here
export default function PostProcessTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
