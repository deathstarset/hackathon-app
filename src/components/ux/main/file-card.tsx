import { FileData } from ".";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
interface FileCardProps {
  file: FileData;
}

export default function FileCard({ file }: FileCardProps) {
  return (
    <Link to={file.id}>
      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <Button variant="ghost" size="icon">
          <FileSpreadsheet className="h-6 w-6" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <p className="font-medium truncate">{file.name}</p>
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>{file.size}</span>
            <span>•</span>
            <span>{format(file.uploadedAt, "MMM d, yyyy h:mm a")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
