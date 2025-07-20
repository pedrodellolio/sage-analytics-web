import { getTransactions } from "@/api/transactions";
import TransactionsDataTable from "@/components/tables/transactions-data-table";
import type { Transaction } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";

export default function TransactionsRoute() {
  const { data, error, isLoading, isError, isFetching } = useQuery<
    Transaction[],
    Error
  >({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isFetching && !isLoading && <span>Updating…</span>}
      <TransactionsDataTable data={data} />
    </div>
  );
}
