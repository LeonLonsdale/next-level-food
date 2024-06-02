"use server";
import fs from "node:fs";
import { saveMeal } from "@/lib/meals-util";
import { Meal, formMealSchema } from "@/lib/validators";
import slugify from "slugify";
import xss from "xss";

export const shareMeal = async (formData: FormData) => {
  // validate submitted form data
  const formMeal = formMealSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
    slug: "",
  });

  // return error message if error
  if (!formMeal.success) console.log(formMeal.error.message);

  if (formMeal.data) {
    const slug = slugify(formMeal.data.title, { lower: true });

    // save image file
    const extension = formMeal.data.image.name.split(".").pop();
    const filename = `${slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await formMeal.data.image.arrayBuffer(); // arrayBuffer returns a promise
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error && error instanceof Error) {
        throw new Error("Problem saving the image");
      }
    });

    // creatae new meal object
    const meal: Omit<Meal, "id"> = {
      ...formMeal.data,
      slug,
      instructions: xss(formMeal.data.instructions),
      image: `/images/${filename}`,
    };

    // save to db
    await saveMeal(meal);
  }
};
