import { ZodSchema } from "zod";
import { FormMeal, Meal } from "@/lib/types";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export const getFileExtension = (file: File) => {
  const extension = file.name.split(".").pop();
  if (!extension) throw new Error("Invalid file extension");
  return extension;
};

export const getFileName = (name: string, extension: string) =>
  `${name}.${extension}`;

export const getImagePath = (fileName: string) => `/images/${fileName}`;

export const zodParse = <T>(schema: ZodSchema<T>, obj: unknown) =>
  schema.parse(obj);

export const createMealObject = async (validatedFormMeal: FormMeal) => {
  const { title, image } = validatedFormMeal;
  const slug = slugify(title, { lower: true });
  const instructions = xss(validatedFormMeal.instructions);
  const filePath = getImagePath(getFileName(slug, getFileExtension(image)));

  const meal: Omit<Meal, "id"> = {
    ...validatedFormMeal,
    slug,
    instructions,
    image: filePath,
  };

  return meal;
};

export const storeMealImage = async (image: File, path: string) => {
  const stream = fs.createWriteStream(`public${path}`);
  const bufferedImage = await image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error && error instanceof Error) {
      throw new Error("Problem saving the image");
    }
  });
};
