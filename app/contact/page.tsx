import ContactClient from "./ContactClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact SV Tour and Travels | Book Taxi in Puducherry",
  description: "Get in touch with SV Tour and Travels for taxi bookings, Chennai airport transfers, tour packages, and travel support in Puducherry.",
  path: "/contact",
  image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop",
});

export default function ContactPage() {
  return <ContactClient />;
}
