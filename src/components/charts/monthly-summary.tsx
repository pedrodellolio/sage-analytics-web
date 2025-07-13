import { getWalletsByYear } from "@/api/wallets";
import type { Wallet } from "@/models/wallet";
import { getCurrentYear, MONTHS } from "@/utils/date";
import { formatCurrency, formatMonth } from "@/utils/formatters";
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

export function MonthlySummaryChart() {
  const currentYear = getCurrentYear();

  const { data, error, isLoading, isError } = useQuery<Wallet[], Error>({
    queryKey: ["wallets", currentYear],
    queryFn: () => getWalletsByYear(currentYear),
  });

  const completeData = useMemo(() => {
    if (!data) return [];

    const monthMap = new Map(data.map((wallet) => [wallet.month, wallet]));

    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      return monthMap.get(month) ?? { month, value: 0 };
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
        <p className="text-sm text-muted-foreground">Error: {error.message}</p>
      </div>
    );
  if (data?.length === 0)
    return (
      <div className="w-full h-full flex justify-center mt-24">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
          dataKey="month"
          tickFormatter={(month) => MONTHS[month - 1]}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
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
          labelFormatter={(label) => formatMonth(label, { full: true })}
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
          dataKey="incomeBrl"
          name="Earnings"
          stackId="a"
          fill="var(--chart-2)"
        />
        <Bar
          radius={0}
          barSize={10}
          dataKey="expensesBrl"
          name="Spending"
          stackId="a"
          fill="var(--chart-1)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
