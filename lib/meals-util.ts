import sql from "better-sqlite3";
import { Meal } from "@/lib/types";
import { mealArraySchema, mealSchema } from "./validators";

const db = sql("meals.db");

export const getMeals = async () => {
  const result = db.prepare("SELECT * FROM meals").all();

  const resultParsed = mealArraySchema.safeParse(result);

  if (!resultParsed.success) throw new Error("Loading meals failed!");

  return resultParsed.data;
};

export const getMeal = (slug: string) => {
  const result = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);

  const resultParsed = mealSchema.safeParse(result);

  // if (!resultParsed.success)
  //   throw new Error("Cannot find this meal. Try again");
  if (!resultParsed.success) return null;

  return resultParsed.data;
};

export const saveMealToDB = async (meal: Omit<Meal, "id">) => {
  db.prepare(
    `
  INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email)
  VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)
  `
  ).run(meal);
};
