import React, { useState } from 'react'
import { FaCamera, FaHistory, FaUser, FaUpload, FaTimes } from "react-icons/fa";


const ScanAsk = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file));
          // 👉 Later, pass file to Tesseract.js for OCR
        }
      };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
    
                <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
    
                {/* File Upload */}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 w-full text-center hover:border-indigo-500 transition"
                >
                  <FaUpload className="text-3xl text-gray-500 mb-2" />
                  <span className="text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
    
                {/* Preview */}
                {selectedImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="rounded-lg shadow max-h-60 mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
  )
}

export default ScanAsk