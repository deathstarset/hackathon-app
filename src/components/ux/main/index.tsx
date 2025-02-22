import type React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FileSpreadsheet, Upload, Package2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllFiles, uploadFile } from "@/services/files";
import FileCard from "./file-card";
import { Link } from "react-router-dom";

export interface FileData {
  id: string;
  name: string;
  uploadedAt: Date;
  size: string;
}

// Dummy data for demonstration
const dummyFiles: FileData[] = [
  {
    id: "1",
    name: "project-doc.pdf",
    uploadedAt: new Date("2024-10-30T14:22:00Z"),
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "presentation.pptx",
    uploadedAt: new Date("2024-10-29T09:15:00Z"),
    size: "3.5 MB",
  },
  {
    id: "3",
    name: "notes.txt",
    uploadedAt: new Date("2024-10-28T17:45:00Z"),
    size: "10 KB",
  },
  {
    id: "4",
    name: "data-analysis.xlsx",
    uploadedAt: new Date("2024-10-27T11:30:00Z"),
    size: "500 KB",
  },
  {
    id: "5",
    name: "design-mockup.png",
    uploadedAt: new Date("2024-10-26T08:10:00Z"),
    size: "4.1 MB",
  },
];

export default function FileUpload() {
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchFilesQuery = useQuery({
    queryKey: ["files"],
    queryFn: getAllFiles,
  });

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    uploadFileMutation.mutate(selectedFile);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full container mx-auto p-10 space-y-6">
      <div className="flex items-center justify-between mb-8 bg-slate-400 rounded p-2">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="h-15" />
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Uploaded Files</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Excel File</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center",
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-muted",
                    "transition-colors duration-200"
                  )}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) setSelectedFile(file);
                  }}
                >
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileSelect}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your Excel file here, or click to select
                    </p>
                    <Button variant="secondary" size="sm">
                      Select File
                    </Button>
                  </label>
                </div>

                {selectedFile && (
                  <div className="flex items-center gap-2 p-2 border rounded">
                    <FileSpreadsheet className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {selectedFile.name}
                    </span>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadFileMutation.isPending}
                  >
                    {uploadFileMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4">
          {dummyFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
