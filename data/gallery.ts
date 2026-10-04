export type GalleryCategory =
  | "tout"
  | "shooting"
  | "ceremonie"
  | "marque"
  | "conference";

export type GalleryItem = {
  title: string;
  category: string;
  categoryKey: Exclude<GalleryCategory, "tout">;
  src: string;
};

export const galleryFilters: { label: string; value: GalleryCategory }[] = [
  { label: "Tout", value: "tout" },
  { label: "Shooting", value: "shooting" },
  { label: "Cérémonie", value: "ceremonie" },
  { label: "Marque", value: "marque" },
  { label: "Conférence", value: "conference" },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "La douceur d'un oui",
    category: "Cérémonie",
    categoryKey: "ceremonie",
    src: "/douceur d'un oui.jpeg",
  },
  {
    title: "Portrait lifestyle",
    category: "Shooting",
    categoryKey: "shooting",
    src: "/shooting.jpeg",
  },
  {
    title: "Moments de cérémonie",
    category: "Cérémonie",
    categoryKey: "ceremonie",
    src: "/mariage.jpeg",
  },
  {
    title: "Identité de marque",
    category: "Marque",
    categoryKey: "marque",
    src: "/marque.jpg",
  },
  {
    title: "Conférences & panels",
    category: "Conférence",
    categoryKey: "conference",
    src: "/conference.jpeg",
  },
  {
    title: "À la lumière du jour",
    category: "Portrait",
    categoryKey: "shooting",
    src: "/lumiere du jour.jpeg",
  },
  {
    title: "Matières & nuances",
    category: "Projet de marque",
    categoryKey: "marque",
    src: "/matiere.jpg",
  },
  {
    title: "Détails sensibles",
    category: "Création",
    categoryKey: "marque",
    src: "/matiere et nuance.jpeg",
  },
  {
    title: "Accessoires de cérémonie",
    category: "Cérémonie",
    categoryKey: "ceremonie",
    src: "/797841490_122232370622324293_458254681720362122_n.jpg",
  },
];
