import { AlertCircleIcon, FileUpIcon, XIcon } from "lucide-react";
import {
  formatBytes,
  useFileUpload,
  type FileData,
} from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import UploadInstructions from "./upload-instructions";
import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { useEffect } from "react";
import FileCard from "./file-card";

interface Props {
  onFileSelect?: (files: FileData[]) => void;
}

export default function FileUploader({ onFileSelect }: Props) {
  const maxSize = 100 * 1024 * 1024; // 10MB default
  const maxFiles = 12;

  const { files: ctxFiles, setFiles } = useImportTransactionData();
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
  });

  useEffect(() => {
    setFiles((prev) => {
      const newIds = files.map((f) => f.id);
      const oldFiles = prev.filter((f) => newIds.includes(f.id));
      const newFiles = files.filter((f) => !prev.some((p) => p.id === f.id));
      const updatedFiles = [...oldFiles, ...newFiles];
      onFileSelect && onFileSelect(updatedFiles);
      return updatedFiles;
    });
  }, [files]);

  return (
    <div className="flex flex-col gap-2">
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
        />

        <div className="flex flex-col items-center justify-center text-center py-4">
          <div
            className="bg-background mb-2 flex size-14 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <FileUpIcon className="size-6 opacity-60" />
          </div>
          <p className="mb-1.5 font-medium">Upload files</p>
          <p className="text-foreground/60 mb-2 text-sm">
            Drag & drop or click to browse
          </p>
          <div className="text-foreground/60/70 flex flex-wrap justify-center gap-1 text-xs">
            <span>All files</span>
            <span>∙</span>
            <span>Max {maxFiles} files</span>
            <span>∙</span>
            <span>Up to {formatBytes(maxSize)}</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {ctxFiles.length > 0 ? (
        <div className="space-y-2 max-h-[420px] overflow-y-scroll">
          {ctxFiles.map((file) => (
            <div
              key={file.id}
              className="bg-background flex items-center justify-between gap-2 rounded-lg border p-4 pe-4"
            >
              <FileCard file={file} />
              <Button
                size="icon"
                variant="ghost"
                className="text-foreground/60/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {/* {ctxFiles.length > 1 && (
            <div>
              <Button size="sm" variant="outline" onClick={clearFiles}>
                Remove all files
              </Button>
            </div>
          )} */}
        </div>
      ) : (
        <UploadInstructions />
      )}
    </div>
  );
}
