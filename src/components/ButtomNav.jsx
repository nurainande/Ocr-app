import React, { useState } from "react";
import { FaCamera, FaUser, FaHome, FaTags,FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const ButtomNav = ({ setIsModalOpen }) => {
  const { userAuth } = useAppContext();
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const navItems = [
    { 
      id: "home", 
      label: "Home", 
      icon: <FaHome className="text-2xl" />, 
      action: () => setActive("home") 
    },
    { 
      id: "History", 
      label: "History", 
      icon: <FaHistory className="text-2xl" />, 
      action: () => { 
        setActive("history"); 
        // setIsModalOpen(true); 
        navigate('/history')
      } 
    },
    { 
      id: "products", 
      label: "Products", 
      icon: <FaTags className="text-2xl" />, 
      action: () => { 
        if (userAuth?.role === "admin") { 
          setActive("products"); 
          navigate("/products"); 
        } 
      }, 
      requiresAdmin: true 
    }
  ];

  return (
    <nav className="bg-light shadow-md p-3 flex justify-around fixed bottom-0 w-full">
      {navItems.map((item) => {
        const isActive = active === item.id;
        const isDisabled = item.requiresAdmin && userAuth?.role !== "admin";

        return (
          <button
            key={item.id}
            onClick={isDisabled ? undefined : item.action}
            className={`flex flex-col items-center ${
              isDisabled
                ? "text-gray-400 opacity-50 cursor-not-allowed"
                : isActive
                ? "text-primary"
                : "text-secondary-light hover:text-primary"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default ButtomNav;
