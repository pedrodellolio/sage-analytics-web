import { CircleCheckBig, FileText, Table } from "lucide-react";
import { Card } from "./ui/card";

const instructions = [
  {
    icon: FileText,
    title: "Choose a valid file format: CSV",
    description: "Only CSV (Comma Separated Values) files are supported for import.",
    example: "example-data.csv",
  },
  {
    icon: Table,
    title: "Ensure the file contains the required columns",
    description: "Your CSV must include these exact column names: Date, Description, Amount.",
    example: "Date,Description,Amount",
  },
  {
    icon: Table,
    title: "Include a header row with clear, unique names",
    description: "The first row should contain column headers that clearly identify each data field.",
    example: "2024-01-15,Office Supplies,125.50",
  },
]
export default function UploadInstructions() {
  return (
    <div className="mt-4">
      <div className="flex flex-row items-center gap-4">
        <h2 className="text-lg font-semibold">Instructions</h2>
        <small className="flex flex-row items-center gap-2 mt-1 text-muted-foreground">
          <CircleCheckBig color="var(--accent)" size={18} />
          Follow these steps for successful import
        </small>
      </div>
      <div className="grid gap-4 mt-6">
        {instructions.map((instruction, index) => {
          const Icon = instruction.icon;

          return (
            <Card
              key={index}
              className="p-6 hover:bg-gray-750 transition-colors bg-background shadow-none"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-accent" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-1">
                    <span className="text-accent font-bold">
                      {index + 1}.
                    </span>
                    <h3 className="font-medium">
                      {instruction.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm ml-6">
                    {instruction.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
