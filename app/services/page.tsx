import ServicesClient from "./ServicesClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Taxi Services in Puducherry | Airport, Local & Outstation Cabs",
  description: "Reserve reliable Puducherry taxi services for airport pickup, local sightseeing, outstation travel, one-way rides, and round trip cab bookings.",
  path: "/services",
  image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
});

export default function ServicesPage() {
  return <ServicesClient />;
}
