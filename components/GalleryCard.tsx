import { LoadingImage } from "@/components/LoadingImage";
import type { GalleryItem } from "@/data/gallery";

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
};

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  return (
    <button
      aria-label={`Voir ${item.title} en grand`}
      className="motion-card group relative aspect-square overflow-hidden bg-[#f1e9ff] text-left"
      onClick={() => onOpen(index)}
      type="button"
    >
      <LoadingImage
        src={item.src}
        alt={item.title}
        fill
        quality={95}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="motion-image object-cover object-center"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#241238]/85 to-transparent p-5 text-white">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#d9c4ff]">
          {item.category}
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl leading-tight">
          {item.title}
        </h2>
      </div>
    </button>
  );
}
