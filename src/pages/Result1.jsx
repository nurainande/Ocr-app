import React from 'react'

import { useLocation } from "react-router-dom";
const Result = () => {
  const location = useLocation();
  const { capturedImage } = location.state || {}; //  retrieve
  console.log("Captured image in Result page:", capturedImage);
   return (
     <div>
       <h1>Result Page</h1>
       {capturedImage && (
         <img
           src={capturedImage}
           alt="Captured"
           className="rounded-lg shadow max-h-60 mx-auto"
         />
       )}
     </div>
   );
}

export default Result