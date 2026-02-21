"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface IProps {
  urls: string[];
}

export function GalleryLightbox({ urls }: IProps) {
  const [index, setIndex] = useState(-1); // -1 means closed

  if (urls.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center w-full py-1">
        {urls.map((url, i) => (
          <img
            key={i}
            src={url}
            onClick={() => setIndex(i)}
            className="h-20 w-20 object-cover rounded flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={urls.map((src) => ({ src }))}
      />
    </>
  );
}
