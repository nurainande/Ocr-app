import { useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useAppContext } from "../context/AppContextProvider";
import Loading from "./ui/Loading";

const InitiateScan2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("checking")
//     "checking" | "ready" | "no-camera" | "permission-denied" | "low-light"
//   >("checking");

  const { setExtractedText } = useAppContext();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);

  // ----------- Capture & Send Image ------------
  const handleCapture2 = async () => {
    const imageSrc = webcamRef.current?.getScreenshot(); // base64
    if (!imageSrc) return;

    setCapturedImage(imageSrc);
    setLoading(true);

    try {
      // Convert base64 → Blob
      const res = await fetch(imageSrc);
      const blob = await res.blob();

      // FormData for upload
      const formData = new FormData();
      formData.append("image", blob, "capture.png");

      // Send to backend
      const response = await fetch("http://localhost:3000/scan", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API response:", data);

      // Save OCR text globally
      if (data?.text) setExtractedText(data.text);

      // Navigate to result page
      navigate("/result", {
        state: { capturedImage: imageSrc, scanResult: data },
      });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // ----------- Camera Check ------------
  const checkCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) setCameraStatus("ready");
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setCameraStatus("permission-denied");
      } else if (err.name === "NotFoundError") {
        setCameraStatus("no-camera");
      } else {
        setCameraStatus("no-camera");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-light rounded-2xl shadow-md p-6 flex flex-col items-center">
      <FaCamera className="text-primary mb-2 text-4xl" />
      <h2 className="action-heading mb-2">Scan Product</h2>
      <p className="text-sm text-secondary-lighter text-center mb-4">
        Capture a Product using your phone’s camera to extract text.
      </p>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setCameraStatus("checking");
          checkCamera();
        }}
        className="action-button px-6 py-2 rounded-xl shadow transition w-full"
      >
        Start Scanning
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-secondary-lighter hover:text-secondary-light"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="action-heading mb-4">Capture Product</h2>

            {/* Camera states */}
            {cameraStatus === "checking" && (
              <p className="text-secondary-light text-center">Checking camera...</p>
            )}
            {cameraStatus === "no-camera" && (
              <p className="camera-error">❌ No camera found</p>
            )}
            {cameraStatus === "permission-denied" && (
              <p className="camera-error">🚫 Camera permissions denied</p>
            )}
            {cameraStatus === "low-light" && (
              <p className="camera-error">⚠️ Low light detected</p>
            )}

            {/* Webcam */}
            {cameraStatus === "ready" && !capturedImage && (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full rounded-lg"
              />
            )}

            {/* Preview */}
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
                    className="px-3 py-1 bg-secondary-lighter text-light rounded-md"
                  >
                    Cancel
                  </button>
                  {cameraStatus === "ready" && (
                    <button
                      onClick={handleCapture2}
                      className="px-3 py-1 bg-primary text-light rounded-md"
                    >
                      Capture
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setCapturedImage(null)}
                  className="w-full py-2 bg-primary-light text-light rounded-md"
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

export default InitiateScan2;
