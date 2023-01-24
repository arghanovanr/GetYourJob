import React from "react";
import Company from "../../components/Company";
import CTA from "../../components/CTA";
import Featured from "../../components/Featured";
import Footer from "../../components/Footer";
import { HeroSection } from "../../components/HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Featured />
      <CTA />
      <Company />
      <Footer />
    </div>
  );
};

export default Home;
