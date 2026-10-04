"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  compact?: boolean;
};

export function Header({ compact = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (compact) {
    return (
      <header className="border-b border-[#eadff5] bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-24">
              <Image
                src="/logo.PNG"
                alt="Logo PS23PHOTOGRAPHY"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide">PS23PHOTOGRAPHY</p>
              <p className="text-[10px] uppercase tracking-wide text-[#7b6f8d]">
                galerie photo
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-[#eadff5] bg-white px-5 py-2.5 text-sm font-semibold text-[#6f3de2]"
          >
            Retour à l&apos;accueil
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#ede4f8] bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="relative h-11 w-20 shrink-0 sm:h-14 sm:w-28">
              <Image
                src="/logo.PNG"
                alt="Logo PS23PHOTOGRAPHY"
                fill
                sizes="(max-width: 640px) 80px, 112px"
                className="object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-bold tracking-wide sm:text-sm">
                PS23PHOTOGRAPHY
              </p>
              <p className="text-[10px] uppercase tracking-wide text-[#7b6f8d]">
                galerie photo
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-9 text-sm font-medium text-[#241238] md:flex">
            <a className="text-[#6f3de2]" href="#">
              Accueil
            </a>
            <a href="#services">Services</a>
            <a href="#experience">Expérience</a>
            <a href="#client">Espace client</a>
            <a
              href="#contact"
              className="rounded-full bg-[#6f3de2] px-7 py-4 text-sm font-semibold text-white"
            >
              Contact ↗
            </a>
          </div>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 rounded-full bg-[#6f3de2] px-4 py-3 text-xs font-semibold text-white md:hidden"
          >
            Contact ↗
          </a>
        </div>

        <div className="relative mt-3 md:hidden">
          <button
            className="flex w-full cursor-pointer list-none items-center justify-center rounded-full bg-[#f1e9ff] px-5 py-3 text-sm font-semibold text-[#6f3de2]"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            Menu
            <span className={`ml-2 transition ${menuOpen ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>

          {menuOpen && (
            <div className="absolute left-0 right-0 top-14 z-30 grid gap-2 rounded-3xl border border-[#eadff5] bg-white p-3 text-sm font-medium text-[#241238] shadow-lg">
              <a
                className="rounded-2xl bg-[#f1e9ff] px-4 py-3 text-[#6f3de2]"
                href="#"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </a>
              <a
                className="rounded-2xl px-4 py-3 hover:bg-[#f7f2ff]"
                href="#services"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </a>
              <a
                className="rounded-2xl px-4 py-3 hover:bg-[#f7f2ff]"
                href="#experience"
                onClick={() => setMenuOpen(false)}
              >
                Expérience
              </a>
              <a
                className="rounded-2xl px-4 py-3 hover:bg-[#f7f2ff]"
                href="#client"
                onClick={() => setMenuOpen(false)}
              >
                Espace client
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
