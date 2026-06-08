"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What taxi services do you offer in Puducherry?",
    answer: "We offer a wide range of taxi services in Puducherry including Chennai airport pickup and drop, local sightseeing, outstation cabs to Chennai and other South Indian cities, one-way taxi, and round-trip taxi services. We also provide tour packages for Puducherry and nearby destinations."
  },
  {
    question: "How much does a taxi from Puducherry to Chennai Airport cost?",
    answer: "The cost of a taxi from Puducherry to Chennai Airport depends on the type of vehicle you choose. We offer competitive and transparent pricing with no hidden charges. You can get an instant quote by using our booking form or contacting us directly at +91 8668076871."
  },
  {
    question: "Do you provide one-way taxi services?",
    answer: "Yes, we provide one-way taxi services from Puducherry to Chennai, Bengaluru, Trichy, Madurai, and other cities. Our one-way taxi service offers fixed pricing, professional drivers, and comfortable vehicles."
  },
  {
    question: "Are your drivers professional and experienced?",
    answer: "Absolutely! All our drivers are professional, experienced, verified, and well-versed with local routes. They are trained to provide a safe and comfortable journey to our customers."
  },
  {
    question: "How can I book a taxi with SV Tour and Travels?",
    answer: "You can book a taxi with us in multiple ways: 1) Use our online booking form on the website, 2) Call us at +91 8668076871, 3) WhatsApp us, or 4) Send us an email. We recommend booking in advance for the best availability."
  },
  {
    question: "Do you offer tour packages in Puducherry?",
    answer: "Yes! We offer customizable tour packages in Puducherry covering popular attractions like Auroville, Sri Aurobindo Ashram, beaches, churches, and more. We also offer outstation tour packages from Puducherry."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#00bcd4]">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our taxi and travel services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#00bcd4] w-6 h-6" />
                ) : (
                  <ChevronDown className="text-gray-500 w-6 h-6" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-white">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FAQSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      })
    }}
  />
);
