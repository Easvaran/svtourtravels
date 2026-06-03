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
    default: "SV Tour and Travels | Taxi Service in Pangur, Puducherry | Cab Booking, Airport Pickup & Drop",
    template: "%s | SV Tour and Travels",
  },

  description:
    "SV Tour and Travels offers reliable taxi service in Pangur, Puducherry. Book airport pickup & drop, local taxi, outstation cab booking, and tour packages at affordable prices.",

  keywords: [
    "SV Tour and Travels",
    "Taxi Service in Pangur",
    "Taxi Service in Puducherry",
    "Airport Pickup and Drop",
    "Local Taxi Service",
    "Outstation Cab Booking",
    "Tour Packages",
    "Tours and Travels in Chennai",
    "Best Travels in Chennai",
    "Cab Booking Chennai",
    "Airport Pickup Chennai",
    "Airport Drop Taxi Chennai",
    "Outstation Cab Chennai",
    "Tour Packages Chennai",
    "Taxi Service Chennai",
    "Affordable Travels Chennai",
    "24/7 Cab Service Chennai",
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
    title: "SV Tour and Travels | Taxi Service in Pangur, Puducherry",
    description:
      "Reliable cab booking, airport pickup & drop, local taxi, and outstation trips with SV Tour and Travels in Pangur, Puducherry.",
    url: "https://www.svtourandtravels.com",
    siteName: "SV Tour and Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
        width: 2070,
        height: 1380,
        alt: "SV Tour and Travels - Taxi Service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SV Tour and Travels | Taxi Service in Pangur, Puducherry",
    description:
      "Reliable tours, travels, airport pickup, taxi and outstation cab services in Pangur, Puducherry.",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
    ],
  },

  robots: {
    index: true,
    follow: true,
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
                "image": "https://www.svtourandtravels.com/icon.svg",
                "url": "https://www.svtourandtravels.com",
                "telephone": "+918668076871",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Pangur",
                  "addressLocality": "Puducherry",
                  "addressRegion": "Puducherry",
                  "postalCode": "605001",
                  "addressCountry": "IN"
                },
                "priceRange": "₹₹",
                "openingHours": "Mo-Su 00:00-23:59",
                "sameAs": [
                  "https://www.facebook.com/svtourandtravels",
                  "https://www.instagram.com/svtourandtravels",
                  "https://www.youtube.com/svtourandtravels"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "TaxiService",
                "name": "SV Tour and Travels",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "SV Tour and Travels"
                },
                "areaServed": [
                  "Pangur",
                  "Puducherry",
                  "Chennai",
                  "Tamil Nadu"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Airport Pickup & Drop"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Local Taxi Service"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Outstation Cab Booking"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Tour Packages"
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "TouristService",
                "name": "SV Tour and Travels",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "SV Tour and Travels"
                },
                "areaServed": [
                  "Pangur",
                  "Puducherry",
                  "Chennai",
                  "Tamil Nadu"
                ]
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
