import React from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

import HeroSection from "../_components/home_components/HeroSection";
import AboutUs from "../_components/home_components/AboutUs";
import Vmc from "../_components/home_components/Vmc";
import Wwd from "../_components/home_components/Wwd";
import Faq from "../_components/home_components/Faq";
import Contact from "../_components/home_components/Contact";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutUs/>
      <Vmc/>
      <Wwd/>
      <Faq/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
