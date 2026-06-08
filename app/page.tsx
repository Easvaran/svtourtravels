import FAQSection, { FAQSchema } from "@/components/FAQSection";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "SV Tour and Travels | Taxi Service in Puducherry & Pondicherry Cab Booking",
  description: "SV Tour and Travels offers reliable taxi service in Puducherry, Pondicherry cab booking, Chennai airport pickup and drop, outstation taxi, and tour packages. Call +91 8668076871.",
  keywords: ["Taxi Service in Puducherry", "Pondicherry Taxi", "Cab Booking Puducherry", "Chennai Airport Taxi", "Airport Pickup and Drop", "Outstation Taxi Puducherry", "Local Taxi Service", "Tour Packages Puducherry", "One Way Taxi", "Round Trip Taxi"],
  openGraph: {
    title: "SV Tour and Travels | Taxi Service in Puducherry & Pondicherry Cab Booking",
    description: "SV Tour and Travels offers reliable taxi service in Puducherry, Pondicherry cab booking, Chennai airport pickup and drop, outstation taxi, and tour packages.",
    url: "https://www.svtourandtravels.com",
    type: "website"
  }
};

export default function Home() {
  return (
    <>
      <FAQSchema />
      <HomeClient />
    </>
  );
}
