import { z } from "zod";

export const mealSchema = z.object({
  id: z.number(),
  title: z.string().trim(),
  slug: z.string(),
  image: z.string(),
  summary: z.string().trim(),
  instructions: z.string().trim(),
  creator: z.string().trim(),
  creator_email: z.string().trim().min(5).email(), // min 5 a@b.c is valid
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
    })
    .refine((file) => file.size > 0, { message: "An image is required!" }),
});

export const mealArraySchema = z.array(mealSchema);

export const formMealSchema = mealSchema
  .omit({ id: true })
  .extend({ image: imageUploadSchema.shape.image });
