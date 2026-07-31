import AboutClient from "./AboutClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About SV Tour and Travels | Trusted Taxi Service in Puducherry",
  description: "Learn why SV Tour and Travels is a trusted name for Puducherry taxi service, airport pickup, outstation cabs, and customized tour packages.",
  path: "/about",
  image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
});

export default function AboutPage() {
  return <AboutClient />;
}
