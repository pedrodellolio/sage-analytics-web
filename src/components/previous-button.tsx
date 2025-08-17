import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { Button } from "./ui/button";

type Props = {};

function PreviousButton({}: Props) {
  const { isFirstStep, previousStep } = useImportTransactionData();

  return (
    <div className="absolute bottom-0 left-0 pb-2">
      <Button
        variant="outline"
        type="button"
        className="self-end min-w-26"
        onClick={previousStep}
        disabled={isFirstStep}
      >
        Previous
      </Button>
    </div>
  );
}

export default PreviousButton;
