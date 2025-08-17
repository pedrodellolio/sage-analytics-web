import type { FileData } from "@/hooks/use-file-upload";
import type { Bank } from "@/models/bank";
import type { FormStep } from "@/models/types/formStep";
import {
  bankSchema,
  importFilesSchema,
  uploadFilesSchema,
  type ImportFilesFormData,
} from "@/schemas/import-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import BankSelectorStep from "@/components/steps/bank-selector-step";
import UploadFileStep from "@/components/steps/upload-file-step";
import SummaryStep from "@/components/steps/summary-step";

export const formSteps: FormStep[] = [
  {
    curr: "import",
    next: "upload",
    title: "Select your Bank",
    subtitle: "Choose the bank from which you'll be importing data",
    component: <BankSelectorStep />,
    validationSchema: bankSchema,
    fields: ["bank"],
  },
  {
    curr: "upload",
    prev: "import",
    next: "summary",
    title: "Upload Files",
    subtitle: "Choose files from which you'll be importing data",
    component: <UploadFileStep />,
    validationSchema: uploadFilesSchema,
    fields: ["files"],
  },
  {
    curr: "summary",
    prev: "upload",
    title: "Summary",
    subtitle: "Your transaction data has been successfully imported.",
    component: <SummaryStep />,
    fields: [],
  },
];

export type ImportContextProps = {
  currentStep: FormStep;
  files: FileData[];
  selectedBank: Bank | null;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  // progress: number;
  setFiles: (updater: (prev: FileData[]) => FileData[]) => void;
  setSelectedBank: Dispatch<SetStateAction<Bank | null>>;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (position: number) => void;
  methods: UseFormReturn<any, any, any>;
  submitSteppedForm: (data: ImportFilesFormData) => Promise<void>;
};

export const ImportTransactionContext =
  createContext<ImportContextProps | null>(null);

export const ImportTransactionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useForm<ImportFilesFormData>({
    resolver: zodResolver(importFilesSchema),
  });

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [files, setFilesState] = useState<FileData[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const setFiles = (updater: (prev: FileData[]) => FileData[]) =>
    setFilesState((prev) => updater(prev));

  /* Form submission function */
  async function submitSteppedForm(data: ImportFilesFormData) {
    try {
      // Perform your form submission logic here
      console.log("data", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }

  const nextStep = async () => {
    const isValid = await methods.trigger(currentStep.fields);

    if (!isValid) {
      return; // Stop progression if validation fails
    }

    // grab values in current step and transform array to object
    const currentStepValues = methods.getValues(currentStep.fields);
    const formValues = Object.fromEntries(
      currentStep.fields.map((field, index) => [
        field,
        currentStepValues[index] || "",
      ])
    );

    // Validate the form state against the current step's schema
    if (currentStep.validationSchema) {
      const validationResult =
        currentStep.validationSchema.safeParse(formValues);

      if (!validationResult.success) {
        validationResult.error.errors.forEach((err) => {
          methods.setError(err.path.join(".") as keyof ImportFilesFormData, {
            type: "manual",
            message: err.message,
          });
        });
        return; // Stop progression if schema validation fails
      }
    }

    // Move to the next step if not at the last step
    if (currentStepIndex < formSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (position: number) => {
    if (position >= 0 && position - 1 < formSteps.length) {
      setCurrentStepIndex(position - 1);
      // saveFormState(position - 1);
    }
  };

  const currentStep = formSteps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === formSteps.length - 1;

  return (
    <ImportTransactionContext.Provider
      value={{
        currentStep,
        files,
        selectedBank,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        methods,
        setFiles,
        setSelectedBank,
        setCurrentStepIndex,
        nextStep,
        previousStep,
        goToStep,
        submitSteppedForm,
      }}
    >
      {children}
    </ImportTransactionContext.Provider>
  );
};
