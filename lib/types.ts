import { z } from "zod";
import { imageUploadSchema, mealSchema, formMealSchema } from "./validators";

// meal types
export type Meal = z.infer<typeof mealSchema>;

// share meal form types
export type ImageUpload = z.infer<typeof imageUploadSchema>;
export type FormMeal = z.infer<typeof formMealSchema>;

export interface NewMealFormState {
  message: string;
  errors: {
    [key: string]: string[] | undefined;
  };
}
