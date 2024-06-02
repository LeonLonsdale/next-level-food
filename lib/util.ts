import { ZodError, ZodSchema } from "zod";
import { FormMeal, Meal } from "./validators";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export const getImageExtension = (file: File) => {
  const extension = file.name.split(".").pop();
  if (!extension) throw new Error("Invalid file extension");
  return extension;
};

export const makeImageName = (name: string, extension: string) =>
  `${name}.${extension}`;

export const getImagePath = (file: File, title: string) => {
  const extension = getImageExtension(file);
  const fileName = makeImageName(title, extension);
  return `/images/${fileName}`;
};

export const safeValidateObject = <T>(schema: ZodSchema<T>, obj: unknown) =>
  schema.parse(obj);

export const createMealObject = async (validatedObject: FormMeal) => {
  const { title, image } = validatedObject;
  const slug = slugify(title, { lower: true });
  const instructions = xss(validatedObject.instructions);
  const filePath = getImagePath(image, slug);

  const meal: Omit<Meal, "id"> = {
    ...validatedObject,
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
