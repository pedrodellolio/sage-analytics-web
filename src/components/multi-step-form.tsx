import { useImportTransactionData } from "@/hooks/use-import-transaction";
import { FormProvider } from "react-hook-form";
import PreviousButton from "./previous-button";

function MultiStepForm() {
  const { methods, currentStep, submitSteppedForm } =
    useImportTransactionData();

  return (
    <FormProvider {...methods}>
      <div className="mx-auto relative">
        <form
          className="pb-2"
          onSubmit={methods.handleSubmit(submitSteppedForm)}
        >
          <h1 className="py-5 text-3xl font-bold">{currentStep.title}</h1>

          <div className="h-[720px]">{currentStep.component}</div>
          {/* Previous button absolutely positioned */}
          <PreviousButton />
        </form>
      </div>
    </FormProvider>
  );
}

export default MultiStepForm;
