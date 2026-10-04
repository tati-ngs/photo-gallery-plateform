export function Footer() {
  return (
    <footer className="bg-white px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-end border-b border-[#eadff5] pb-4">
          <a className="text-sm font-medium text-[#6f3de2]" href="#">
            Retour en haut ↑
          </a>
        </div>

        <div className="flex flex-col gap-3 pt-4 text-xs text-[#9a8bab] md:flex-row md:items-center md:justify-between">
          <p>© PS23PHOTOGRAPHY · Photographie</p>
          <p>Images livrées avec soin · Galerie privée sécurisée</p>
          <div className="flex gap-5">
            <a href="#">Instagram</a>
            <a
              href="https://wa.me/2250504012432"
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <a href="mailto:koffikouadiojulien10@gmail.com">E-mail</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
