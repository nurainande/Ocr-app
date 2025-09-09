import React, { useState } from 'react'
import { FaCamera, FaUser, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ButtomNav = ({ setIsModalOpen }) => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", icon: <FaHome className="text-2xl" />, action: () => setActive("home") },
    { id: "scan", label: "Scan", icon: <FaCamera className="text-2xl" />, action: () => { setActive("scan"); setIsModalOpen(true); } },
    { id: "profile", label: "Profile", icon: <FaUser className="text-2xl" />, action: () => {setActive("profile");navigate('/login') } }
  ];

  return (
    <nav className="bg-light shadow-md p-3 flex justify-around fixed bottom-0 w-full">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={item.action}
          className={`flex flex-col items-center ${
            active === item.id ? "text-primary" : "text-secondary-light"
          }`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default ButtomNav
