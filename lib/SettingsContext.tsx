"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Settings {
  websiteName: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  mapIframe: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  adminUsername?: string;
  adminEmail?: string;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  websiteName: "SV Tour & Travels",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "info@svtourtravels.com",
  contactPhone: "+91 XXXXXXXXXX",
  whatsappNumber: "+91 XXXXXXXXXX",
  address: "123 Travel Street, Destination City, Tamil Nadu, India 600001",
  mapIframe: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  },
  adminUsername: "admin",
  adminEmail: "admin@svtourtravels.com",
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);

        // Update favicon dynamically
        if (data.faviconUrl) {
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = data.faviconUrl;
        }

        // Update title dynamically
        if (data.websiteName) {
          document.title = `${data.websiteName} | Modern Tour Booking Website`;
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
