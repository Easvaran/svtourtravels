import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Taxi Services in Puducherry | Chennai Airport, Local & Outstation Cabs",
  description: "Explore our taxi services in Puducherry - Chennai airport pickup & drop, local taxi, outstation cabs, one-way & round trip, and tour packages with SV Tour and Travels.",
  openGraph: {
    title: "Taxi Services in Puducherry | Chennai Airport, Local & Outstation Cabs",
    description: "Explore our taxi services in Puducherry - Chennai airport pickup & drop, local taxi, outstation cabs, one-way & round trip, and tour packages with SV Tour and Travels.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
