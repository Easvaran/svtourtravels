import ToursClient from "./ToursClient";

export const metadata = {
  title: "Tour Packages & One-Way Taxi Routes | Puducherry to Chennai & More",
  description: "Explore popular one-way taxi routes and tour packages from Puducherry with SV Tour and Travels. Fixed pricing, no hidden charges for Chennai and South India destinations.",
  openGraph: {
    title: "Tour Packages & One-Way Taxi Routes | Puducherry to Chennai & More",
    description: "Explore popular one-way taxi routes and tour packages from Puducherry with SV Tour and Travels. Fixed pricing, no hidden charges for Chennai and South India destinations.",
  },
};

export default function ToursPage() {
  return <ToursClient />;
}