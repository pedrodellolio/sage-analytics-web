import type { Wallet } from "@/models/wallet";
import axiosInstance from "./axios";

export const getWalletsByYear = async (year: number) => {
  try {
    const response = await axiosInstance.get<Wallet[]>(`/wallet?year=${year}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

export const getWalletByPeriod = async (month: number, year: number) => {
  try {
    const response = await axiosInstance.get<Wallet>(
      `/wallet/getByPeriod?month=${month}&year=${year}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};
