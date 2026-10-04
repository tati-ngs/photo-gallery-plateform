import type { GalleryCategory } from "./gallery";

export type ServiceItem = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  category: Exclude<GalleryCategory, "tout">;
  actionLabel: string;
};

export const services: ServiceItem[] = [
  {
    eyebrow: "Vous, tout simplement",
    title: "Shootings & lifestyle",
    description:
      "Seul, en couple ou en famille. Une séance pour révéler votre personnalité, sans en faire trop.",
    image: "/shooting.jpeg",
    imageAlt: "Portrait lifestyle",
    imagePosition: "object-[center_20%]",
    category: "shooting",
    actionLabel: "Voir les réalisations shooting",
  },
  {
    eyebrow: "L’émotion sur le vif",
    title: "Cérémonie",
    description:
      "Les grands moments et les petits gestes. Un regard discret pour raconter ce qui vous rassemble.",
    image: "/mariage.jpeg",
    imageAlt: "Cérémonie",
    imagePosition: "object-[center_35%]",
    category: "ceremonie",
    actionLabel: "Voir les réalisations cérémonie",
  },
  {
    eyebrow: "Une identité en images",
    title: "Marques & entreprises",
    description:
      "Portraits professionnels, produits et reportages. Des visuels pensés pour porter votre univers.",
    image: "/marque.jpg",
    imageAlt: "Photographie de marque",
    imagePosition: "object-[center_40%]",
    category: "marque",
    actionLabel: "Voir les réalisations marque et entreprise",
  },
  {
    eyebrow: "L’instant au travail",
    title: "Conférences & panels",
    description:
      "Des prises de parole, des échanges et les moments de rencontre. Une couverture photo qui donne à voir l’atmosphère.",
    image: "/conference.jpeg",
    imageAlt: "Couverture de conférence",
    imagePosition: "object-[center_35%]",
    category: "conference",
    actionLabel: "Voir les réalisations conférence et panel",
  },
];
