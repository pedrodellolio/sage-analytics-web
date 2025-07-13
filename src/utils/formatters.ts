import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { FULL_MONTHS, MONTHS } from "./date";

export const formatCurrency = (value: number | ValueType) => {
  if (typeof value != "number") value = Number(value);
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatMonth = (index: number, options: { full: boolean }) => {
  if (options.full) return FULL_MONTHS[index - 1];
  return MONTHS[index - 1];
};
