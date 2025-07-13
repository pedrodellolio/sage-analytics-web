import type { Transaction } from "@/models/transaction";
import axiosInstance from "./axios";
import type { Bank } from "@/models/bank";
import type { FileData } from "@/hooks/use-file-upload";

export const getTransactions = async () => {
  try {
    const response = await axiosInstance.get<Transaction[]>("/transaction");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

export const importTransactionsFile = async (
  fileData: FileData[],
  bank: Bank
) => {
  try {
    const formData = new FormData();
    formData.append("bank", bank);
    fileData.forEach((data) => {
      formData.append("files", data.file);
    });

    const response = await axiosInstance.post<Transaction>(
      "/transaction/import",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create transaction"
    );
  }
};
