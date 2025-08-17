import { CategoriesPercentageSummaryChart } from "@/components/charts/categories-percentage-summary";
import { CategoriesTotalSummaryChart } from "@/components/charts/category-total-summary";
import LatestTransactions from "@/components/charts/latest-transactions";
import { MonthlySummaryChart } from "@/components/charts/monthly-summary";
import { MonthlySummaryCards } from "@/components/monthly-summary-cards";
import { Card, CardHeader } from "@/components/ui/card";
import { FULL_MONTHS, getCurrentMonth, getCurrentYear } from "@/utils/date";

export default function DashboardRoute() {
  const currentMonth = getCurrentMonth() - 1;
  const currentYear = getCurrentYear();

  return (
    <div>
      <h1 className="font-bold text-lg mb-4">
        {FULL_MONTHS[currentMonth]} {currentYear}
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <MonthlySummaryCards />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="h-88 col-span-2">
          <CardHeader>
            <h1 className="text-foreground/60">
              Spending and Earnings by Month
            </h1>
          </CardHeader>
          <MonthlySummaryChart />
        </Card>

        <Card className="h-88">
          <CardHeader>
            <h1 className="text-foreground/60">Distribution by Category (%)</h1>
          </CardHeader>
          <CategoriesPercentageSummaryChart />
        </Card>

        <Card className="h-[585px] col-span-2">
          <CardHeader>
            <h1 className="text-foreground/60">Latest Transactions</h1>
          </CardHeader>
          <LatestTransactions />
        </Card>

        <Card className="h-[585px]">
          <CardHeader>
            <h1 className="text-foreground/60">
              Distribution by Category (R$)
            </h1>
          </CardHeader>
          <CategoriesTotalSummaryChart />
        </Card>
      </div>
    </div>
  );
}
