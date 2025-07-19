import { getWalletByPeriod } from "@/api/wallets";
import type { Wallet } from "@/models/wallet";
import { getCurrentMonth, getCurrentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2Icon,
  TrendingDown,
  TrendingUp,
  TrendingUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { formatCurrency } from "@/utils/formatters";

export function MonthlySummaryCards() {
  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  const { data, error, isLoading, isError } = useQuery<Wallet, Error>({
    queryKey: ["wallet", currentMonth, currentYear],
    queryFn: () => getWalletByPeriod(currentMonth, currentYear),
  });

  if (isLoading || isError || !data)
    return (
      <Card>
        {" "}
        {isLoading ? (
          <div className="w-full h-full flex justify-center mt-24">
            <Loader2Icon className="animate-spin" size={40} />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex justify-center mt-24">
            <p className="text-sm text-muted-foreground">
              Error: {error.message}
            </p>
          </div>
        ) : (
          !data && (
            <div className="w-full h-full flex justify-center mt-24">
              <p className="text-sm text-muted-foreground">No data available</p>
            </div>
          )
        )}
      </Card>
    );

  return (
    <>
      <Card className="gap-2">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <h1 className="text-muted-foreground">Balance</h1>
          <div className="bg-background p-1.5 rounded-md">
            <TrendingUpDown size={20} color="var(--muted-foreground)" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {formatCurrency(data.incomeBrl - data.expensesBrl)}
          </p>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <h1 className="text-muted-foreground">Earnings</h1>
          <div className="bg-background p-1.5 rounded-md">
            <TrendingUp size={20} color="var(--muted-foreground)" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(data.incomeBrl)}</p>
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <h1 className="text-muted-foreground">Spending</h1>
          <div className="bg-background p-1.5 rounded-md">
            <TrendingDown size={20} color="var(--muted-foreground)" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {formatCurrency(data.expensesBrl)}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
