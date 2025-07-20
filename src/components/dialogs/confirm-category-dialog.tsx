import type { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmCategoryDialog({ isOpen, setIsOpen }: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction updated successfully</AlertDialogTitle>
          <AlertDialogDescription>
            Future transactions with this title will also be linked to this
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction>Understood</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
