import { useEffect, useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Webcam from "react-webcam";
import { useAppContext } from "../context/AppContextProvider";
import Loading from "./ui/Loading";

// ========================= InitiateScan Component ===================
const InitiateScan3 = ({ isModalOpen, setIsModalOpen }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("checking"); // "checking", "ready", "no-camera", "permission-denied"
  const { setExtractedText } = useAppContext();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // ----------- Process Image Function (OCR or Backend) ------------
  const processImage = async (imageSrc) => {
    setLoading(true);
    
    try {
      // TODO: Replace this with backend API call when ready
      // For now, we'll use Tesseract for OCR simulation
      const { data: { text } } = await Tesseract.recognize(imageSrc, "eng", {
        logger: (m) => console.log(m),
      });
      
      setExtractedText(text);
      
      // Navigate to results with the processed data
      navigate("/result", { 
        state: { 
          capturedImage: imageSrc,
          extractedText: text 
        } 
      });
      
    } catch (error) {
      console.error("Processing error:", error);
      // Handle error appropriately - maybe show an error message
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // ----Future backend implementation would look like this
  /*
  const processImageWithBackend = async (imageSrc) => {
    setLoading(true);
    
    try {
      // Convert base64 to blob
      const res = await fetch(imageSrc);
      const blob = await res.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("image", blob, "capture.png");

      // Send to backend
      const response = await fetch("http://localhost:3000/scan", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      // Navigate with backend response
      navigate("/result", { 
        state: { 
          capturedImage: imageSrc, 
          scanResult: data 
        } 
      });
      
    } catch (error) {
      console.error("Backend processing error:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  */

  // ----------- Capture Image Function ------------
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      // Process the image immediately after capture
      processImage(imageSrc);
    }
  };

  // ----------- Retake Image Function ------------
  const handleRetake = () => {
    setCapturedImage(null);
  };

  // ----------- Close Modal Function ------------
  const handleCloseModal = () => {
    setCapturedImage(null);
    setIsModalOpen(false);
  };

  // ----------- Camera Availability Check ------------
  useEffect(() => {
    if (isModalOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStatus("ready");
          // Stop the stream to avoid keeping camera active
          stream.getTracks().forEach(track => track.stop());
        })
        .catch((err) => {
          console.error("Camera access error:", err);
          if (err.name === "NotAllowedError") {
            setCameraStatus("permission-denied");
          } else if (err.name === "NotFoundError") {
            setCameraStatus("no-camera");
          } else {
            setCameraStatus("no-camera");
          }
        });
    } else {
      setCameraStatus("checking");
    }
  }, [isModalOpen]);

  // ----Show loading component when processing---
  if (loading) {
    return <Loading />;
  }

  // ----------- Render Camera Status Messages ------------
  const renderCameraStatus = () => {
    switch (cameraStatus) {
      case "checking":
        return <p className="text-secondary-light text-center">Checking camera...</p>;
      case "no-camera":
        return <p className="camera-error">❌ No camera found</p>;
      case "permission-denied":
        return <p className="camera-error">🚫 Camera permissions denied</p>;
      default:
        return null;
    }
  };

  // ----------- Render Modal Actions ------------
  const renderModalActions = () => {
    if (!capturedImage) {
      return (
        <>
          <button
            onClick={handleCloseModal}
            className="px-3 py-1 bg-secondary-lighter text-light rounded-md"
          >
            Cancel
          </button>
          {cameraStatus === "ready" && (
            <button
              onClick={handleCapture}
              className="px-3 py-1 bg-primary text-light rounded-md"
            >
              Capture
            </button>
          )}
        </>
      );
    } else {
      return (
        <button
          onClick={handleRetake}
          className="w-full py-2 bg-primary-light text-light rounded-md"
        >
          Retake
        </button>
      );
    }
  };

  return (
    <div className="bg-light rounded-2xl shadow-md p-6 flex flex-col items-center">
      <FaCamera className="text-primary mb-2 text-4xl" />
      <h2 className="action-heading mb-2">Scan Product</h2>
      <p className="text-sm text-secondary-lighter text-center mb-4">
        Capture a Product using your phone's camera to extract text.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="action-button px-6 py-2 rounded-xl shadow transition w-full"
      >
        Start Scanning
      </button>

      {/* Modal with Camera */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-secondary-lighter hover:text-secondary-light"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="action-heading mb-4">Capture Product</h2>

            {/* Camera Status Messages */}
            {renderCameraStatus()}

            {/* Webcam Component */}
            {cameraStatus === "ready" && !capturedImage && (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full rounded-lg"
              />
            )}

            {/* Captured Image Preview */}
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="rounded-lg shadow max-h-60 mx-auto"
              />
            )}

            {/* Modal Actions */}
            <div className="flex justify-between mt-4">
              {renderModalActions()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitiateScan3;