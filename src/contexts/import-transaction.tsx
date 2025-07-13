import type { FileData } from "@/hooks/use-file-upload";
import type { Bank } from "@/models/bank";
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type ImportContext = {
  files: FileData[];
  setFiles: (updater: (prev: FileData[]) => FileData[]) => void;
  selectedBank: Bank | null;
  setSelectedBank: Dispatch<SetStateAction<Bank | null>>;
};

export const ImportTransactionContext = createContext<ImportContext | null>(
  null
);

export const ImportTransactionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [files, setFilesState] = useState<FileData[]>([]);
  const setFiles = (updater: (prev: FileData[]) => FileData[]) =>
    setFilesState((prev) => updater(prev));

  return (
    <ImportTransactionContext.Provider
      value={{ files, setFiles, selectedBank, setSelectedBank }}
    >
      {children}
    </ImportTransactionContext.Provider>
  );
};
