import { useEffect, useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Webcam from "react-webcam";
import { useAppContext } from "../context/AppContextProvider";
import Loading from "./ui/Loading";

const InitiateScan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("checking");
  // "checking", "ready", "no-camera", "permission-denied", "low-light"

  const { ExtractedText, setExtractedText } = useAppContext();

  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // ----------- Capture Image Function ------------
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // Simulate processing delay
    setTimeout(() => {
      navigate("/result", { state: { capturedImage: imageSrc } });
      setIsModalOpen(false);
    }, 3000);
  };

  // ----------- OCR Effect ------------
  useEffect(() => {
    if (capturedImage) {
      setLoading(true);
      Tesseract.recognize(capturedImage, "eng", {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          setExtractedText(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error("OCR Error:", err);
          setLoading(false);
        });
    }
  }, [capturedImage]);

  // ----------- Camera Availability Check ------------
  useEffect(() => {
    if (isModalOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (stream) {
            setCameraStatus("ready");
          } else {
            setCameraStatus("no-camera");
          }
        })
        .catch((err) => {
          if (err.name === "NotAllowedError") {
            setCameraStatus("permission-denied");
          } else if (err.name === "NotFoundError") {
            setCameraStatus("no-camera");
          } else {
            setCameraStatus("no-camera");
          }
        });
    }
  }, [isModalOpen]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-light rounded-2xl shadow-md p-6 flex flex-col items-center">
      <FaCamera className="text-4xl text-primary-100 mb-2" />
      <h2 className="text-lg font-medium mb-2">Scan Product</h2>
      <p className="text-sm text-secondary-500 text-center mb-4">
        Capture a Product using your phone’s camera to extract text.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary-100 text-white px-6 py-2 rounded-xl shadow hover:bg-primary-200 transition w-full"
      >
        Start Scanning
      </button>

      {/* Modal with Camera */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-secondary-500 hover:text-secondary-700"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Capture Product</h2>

            {/* Camera states */}
            {cameraStatus === "checking" && (
              <p className="text-gray-600 text-center">Checking camera...</p>
            )}
            {cameraStatus === "no-camera" && (
              <p className="text-red-600 font-medium text-center">
                ❌ No camera found
              </p>
            )}
            {cameraStatus === "permission-denied" && (
              <p className="text-red-600 font-medium text-center">
                🚫 Camera permissions denied
              </p>
            )}
            {cameraStatus === "low-light" && (
              <p className="text-yellow-600 font-medium text-center">
                ⚠️ Low light detected, results may be less accurate
              </p>
            )}

            {/* Show webcam only if camera is ready */}
            {cameraStatus === "ready" && !capturedImage && (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full rounded-lg"
              />
            )}

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="rounded-lg shadow max-h-60 mx-auto"
              />
            )}

            {/* Actions */}
            <div className="flex justify-between mt-4">
              {!capturedImage ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1 bg-secondary-400 text-light rounded-md"
                  >
                    Cancel
                  </button>
                  {cameraStatus === "ready" && (
                    <button
                      onClick={handleCapture}
                      className="px-3 py-1 bg-primary-100 text-light rounded-md"
                    >
                      Capture
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setCapturedImage(null)}
                  className="w-full py-2 bg-primary-200 text-light rounded-md"
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
};

export default InitiateScan;
