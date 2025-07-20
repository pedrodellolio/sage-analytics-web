import { getCategories } from "@/api/categories";
import CategoriesDataTable from "@/components/tables/categories-data-table";
import type { Category } from "@/models/category";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesRoute() {
  const { data, error, isLoading, isError, isFetching } = useQuery<
    Category[],
    Error
  >({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isFetching && !isLoading && <span>Updating…</span>}
      <CategoriesDataTable data={data} />
    </div>
  );
}
