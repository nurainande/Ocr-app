import React from 'react'
import { FaCamera, FaHistory, FaUser, FaHome } from "react-icons/fa";

const ButtomNav = () => {
  return (
    <nav className="bg-white shadow-md p-3 flex justify-around fixed bottom-0 w-full">
        <button className="flex flex-col items-center text-main">
            <FaHome className="text-2xl" />
            <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-main">
            <FaCamera className="text-2xl" />
            <span className="text-xs">Scan</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-main">
            <FaUser className="text-2xl" />
            <span className="text-xs">Profile</span>
        </button>
    </nav>
  )
}

export default ButtomNav