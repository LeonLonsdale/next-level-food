import sql from "better-sqlite3";
import { mealArraySchema } from "./validators";

const db = sql("meals.db");

export const getMeals = async () => {
  const result = db.prepare("SELECT * FROM meals").all();

  const resultParsed = mealArraySchema.safeParse(result);

  if (!resultParsed.success) return [];

  return resultParsed.data;
};
