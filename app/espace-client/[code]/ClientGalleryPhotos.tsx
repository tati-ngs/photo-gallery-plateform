"use client";

import { useEffect, useState } from "react";

export type ClientPhoto = {
  name: string;
  url: string;
};

function ClientLoadingImage({
  alt,
  className,
  src,
  wrapperClassName,
}: {
  alt: string;
  className: string;
  src: string;
  wrapperClassName: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 grid place-items-center bg-[#f1e9ff]">
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
      <img
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        src={src}
      />
    </div>
  );
}

export function ClientGalleryPhotos({ photos }: { photos: ClientPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [downloadingPhoto, setDownloadingPhoto] = useState("");
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const showPreviousPhoto = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + photos.length) % photos.length,
    );
  };

  const showNextPhoto = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null ? 0 : (currentIndex + 1) % photos.length,
    );
  };

  const downloadPhoto = async (photo: ClientPhoto) => {
    setDownloadingPhoto(photo.url);

    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = objectUrl;
      downloadLink.download = photo.name || "photo-ps23.jpg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setDownloadingPhoto("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) {
        return;
      }

      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPreviousPhoto();
      }

      if (event.key === "ArrowRight") {
        showNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  if (photos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[#eadff5] bg-white p-6 text-sm font-semibold text-[#7b6f8d] sm:col-span-2 lg:col-span-3">
        Cette galerie existe, mais aucune photo n’a encore été ajoutée.
      </p>
    );
  }

  return (
    <>
      {photos.map((photo, index) => (
        <article
          className="overflow-hidden border border-[#eadff5] bg-white shadow-sm"
          key={photo.url}
        >
          <button
            aria-label={`Agrandir la photo ${index + 1}`}
            className="block w-full bg-[#f1e9ff]"
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <ClientLoadingImage
              alt="Photo de la galerie client"
              className="h-full w-full object-cover"
              wrapperClassName="aspect-square"
              src={photo.url}
            />
          </button>
          <div className="flex items-center justify-between gap-3 p-3">
            <span className="truncate text-xs font-semibold text-[#7b6f8d]">
              Photo {index + 1}
            </span>
            <button
              className="rounded-full bg-[#f1e9ff] px-3 py-1.5 text-xs font-bold text-[#6f3de2]"
              disabled={downloadingPhoto === photo.url}
              onClick={() => downloadPhoto(photo)}
              type="button"
            >
              {downloadingPhoto === photo.url ? "..." : "Télécharger"}
            </button>
          </div>
        </article>
      ))}

      {activePhoto && activeIndex !== null && (
        <div
          aria-label="Photo agrandie"
          aria-modal="true"
          className="fixed inset-0 z-[80] grid place-items-center bg-[#12091f]/95 p-4 text-white backdrop-blur-sm"
          role="dialog"
        >
          <button
            aria-label="Fermer"
            className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full bg-white text-xl font-bold text-[#241238] shadow-lg"
            onClick={() => setActiveIndex(null)}
            type="button"
          >
            ×
          </button>

          <button
            className="absolute left-4 top-4 z-20 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#6f3de2] shadow-lg"
            disabled={downloadingPhoto === activePhoto.url}
            onClick={() => downloadPhoto(activePhoto)}
            type="button"
          >
            {downloadingPhoto === activePhoto.url ? "Téléchargement..." : "Télécharger"}
          </button>

          <button
            aria-label="Photo précédente"
            className="absolute left-4 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-[#6f3de2] shadow-lg sm:flex"
            onClick={showPreviousPhoto}
            type="button"
          >
            ‹
          </button>

          <div className="w-full max-w-6xl">
            <ClientLoadingImage
              alt="Photo de la galerie client agrandie"
              className="h-full w-full object-contain"
              key={activePhoto.url}
              src={activePhoto.url}
              wrapperClassName="h-[72vh] bg-[#241238]"
            />
            <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 text-[#241238]">
              <p className="truncate text-sm font-bold">{activePhoto.name}</p>
              <p className="shrink-0 text-sm font-bold text-[#6f3de2]">
                {activeIndex + 1} / {photos.length}
              </p>
            </div>
          </div>

          <button
            aria-label="Photo suivante"
            className="absolute right-4 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-[#6f3de2] shadow-lg sm:flex"
            onClick={showNextPhoto}
            type="button"
          >
            ›
          </button>

          <div className="mt-4 flex gap-3 sm:hidden">
            <button
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#6f3de2]"
              onClick={showPreviousPhoto}
              type="button"
            >
              Précédente
            </button>
            <button
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#6f3de2]"
              onClick={showNextPhoto}
              type="button"
            >
              Suivante
            </button>
          </div>
        </div>
      )}
    </>
  );
}
