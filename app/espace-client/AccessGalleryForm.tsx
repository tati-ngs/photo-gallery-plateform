"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const getSupabaseConfig = () => ({
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

const normalizeGalleryCode = (code: string) => code.trim().toUpperCase();

export function AccessGalleryForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const galleryCode = normalizeGalleryCode(code);

    if (!galleryCode) {
      setMessage("Entre ton code galerie.");
      return;
    }

    const { anonKey, url } = getSupabaseConfig();

    if (!anonKey || !url) {
      setMessage("La connexion Supabase n’est pas configurée sur ce site.");
      return;
    }

    setIsChecking(true);

    const response = await fetch(
      `${url}/rest/v1/galleries?code=eq.${encodeURIComponent(
        galleryCode,
      )}&select=code&limit=1`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      },
    );
    const galleries = response.ok ? await response.json() : [];

    setIsChecking(false);

    if (!response.ok || galleries.length === 0) {
      setMessage("Ce code galerie est introuvable. Vérifie le code reçu.");
      return;
    }

    router.push(`/espace-client/${encodeURIComponent(galleryCode)}`);
  };

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-xs font-semibold">
        Code galerie
        <input
          className="rounded-xl border border-[#eadff5] bg-[#fbf7ff] px-4 py-3 text-sm font-normal uppercase outline-none transition focus:border-[#6f3de2]"
          onChange={(event) => setCode(event.target.value)}
          placeholder="Ex : PS23-CLIENT-001"
          type="text"
          value={code}
        />
      </label>

      {message && (
        <p className="rounded-xl bg-[#fff0f0] px-4 py-3 text-sm font-semibold text-[#b42318]">
          {message}
        </p>
      )}

      <button
        className="motion-button rounded-full bg-[#6f3de2] px-7 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isChecking}
        type="submit"
      >
        {isChecking ? "Vérification..." : "Ouvrir ma galerie ↗"}
      </button>
    </form>
  );
}
