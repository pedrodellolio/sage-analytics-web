import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  addCategorySchema,
  type AddCategoryFormData,
} from "@/schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCategory } from "@/api/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

type Props = {
  toggleDialog: Dispatch<SetStateAction<boolean>>;
};

export default function AddCategoryForm({ toggleDialog }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: { title: "", colorHex: "#fff" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (category: AddCategoryFormData) => postCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toggleDialog(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit = async (category: AddCategoryFormData) => {
    await mutateAsync(category);
  };

  return (
    <Form {...form}>
      <form className="mx-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full my-4">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Saúde, Mercado, Apartamento..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => toggleDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
