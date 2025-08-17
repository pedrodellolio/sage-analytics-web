import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { useNavigate } from "react-router";
import FileCard from "../file-card";
import NextButton from "../next-button";

export default function SummaryStep() {
  const navigate = useNavigate();
  const { files, selectedBank } = useImportTransactionData();
  console.log(files, selectedBank);
  if (!files || files.length <= 0 || selectedBank) navigate("/dashboard");

  return (
    <div className="flex min-h-full flex-col">
      <p className="text-foreground/60 text-sm mb-8">
        <span className="text-accent font-bold">{files.length} files</span>{" "}
        {files.length > 1 ? "were " : "was "}
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

      <NextButton onClick={() => navigate("/dashboard")} />
    </div>
  );
}
