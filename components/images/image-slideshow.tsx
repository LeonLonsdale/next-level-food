"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";

import classes from "./image-slideshow.module.css";

const images = [
  { image: burgerImg, alt: "Adelicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and Cheese" },
  { image: pizzaImg, alt: "A delicious pizza " },
  { image: schnitzelImg, alt: "A delicious schnitzel" },
  { image: tomatoSaladImg, alt: "A delicious tomato salad" },
];

/*
- Images are stacked on top of each other so that only 1 is visible.
- An interval is set for 5 seconds in an Effect to increment state that tracks 
  the current image to display.
- When the interval updates the currentImageIndex state, the component refreshes.
- images[] is mapped over and the index of the current iteration compared with
  the currentImageIndex state. Where it matchces, the active class is applied.
- The active class raises the z-index to bring the image to the front.
*/

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Update the currentImageIndex state every 5 seconds
  // increment by 1 each interval or reset to 0 if the current index is the last
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentImageIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0,
        ),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {/* map over the image array and apply the active class where the index
      is equal to the currentImageIndex state. Active class increaes the 
      z-index bringing the image to the top */}
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
