"use server";
import { saveMeal } from "@/lib/meals-util";
import { formMealSchema } from "@/lib/validators";
import { createMealObject, zodParse, storeMealImage } from "@/lib/util";
import { ZodError } from "zod";

export const shareMeal = async (formData: FormData) => {
  const formMeal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
    slug: "",
  };

  try {
    const validatedFormMeal = zodParse(formMealSchema, formMeal);
    const newMeal = await createMealObject(validatedFormMeal);

    const { image: imageFile } = validatedFormMeal;
    const { image: imagePath } = newMeal;
    storeMealImage(imageFile, imagePath);

    await saveMeal(newMeal);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return error.flatten();
    } else {
      return { message: "Something went wrong." };
    }
  }
};
