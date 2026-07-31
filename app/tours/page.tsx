import ToursClient from "./ToursClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tour Packages & One-Way Taxi Routes | Puducherry to Chennai",
  description: "Discover one-way taxi routes and customizable tour packages from Puducherry to Chennai and other South Indian destinations with SV Tour and Travels.",
  path: "/tours",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
});

export default function ToursPage() {
  return <ToursClient />;
}