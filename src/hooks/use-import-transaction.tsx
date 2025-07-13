import { ImportTransactionContext } from "@/contexts/import-transaction";
import { useContext } from "react";

export const useImportTransactionData = () => {
  const ctx = useContext(ImportTransactionContext);
  if (!ctx) throw new Error("useImportTransactionData outside provider");
  return ctx;
};
