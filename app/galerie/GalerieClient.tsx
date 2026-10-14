"use client";

import { GalleryCard } from "@/components/GalleryCard";
import { Header } from "@/components/Header";
import { Lightbox } from "@/components/Lightbox";
import {
  galleryFilters,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PublicPhoto = {
  id: number;
  title: string;
  category: string;
  public_url: string;
};

function getValidCategory(category: string | null): GalleryCategory | null {
  if (
    category === "shooting" ||
    category === "ceremonie" ||
    category === "marque" ||
    category === "conference"
  ) {
    return category;
  }

  return null;
}

function getCategoryKey(category: string): Exclude<GalleryCategory, "tout"> {
  const normalizedCategory = category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalizedCategory.includes("ceremonie")) {
    return "ceremonie";
  }

  if (normalizedCategory.includes("marque")) {
    return "marque";
  }

  if (normalizedCategory.includes("conference")) {
    return "conference";
  }

  return "shooting";
}

function mapPublicPhoto(photo: PublicPhoto): GalleryItem {
  return {
    title: photo.title,
    category: photo.category,
    categoryKey: getCategoryKey(photo.category),
    src: photo.public_url,
  };
}

export function GalerieClient() {
  const searchParams = useSearchParams();
  const categoryFromUrl = getValidCategory(searchParams.get("categorie"));
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory | null>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const activeCategory = selectedCategory ?? categoryFromUrl ?? "tout";

  const filteredGalleryItems =
    activeCategory === "tout"
      ? galleryItems
      : galleryItems.filter((item) => item.categoryKey === activeCategory);
  const currentImage =
    activeImage === null ? null : filteredGalleryItems[activeImage];

  useEffect(() => {
    const loadPublicPhotos = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setMessage("La galerie publique n’est pas encore reliée à Supabase.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/public_photos?select=id,title,category,public_url&order=created_at.desc`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Supabase public_photos request failed");
        }

        const photos = (await response.json()) as PublicPhoto[];
        setGalleryItems(photos.map(mapPublicPhoto));
      } catch {
        setMessage("Impossible de charger les photos publiées pour le moment.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPublicPhotos();
  }, []);

  const selectCategory = (category: GalleryCategory) => {
    setSelectedCategory(category);
    setActiveImage(null);
  };

  const showPreviousImage = () => {
    setActiveImage((current) =>
      current === null
        ? 0
        : (current - 1 + filteredGalleryItems.length) %
          filteredGalleryItems.length,
    );
  };

  const showNextImage = () => {
    setActiveImage((current) =>
      current === null ? 0 : (current + 1) % filteredGalleryItems.length,
    );
  };

  return (
    <main className="min-h-screen bg-[#fbf7ff] text-[#241238]">
      <Header compact />

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            aria-label="Retour à l'accueil"
            className="mb-6 inline-flex size-10 items-center justify-center rounded-full bg-white text-2xl font-semibold text-[#6f3de2] shadow-sm transition hover:-translate-x-1"
            href="/"
          >
            ←
          </Link>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-wide text-[#6f3de2]">
            ✶ Galerie complète
          </p>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl font-[family-name:var(--font-cormorant)] text-5xl leading-tight md:text-[52px]">
              Tous les instants, toutes les histoires.
            </h1>

            <p className="max-w-md text-sm leading-6 text-[#7b6f8d]">
              Cérémonies, portraits, événements, projets de marque et détails
              sensibles : une sélection pensée pour montrer l&apos;étendue du
              regard.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {galleryFilters.map((item) => (
              <button
                className={
                  activeCategory === item.value
                    ? "rounded-full bg-[#6f3de2] px-4 py-2 text-sm font-semibold text-white"
                    : "rounded-full bg-white px-4 py-2 text-sm font-medium text-[#7b6f8d]"
                }
                key={item.label}
                onClick={() => selectCategory(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading && (
              <p className="rounded-3xl border border-dashed border-[#e7dff2] bg-white p-6 text-sm font-semibold text-[#7b6f8d] sm:col-span-2 lg:col-span-3 xl:col-span-4">
                Chargement de la galerie...
              </p>
            )}

            {!isLoading && filteredGalleryItems.length === 0 && (
              <p className="rounded-3xl border border-dashed border-[#e7dff2] bg-white p-6 text-sm font-semibold text-[#7b6f8d] sm:col-span-2 lg:col-span-3 xl:col-span-4">
                {message || "Aucune photo n’est publiée pour le moment."}
              </p>
            )}

            {filteredGalleryItems.map((item, index) => (
              <GalleryCard
                index={index}
                item={item}
                key={item.title}
                onOpen={setActiveImage}
              />
            ))}
          </div>
        </div>
      </section>

      {currentImage && activeImage !== null && (
        <Lightbox
          activeIndex={activeImage}
          image={currentImage}
          onClose={() => setActiveImage(null)}
          onNext={showNextImage}
          onPrevious={showPreviousImage}
          total={filteredGalleryItems.length}
        />
      )}
    </main>
  );
}
