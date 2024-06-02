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

export const imageUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Invalid file type. Please upload a PNG or JPG/JPEG image.",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message:
        "The image is too large. Please upload an image that is less than 5MB.",
    }),
});

export const mealArraySchema = z.array(mealSchema);

export const formMealSchema = mealSchema
  .omit({ id: true })
  .extend({ image: imageUploadSchema.shape.image });

export type ImageUpload = z.infer<typeof imageUploadSchema>;
export type Meal = z.infer<typeof mealSchema>;
export type FormMeal = z.infer<typeof formMealSchema>;
