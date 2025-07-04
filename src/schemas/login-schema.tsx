import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
