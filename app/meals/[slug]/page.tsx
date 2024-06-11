import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals-util";
import { notFound } from "next/navigation";

interface MealDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MealDetailsProps) {
  const { slug } = params;

  const meal = getMeal(slug);

  if (!meal) return notFound();

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetails({ params }: MealDetailsProps) {
  const { slug } = params;

  const meal = getMeal(slug);

  if (!meal) return notFound();

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={`Image of ${meal.title}`} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
