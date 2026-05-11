import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "@/lib/SettingsContext";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SV TOUR & TRAVELS | Modern Tour Booking Website",
  description: "Discover amazing tour packages at best prices. Explore, Discover, and Travel Smart with SV TOUR & TRAVELS.",
  keywords: ["Tour packages in India", "Best travel agency", "Affordable tour packages", "Holiday packages"],
  verification: {
    google: "wJJFY_2llTEmf5HgRC3Ogi0BoG88iygCVdRn-r3HijQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <SettingsProvider>
          <Toaster position="top-center" />
          <LayoutContent>{children}</LayoutContent>
        </SettingsProvider>
      </body>
    </html>
  );
}
