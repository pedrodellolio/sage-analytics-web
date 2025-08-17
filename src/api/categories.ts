import type { AddCategoryFormData } from "@/schemas/category-schema";
import axiosInstance from "./axios";
import type { Category } from "@/models/category";
import type { SpendingCategory } from "@/models/spending-category";

export const getSpendingCategoryChart = async (month: number, year: number) => {
  try {
    const response = await axiosInstance.get<SpendingCategory[]>(
      `/category/spendingCategoryDistribution?month=${month}&year=${year}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get<Category[]>("/category");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

export const postCategory = async (category: AddCategoryFormData) => {
  try {
    const response = await axiosInstance.post("/category", category);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create category"
    );
  }
};

export const updateCategory = async (category: AddCategoryFormData) => {
  try {
    const response = await axiosInstance.put("/category", category);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};
