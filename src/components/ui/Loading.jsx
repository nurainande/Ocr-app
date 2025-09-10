// ========================= Loading Component v1 ===================
// const Loading = ({ text = "Loading..." }) => {
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-light  z-50">
//       {/* Replace icon with GIF */}
//       <img
//         src="/snake.gif" // put your gif inside public folder as loader.gif
//         alt="Loading..."
//         className="w-16 h-16"
//       />
//       <p className="mt-4 text-gray-700 font-medium text-lg">{text}</p>
//     </div>
//   );
// };

// export default Loading;

// ========================= Loading Component v2 ===================
// const Loading = ({ text = "Loading..." }) => {
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-light z-50">
//       {/* Purple spinner animation */}
//       <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

//       <p className="mt-4 text-secondary-light font-medium text-lg">{text}</p>
//     </div>
//   );
// };

// export default Loading;

// ========================= Loading Component v3 ===================
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

// const Loading1 = ({ text = "Loading..." }) => {
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
//       <AiOutlineLoading3Quarters
//         className="animate-spin text-main"
//         size={60}
//       />
//       <p className="mt-4 text-gray-700 font-medium text-lg">{text}</p>
//     </div>
//   );
// };
// export default Loading1;

import React from 'react';

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      {/* Animated Purple Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-secondary animate-pulse"></div>
        
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      </div>
      
      {/* Loading text with fade animation */}
      <div className="mt-6 flex items-center space-x-1">
        <span className="text-gray-700 font-medium text-lg">{text}</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    
    </div>
  );
};

export default Loading;

