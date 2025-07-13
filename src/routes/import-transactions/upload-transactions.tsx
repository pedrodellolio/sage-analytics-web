import { importTransactionsFile } from "@/api/transactions";
import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { Bank, bankOptions } from "@/models/bank";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, Loader2Icon, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function UploadTransactionsRoute() {
  const { files, selectedBank, setSelectedBank } = useImportTransactionData();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      if (selectedBank == null) throw new Error("Bank must be selected");
      return importTransactionsFile(files, selectedBank);
    },
    onSuccess: () => {
      navigate("/import/summary");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleImport = async () => {
    if (!selectedBank || files.length === 0) return;
    mutateAsync();
  };

  const handleBankChange = (value: string) => {
    setSelectedBank(value as Bank);
  };

  const getButtonText = () => {
    if (isPending)
      return (
        <>
          <Loader2Icon className="animate-spin" />
          Importing...
        </>
      );
    if (files.length > 1)
      return (
        <>
          <Upload />
          Import {files.length} files
        </>
      );
    if (files.length === 1)
      return (
        <>
          <Upload />
          Import {files.length} file
        </>
      );
    return (
      <>
        <Upload /> Import
      </>
    );
  };

  return (
    <div className="flex min-h-full flex-col">
      <Select onValueChange={handleBankChange}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select a Bank" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Banks</SelectLabel>
            {bankOptions.map((op, i) => (
              <SelectItem value={op} key={i}>
                {op}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <FileUploader />

      <footer className="flex justify-end gap-4 mt-auto border-t pt-6">
        <Link to="/dashboard">
          <Button variant={"outline"}>
            <ChevronLeft /> Back to Dashboard
          </Button>
        </Link>
        <Button
          onClick={handleImport}
          disabled={files.length === 0 || isPending}
        >
          {getButtonText()}
        </Button>
      </footer>
    </div>
  );
}
