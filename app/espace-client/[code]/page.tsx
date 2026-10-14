import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ClientGalleryPhotos } from "./ClientGalleryPhotos";

export const dynamic = "force-dynamic";

type Gallery = {
  client: string;
  code: string;
  photographer_message?: string;
  type: string;
  date: string;
  photos: number;
  status: string;
};

const defaultPhotographerMessage =
  "Merci pour votre confiance. Votre galerie est prête, vous pouvez consulter vos photos tranquillement et télécharger vos coups de cœur.";

type StoragePhoto = {
  name: string;
};

const getSupabaseConfig = () => ({
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

const getGallery = async (code: string) => {
  const { anonKey, url } = getSupabaseConfig();

  if (!anonKey || !url) {
    return null;
  }

  const response = await fetch(
    `${url}/rest/v1/galleries?code=eq.${encodeURIComponent(
      code,
    )}&select=client,code,photographer_message,type,date,photos,status&limit=1`,
    {
      cache: "no-store",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const galleries = (await response.json()) as Gallery[];

  return galleries[0] ?? null;
};

const getGalleryPhotos = async (code: string) => {
  const { anonKey, url } = getSupabaseConfig();

  if (!anonKey || !url) {
    return [];
  }

  const response = await fetch(`${url}/storage/v1/object/list/gallery-photos`, {
    cache: "no-store",
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      limit: 100,
      offset: 0,
      prefix: `${code}/`,
      sortBy: { column: "name", order: "asc" },
    }),
  });

  if (!response.ok) {
    return [];
  }

  const photos = (await response.json()) as StoragePhoto[];

  return photos
    .filter((photo) => photo.name)
    .map((photo) => {
      const path = photo.name.startsWith(`${code}/`)
        ? photo.name
        : `${code}/${photo.name}`;

      return {
        name: photo.name.replace(`${code}/`, ""),
        url: `${url}/storage/v1/object/public/gallery-photos/${path
          .split("/")
          .map((part) => encodeURIComponent(part))
          .join("/")}`,
      };
    });
};

export default async function ClientGalleryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const galleryCode = decodeURIComponent(code).trim().toUpperCase();
  const gallery = await getGallery(galleryCode);
  const photos = gallery ? await getGalleryPhotos(galleryCode) : [];

  return (
    <main className="min-h-screen bg-[#fbf7ff] text-[#241238]">
      <Header compact />

      <section className="bg-[#25123d] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            className="mb-8 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15"
            href="/espace-client"
          >
            ← Retour à l’accès
          </Link>

          <p className="text-xs font-bold uppercase tracking-wide text-[#d9c4ff]">
            Galerie privée
          </p>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-cormorant)] text-5xl leading-tight md:text-[60px]">
            {gallery ? gallery.client : "Galerie introuvable"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#d9c4ff]">
            {gallery
              ? `Code ${gallery.code} · ${gallery.type} · ${gallery.date}`
              : "Le code entré ne correspond à aucune galerie disponible."}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          {!gallery && (
            <div className="rounded-2xl border border-[#eadff5] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[#7b6f8d]">
                Vérifiez le code reçu ou demandez un nouvel accès au photographe.
              </p>
              <Link
                className="mt-5 inline-flex rounded-full bg-[#6f3de2] px-5 py-3 text-sm font-semibold text-white"
                href="/espace-client"
              >
                Réessayer
              </Link>
            </div>
          )}

          {gallery && (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-[#eadff5] bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#6f3de2]">
                    Statut
                  </p>
                  <p className="mt-3 text-2xl font-bold">{gallery.status}</p>
                </article>
                <article className="rounded-2xl border border-[#eadff5] bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#6f3de2]">
                    Photos
                  </p>
                  <p className="mt-3 text-2xl font-bold">{photos.length}</p>
                </article>
                <article className="rounded-2xl border border-[#eadff5] bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#6f3de2]">
                    Code
                  </p>
                  <p className="mt-3 font-mono text-sm font-bold">
                    {gallery.code}
                  </p>
                </article>
              </div>

              <section className="mt-6 rounded-2xl border border-[#eadff5] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6f3de2]">
                  Message du photographe
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#7b6f8d]">
                  {gallery.photographer_message?.trim() ||
                    defaultPhotographerMessage}
                </p>
              </section>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ClientGalleryPhotos photos={photos} />
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
