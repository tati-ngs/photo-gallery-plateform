import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

type LightboxProps = {
  activeIndex: number;
  image: GalleryItem;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function Lightbox({
  activeIndex,
  image,
  total,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#12091f]/95 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image agrandie"
    >
      <button
        aria-label="Fermer l'image"
        className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#241238] shadow-lg"
        onClick={onClose}
        type="button"
      >
        ×
      </button>

      <button
        aria-label="Photo précédente"
        className="absolute left-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-semibold text-[#6f3de2] shadow-lg"
        onClick={onPrevious}
        type="button"
      >
        ‹
      </button>

      <div className="relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-[#241238] shadow-2xl">
        <Image
          src={image.src}
          alt={image.title}
          fill
          quality={95}
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute bottom-6 left-1/2 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-3xl bg-white/10 px-5 py-4 text-white backdrop-blur">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#d9c4ff]">
          {image.category}
        </p>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight">
            {image.title}
          </h2>
          <p className="shrink-0 text-xs text-[#d8cce8]">
            {activeIndex + 1} / {total}
          </p>
        </div>
      </div>

      <button
        aria-label="Photo suivante"
        className="absolute right-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-semibold text-[#6f3de2] shadow-lg"
        onClick={onNext}
        type="button"
      >
        ›
      </button>
    </div>
  );
}
