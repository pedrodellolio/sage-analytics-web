import { getSpendingCategoryChart } from "@/api/categories";
import type { SpendingCategory } from "@/models/spending-category";
import { getCurrentMonth, getCurrentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#d46b20", "#396d27", "#2767ac", "#ac4627", "#aca427"];

export function CategoriesPercentageSummaryChart() {
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
      return { name: d.title, value: Number(d.percentage) };
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
      <PieChart>
        <Pie
          dataKey="value"
          data={completeData}
          labelLine={false}
          label={renderLabel}
          stroke="var(--card)"
          animationDuration={0}
        >
          {completeData?.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          <Legend iconType="square" wrapperStyle={{ fontSize: "12px" }} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--muted-foreground)"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
