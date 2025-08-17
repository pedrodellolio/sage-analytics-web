import { formatBytes, type FileData } from "@/hooks/use-file-upload";
import {
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react";

interface Props {
  file: FileData;
}

export default function FileCard({ file }: Props) {
  const getFileIcon = (file: FileData) => {
    const fileType = file.file.type;
    const fileName = file.file.name;

    if (
      fileType.includes("pdf") ||
      fileName.endsWith(".pdf") ||
      fileType.includes("word") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")
    ) {
      return <FileTextIcon className="size-4 opacity-60" />;
    } else if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileName.endsWith(".zip") ||
      fileName.endsWith(".rar")
    ) {
      return <FileArchiveIcon className="size-4 opacity-60" />;
    } else if (
      fileType.includes("excel") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return <FileSpreadsheetIcon className="size-4 opacity-60" />;
    } else if (fileType.includes("video/")) {
      return <VideoIcon className="size-4 opacity-60" />;
    } else if (fileType.includes("audio/")) {
      return <HeadphonesIcon className="size-4 opacity-60" />;
    } else if (fileType.startsWith("image/")) {
      return <ImageIcon className="size-4 opacity-60" />;
    }
    return <FileIcon className="size-4 opacity-60" />;
  };

  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
        {getFileIcon(file)}
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-sm font-medium">{file.file.name}</p>
        <p className="text-foreground/60 text-xs">
          {formatBytes(file.file.size)}
        </p>
      </div>
    </div>
  );
}
