// file: lib/validation.ts
import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be > 0"),
  category: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
});

export const productUpdateSchema = productCreateSchema.partial().refine(v => {
  // If provided, enforce positive price
  if (v.price !== undefined && !(typeof v.price === "number" && v.price > 0)) return false;
  return true;
}, "Invalid update payload");

export type ProductInput = z.infer<typeof productCreateSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
