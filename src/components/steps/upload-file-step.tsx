import { useImportTransactionData } from "@/hooks/use-import-transaction";
import type { UploadFilesFormData } from "@/schemas/import-schema";
import { useFormContext } from "react-hook-form";
import NextButton from "../next-button";
import FileUploader from "../file-uploader";
import { importTransactionsFile } from "@/api/transactions";
import { useMutation } from "@tanstack/react-query";
import type { FileData } from "@/hooks/use-file-upload";
import { useNavigate } from "react-router";

export default function UploadFileStep() {
  const navigate = useNavigate();
  const { files, selectedBank, nextStep } = useImportTransactionData();

  const {
    setValue,
    formState: { errors },
  } = useFormContext<UploadFilesFormData>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      if (selectedBank == null) throw new Error("Bank must be selected");
      return importTransactionsFile(files, selectedBank);
    },
    onSuccess: () => {
      nextStep();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleImport = async () => {
    console.log(files);
    if (!selectedBank || files.length === 0) return;
    mutateAsync();
  };

  const onFileSelect = (fileData: FileData[]) => {
    setValue("files", fileData);
  };

  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      <div>
        <FileUploader onFileSelect={onFileSelect} />
        <p>{errors.files?.message}</p>
      </div>

      <NextButton
        onClick={handleImport}
        disabled={files.length <= 0 || isPending}
      />
    </div>
  );
}
