import z from "zod";

export const addCategorySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  colorHex: z.string().min(1, { message: "Color Hex is required" }),
});

export type AddCategoryFormData = z.infer<typeof addCategorySchema>;
