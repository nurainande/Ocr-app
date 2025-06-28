// import Link from "next/link";
import { Link } from "react-router-dom";
import Header from "../Header";
import AboutUs from "./AboutUs";
// import Vmc from "./_components/Vmc";
// import Wwd from "./_components/Wwd";
// import Faq from "./_components/Faq";
// import Footer from "./_components/Footer";
// import Contact from "./_components/Contact";

const HeroSection = () => {
  return (
    <>
      {/* <Header/> */}
      <section
        id="home"
        className="relative flex items-center justify-center h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/screen.jpg')`, // Replace with your background image path
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-main opacity-80"></div>

        {/* Content */}
        <div className="relative text-center text-white px-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Welcome to Nurray Technologies
          </h1>
          <p className="text-lg md:text-2xl mb-2">
            All We see is possibilities for your business.
          </p>
          <p className="text-lg md:text-xl mb-8">What do you see?</p>
          <div className="flex justify-center gap-4">
            <a
              href="#about"
              className="px-6 py-3 bg-main text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition"
            >
              About Us
            </a>
            <Link
              to="/projects"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-purple-700 transition"
            >
              Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
