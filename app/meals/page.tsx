import Link from "next/link";
import classes from "./page.module.css";
import { paths } from "@/lib/paths";

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy, and fun
        </p>
        <p className={classes.cta}>
          <Link href={paths.meals.share.path}>Share your favourite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <h1>Meals Page</h1>
      </main>
    </>
  );
}
