import { z } from "zod";
import { budgetSchema } from "@/types/schema";

type BudgetFormData = z.infer<typeof budgetSchema>;

export interface BudgetPreviewProps {
  formData: BudgetFormData;
  isLoading: boolean;
  onBack: () => void;
  onGenerate: () => void;
}
