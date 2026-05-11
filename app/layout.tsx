import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "@/lib/SettingsContext";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.svtourandtravels.com"),

  title: {
    default: "SV Tour and Travels | Best Tours and Travels in Chennai",
    template: "%s | SV Tour and Travels",
  },

  description:
    "SV Tour and Travels provides reliable cab booking, airport pickup and drop, local taxi, outstation trips, and tour packages in Chennai at affordable prices.",

  keywords: [
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

  openGraph: {
    title: "SV Tour and Travels | Best Tours and Travels in Chennai",
    description:
      "Book affordable cab services, airport transfers, local and outstation trips with SV Tour and Travels in Chennai.",
    url: "https://www.svtourandtravels.com",
    siteName: "SV Tour and Travels",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SV Tour and Travels",
    description:
      "Reliable tours, travels, airport pickup, taxi and outstation cab services in Chennai.",
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

  themeColor: "#0870b8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
      </head>
      <body className={inter.className}>
        <SettingsProvider>
          <Toaster position="top-center" />
          <LayoutContent>{children}</LayoutContent>
        </SettingsProvider>
      </body>
    </html>
  );
}
