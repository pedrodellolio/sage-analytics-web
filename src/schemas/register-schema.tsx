import z from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
