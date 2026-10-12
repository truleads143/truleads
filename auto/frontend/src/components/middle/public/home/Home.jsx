import React from "react";

import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import CoverageSection from "./CoverageSection";
import HowItWorks from "./HowItWorks";
import FinalCTA from "./FinalCTA";

export default function Home() {
  return (
    <main className="overflow-hidden">

      <HeroSection showMedia={true} />

      <WhyChooseUs />

      <CoverageSection />

      <HowItWorks />

      {/* <FinalCTA /> */}

    </main>
  );
}
