import { Bank } from "@/models/bank";
import z from "zod";

// Step 1
export const bankSchema = z.object({
  bank: z.nativeEnum(Bank, {
    required_error: "Please select a bank",
  }),
});
export type BankFormData = z.infer<typeof bankSchema>;

// Step 2
export const uploadFilesSchema = z.object({
  files: z.array(
    z.object({
      id: z.string(),
      file: z.instanceof(File),
    }),
    {
      required_error: "Please select at least 1 file",
    }
  ),
});
export type UploadFilesFormData = z.infer<typeof uploadFilesSchema>;

// Merge steps
export const importFilesSchema = bankSchema.merge(uploadFilesSchema);
export type ImportFilesFormData = z.infer<typeof importFilesSchema>;
