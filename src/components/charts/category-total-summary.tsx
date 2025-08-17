import { getSpendingCategoryChart } from "@/api/categories";
import type { SpendingCategory } from "@/models/spending-category";
import { getCurrentMonth, getCurrentYear } from "@/utils/date";
import { formatCurrency } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function CategoriesTotalSummaryChart() {
  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  const { data, error, isLoading, isError } = useQuery<
    SpendingCategory[],
    Error
  >({
    queryKey: ["spendingCategory", currentMonth - 1],
    queryFn: () => getSpendingCategoryChart(currentMonth - 1, currentYear),
  });

  const completeData = useMemo(() => {
    if (!data) return [];

    return data.map((d) => {
      return { name: d.title, value: Number(d.valueBrl) };
    });
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center mt-24">
        <Loader2Icon className="animate-spin" size={40} />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-full flex justify-center mt-24">
        <p className="text-sm text-foreground/60">Error: {error.message}</p>
      </div>
    );
  if (completeData?.length === 0 || completeData.every((d) => d.value === 0))
    return (
      <div className="w-full h-full flex justify-center mt-24">
        <p className="text-sm text-foreground/60">No data available</p>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={completeData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <XAxis
          fontSize={14}
          dataKey="value"
          type="number"
          axisLine={false}
          tickLine={false}
        />
        <YAxis type="category" dataKey="name" fontSize={12} />
        <Tooltip
          cursor={{ fill: "var(--background)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--secondary)",
            borderRadius: 6,
          }}
          labelStyle={{
            fontSize: 14,
            color: "var(--accent)",
            fontWeight: "bold",
            marginBottom: 8,
          }}
          itemStyle={{ color: "var(--secondary)", fontSize: 12 }}
          wrapperStyle={{ margin: 0, lineHeight: 1 }}
          formatter={formatCurrency}
        />
        <Legend
          iconType="square"
          formatter={(value) => (
            <span
              style={{
                color: "var(--muted-foreground)",
                fontSize: 14,
                marginLeft: 4,
              }}
            >
              {value}
            </span>
          )}
        />
        <Bar
          radius={0}
          barSize={32}
          dataKey="value"
          name="Categories"
          fill="var(--chart-2)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
