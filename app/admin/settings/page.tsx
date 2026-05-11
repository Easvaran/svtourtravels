"use client";

import { useRef, useState, useEffect } from "react";
import { 
  Save, 
  Globe, 
  Image as ImageIcon,
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Shield,
  MessageCircle,
  Server,
  Plus,
  X,
  Loader2,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useSettings } from "@/lib/SettingsContext";

// File validation constants
const LOGO_ALLOWED_TYPES = [
  "image/png", 
  "image/jpeg", 
  "image/jpg", 
  "image/svg+xml"
];
const FAVICON_ALLOWED_TYPES = [
  "image/png", 
  "image/jpeg", 
  "image/jpg", 
  "image/svg+xml", 
  "image/x-icon"
];
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FAVICON_SIZE = 1 * 1024 * 1024; // 1MB

export default function SettingsPage() {
  const { refreshSettings } = useSettings();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    websiteName: "",
    contactEmail: "",
    contactPhone: "",
    whatsappNumber: "",
    address: "",
    mapIframe: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
    logoUrl: "",
    faviconUrl: "",
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
    additionalEmails: [] as string[],
  });

  const [newEmail, setNewEmail] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      
      // Get response as text first for safety
      const text = await res.text();
      
      if (!text || text.trim() === "") {
        throw new Error("Empty response from server");
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid response from server");
      }
      
      console.log("API Response (Fetched):", data);
      
      if (res.ok && data.success) {
        const settingsData = data.data || data;
        setFormData({
          websiteName: settingsData.websiteName || "",
          contactEmail: settingsData.contactEmail || "",
          contactPhone: settingsData.contactPhone || "",
          whatsappNumber: settingsData.whatsappNumber || "",
          address: settingsData.address || "",
          mapIframe: settingsData.mapIframe || "",
          socialLinks: {
            facebook: settingsData.socialLinks?.facebook || "",
            instagram: settingsData.socialLinks?.instagram || "",
            twitter: settingsData.socialLinks?.twitter || "",
            youtube: settingsData.socialLinks?.youtube || "",
          },
          logoUrl: settingsData.logoUrl || "",
          faviconUrl: settingsData.faviconUrl || "",
          adminUsername: settingsData.adminUsername || "",
          adminPassword: "",
          adminEmail: settingsData.adminEmail || "",
          additionalEmails: settingsData.additionalEmails || [],
        });
      } else {
        throw new Error(data.message || data.error || "Failed to load settings");
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
      toast.error(`Failed to load settings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Validate and upload file helper
  const validateAndUploadFile = async (
    file: File, 
    allowedTypes: string[], 
    maxSize: number,
    setUploading: (val: boolean) => void
  ): Promise<string> => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      const typeNames = allowedTypes.map(t => t.split("/")[1].toUpperCase()).join(", ");
      throw new Error(`Invalid file type. Allowed: ${typeNames}`);
    }

    // Validate file size
    if (file.size > maxSize) {
      const sizeMB = (maxSize / 1024 / 1024).toFixed(0);
      throw new Error(`File too large. Max size is ${sizeMB}MB`);
    }

    setUploading(true);
    
    try {
      console.log("Uploading file:", file.name);
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      // Get response as text first for safety
      const text = await res.text();
      
      if (!text || text.trim() === "") {
        throw new Error("Empty response from server");
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid response from server");
      }
      
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      
      if (!data.url) {
        throw new Error("Server returned success but no URL in response");
      }
      
      console.log("File uploaded successfully:", data.url);
      return data.url;
    } finally {
      setUploading(false);
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setLogoPreview(URL.createObjectURL(file));

    try {
      const uploadedUrl = await validateAndUploadFile(
        file, 
        LOGO_ALLOWED_TYPES, 
        MAX_LOGO_SIZE,
        setLogoUploading
      );
      
      // Update form data with the uploaded URL immediately
      setFormData(prev => ({ ...prev, logoUrl: uploadedUrl }));
      toast.success("Logo uploaded successfully!");
    } catch (error: any) {
      console.error("Logo upload error:", error);
      toast.error(`Logo upload failed: ${error.message}`);
      // Revert preview on error
      setLogoPreview(formData.logoUrl);
    }
  };

  const handleFaviconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setFaviconPreview(URL.createObjectURL(file));

    try {
      const uploadedUrl = await validateAndUploadFile(
        file, 
        FAVICON_ALLOWED_TYPES, 
        MAX_FAVICON_SIZE,
        setFaviconUploading
      );
      
      // Update form data with the uploaded URL immediately
      setFormData(prev => ({ ...prev, faviconUrl: uploadedUrl }));
      toast.success("Favicon uploaded successfully!");
    } catch (error: any) {
      console.error("Favicon upload error:", error);
      toast.error(`Favicon upload failed: ${error.message}`);
      // Revert preview on error
      setFaviconPreview(formData.faviconUrl);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview("");
    setFormData(prev => ({ ...prev, logoUrl: "" }));
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
    toast.success("Logo removed");
  };

  const handleRemoveFavicon = () => {
    setFaviconPreview("");
    setFormData(prev => ({ ...prev, faviconUrl: "" }));
    if (faviconInputRef.current) {
      faviconInputRef.current.value = "";
    }
    toast.success("Favicon removed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    console.log("Submitting form data:", formData);

    try {
      let mapUrl = formData.mapIframe;
      if (mapUrl.includes('<iframe')) {
        const srcMatch = mapUrl.match(/src="([^"]+)"/);
        if (srcMatch && srcMatch[1]) {
          mapUrl = srcMatch[1];
        }
      }

      const updatedData = { ...formData, mapIframe: mapUrl };
      
      if (!updatedData.adminPassword) {
        delete (updatedData as any).adminPassword;
      }

      console.log("Sending final data to API:", updatedData);

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      // Get response as text first for safety
      const text = await res.text();
      
      if (!text || text.trim() === "") {
        throw new Error("Empty response from server");
      }
      
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid response from server");
      }
      
      console.log("API Response (Saved):", result);

      if (res.ok && result.success) {
        await refreshSettings();
        const savedData = result.data || result;
        setFormData(prev => ({
          ...prev,
          ...savedData,
          adminPassword: ""
        }));
        setLogoPreview("");
        setFaviconPreview("");
        toast.success(result.message || "Settings saved successfully!");
      } else {
        toast.error(result.message || result.error || "Failed to update settings");
      }
    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error(`Something went wrong: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleAddEmail = () => {
    if (!newEmail) return;
    if (!newEmail.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (formData.additionalEmails.includes(newEmail)) {
      toast.error("Email already added");
      return;
    }
    setFormData({
      ...formData,
      additionalEmails: [...formData.additionalEmails, newEmail]
    });
    setNewEmail("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setFormData({
      ...formData,
      additionalEmails: formData.additionalEmails.filter(email => email !== emailToRemove)
    });
  };

  if (loading) return (
    <div className="animate-pulse space-y-8">
      <div className="h-10 w-48 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 rounded-[2.5rem]" />
        <div className="h-96 bg-gray-200 rounded-[2.5rem]" />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">General Settings</h2>
        <button
          disabled={saving}
          type="submit"
          className="bg-primary hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl flex items-center space-x-2 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 disabled:opacity-70"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <h3 className="text-xl font-black text-gray-900 flex items-center space-x-3">
            <Globe className="text-primary" size={24} />
            <span>Website Information</span>
          </h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Website Name</label>
              <input
                type="text"
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                value={formData.websiteName}
                onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Office Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-6 text-gray-400" size={18} />
                <textarea
                  rows={3}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Google Maps Iframe Link</label>
              <div className="relative">
                <Globe className="absolute left-4 top-6 text-gray-400" size={18} />
                <textarea
                  rows={3}
                  placeholder='Paste the src URL from the Google Maps embed code here'
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 resize-none text-sm"
                  value={formData.mapIframe}
                  onChange={(e) => setFormData({ ...formData, mapIframe: e.target.value })}
                />
              </div>
              <p className="text-[10px] text-gray-400 ml-1 italic">* Go to Google Maps &gt; Share &gt; Embed a map &gt; Copy the URL inside the "src" attribute.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <h3 className="text-xl font-black text-gray-900 flex items-center space-x-3">
            <ImageIcon className="text-primary" size={24} />
            <span>Branding</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sidebar Logo</label>
              <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-3xl hover:border-primary/30 transition-colors bg-gray-50/50">
                {(logoPreview || formData.logoUrl) ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white border border-gray-100 mb-4 flex items-center justify-center p-4">
                    {logoUploading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                    )}
                    <img 
                      src={logoPreview || formData.logoUrl} 
                      alt="Logo Preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                    <button 
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg z-20"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 flex items-center justify-center mb-4 text-gray-300">
                    {logoUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <ImageIcon size={32} />}
                  </div>
                )}
                <input 
                  type="file" 
                  ref={logoInputRef}
                  className="hidden" 
                  accept={LOGO_ALLOWED_TYPES.join(",")} 
                  onChange={handleLogoChange} 
                  disabled={logoUploading}
                />
                <button 
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={logoUploading}
                  className="bg-white border border-gray-200 hover:border-primary text-gray-600 font-bold py-2 px-6 rounded-xl transition-all text-sm shadow-sm flex items-center space-x-2 disabled:opacity-50"
                >
                  {logoUploading ? (
                    <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload size={16} /> Choose Logo</>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 mt-3 font-medium">JPG, JPEG, PNG or SVG (max 5MB)</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Favicon (Browser Icon)</label>
              <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-3xl hover:border-primary/30 transition-colors bg-gray-50/50">
                {(faviconPreview || formData.faviconUrl) ? (
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white border border-gray-100 mb-4 flex items-center justify-center p-2">
                    {faviconUploading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      </div>
                    )}
                    <img 
                      src={faviconPreview || formData.faviconUrl} 
                      alt="Favicon Preview" 
                      className="w-full h-full object-contain"
                    />
                    <button 
                      type="button"
                      onClick={handleRemoveFavicon}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg z-20"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 flex items-center justify-center mb-4 text-gray-300">
                    {faviconUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Globe size={32} />}
                  </div>
                )}
                <input 
                  type="file" 
                  ref={faviconInputRef}
                  className="hidden" 
                  accept={FAVICON_ALLOWED_TYPES.join(",")} 
                  onChange={handleFaviconChange} 
                  disabled={faviconUploading}
                />
                <button 
                  type="button"
                  onClick={() => faviconInputRef.current?.click()}
                  disabled={faviconUploading}
                  className="bg-white border border-gray-200 hover:border-primary text-gray-600 font-bold py-2 px-6 rounded-xl transition-all text-sm shadow-sm flex items-center space-x-2 disabled:opacity-50"
                >
                  {faviconUploading ? (
                    <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload size={16} /> Choose Favicon</>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 mt-3 font-medium">ICO, PNG, JPG, JPEG or SVG (max 1MB)</p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-3">
              <Instagram className="text-primary" size={24} />
              <span>Social Presence</span>
            </h3>

            <div className="space-y-4">
              {[
                { id: "instagram", icon: Instagram, label: "Instagram Profile" },
                { id: "facebook", icon: Facebook, label: "Facebook Page" },
                { id: "twitter", icon: Twitter, label: "Twitter / X Profile" },
                { id: "youtube", icon: Youtube, label: "YouTube Channel" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <div key={social.id} className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{social.label}</label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url"
                        placeholder="https://..."
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                        value={(formData.socialLinks as any)[social.id]}
                        onChange={(e) => handleSocialChange(social.id, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center space-x-3">
              <Shield className="text-primary" size={24} />
              <span>Security</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Admin Username</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.adminUsername}
                  onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    value={formData.adminEmail}
                    onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Additional Security Emails</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Add another email..."
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmail())}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-95"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.additionalEmails.map((email) => (
                    <div 
                      key={email}
                      className="bg-blue-50 text-primary px-4 py-2 rounded-xl flex items-center space-x-2 border border-blue-100 group animate-in fade-in zoom-in duration-200"
                    >
                      <span className="font-bold text-sm">{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-primary/40 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {formData.additionalEmails.length === 0 && (
                    <p className="text-xs text-gray-400 italic ml-1">No additional emails added</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Admin Password</label>
                <input
                  type="password"
                  placeholder="Leave empty to keep current"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  value={formData.adminPassword}
                  onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
