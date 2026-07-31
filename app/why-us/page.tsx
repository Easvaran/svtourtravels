import WhyUsPageClient from "./WhyUsPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Why Choose SV Tour and Travels | Reliable Taxi Service in Puducherry",
  description: "Discover why travelers choose SV Tour and Travels for safe, affordable, and comfortable taxi service in Puducherry and beyond.",
  path: "/why-us",
  image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2070&auto=format&fit=crop",
});

export default function WhyUsPage() {
  return <WhyUsPageClient />;
}
