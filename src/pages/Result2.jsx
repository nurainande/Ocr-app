// import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import { FaArrowLeft } from "react-icons/fa";
import { useAppContext } from "../context/AppContextProvider";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //  retrieve the capture
  const { capturedImage } = location.state || {};
  const {extractedText} = useAppContext();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (capturedImage) {
  //     setLoading(true);
  //     Tesseract.recognize(capturedImage, "eng", {
  //       logger: (m) => console.log(m), // logs progress in console
  //     })
  //       .then(({ data: { text } }) => {
  //         setExtractedText(text);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("OCR Error:", err);
  //         setLoading(false);
  //       });
  //   }
  // }, [capturedImage]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
      >
        <FaArrowLeft size={22} />
      </button>

      <h1 className="text-xl font-semibold mb-4 text-center">Scan Result</h1>
      {/* <img
          src={capturedImage}
          alt="Captured"
          className="rounded-lg shadow max-h-60 mx-auto mb-4"
        /> */}

{/* see that place that img was rendered, i want to render two img. side by side */}
      {/* Show captured image */}
      {capturedImage && (
        <div className="flex justify-center space-x-4 mb-4">
          <div className="w-1/2">
            <h2 className="text-center font-medium mb-2">Scanned Product</h2>
            <img
              src={capturedImage}
              alt="Captured"
              className="rounded-lg shadow max-h-60 mx-auto"
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-center font-medium mb-2">Database Product</h2>
            <img
              src={capturedImage}
              alt="Processed"
              className="rounded-lg shadow max-h-60 mx-auto filter grayscale"
            />
          </div>
        </div>
      )}

      {/* Show OCR Progress */}
      
      {/* {loading ? (
        <p className="text-indigo-600 text-center">Searching product...</p>
      ) : !extractedText ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Product Match Failed!</strong>
          <span className="block sm:inline">
            No Product detected. Please try again.
          </span>
        </div>
      ) : (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Product Match Successful!</strong>
          <span className="block sm:inline">
            Product successfully matched.
          </span>
        </div>
      )} */}

      {/* Show Extracted Text */}
      {extractedText && (
        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h2 className="text-lg font-medium mb-2">Extracted Text</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default Result;
