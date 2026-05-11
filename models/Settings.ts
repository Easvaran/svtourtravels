import mongoose, { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    websiteName: { type: String, default: "SV Tour & Travels" },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
    contactEmail: { type: String, default: "info@svtourtravels.com" },
    contactPhone: { type: String, default: "+91 XXXXXXXXXX" },
    whatsappNumber: { type: String, default: "+91 8668076871" },
    address: { type: String, default: "123 Travel Street, Destination City, India 600001" },
    mapIframe: { type: String, default: "" },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    adminUsername: { type: String, default: "admin" },
    adminPassword: { type: String, default: "pass" },
    adminEmail: { type: String, default: "admin@svtourtravels.com" },
    additionalEmails: { type: [String], default: [] },
    resetOtp: { type: String, default: null },
    resetOtpExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

const Settings = models.Settings || model("Settings", SettingsSchema);

export default Settings;
