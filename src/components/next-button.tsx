import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { type ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";

function NextButton({
  onClick,
  type,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isLastStep } = useImportTransactionData();

  return (
    <div className="flex flex-col gap-4 mt-2">
      <hr />
      <Button
        className="min-w-26 self-end"
        type={type ?? "button"}
        onClick={onClick}
        {...rest}
      >
        {isLastStep ? "Go To Dashboard" : "Continue"}
      </Button>
    </div>
  );
}

export default NextButton;
