import React, { useState } from "react";
import { FaCamera, FaHistory, FaUser, FaUpload, FaTimes } from "react-icons/fa";

export default function Home1() {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">OCR App</h1>
        <FaUser className="text-2xl text-gray-600" />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {/* Scan Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <FaCamera className="text-4xl text-indigo-500 mb-2" />
          <h2 className="text-lg font-medium mb-2">Scan Document</h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Upload or capture a document to extract text.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-500 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-600 transition w-full"
          >
            Start Scanning
          </button>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">History</h2>
            <p className="text-sm text-gray-500">View your past scans</p>
          </div>
          <FaHistory className="text-3xl text-gray-600" />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-md p-3 flex justify-around">
        <button className="flex flex-col items-center text-indigo-600">
          <FaCamera className="text-2xl" />
          <span className="text-xs">Scan</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
          <FaHistory className="text-2xl" />
          <span className="text-xs">History</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
          <FaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>

      {/* Modal */}
      {isModalOpen && (
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
      )}
    </div>
  );
}
