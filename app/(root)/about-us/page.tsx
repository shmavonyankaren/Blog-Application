import React from "react";
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import FeaturesGrid from "@/components/about/FeaturesGrid";
import ValuesSection from "@/components/about/ValuesSection";
import CTASection from "@/components/about/CTASection";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <AboutHero />
        <MissionSection />
        <FeaturesGrid />
        <ValuesSection />
        <CTASection />
      </div>
    </div>
  );
}
