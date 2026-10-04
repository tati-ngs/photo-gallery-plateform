import { Suspense } from "react";
import { GalerieClient } from "./GalerieClient";

export default function GaleriePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fbf7ff] text-[#241238]" />
      }
    >
      <GalerieClient />
    </Suspense>
  );
}
