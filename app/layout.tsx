import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "@/lib/SettingsContext";
import LayoutContent from "@/components/LayoutContent";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.svtourandtravels.com"),

  title: {
    default: "SV Tour and Travels | Taxi Service in Puducherry | Pondicherry Cab Booking, Chennai Airport Pickup & Drop",
    template: "%s | SV Tour and Travels",
  },

  description:
    "SV Tour and Travels provides reliable taxi service in Puducherry (Pondicherry). Book Chennai Airport pickup & drop, local taxi, outstation cabs, and tour packages at affordable prices. Call +91 8668076871.",

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
    "Pangur Puducherry Taxi",
  ],

  authors: [{ name: "SV Tour and Travels" }],
  creator: "SV Tour and Travels",
  publisher: "SV Tour and Travels",

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg" },
    ],
  },

  openGraph: {
    title: "SV Tour and Travels | Taxi Service in Puducherry & Pondicherry",
    description:
      "Reliable taxi services in Puducherry: Chennai Airport pickup & drop, local rides, outstation cabs, and tour packages. Book now with SV Tour and Travels.",
    url: "https://www.svtourandtravels.com",
    siteName: "SV Tour and Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
        width: 2070,
        height: 1380,
        alt: "SV Tour and Travels - Taxi Service in Puducherry",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SV Tour and Travels | Taxi Service in Puducherry & Pondicherry",
    description:
      "Reliable taxi services in Puducherry: Chennai Airport pickup & drop, local rides, outstation cabs, and tour packages.",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.svtourandtravels.com",
  },

  verification: {
    google: "wJJFY_2llTEmf5HgRC3Ogi0BoG88iygCVdRn-r3HijQ",
  },
};

export const viewport = {
  themeColor: "#0870b8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T78JH0Y8VL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T78JH0Y8VL');
          `}
        </Script>
        
        {/* JSON-LD Schema Markup */}
        <Script
          id="schema-markup"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "SV Tour and Travels",
                "alternateName": "SV Tours",
                "image": "https://www.svtourandtravels.com/icon.svg",
                "url": "https://www.svtourandtravels.com",
                "telephone": "+91-8668076871",
                "priceRange": "₹₹",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Pangur",
                  "addressLocality": "Puducherry",
                  "addressRegion": "Puducherry",
                  "postalCode": "605001",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 11.9139,
                  "longitude": 79.8145
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday"
                    ],
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                ],
                "sameAs": [
                  "https://www.facebook.com/svtourandtravels",
                  "https://www.instagram.com/svtourandtravels"
                ],
                "areaServed": [
                  "Pangur",
                  "Puducherry",
                  "Pondicherry",
                  "Chennai",
                  "Tamil Nadu"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "TaxiService",
                "name": "SV Tour and Travels Taxi Service",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "SV Tour and Travels"
                },
                "areaServed": [
                  "Pangur, Puducherry",
                  "Puducherry",
                  "Pondicherry",
                  "Chennai",
                  "Tamil Nadu"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Taxi and Cab Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Chennai Airport Pickup and Drop",
                        "description": "Reliable Chennai Airport pickup and drop taxi service from Puducherry and Pondicherry."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Local Taxi Service in Puducherry",
                        "description": "Affordable local taxi service for sightseeing and daily commutes in Puducherry."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Outstation Taxi from Puducherry",
                        "description": "Comfortable outstation taxi service from Puducherry to Chennai and other cities."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "One Way Taxi",
                        "description": "Convenient one-way taxi service for hassle-free travel."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Round Trip Taxi",
                        "description": "Affordable round-trip taxi booking for complete travel solutions."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Tour Packages in Puducherry",
                        "description": "Exciting tour packages in and around Puducherry for a memorable trip."
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "SV Tour and Travels",
                "url": "https://www.svtourandtravels.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.svtourandtravels.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "SV Tour and Travels",
                "url": "https://www.svtourandtravels.com",
                "logo": "https://www.svtourandtravels.com/icon.svg"
              }
            ])
          }}
        />
      </head>
      <body className={poppins.className}>
        <SettingsProvider>
          <Toaster position="top-center" />
          <LayoutContent>{children}</LayoutContent>
        </SettingsProvider>
      </body>
    </html>
  );
}
