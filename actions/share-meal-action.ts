"use server";
import { saveMeal } from "@/lib/meals-util";
import { formMealSchema } from "@/lib/validators";
import {
  createMealObject,
  safeValidateObject,
  storeMealImage,
} from "@/lib/util";
import { ZodError } from "zod";

export const shareMeal = async (formData: FormData) => {
  const formObject = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
    slug: "",
  };

  try {
    const validatedObject = safeValidateObject(formMealSchema, formObject);
    const mealObject = await createMealObject(validatedObject);

    const { image: imageFile } = validatedObject;
    const { image: imagePath } = mealObject;
    storeMealImage(imageFile, imagePath);

    await saveMeal(mealObject);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return error.flatten();
    } else {
      return { message: "Something went wrong." };
    }
  }
};
