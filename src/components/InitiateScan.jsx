import { useEffect, useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Webcam from "react-webcam";
import { useAppContext } from "../context/AppContextProvider";
import Loading from "./ui/Loading";

const InitiateScan = ({isModalOpen,setIsModalOpen}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("checking");
  // "checking", "ready", "no-camera", "permission-denied", "low-light"

  const { setExtractedText } = useAppContext();

  const navigate = useNavigate();
  const webcamRef = useRef(null);

//   const handleCapture2 = async () => {
//   const imageSrc = webcamRef.current.getScreenshot(); // base64 string
//   console.log("Captured image:", imageSrc);
//   setCapturedImage(imageSrc);

//   if (imageSrc) {
//     // setLoading(true);

//     try {
//       // Convert base64 with Blob
//       const res = await fetch(imageSrc);
//       const blob = await res.blob();

//       // Put blob into FormData
//       const formData = new FormData();
//       formData.append("image", blob, "capture.png"); // field must match upload.single("image")

//      setLoading(true);
//       // Send to backend
//       const response = await fetch("http://localhost:3000/scan", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("API response:", data);

//       // Navigate to results page with both image & backend response
//       navigate("/result", { state: { capturedImage: imageSrc, scanResult: data } });
//     } catch (err) {
//       console.error("Upload error:", err);
//     } finally {
//       setLoading(false);
//       setIsModalOpen(false);
//     }
//   }
// };


  // ----------- Capture Image Function ------------
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // TESTING----------------,COULD BE DELETED
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
      <FaCamera className="text-primary mb-2 text-4xl" />
      <h2 className="action-heading mb-2">Scan Product</h2>
      <p className="text-sm text-secondary-lighter text-center mb-4">
        Capture a Product using your phone’s camera to extract text.
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
              <p className="camera-error">
                ❌ No camera found
              </p>
            )}
            {cameraStatus === "permission-denied" && (
              <p className="camera-error">
                🚫 Camera permissions denied
              </p>
            )}
            {cameraStatus === "low-light" && (
              <p className="camera-error">
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

export default InitiateScan;
