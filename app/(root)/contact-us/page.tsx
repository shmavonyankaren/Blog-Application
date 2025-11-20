import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQCard from "@/components/contact/ContactFAQCard";
import ResponseTimeNotice from "@/components/contact/ResponseTimeNotice";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <ContactHero />

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm />

          <div className="space-y-8">
            <ContactInfo />
            <ContactFAQCard />
          </div>
        </div>

        <ResponseTimeNotice />
      </div>
    </div>
  );
}
