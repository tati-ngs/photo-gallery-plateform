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
  onError,
  ...props
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          className={`image-loading-shimmer absolute inset-0 grid place-items-center bg-[#f1e9ff] ${loadingClassName}`}
        >
          <span
            aria-label={hasError ? "Image indisponible" : "Image en chargement"}
            className={`size-9 rounded-full border-2 border-[#d9c8f1] ${
              hasError
                ? "border-t-[#b42318]"
                : "animate-spin border-t-[#6f3de2]"
            }`}
            role="status"
          />
        </div>
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
        onError={(event) => {
          setHasError(true);
          onError?.(event);
        }}
      />
    </>
  );
}
