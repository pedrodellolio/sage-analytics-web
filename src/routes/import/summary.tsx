import FileCard from "@/components/file-card";
import { Button } from "@/components/ui/button";
import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { Link, useNavigate } from "react-router";

export function SummaryRoute() {
  const navigate = useNavigate();
  const { files, selectedBank } = useImportTransactionData();
  console.log(files, selectedBank);
  if (!files || files.length <= 0 || selectedBank) navigate("/dashboard");

  return (
    <div className="flex min-h-full flex-col">
      <h1 className="text-lg font-bold">Summary</h1>
      <p className="text-foreground/60 text-sm mb-8">
        <span className="text-accent font-bold">{files.length} files</span> were
        imported from{" "}
        <span className="text-accent font-bold">{selectedBank}</span>{" "}
        successfully!
      </p>

      <ul className="flex-grow">
        {files.map((f) => (
          <li
            key={f.id}
            className="bg-background flex items-center justify-between gap-2 rounded-lg border p-4 pe-4 mb-2"
          >
            <FileCard file={f} />
          </li>
        ))}
      </ul>

      <footer className="flex justify-end mt-auto border-t pt-6">
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </footer>
    </div>
  );
}
