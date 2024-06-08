"use client";

import classes from "./page.module.css";
import ImagePicker from "@/components/meals/image-picker";
import * as actions from "@/actions";
import ShareMealSubmitButton from "@/components/meals/share-meal-submit-button";
import { useFormState } from "react-dom";

import { NewMealFormState } from "@/lib/types";

export default function ShareMealPage() {
  const initialFormState: NewMealFormState = {
    message: "",
    errors: {},
  };
  const [errors, formAction] = useFormState(
    actions.shareMeal,
    initialFormState
  );

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          {errors.message && <p className={classes.error}>{errors.message}</p>}
          <div className={classes.row}>
            <fieldset>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
              {errors.errors.creator && (
                <p className={classes.error}>
                  {errors.errors.creator.join(", ")}
                </p>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
              {errors.errors.creator_email && (
                <p className={classes.error}>
                  {errors.errors.creator_email.join(", ")}
                </p>
              )}
            </fieldset>
          </div>
          <fieldset>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
            {errors.errors.title && (
              <p className={classes.error}>{errors.errors.title.join(", ")}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="summary">Summary</label>
            <input type="text" id="summary" name="summary" required />
            {errors.errors.summary && (
              <p className={classes.error}>
                {errors.errors.summary.join(", ")}
              </p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
            {errors.errors.instructions && (
              <p className={classes.error}>
                {errors.errors.instructions.join(", ")}
              </p>
            )}
          </fieldset>
          <ImagePicker label="image" name="image" />
          <fieldset className={classes.actions}>
            <ShareMealSubmitButton />
            {errors.errors.image && (
              <p className={classes.error}>{errors.errors.image.join(", ")}</p>
            )}
          </fieldset>{" "}
        </form>
      </main>
    </>
  );
}
