import { z } from "zod";

export const mealSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  image: z.string(),
  summary: z.string(),
  instructions: z.string(),
  creator: z.string(),
  creator_email: z.string(),
});

export const mealArraySchema = z.array(mealSchema);

export type Meal = z.infer<typeof mealSchema>;
