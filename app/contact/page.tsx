"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { useSettings } from "@/lib/SettingsContext";

export default function ContactPage() {
  const { settings } = useSettings();
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      value: settings.contactPhone,
      sub: "Mon - Sat, 9am - 8pm",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      value: settings.contactEmail,
      sub: "24/7 Online Support",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "WhatsApp",
      value: settings.whatsappNumber,
      sub: "Instant Response",
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <div className="pt-0">
      {/* Header */}
      <section className="bg-white py-24 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 text-[#0f172a]"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-xl max-w-2xl mx-auto font-medium"
          >
            Have questions about a package or need a custom itinerary? We're here to help you plan your next journey.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-24 bg-white -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50 text-center space-y-4"
              >
                <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {info.icon}
                </div>
                <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs">{info.title}</h3>
                <p className="text-xl font-bold text-gray-900">{info.value}</p>
                <p className="text-gray-400 text-sm">{info.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Section */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Fill out the form and our team will get back to you within 24 hours. We're excited to help you plan your next adventure!
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Main Office</h4>
                    <p className="text-gray-500">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Business Hours</h4>
                    <p className="text-gray-500">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-500">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            {settings.mapIframe ? (
              <iframe
                src={settings.mapIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
                  <MapPin className="text-gray-300" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Map not configured</h3>
                <p className="text-gray-500 max-w-sm">The office location map has not been set up in the admin settings yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
