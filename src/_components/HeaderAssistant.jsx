import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const HeaderAssistant = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {userAuth} = useAppContext()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      setIsScrolled(scrollY > screenHeight); // triggers after 100vh
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled ? "bg-main" : "bg-transparent"
      } w-full fixed z-50 py-3 px-6 md:px-12 transition-colors duration-500`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-xl font-bold text-white">
          <a href="/">nurray</a>
        </div>

        {/* Navigation Links for Large Screens */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-white">
            Home
          </a>
          <Link to="/projects" className="text-white">
            Projects
          </Link>
          <Link to="/products" className="text-white">
            Our Products
          </Link>
          <Link to="/blogs" className="text-white">
            Blog
          </Link>
          <a href="#contact" className="text-white">
            Contact
          </a>
          {userAuth?.role === "admin" && (
            <Link to="/admin" className="text-white">
              Admin
            </Link>
          )}
        </nav>

        {/* Menu Icon for Small Screens */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Collapsible Animated Menu for Small Screens */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-main transition-all duration-500 ease-in-out overflow-hidden z-40 
        ${
          menuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        } origin-top`}
      >
        <nav className="flex flex-col items-center space-y-4 py-6">
          <a href="/" className="text-white">
            Home
          </a>
          <Link to="/projects" className="text-white">
            Projects
          </Link>
          <Link to="/products" className="text-white">
            Our Products
          </Link>
          <Link to="/blogs" className="text-white">
            Blog
          </Link>
          <a href="#contact" className="text-white">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAssistant;
