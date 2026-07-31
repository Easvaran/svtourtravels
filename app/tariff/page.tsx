import TariffPageClient from "./TariffPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Taxi Tariff in Puducherry | Transparent Cab Pricing",
  description: "Check transparent taxi tariffs for local rides, airport transfers, outstation travel, and one-way cab bookings in Puducherry with SV Tour and Travels.",
  path: "/tariff",
  image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2070&auto=format&fit=crop",
});

export default function TariffPage() {
  return <TariffPageClient />;
}
