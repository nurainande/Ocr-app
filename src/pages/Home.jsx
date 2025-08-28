import React, { useEffect, useRef, useState } from "react";
import { FaCamera, FaHistory, FaUser, FaTimes, FaBalanceScale, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import ButtomNav from "../components/ButtomNav";
import Tesseract from "tesseract.js";
import { useAppContext } from "../context/AppContextProvider";
import Loading from "../components/Loading";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [compareModal, setCompareModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  // moved from Result.jsx
  const {setExtractedText} = useAppContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // Dummy past scans
  const historyData = [
    {
      id: 1,
      title: "Coke",
      date: "2025-08-20",
      databaseImg:
        "https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D",
      scannedImg:
        "https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D",
      matched: true,
      reasonNotMatched: "",
    },
    {
      id: 2,
      title: "Fanta",
      date: "2025-08-21",
      databaseImg:
        "https://m.media-amazon.com/images/I/41mLN2BN8EL._UF1000,1000_QL80_.jpg",
      scannedImg:
        "https://m.media-amazon.com/images/I/41mLN2BN8EL._UF1000,1000_QL80_.jpg",
      matched: true,
      reasonNotMatched: "",
    },
    {
      id: 3,
      title: "Elim",
      date: "2025-08-22",
      databaseImg:
        "https://images.squarespace-cdn.com/content/v1/64cad9ec789ea73ddbef4cb8/1f169ce3-83ca-4ae4-89f1-2b6fb8fdfefa/832e664a25e90ba33c089514ec9a24be.JPG",
      scannedImg:
        "https://i0.wp.com/nextcashandcarry.com.ng/wp-content/uploads/2022/06/Elim-Water-600x600-1.png?fit=600%2C600&ssl=1",
      matched: false,
      reasonNotMatched: "Ingredients mismatch",
    },
    {
      id: 4,
      title: "Elim",
      date: "2025-08-22",
      databaseImg:
        "https://images.squarespace-cdn.com/content/v1/64cad9ec789ea73ddbef4cb8/1f169ce3-83ca-4ae4-89f1-2b6fb8fdfefa/832e664a25e90ba33c089514ec9a24be.JPG",
      scannedImg:
        "https://i0.wp.com/nextcashandcarry.com.ng/wp-content/uploads/2022/06/Elim-Water-600x600-1.png?fit=600%2C600&ssl=1",
      matched: false,
      reasonNotMatched: "Ingredients mismatch",
    },
  ];

  // ----------- Capture Image Function ------------
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    setCapturedImage(imageSrc);

    setTimeout(() => {
      // Open the result page and close the modal
      navigate("/result", { state: { capturedImage: imageSrc } });
      setIsModalOpen(false);
    }, 3000);
  };

  useEffect(() => {
      if (capturedImage) {
        setLoading(true);
        Tesseract.recognize(capturedImage, "eng", {
          logger: (m) => console.log(m), // logs progress in console
        })
          .then(({ data: { text } }) => {
            setTimeout(() => {
              setExtractedText(text);
              // wait for 3 seconds before setting loading to false
              setLoading(false);
            }, 3000);

          })
          .catch((err) => {
            console.error("OCR Error:", err);
            setLoading(false);
          });
      }
    }, [capturedImage]);

  if (loading) return <Loading text="Processing Image..." />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {/* <TopNav /> */}

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
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-medium">History</h2>
              <p className="text-sm text-gray-500">View your past scans</p>
            </div>
            <FaHistory className="text-3xl text-gray-600" />
          </div>

          
          <div className="space-y-3">
            {historyData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.databaseImg}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedHistory(item);
                    setCompareModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white text-xs rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  <FaBalanceScale /> View
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <ButtomNav />

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

      {/* Compare Modal (Bottom Sheet) */}
      {compareModal && selectedHistory && (
        <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg p-6 z-50">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setCompareModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          {/* i should have an icon that shows the good sign icon with light green background */}
          {/* Good sign icon with light green background */}
          <div className="flex justify-center mb-4">
            {selectedHistory.matched ? (
              <div className="bg-green-100 rounded-full p-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-500 text-3xl" />
                Image matched
              </div>
            ) : (
              <div className="bg-green-100 rounded-full p-3 flex items-center justify-center">
                <FaTimesCircle className="text-red-500 text-3xl" />
                No match
              </div>
            )}
          </div>
          {/* if there is a reasonNotMatched, the below ui will display the string  */}
          {selectedHistory.reasonNotMatched && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Reason:</strong>
              <span className="block sm:inline">
                {selectedHistory.reasonNotMatched}
              </span>
            </div>
          )}

          {/* <h3 className="text-md font-medium mb-2">{selectedHistory.title}</h3> */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <img
                src={selectedHistory.databaseImg}
                alt="History"
                className="rounded-lg shadow max-h-40 mx-auto"
              />
              <p className="text-sm font-medium mb-2">Database Image</p>
            </div>
            <div className="text-center">
              <img
                src={capturedImage || selectedHistory.scannedImg}
                alt="Captured"
                className="rounded-lg shadow max-h-40 mx-auto"
              />
              <p className="text-sm font-medium mb-2">Captured Image</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
