import { z } from "zod";
import { imageUploadSchema, mealSchema, formMealSchema } from "./validators";

export type ImageUpload = z.infer<typeof imageUploadSchema>;
export type Meal = z.infer<typeof mealSchema>;
export type FormMeal = z.infer<typeof formMealSchema>;

export interface NewMealFormState {
  message: string;
  errors: Partial<{
    [key: string]: string[];
  }>;
}
