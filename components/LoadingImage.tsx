"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LoadingImageProps = ImageProps & {
  imageClassName?: string;
  loadingClassName?: string;
};

export function LoadingImage({
  className = "",
  imageClassName = "",
  loadingClassName = "",
  onLoad,
  ...props
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          className={`image-loading-shimmer absolute inset-0 bg-[#f1e9ff] ${loadingClassName}`}
        />
      )}

      <Image
        {...props}
        className={`${imageClassName} ${className} transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}
