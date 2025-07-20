import type { Category } from "./category";

export type Transaction = {
  id: string;
  title: string;
  occurredAt: Date;
  type: "Expense" | "Income";
  valueBrl: number;
  label: Category;
};
