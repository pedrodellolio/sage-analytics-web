import { getTransactions } from "@/api/transactions";
import type { Transaction } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";
import TransactionsDataTable from "../tables/transactions-data-table";

const LIMIT = 10;
export default function LatestTransactions() {
  const { data, error, isLoading, isError, isFetching } = useQuery<
    Transaction[],
    Error
  >({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(LIMIT),
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isFetching && !isLoading && <span>Updating…</span>}
      <TransactionsDataTable data={data} readonly />
    </div>
  );
}
