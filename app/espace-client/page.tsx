import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LoadingImage } from "@/components/LoadingImage";
import Link from "next/link";

const clientFeatures = [
  {
    title: "Galerie privée",
    text: "Un accès réservé pour consulter les images livrées après votre séance.",
  },
  {
    title: "Sélection simple",
    text: "Une interface claire pour choisir vos photos favorites sans vous perdre.",
  },
  {
    title: "Livraison soignée",
    text: "Vos souvenirs sont regroupés dans un espace pensé pour rester propre et rassurant.",
  },
];

const galleryPreview = [
  {
    src: "/douceur d'un oui.jpeg",
    alt: "Cérémonie livrée dans une galerie client",
    label: "Cérémonie",
  },
  {
    src: "/lumiere du jour.jpeg",
    alt: "Portrait livré dans une galerie client",
    label: "Portrait",
  },
  {
    src: "/matiere.jpg",
    alt: "Détail photo livré dans une galerie client",
    label: "Détails",
  },
];

export default function EspaceClientPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ff] text-[#241238]">
      <Header compact />

      <section className="bg-[#25123d] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Link
              aria-label="Retour à l'accueil"
              className="mb-8 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold text-white ring-1 ring-white/15 transition hover:-translate-x-1"
              href="/"
            >
              ←
            </Link>

            <p className="mb-5 text-[11px] font-bold uppercase tracking-wide text-[#d9c4ff]">
              ✶ Espace client
            </p>

            <h1 className="max-w-3xl font-[family-name:var(--font-cormorant)] text-5xl leading-tight md:text-[60px]">
              Votre galerie privée, prête à être retrouvée.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#d9c4ff]">
              Un espace pensé pour accéder à vos images livrées, retrouver votre
              sélection et garder vos souvenirs dans un cadre simple, sécurisé et
              élégant.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-[#25123d]">
              <span className="rounded-full bg-white px-4 py-2">
                Accès privé
              </span>
              <span className="rounded-full bg-white px-4 py-2">
                Sélection photo
              </span>
              <span className="rounded-full bg-white px-4 py-2">
                Livraison client
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
              <div className="relative h-72 overflow-hidden rounded-2xl bg-[#3a2254]">
                <LoadingImage
                  alt={galleryPreview[0].alt}
                  className="object-cover object-center"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  src={galleryPreview[0].src}
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#25123d]">
                  {galleryPreview[0].label}
                </span>
              </div>

              <div className="grid gap-4">
                {galleryPreview.slice(1).map((item) => (
                  <div
                    className="relative h-[134px] overflow-hidden rounded-2xl bg-[#3a2254]"
                    key={item.src}
                  >
                    <LoadingImage
                      alt={item.alt}
                      className="object-cover object-center"
                      fill
                      quality={95}
                      sizes="(max-width: 1024px) 50vw, 240px"
                      src={item.src}
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#25123d]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-[#d9c4ff]">
                Statut de galerie
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-bold">01</p>
                  <p className="text-xs text-[#d9c4ff]">Accès reçu</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">02</p>
                  <p className="text-xs text-[#d9c4ff]">Images prêtes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">03</p>
                  <p className="text-xs text-[#d9c4ff]">Souvenirs livrés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="rounded-2xl border border-[#eadff5] bg-white p-5 shadow-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6f3de2]">
              Accès sécurisé
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl leading-tight">
              Entrez votre code galerie.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#7b6f8d]">
              Votre code vous sera envoyé dès que votre galerie photo sera prête.
            </p>

            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-xs font-semibold">
                Code galerie
                <input
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal uppercase outline-none transition focus:border-[#6f3de2]"
                  placeholder="Ex : PS23-2026"
                  type="text"
                />
              </label>

              <button
                className="motion-button rounded-full bg-[#6f3de2] px-7 py-3 text-sm font-semibold text-white"
                type="button"
              >
                Ouvrir ma galerie ↗
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-[#f1e9ff] p-4">
              <p className="text-sm font-bold">Pas encore de code ?</p>
              <p className="mt-1 text-xs leading-5 text-[#7b6f8d]">
                Demandez votre accès au photographe pour recevoir le lien de
                votre galerie privée.
              </p>
              <a
                className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#6f3de2]"
                href="https://wa.me/2250504012432"
                rel="noreferrer"
                target="_blank"
              >
                Demander mon accès ↗
              </a>
            </div>
          </aside>

          <div className="grid gap-5 md:grid-cols-3">
            {clientFeatures.map((feature, index) => (
              <article
                className="motion-card rounded-2xl border border-[#eadff5] bg-white p-5 shadow-sm"
                key={feature.title}
              >
                <p className="text-xs font-bold text-[#6f3de2]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-base font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#7b6f8d]">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
