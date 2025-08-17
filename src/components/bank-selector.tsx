import { cn } from "@/lib/utils";
import { Bank, bankOptions } from "@/models/bank";
import type { Dispatch } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface BankSelectorProps {
  selectedBank: Bank | null;
  onBankSelect: Dispatch<React.SetStateAction<Bank | null>>;
}

export function BankSelector({
  selectedBank,
  onBankSelect,
}: BankSelectorProps) {
  const handleSelect = (bankName: Bank) => {
    onBankSelect(bankName);
  };

  return (
    <div className="grid gap-2">
      {bankOptions.map((bankName) => {
        const isSelected = selectedBank === bankName;
        return (
          <Button
            key={bankName}
            type="button"
            variant="outline"
            onClick={() => handleSelect(bankName)}
            className={cn(
              "w-auto h-14 elative border-2 rounded-lg text-left transition-all hover:shadow-md",
              isSelected
                ? "border-accent bg-accent/10 dark:bg-accent/40"
                : "border-secondary hover:border-accent"
            )}
          >
            <Card className="w-full border-0 shadow-none bg-transparent mt-1">
              <CardHeader className="p-2">
                <CardTitle className="text-base text-left">
                  <span className="text-xl mr-2">&#127963;&#65039;</span>
                  {bankName}
                </CardTitle>
                {/* <CardDescription className="text-sm text-left">
                  Import CSV files from {bankName}
                </CardDescription> */}
              </CardHeader>
            </Card>
          </Button>
        );
      })}
    </div>
  );
}
