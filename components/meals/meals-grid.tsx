import { Meal } from "@/lib/validators";
import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

interface MealsGridProps {
  meals: Meal[];
}
export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
