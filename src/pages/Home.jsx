import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import React from "react";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (
    <div className="bg-[#F6EDE4] min-h-screen">
      <Hero />
      <CTA />
      <HowItWorks />
      <Features />
    </div>
  );
}
