import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { paths } from "@/lib/paths";

interface MenuItemProps {
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: MenuItemProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={image}
            alt={title}
            sizes="(max-width: 800px) 100vw, (max-width: 1245pz) 50vw, 33vw"
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={paths.meals.oneMeal(slug)}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
