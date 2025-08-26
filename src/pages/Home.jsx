import React, { useRef, useState } from "react";
import { FaCamera, FaHistory, FaUser, FaTimes } from "react-icons/fa";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ButtomNav from "../components/ButtomNav";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate  = useNavigate();
  const webcamRef = useRef(null);
// ----------- Capture Image Function ------------
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);


    // Open the result page and close the modal
    navigate("/result", { state: { capturedImage: imageSrc } });
    setIsModalOpen(false);

    // Later, pass imageSrc to Tesseract.js for OCR right here or in the result page
    // console.log("Captured image:", imageSrc);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {/* Scan Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <FaCamera className="text-4xl text-indigo-500 mb-2" />
          <h2 className="text-lg font-medium mb-2">Scan Product</h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Capture a Product using your phone’s camera to extract text.
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
      <ButtomNav/>

      {/* Modal with Camera */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            {/*1 Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
            {/*2 Capture doc text */}
            <h2 className="text-lg font-semibold mb-4">Capture Product</h2>

            {/*3 Live Camera */}
            {!capturedImage ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full rounded-lg"
              />
            ) : (
              <img
                src={capturedImage}
                alt="Captured"
                className="rounded-lg shadow max-h-60 mx-auto"
              />
            )}

            {/*4 Actions */}
            <div className="flex justify-between mt-4">
              {!capturedImage ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1 bg-gray-400 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCapture}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md"
                  >
                    Capture
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCapturedImage(null)}
                  className="w-full py-2 bg-indigo-500 text-white rounded-md"
                >
                  Retake
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
