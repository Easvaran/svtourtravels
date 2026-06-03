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
  tariffNote?: string;
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
  contactPhone: "+91 8668076871",
  whatsappNumber: "+91 8668076871",
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
  tariffNote: "",
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
      
      const text = await res.text();
      if (!text || text.trim() === "") {
        console.error("Empty response from settings API");
        return;
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse settings JSON:", text);
        return;
      }
      
      if (res.ok && data.success) {
        const settingsData = data.data || data;
        console.log("Settings loaded from API:", {
          logoUrl: settingsData.logoUrl,
          faviconUrl: settingsData.faviconUrl,
          hasLogo: !!settingsData.logoUrl,
          hasFavicon: !!settingsData.faviconUrl
        });
        setSettings(settingsData);

        // Update favicon dynamically
        if (settingsData.faviconUrl) {
          console.log("Updating favicon to:", settingsData.faviconUrl);
          // Remove existing favicon links
          const existingLinks = document.querySelectorAll("link[rel~='icon']");
          existingLinks.forEach(link => link.remove());
          
          // Create new favicon link
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = settingsData.faviconUrl;
          document.head.appendChild(link);
          
          // Also add apple-touch-icon for iOS
          const appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.href = settingsData.faviconUrl;
          document.head.appendChild(appleLink);
        }

        // Update title dynamically
        if (settingsData.websiteName) {
          document.title = `${settingsData.websiteName} | Modern Tour Booking Website`;
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
