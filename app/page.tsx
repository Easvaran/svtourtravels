import FAQSection, { FAQSchema } from "@/components/FAQSection";
import HomeClient from "./HomeClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Taxi Service in Puducherry | Chennai Airport Pickup & Outstation Cabs",
  description: "Book reliable taxi service in Puducherry and Pondicherry with SV Tour and Travels for Chennai airport pickup, local rides, outstation cabs, and tour packages.",
  path: "/",
  image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
});

export default function Home() {
  return (
    <>
      <FAQSchema />
      <HomeClient />
    </>
  );
}
