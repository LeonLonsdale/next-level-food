"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const handleClickImagePicker = () => {
    imagePickerRef.current?.click();
  };

  const handleChangePickedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return setPickedImage(null);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setPickedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage && (
            <Image src={pickedImage} alt="The selected image" fill />
          )}
          {!pickedImage && <p>No image has been selected...</p>}
        </div>
        <input
          className={classes.input} // hide the input element so we can render a custom button
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imagePickerRef}
          onChange={handleChangePickedImage}
          // required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleClickImagePicker}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
