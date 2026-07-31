import type { Metadata } from "next";

export const siteConfig = {
  name: "SV Tour and Travels",
  baseUrl: "https://www.svtourandtravels.com",
  defaultTitle: "SV Tour and Travels | Taxi Service in Puducherry | Pondicherry Cab Booking",
  defaultDescription:
    "Book reliable taxi service in Puducherry and Pondicherry with SV Tour and Travels. Enjoy Chennai airport pickup and drop, local cabs, outstation taxi, and tour packages.",
  phone: "+91 8668076871",
  keywords: [
    "Taxi Service in Puducherry",
    "Pondicherry Taxi",
    "Cab Booking Puducherry",
    "Chennai Airport Taxi",
    "Airport Pickup and Drop",
    "Outstation Taxi Puducherry",
    "Local Taxi Service",
    "Tour Packages Puducherry",
    "One Way Taxi",
    "Round Trip Taxi",
    "SV Tour and Travels",
  ],
  address: {
    streetAddress: "Pangur",
    addressLocality: "Puducherry",
    addressRegion: "Puducherry",
    postalCode: "605001",
    addressCountry: "IN",
  },
};

export function getCanonicalUrl(path = "/") {
  return new URL(path, siteConfig.baseUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const resolvedTitle = title.includes("SV Tour and Travels")
    ? title
    : `${title} | SV Tour and Travels`;

  return {
    title: resolvedTitle,
    description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: getCanonicalUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: image
        ? [
            {
              url: image,
              alt: resolvedTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}
