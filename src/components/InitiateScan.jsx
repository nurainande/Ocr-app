// // FIRST VERSION
import { useState, useRef, useEffect } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Rnd } from "react-rnd";
import { useAppContext } from "../context/AppContextProvider";
import Loading from "./ui/Loading";

const InitiateScan = ({ isModalOpen, setIsModalOpen }) => {
  const { BACKEND_URL } = useAppContext();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("checking");
  const [showScanTypeModal, setShowScanTypeModal] = useState(false);
  const [selectedScanType, setSelectedScanType] = useState(null);

  const [cropBox, setCropBox] = useState({
    width: 200,
    height: 200,
    x: 50,
    y: 50,
  });

  const webcamRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  // Camera availability
  useEffect(() => {
    if (isModalOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCameraStatus("ready");
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((err) => {
          console.error("Camera error:", err);
          setCameraStatus(err.name === "NotAllowedError" ? "permission-denied" : "no-camera");
        });
    } else setCameraStatus("checking");
  }, [isModalOpen]);

  // Scan type selection
  const handleStartScanning = () => setShowScanTypeModal(true);
  const handleScanTypeSelect = (type) => {
    setSelectedScanType(type);
    setShowScanTypeModal(false);
    setIsModalOpen(true);
  };

  // Capture image
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  // Crop image using canvas
  const getCroppedImage = () => {
    if (!capturedImage || !cropBox || !imageRef.current) return null;
    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement("canvas");
    canvas.width = cropBox.width * scaleX;
    canvas.height = cropBox.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      cropBox.x * scaleX,
      cropBox.y * scaleY,
      cropBox.width * scaleX,
      cropBox.height * scaleY,
      0,
      0,
      cropBox.width * scaleX,
      cropBox.height * scaleY
    );

    return canvas.toDataURL("image/jpeg");
  };

  // Backend processing
  const processImageWithBackend = async (imageSrc) => {
    if (!selectedScanType) return;
    setLoading(true);
    try {
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append("image", blob, "capture.png");

      // Map scan type to correct endpoint
      let endpoint = "";
      switch (selectedScanType) {
        case "barcode":
          endpoint = "scan/barcode";
          break;
        case "label":
          endpoint = "scan/verbage";
          break;
        case "ingredients":
          endpoint = "scan/ingredients";
          break;
        default:
          throw new Error("Invalid scan type");
      }

      const response = await fetch(`${BACKEND_URL}/${endpoint}`, {
        method: "POST",
        body: formData,
      });
      console.log("response",response)

      const data = await response.json();
      console.log("data",data)
      navigate("/result", { state: { capturedImage: imageSrc, scanResult: data } });
    } catch (error) {
      console.error("Backend error:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setCapturedImage(null);
      setSelectedScanType(null);
    }
  };

  const handleCropConfirm = () => {
    const croppedImage = getCroppedImage();
    if (croppedImage) processImageWithBackend(croppedImage);
  };

  const handleCloseModal = () => {
    setCapturedImage(null);
    setSelectedScanType(null);
    setIsModalOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-light rounded-2xl shadow-md p-6 flex flex-col items-center">
      <FaCamera className="text-primary mb-2 text-4xl" />
      <h2 className="action-heading mb-2">Scan Product</h2>
      <p className="text-sm text-secondary-lighter text-center mb-4">
        Capture a product using your phone's camera to extract text.
      </p>

      <button
        onClick={handleStartScanning}
        className="action-button px-6 py-2 rounded-xl shadow transition w-full"
      >
        Start Scanning
      </button>

      {/* Scan Type Modal */}
      {showScanTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setShowScanTypeModal(false)}
              className="absolute top-3 right-3 text-secondary-lighter hover:text-secondary-light"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="action-heading mb-4 text-center">Select Scan Type</h2>
            <div className="flex flex-col space-y-3">
              <button className="bg-primary text-light rounded-md py-2" onClick={() => handleScanTypeSelect("barcode")}>
                Barcode
              </button>
              <button className="bg-primary text-light rounded-md py-2" onClick={() => handleScanTypeSelect("label")}>
                Label (Verbage)
              </button>
              <button className="bg-primary text-light rounded-md py-2" onClick={() => handleScanTypeSelect("ingredients")}>
                Ingredients
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-secondary-lighter hover:text-secondary-light"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="action-heading mb-4">Capture Product ({selectedScanType})</h2>

            {/* Camera Status */}
            {cameraStatus === "checking" && <p className="text-secondary-light text-center">Checking camera...</p>}
            {cameraStatus === "no-camera" && <p className="camera-error">❌ No camera found</p>}
            {cameraStatus === "permission-denied" && <p className="camera-error">🚫 Camera permissions denied</p>}

            {/* Webcam */}
            {!capturedImage && cameraStatus === "ready" && (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full rounded-lg"
              />
            )}

            {/* Image + Resizable Crop Box */}
            {capturedImage && (
              <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  ref={imageRef}
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-contain"
                />
                <Rnd
                  size={{ width: cropBox.width, height: cropBox.height }}
                  position={{ x: cropBox.x, y: cropBox.y }}
                  onDragStop={(e, d) => setCropBox({ ...cropBox, x: d.x, y: d.y })}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setCropBox({
                      width: parseInt(ref.style.width),
                      height: parseInt(ref.style.height),
                      ...position,
                    });
                  }}
                  bounds="parent"
                  className="border-2 border-primary z-10"
                  minWidth={50}
                  minHeight={50}
                  lockAspectRatio={false} // set true for perfect square
                />
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-between mt-4">
              {!capturedImage ? (
                <>
                  <button onClick={handleCloseModal} className="px-3 py-1 bg-secondary-lighter text-light rounded-md">Cancel</button>
                  {cameraStatus === "ready" && <button onClick={handleCapture} className="px-3 py-1 bg-primary text-light rounded-md">Capture</button>}
                </>
              ) : (
                <button onClick={handleCropConfirm} className="w-full py-2 bg-primary-light text-light rounded-md">Confirm Crop & Scan</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitiateScan;
