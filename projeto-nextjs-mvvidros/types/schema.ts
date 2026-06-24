import { z } from "zod";

export const budgetSchema = z.object({
  client: z.object({
    name: z.string().min(2, `Minimo de 2 caracteres`).nonempty(),
    address: z.string().min(2, `Minimo de 2 caracteres`).nonempty(),
    tel: z.string().min(2, `Minimo de 2 caracteres`).nonempty(),
    email: z.string().optional(),
  }),
  items: z.array(
    z.object({
      productName: z.string().min(2, `Minimo de 2 caracteres`).nonempty(),
      productValue: z.number().positive("O valor deve ser maior do que zero"),
      productCategory: z.string(),
      productQuantity: z
        .number()
        .positive(`O valor deve ser maior do que zero`),
    }),
  ),
});

export type BudgetData = z.infer<typeof budgetSchema>;
