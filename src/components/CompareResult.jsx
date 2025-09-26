import React from 'react'
import { FaQuestion } from "react-icons/fa";

export const CompareResult = ({capturedImage,scanResult}) => {
  return (
    <>
      {capturedImage && (
        <div className="bg-light rounded-xl shadow p-4">
          <h2 className="page-title mb-4 text-center">
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
                 {/* <FaQuestion size={30} color="blue" /> */}
              </div>
              <h3 className="h3-medium mt-2">Scan</h3>
            </div>
            <div className="w-1/2 text-center">
              <div className="h-60 flex items-center justify-center">
                {scanResult?.product?<img
                  src={scanResult.product.reference_image_url}
                  alt="Processed"
                  className="h-full object-contain rounded-lg shadow "
                />:
                <FaQuestion size={30} color="blue" />}
              </div>
              <h3 className="h3-medium mt-2">Database</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
