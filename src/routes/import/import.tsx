import { ImportTransactionProvider } from "@/contexts/import-transaction";
import MultiStepForm from "@/components/multi-step-form";

export default function ImportRoute() {
  return (
    <ImportTransactionProvider>
      <MultiStepForm />
    </ImportTransactionProvider>
  );
}
