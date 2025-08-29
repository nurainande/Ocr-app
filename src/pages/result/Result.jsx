import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContextProvider";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { capturedImage } = location.state || {};
  const { extractedText } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with Back button */}
      <div className="relative bg-white shadow p-4">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-semibold text-center">Scan Result</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Images Section */}
        {capturedImage && (
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-medium mb-4 text-center">
              Product Comparison
            </h2>
            <div className="flex justify-center space-x-4">
              <div className="w-1/2 text-center">
                <div className="h-60 flex items-center justify-center">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="h-full object-contain rounded-lg shadow"
                  />
                </div>
                <h3 className="font-medium mt-2">Scan</h3>
              </div>
              <div className="w-1/2 text-center">
                <div className="h-60 flex items-center justify-center">
                  <img
                    src="https://www.supermart.ng/cdn/shop/files/spmt3315.jpg?v=1688696569"
                    alt="Processed"
                    className="h-full object-contain rounded-lg shadow "
                  />
                </div>
                <h3 className="font-medium mt-2">Database</h3>
              </div>
            </div>
          </div>
        )}

        {/* Latest Scan Result Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-medium mb-4">Latest Scan Result</h2>

          <div className="space-y-3">
            {/* Mismatch Detected */}
            <div className="flex items-center space-x-3 bg-red-50 border border-red-200 p-3 rounded-lg">
              <FaExclamationTriangle className="text-red-500 text-xl" />
              <p className="text-red-700 font-medium">
                Mismatch detected between product texts.
              </p>
            </div>

            {/* Error in Wording */}
            <div className="flex items-center space-x-3 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <FaExclamationTriangle className="text-yellow-500 text-xl" />
              <p className="text-yellow-700 font-medium">
                Potential error in wording found.
              </p>
            </div>

            {/* Success Indicator */}
            <div className="flex items-center space-x-3 bg-green-50 border border-green-200 p-3 rounded-lg">
              <FaCheckCircle className="text-green-500 text-xl" />
              <p className="text-green-700 font-medium">
                Scan Completed Successfully
              </p>
            </div>
          </div>
        </div>

        {/* Extracted Text Section */}
        {extractedText && (
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">Extracted Text</h2>
            <div className="bg-gray-100 rounded-lg p-3 max-h-60 overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap text-sm">
                {extractedText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
