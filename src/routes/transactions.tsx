import { getTransactions } from "@/api/transactions";
import DataTable from "@/components/data-table";
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
      <DataTable data={data} />
    </div>
  );
}
