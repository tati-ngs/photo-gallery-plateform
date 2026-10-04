"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LoadingImage } from "@/components/LoadingImage";
import { ServiceCard } from "@/components/ServiceCard";
import type { GalleryCategory } from "@/data/gallery";
import { services } from "@/data/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import { useRef } from "react";
import { useState } from "react";

function parseInputDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    parsedDate.getFullYear() !== Number(year) ||
    parsedDate.getMonth() !== Number(month) - 1 ||
    parsedDate.getDate() !== Number(day)
  ) {
    return null;
  }

  return parsedDate;
}

function formatFrenchDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export default function Home() {
  const router = useRouter();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [activeGallery, setActiveGallery] = useState<GalleryCategory>("tout");
  const [contactMessage, setContactMessage] = useState("");

  const showGallery = (category: GalleryCategory) => {
    router.push(`/galerie?categorie=${category}`);
  };

  const filterClass = (category: GalleryCategory) =>
    activeGallery === category
      ? "rounded-full bg-[#6f3de2] px-4 py-2 text-sm font-semibold text-white"
      : "rounded-full bg-white px-4 py-2 text-sm font-medium text-[#7b6f8d]";

  const handleContactSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    dateInputRef.current?.setCustomValidity("");
    phoneInputRef.current?.setCustomValidity("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const consent = formData.get("consent");

    if (!name || !phone || !project || !date || !consent) {
      setContactMessage("Merci de remplir les champs obligatoires avant l’envoi.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      phoneInputRef.current?.setCustomValidity(
        "Le numéro de téléphone doit contenir exactement 10 chiffres.",
      );
      phoneInputRef.current?.reportValidity();
      return;
    }

    // Vérifie que le client ne choisit pas une date déjà passée.
    const requestedDate = parseInputDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!requestedDate) {
      dateInputRef.current?.setCustomValidity(
        "Merci de choisir une date valide.",
      );
      dateInputRef.current?.reportValidity();
      return;
    }

    if (requestedDate < today) {
      dateInputRef.current?.setCustomValidity(
        "La date souhaitée ne peut pas être antérieure à aujourd’hui.",
      );
      dateInputRef.current?.reportValidity();
      return;
    }

    const formattedDate = formatFrenchDate(requestedDate);

    // Prépare un message WhatsApp complet en attendant la future partie admin.
    const whatsappMessage = [
      "Bonjour, je souhaite faire une demande de séance photo.",
      "",
      `Nom : ${name}`,
      `E-mail : ${email || "Non précisé"}`,
      `Téléphone : ${phone}`,
      `Projet : ${project || "Non précisé"}`,
      `Date souhaitée : ${formattedDate}`,
      `Lieu : ${location || "Non précisé"}`,
      "",
      "Message :",
      message || "Non précisé",
    ].join("\n");
    const whatsappUrl = new URL("https://api.whatsapp.com/send");
    whatsappUrl.searchParams.set("phone", "2250504012432");
    whatsappUrl.searchParams.set("text", whatsappMessage);

    setContactMessage("WhatsApp va s’ouvrir avec votre demande prête à envoyer.");
    window.location.href = whatsappUrl.toString();
  };

  return (

    <main className="min-h-screen overflow-x-hidden bg-[#fbf7ff] pt-[150px] text-[#241238] md:pt-[88px]">
      <Header />

      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 pb-8 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center">
          <p className="motion-eyebrow mb-5 text-center text-[11px] font-bold uppercase tracking-wide text-[#6f3de2] sm:mb-6 sm:text-xs lg:mb-4">
            ✶ Un regard, votre histoire
          </p>

          <div className="relative flex w-full flex-col items-center lg:block">
            <h1 className="hero-title-reveal max-w-full text-center font-[family-name:var(--font-anton)] text-6xl leading-[0.9] text-[#6f3de2] sm:text-8xl md:text-[120px] lg:text-[140px]">
              JULIEN KOUADIO
            </h1>

            <div className="absolute left-1/2 top-20 h-[250px] w-[280px] -translate-x-1/2 sm:top-24 sm:h-[300px] sm:w-[330px] md:h-[310px] md:w-[340px] lg:top-20 lg:h-[295px] lg:w-[330px]">
              <div className="absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ded2ef]" />
              <div className="hero-shape absolute inset-0 rounded-full bg-[#d9c4ff]" />

              <LoadingImage
                src="/photographer-cutout.png"
                alt="Photographe PS23PHOTOGRAPHY"
                width={330}
                height={500}
                priority
                style={{ height: "auto" }}
                loadingClassName="rounded-full"
                className="hero-subject-glow absolute left-1/2 top-1/2 z-10 h-auto w-[355px] -translate-x-1/2 -translate-y-[58%] object-contain sm:w-[345px] sm:-translate-y-[53%] md:w-[330px] md:-translate-y-[54%] lg:w-[320px]"
              />


            </div>

            <div className="mt-[310px] grid w-full max-w-md gap-5 sm:mt-[380px] md:mt-[390px] lg:absolute lg:left-8 lg:top-36 lg:mt-0 lg:w-52">
              <div className="motion-card rounded-3xl border border-[#eadff5] bg-white p-5 shadow-sm lg:p-4">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-wide text-[#6f3de2]">
                  Le regard
                </p>

                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight lg:text-[25px]">
                  Le naturel, avant tout.
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#7b6f8d] lg:text-xs lg:leading-5">
                  Des images sincères, une lumière juste et une attention aux
                  détails qui font la différence.
                </p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-[#f1e9ff] px-3 py-1 text-[11px] text-[#6f3de2]">
                    Shooting
                  </span>
                  <span className="rounded-full bg-[#f1e9ff] px-3 py-1 text-[11px] text-[#6f3de2]">
                    Evènement
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid w-full max-w-md gap-5 lg:absolute lg:right-8 lg:top-36 lg:mt-0 lg:w-52">
              <div className="motion-card rounded-3xl border border-[#eadff5] bg-[#f6f0ff] p-5 shadow-sm lg:p-4">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-wide text-[#6f3de2]">
                  La rencontre
                </p>

                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight lg:text-[25px]">
                  Votre histoire, notre point de départ.
                </h2>

                <p className="mt-4 text-sm leading-5 text-[#7b6f8d] lg:text-xs lg:leading-5">
                  Un projet se construit ensemble, à votre rythme, pour laisser
                  toute sa place à l’émotion.
                </p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#6f3de2]">
                    Écoute
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#6f3de2]">
                    Créativité
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-5xl text-center font-[family-name:var(--font-cormorant)] text-2xl leading-tight text-[#241238] sm:text-3xl md:text-[32px] lg:mt-[270px]">
            capturer l’instant, raconter l’émotion, livrer vos souvenirs
          </p>

          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#realisations"
              className="motion-button rounded-full bg-[#6f3de2] px-7 py-3 text-sm font-semibold text-white"
            >
              Découvrir mes réalisations ↗
            </a>
            <a
              href="#contact"
              className="motion-button rounded-full border border-[#eadff5] bg-white/60 px-7 py-3 text-sm font-semibold text-[#6f3de2]"
            >
              Parlons de votre projet ↗
            </a>
          </div>

          <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-wide text-[#9a8bab] lg:absolute lg:bottom-8 lg:left-16 lg:mt-0 lg:text-left">
            Shooting • Instants de vie • Histoires de marque
          </p>
        </div>
      </section>

      <section id="services" className="motion-section bg-white px-4 py-10 sm:px-6 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#6f3de2]">
            ✶ Les services
          </p>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-[#241238] md:text-[40px]">
              À chaque histoire, son image.
            </h2>

            <p className="max-w-md text-sm leading-6 text-[#7b6f8d]">
              Du premier échange à la livraison finale, chaque détail est pensé pour
              donner vie à des images qui vous ressemblent.

            </p>
          </div>

          <div className="mx-auto mt-7 grid max-w-6xl gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard
                eager={index < 3}
                key={service.title}
                onOpenCategory={showGallery}
                service={service}
              />
            ))}
          </div>
        </div>


      </section>

      <section id="realisations" className="motion-section bg-[#fbf7ff] px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#6f3de2]">
                ✶ Réalisations
              </p>

              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight text-[#241238] md:text-[40px]">
                Des instants qui restent.
              </h2>
            </div>

            <a
              href="/galerie"
              className="motion-button w-fit rounded-full border border-[#eadff5] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#6f3de2]"
            >
              Explorer la galerie ↗
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              className={filterClass("tout")}
              onClick={() => setActiveGallery("tout")}
              type="button"
            >
              Tout
            </button>
            <button
              className={filterClass("shooting")}
              onClick={() => setActiveGallery("shooting")}
              type="button"
            >
              Shooting
            </button>
            <button
              className={filterClass("ceremonie")}
              onClick={() => setActiveGallery("ceremonie")}
              type="button"
            >
              Cérémonie
            </button>
            <button
              className={filterClass("marque")}
              onClick={() => setActiveGallery("marque")}
              type="button"
            >
              Marque
            </button>
            <button
              className={filterClass("conference")}
              onClick={() => setActiveGallery("conference")}
              type="button"
            >
              Conférence
            </button>
          </div>

          <div
            id="galerie"
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <article
              className={`motion-card group ${
                activeGallery !== "tout" && activeGallery !== "ceremonie" ? "hidden" : ""
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <LoadingImage
                  src="/douceur d'un oui.jpeg"
                  alt="Cérémonie sous une arche"
                  fill
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="motion-image object-cover object-center saturate-110 contrast-105"
                />

              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight text-[#241238] md:text-[28px]">
                  La douceur d’un oui
                </h3>
                <p className="text-xs text-[#9a8bab]">Cérémonie · Reportage</p>
              </div>
            </article>

            <div className="contents">
              <article
                className={`motion-card group ${
                  activeGallery !== "tout" && activeGallery !== "shooting" ? "hidden" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <LoadingImage
                    src="/lumiere du jour.jpeg"
                    alt="Portrait à la lumière du jour"
                    fill
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="motion-image object-cover object-center saturate-110 contrast-105"
                  />

                </div>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl leading-tight text-[#241238] md:text-2xl">
                    À la lumière du jour
                  </h3>
                  <p className="text-xs text-[#9a8bab]">Shooting</p>
                </div>
              </article>

              <article
                className={`motion-card group ${
                  activeGallery !== "tout" && activeGallery !== "marque" ? "hidden" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <LoadingImage
                    src="/matiere.jpg"
                    alt="Matières et nuances"
                    fill
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="motion-image object-cover object-center saturate-110 contrast-105"
                  />

                </div>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl leading-tight text-[#241238] md:text-2xl">
                    Matières & nuances
                  </h3>
                  <p className="text-xs text-[#9a8bab]">Marque</p>
                </div>
              </article>

              <article
                className={`motion-card group ${
                  activeGallery !== "tout" && activeGallery !== "conference" ? "hidden" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <LoadingImage
                    src="/conference.jpeg"
                    alt="Conférence et panel"
                    fill
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="motion-image object-cover object-center saturate-110 contrast-105"
                  />

                </div>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl leading-tight text-[#241238] md:text-2xl">
                    Conférences & panels
                  </h3>
                  <p className="text-xs text-[#9a8bab]">Événement · Conférence</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="motion-section bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#6f3de2]">
                ✶ Une expérience simple
              </p>

              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight text-[#241238] md:text-[40px]">
                De l’idée aux souvenirs.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#7b6f8d]">
              Vous profitez du moment. Chaque étape est pensée pour vous
              accompagner en toute sérénité.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="motion-card border-t border-[#eadff5] pt-6">
              <p className="font-[family-name:var(--font-cormorant)] text-3xl text-[#6f3de2]">
                01
              </p>

              <h3 className="mt-5 text-base font-bold text-[#241238]">
                Imaginons votre séance
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#7b6f8d]">
                Vos envies, votre univers, vos attentes : tout commence par un
                échange.
              </p>
            </article>

            <article className="motion-card border-t border-[#eadff5] pt-6">
              <p className="font-[family-name:var(--font-cormorant)] text-3xl text-[#6f3de2]">
                02
              </p>

              <h3 className="mt-5 text-base font-bold text-[#241238]">
                Vivons le moment
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#7b6f8d]">
                Un cadre bien préparé, des indications simples et la liberté
                d’être vous-même.
              </p>
            </article>

            <article className="motion-card border-t border-[#eadff5] pt-6">
              <p className="font-[family-name:var(--font-cormorant)] text-3xl text-[#6f3de2]">
                03
              </p>

              <h3 className="mt-5 text-base font-bold text-[#241238]">
                Retrouvez vos images
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#7b6f8d]">
                Une sélection soignée à découvrir et à télécharger dans votre
                espace client.
              </p>
            </article>
          </div>

          <div className="motion-card mt-10 flex flex-col gap-4 rounded-3xl bg-[#f1e9ff] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#6f3de2]">
                ▯
              </div>

              <div>
                <h3 className="text-base font-bold text-[#241238]">
                  Vos souvenirs ont leur espace.
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#7b6f8d]">
                  Une galerie privée pour retrouver, choisir et télécharger vos
                  photos.
                </p>
              </div>
            </div>

            <Link
              href="/espace-client"
              className="motion-button w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#6f3de2]"
            >
              Accéder à l’espace client ↗
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="motion-section bg-[#25123d] px-4 py-14 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-wide text-[#d9c4ff]">
              ✶ Parlons de votre projet
            </p>

            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl leading-tight md:text-[52px]">
              Donnons vie à vos prochaines belles images.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-[#d8cce8]">
              Une idée précise ou une envie à explorer ? Racontez votre projet.
              Nous prendrons le temps de lui donner la bonne direction.
            </p>

            <div className="relative mt-7 h-32 max-w-md overflow-hidden rounded-2xl">
              <LoadingImage
                src="/cam.png"
                alt="Photographe en action"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-[center_45%]"
              />
            </div>

            <p className="mt-5 text-[11px] text-[#bca8d5]">
              Portrait · Cérémonie · Événement · Projet de marque
            </p>

            <div className="relative mt-5 flex max-w-md justify-center overflow-hidden rounded-2xl">
              <LoadingImage
                src="/contact.PNG"
                alt="Contact PS23PHOTOGRAPHY"
                width={520}
                height={160}
                sizes="(max-width: 1024px) 100vw, 520px"
                className="h-auto w-full max-w-[520px] brightness-0 invert"
              />
            </div>
          </div>

          <form
            className="contact-panel rounded-3xl bg-white p-6 text-[#241238] shadow-xl md:p-8"
            onSubmit={handleContactSubmit}
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight md:text-[36px]">
              Tout commence par un échange.
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <label className="grid gap-2 text-xs font-semibold">
                Votre nom *
                <input
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#6f3de2]"
                  name="name"
                  placeholder="Prénom et nom"
                  required
                  type="text"
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold">
                Votre e-mail
                <input
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#6f3de2]"
                  name="email"
                  placeholder="vous@example.fr"
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold md:col-span-2 lg:col-span-1">
                Votre téléphone *
                <input
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#6f3de2]"
                  inputMode="tel"
                  name="phone"
                  pattern="\d{10}"
                  placeholder="Ex : 0504012432"
                  ref={phoneInputRef}
                  required
                  title="Entrez un numéro de téléphone de 10 chiffres"
                  type="tel"
                  onChange={(event) => event.currentTarget.setCustomValidity("")}
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold md:col-span-2 lg:col-span-3">
                Votre projet *
                <select
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal text-[#7b6f8d] outline-none transition focus:border-[#6f3de2]"
                  name="project"
                  required
                >
                  <option value="">Choisissez un type de séance</option>
                  <option>Shooting & lifestyle</option>
                  <option>Cérémonie</option>
                  <option>Marque & entreprise</option>
                  <option>Conférence & panel</option>
                </select>
              </label>

              <label className="grid gap-2 text-xs font-semibold">
                Date souhaitée *
                <input
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#6f3de2]"
                  name="date"
                  ref={dateInputRef}
                  required
                  title="Choisissez une date"
                  type="date"
                  onChange={(event) => event.currentTarget.setCustomValidity("")}
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold">
                Lieu de la séance
                <input
                  className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#6f3de2]"
                  name="location"
                  placeholder="Ville ou lieu envisagé"
                  type="text"
                />
              </label>

              <label className="grid gap-2 text-xs font-semibold md:col-span-2 lg:col-span-3">
                Quelques mots sur votre envie
                <textarea
                  className="min-h-28 resize-none rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#6f3de2]"
                  name="message"
                  placeholder="L’occasion, l’ambiance, ce qui compte pour vous..."
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#9a8bab]">
              <input
                className="mt-1 accent-[#6f3de2]"
                name="consent"
                required
                type="checkbox"
              />
              J’accepte que mes informations soient utilisées pour répondre à ma
              demande.
            </label>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#9a8bab]">
                {contactMessage || "* Champs obligatoires"}
              </p>

              <button
                className="motion-button rounded-full bg-[#6f3de2] px-7 py-3 text-sm font-semibold text-white"
                type="submit"
              >
                Envoyer ma demande ↗
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />


    </main>
  );


}
