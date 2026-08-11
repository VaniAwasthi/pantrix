import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const pantryItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  category: z.string().min(1, "Category is required"),
  expiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid expiry date",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PantryItemInput = z.infer<typeof pantryItemSchema>;
