import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SV Tour and Travels",
    short_name: "SV Travels",
    description: "Reliable taxi and tour services in Puducherry and Pondicherry.",
    start_url: "/",
    display: "standalone",
    background_color: "#0870b8",
    theme_color: "#0870b8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
