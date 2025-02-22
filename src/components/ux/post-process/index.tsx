import { DataTable } from "./data-table";
import { columns } from "./columns";
import { data } from "../post-process/data";
import { Link } from "react-router-dom";

export default function PostProcessTable() {
  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center justify-between mb-8 bg-slate-400 rounded p-2">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="h-15" />
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
