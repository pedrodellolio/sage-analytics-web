import { CategoriesSummaryChart } from "@/components/charts/categories-summary";
import { MonthlySummaryChart } from "@/components/charts/monthly-summary";
import { MonthlySummaryCards } from "@/components/monthly-summary-cards";
import { Card, CardHeader } from "@/components/ui/card";

export default function DashboardRoute() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <MonthlySummaryCards />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card className="h-96">
          <CardHeader>
            <h1 className="text-muted-foreground">
              Spending and Earnings by Month
            </h1>
          </CardHeader>
          <MonthlySummaryChart />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card>
          <CardHeader>
            <h1 className="text-muted-foreground">
              Spending Distribution by Category
            </h1>
          </CardHeader>
          <CategoriesSummaryChart />
        </Card>
      </div>
    </div>
  );
}
