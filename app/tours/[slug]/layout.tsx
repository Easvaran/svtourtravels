import { buildPageMetadata } from "@/lib/seo";
import { tours as staticTours } from "@/lib/data";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = staticTours.find((item) => item.slug === params.slug);
  const title = tour?.title ? `${tour.title} | Puducherry Tour Package` : "Puducherry Tour Package";
  const description = tour?.description
    ? `${tour.description}`.slice(0, 155)
    : "Explore customized tour packages and one-way taxi routes in Puducherry with SV Tour and Travels.";

  return buildPageMetadata({
    title,
    description,
    path: `/tours/${params.slug}`,
    image: tour?.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  });
}

export default function TourSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
