import { useImportTransactionData } from "@/hooks/use-import-transaction";
import type { BankFormData } from "@/schemas/import-schema";
import { useFormContext } from "react-hook-form";
import NextButton from "../next-button";
import { BankSelector } from "../bank-selector";
import type { Bank } from "@/models/bank";

export default function BankSelectorStep() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BankFormData>();

  const { nextStep, setSelectedBank } = useImportTransactionData();

  const handleStepSubmit = async () => {
    setSelectedBank(bank);
    nextStep();
  };

  const bank = watch("bank");

  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      <div>
        <BankSelector
          onBankSelect={(value) => setValue("bank", value as Bank)}
          selectedBank={bank}
        />
        <p>{errors.bank?.message}</p>
      </div>

      <NextButton onClick={handleStepSubmit} disabled={!bank} />
    </div>
  );
}
