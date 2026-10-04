import Image from "next/image";
import type { GalleryCategory } from "@/data/gallery";
import type { ServiceItem } from "@/data/services";

type ServiceCardProps = {
  service: ServiceItem;
  onOpenCategory: (category: Exclude<GalleryCategory, "tout">) => void;
};

export function ServiceCard({ service, onOpenCategory }: ServiceCardProps) {
  return (
    <article className="motion-card group overflow-hidden bg-[#f7f2ff]">
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/9]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          quality={95}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`motion-image object-cover ${service.imagePosition} saturate-110 contrast-105 group-hover:object-top group-active:object-top`}
        />
      </div>

      <div className="p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#6f3de2]">
          {service.eyebrow}
        </p>

        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight text-[#241238] lg:text-[28px]">
            {service.title}
          </h3>

          <button
            aria-label={service.actionLabel}
            className="motion-button flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-lg text-[#6f3de2]"
            onClick={() => onOpenCategory(service.category)}
            type="button"
          >
            ↗
          </button>
        </div>

        <p className="mt-3 text-sm leading-5 text-[#7b6f8d]">
          {service.description}
        </p>
      </div>
    </article>
  );
}
