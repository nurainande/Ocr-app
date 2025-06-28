import { FaWhatsapp, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-main text-white py-16 px-6 sm:px-12 lg:px-24">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
    
    {/* <!-- Brand Info --> */}
    <div>
      <h2 className="text-2xl font-bold mb-2">Nurray</h2>
      <p className="text-sm text-white/80 leading-relaxed">
        Building the future of Africa through innovation, software, and purpose-driven technology.
      </p>
    </div>

    {/* <!-- Quick Links --> */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm text-white/80">
        <li><a href="#about" className="hover:text-white transition">About</a></li>
        <li><a href="#services" className="hover:text-white transition">What We Do</a></li>
        <li><a href="#faqs" className="hover:text-white transition">FAQs</a></li>
        <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
      </ul>
    </div>

    {/* <!-- Contact --> */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
      <ul className="space-y-2 text-sm text-white/80">
        <li><span className="font-medium text-white">Email:</span> hello@nurray.com</li>
        <li><span className="font-medium text-white">Phone:</span> +234 706
        184 3511</li>
        <li><span className="font-medium text-white">Location:</span> Abuja, Nigeria</li>
      </ul>
    </div>

    {/* <!-- Social Media --> */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
      <div className="flex space-x-4 text-xl text-white/90">
        <a href="#" className="hover:text-white transition">🌐</a>
        <a href="#" className="hover:text-white transition">🐦</a>
        <a href="#" className="hover:text-white transition">📘</a>
        <a href="#" className="hover:text-white transition">📸</a>
      </div>
    </div>
  </div>

  {/* <!-- Divider --> */}
  <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
    &copy; <span id="year"></span> Nurray Technologies. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
