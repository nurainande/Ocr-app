import React from "react";

const Loader = ({ size = "40", color = "blue-500", text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-${color}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
      <p className="mt-4 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loader;