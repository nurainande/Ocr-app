// InitiateScan.jsx
// import { useState, useRef, useEffect } from "react";
// import { FaCamera, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Webcam from "react-webcam";
// import { Rnd } from "react-rnd";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useAppContext } from "../context/AppContextProvider";
// import Loading from "./ui/Loading";

// const InitiateScan = ({ isModalOpen, setIsModalOpen }) => {
//   const { BACKEND_URL } = useAppContext();
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [cameraStatus, setCameraStatus] = useState("checking");
//   const [showScanTypeModal, setShowScanTypeModal] = useState(false);
//   const [selectedScanType, setSelectedScanType] = useState(null);

//   const [cropBox, setCropBox] = useState({
//     width: 200,
//     height: 200,
//     x: 50,
//     y: 50,
//   });

//   const webcamRef = useRef(null);
//   const imageRef = useRef(null);
//   const navigate = useNavigate();

//   // Camera availability for label/ingredients (we skip this check for barcode because html5-qrcode will request permission)
//   useEffect(() => {
//     if (isModalOpen && selectedScanType !== "barcode") {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           setCameraStatus("ready");
//           stream.getTracks().forEach((track) => track.stop());
//         })
//         .catch((err) => {
//           console.error("Camera error:", err);
//           setCameraStatus(err.name === "NotAllowedError" ? "permission-denied" : "no-camera");
//         });
//     } else {
//       setCameraStatus("checking");
//     }
//   }, [isModalOpen, selectedScanType]);

//   // Scan type selection
//   const handleStartScanning = () => setShowScanTypeModal(true);
//   const handleScanTypeSelect = (type) => {
//     setSelectedScanType(type);
//     setShowScanTypeModal(false);
//     setIsModalOpen(true);
//   };

//   // Capture image (for label & ingredients)
//   const handleCapture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) setCapturedImage(imageSrc);
//   };

//   // Crop image using canvas
//   const getCroppedImage = () => {
//     if (!capturedImage || !cropBox || !imageRef.current) return null;
//     const image = imageRef.current;
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;

//     const canvas = document.createElement("canvas");
//     canvas.width = cropBox.width * scaleX;
//     canvas.height = cropBox.height * scaleY;
//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(
//       image,
//       cropBox.x * scaleX,
//       cropBox.y * scaleY,
//       cropBox.width * scaleX,
//       cropBox.height * scaleY,
//       0,
//       0,
//       cropBox.width * scaleX,
//       cropBox.height * scaleY
//     );

//     return canvas.toDataURL("image/jpeg");
//   };

//   // Backend processing for label & ingredients
//   const processImageWithBackend = async (imageSrc) => {
//     if (!selectedScanType) return;
//     setLoading(true);
//     try {
//       // For barcode we skip image upload 🚀
//       if (selectedScanType === "barcode") return;

//       const res = await fetch(imageSrc);
//       const blob = await res.blob();
//       const formData = new FormData();
//       formData.append("image", blob, "capture.png");

//       // Map scan type to correct endpoint
//       const endpoint = selectedScanType === "label" ? "scan/verbage" : "scan/ingredients";

//       const response = await fetch(`${BACKEND_URL}/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       navigate("/result", { state: { capturedImage: imageSrc, scanResult: data } });
//     } catch (error) {
//       console.error("Backend error:", error);
//     } finally {
//       setLoading(false);
//       setIsModalOpen(false);
//       setCapturedImage(null);
//       setSelectedScanType(null);
//     }
//   };

//   const handleCropConfirm = () => {
//     const croppedImage = getCroppedImage();
//     if (croppedImage) processImageWithBackend(croppedImage);
//   };

//   const handleCloseModal = () => {
//     // if barcode scanner is running we rely on cleanup in the scanner effect
//     setCapturedImage(null);
//     setSelectedScanType(null);
//     setIsModalOpen(false);
//   };

//   // -------------------
//   // Barcode scanner init (only touches barcode flow)
//   // -------------------
//   useEffect(() => {
//     // We'll create scanner when modal is open AND barcode is selected
//     let scannerInstance = null;
//     let didInit = false;

//     const startScanner = () => {
//       try {
//         // element id used in the render below: "barcode-reader"
//         scannerInstance = new Html5QrcodeScanner(
//           "barcode-reader",
//           {
//             fps: 10,
//             // rectangular scan box (better for 1D barcodes)
//             qrbox: { width: 300, height: 120 },
//           },
//           /* verbose= */ false
//         );

//         // mark camera ready for UI (optional)
//         setCameraStatus("ready");

//         scannerInstance.render(
//           // success callback
//           async (decodedText, decodedResult) => {
//             // decodedText is the barcode string
//             console.log("Barcode detected (client-side):", decodedText);
//             setLoading(true);

//             try {
//               const response = await fetch(`${BACKEND_URL}/api/scan/barcode-data`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ barcode: decodedText }),
//               });

//               const data = await response.json();
//               // navigate to result (similar to other flows)
//               navigate("/result", { state: { capturedImage: null, scanResult: data } });
//             } catch (err) {
//               console.error("Error sending barcode to backend:", err);
//             } finally {
//               setLoading(false);
//               // close modal and clear scanner
//               setIsModalOpen(false);
//               try {
//                 scannerInstance.clear().catch(() => {});
//               } catch (e) {
//                 // ignore
//               }
//             }
//           },

//           // error callback (scans that didn't find a code)
//           (errorMessage) => {
//             // Not an actual fatal error — keep scanning silently. Use console.warn for debugging.
//             // console.warn("scan error:", errorMessage);
//           }
//         );

//         didInit = true;
//       } catch (initErr) {
//         console.error("Failed to initialize barcode scanner:", initErr);
//         setCameraStatus("permission-denied");
//       }
//     };

//     if (isModalOpen && selectedScanType === "barcode") {
//       startScanner();
//     }

//     // cleanup: stop scanner when modal closed or user switches tab
//     return () => {
//       if (scannerInstance && didInit) {
//         scannerInstance.clear().catch((err) => {
//           // ignore errors during cleanup
//           console.error("Error clearing barcode scanner on cleanup:", err);
//         });
//       }
//       setCameraStatus("checking");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isModalOpen, selectedScanType, BACKEND_URL, navigate, setIsModalOpen]);

//   // -------------------
//   // Render
//   // -------------------
//   if (loading) return <Loading />;

//   return (
//     <div className="bg-light rounded-2xl shadow-md p-6 flex flex-col items-center">
//       <FaCamera className="text-primary mb-2 text-4xl" />
//       <h2 className="action-heading mb-2">Scan Product</h2>
//       <p className="text-sm text-secondary-lighter text-center mb-4">
//         Capture a product using your phone's camera to extract text.
//       </p>

//       <button
//         onClick={handleStartScanning}
//         className="action-button px-6 py-2 rounded-xl shadow transition w-full"
//       >
//         Start Scanning
//       </button>

//       {/* Scan Type Modal */}
//       {showScanTypeModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
//           <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
//             <button
//               onClick={() => setShowScanTypeModal(false)}
//               className="absolute top-3 right-3 text-secondary-lighter hover:text-secondary-light"
//             >
//               <FaTimes className="text-xl" />
//             </button>
//             <h2 className="action-heading mb-4 text-center">Select Scan Type</h2>
//             <div className="flex flex-col space-y-3">
//               <button className="bg-primary text-light rounded-md py-2" onClick={() => handleScanTypeSelect("barcode")}>
//                 Barcode
//               </button>
//               <button className="bg-primary text-light rounded-md py-2" onClick={() => handleScanTypeSelect("label")}>
//                 Label (Verbage)
//               </button>
//               <button className="bg-primary text-light rounded-md py-2" onClick={() => handleScanTypeSelect("ingredients")}>
//                 Ingredients
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Camera Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
//           <div className="bg-light rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-3 right-3 text-secondary-lighter hover:text-secondary-light"
//             >
//               <FaTimes className="text-xl" />
//             </button>
//             <h2 className="action-heading mb-4">Capture Product ({selectedScanType})</h2>

//             {/* Barcode scanner view */}
//             {selectedScanType === "barcode" && (
//               <div id="barcode-reader" className="w-full h-[300px]">
//                 {/* html5-qrcode will mount into this div via id "barcode-reader" */}
//                 <div id="barcode-reader" />
//               </div>
//             )}

//             {/* Image + Crop flow for others */}
//             {selectedScanType !== "barcode" && (
//               <>
//                 {/* Camera Status */}
//                 {cameraStatus === "checking" && <p className="text-secondary-light text-center">Checking camera...</p>}
//                 {cameraStatus === "no-camera" && <p className="camera-error">❌ No camera found</p>}
//                 {cameraStatus === "permission-denied" && <p className="camera-error">🚫 Camera permissions denied</p>}

//                 {/* Webcam */}
//                 {!capturedImage && cameraStatus === "ready" && (
//                   <Webcam
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={{ facingMode: "environment" }}
//                     className="w-full rounded-lg"
//                   />
//                 )}

//                 {/* Image + Resizable Crop Box */}
//                 {capturedImage && (
//                   <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
//                     <img
//                       ref={imageRef}
//                       src={capturedImage}
//                       alt="Captured"
//                       className="w-full h-full object-contain"
//                     />
//                     <Rnd
//                       size={{ width: cropBox.width, height: cropBox.height }}
//                       position={{ x: cropBox.x, y: cropBox.y }}
//                       onDragStop={(e, d) => setCropBox({ ...cropBox, x: d.x, y: d.y })}
//                       onResizeStop={(e, direction, ref, delta, position) => {
//                         setCropBox({
//                           width: parseInt(ref.style.width),
//                           height: parseInt(ref.style.height),
//                           ...position,
//                         });
//                       }}
//                       bounds="parent"
//                       className="border-2 border-primary z-10"
//                       minWidth={50}
//                       minHeight={50}
//                       lockAspectRatio={false}
//                     />
//                   </div>
//                 )}

//                 {/* Modal Actions */}
//                 <div className="flex justify-between mt-4">
//                   {!capturedImage ? (
//                     <>
//                       <button onClick={handleCloseModal} className="px-3 py-1 bg-secondary-lighter text-light rounded-md">Cancel</button>
//                       {cameraStatus === "ready" && <button onClick={handleCapture} className="px-3 py-1 bg-primary text-light rounded-md">Capture</button>}
//                     </>
//                   ) : (
//                     <button onClick={handleCropConfirm} className="w-full py-2 bg-primary-light text-light rounded-md">Confirm Crop & Scan</button>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InitiateScan;



// import { useState, useRef, useEffect } from "react";
// import { FaCamera, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Webcam from "react-webcam";
// import { Rnd } from "react-rnd";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useAppContext } from "../context/AppContextProvider";
// import axios from "axios";

// const InitiateScan = () => {
//   const navigate = useNavigate();
//   const webcamRef = useRef(null);
//   const [imgSrc, setImgSrc] = useState(null);
//   const [selectedScanType, setSelectedScanType] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [crop, setCrop] = useState({ x: 50, y: 50, width: 200, height: 200 });
//   const { BACKEND_URL } = useAppContext();

//   // ✅ Barcode scanner effect
//   useEffect(() => {
//     if (selectedScanType !== "barcode") return;

//     // clear any existing content
//     const barcodeContainer = document.getElementById("barcode-reader");
//     if (barcodeContainer) {
//       barcodeContainer.innerHTML = "";
//     }

//     const scanner = new Html5QrcodeScanner("barcode-reader", {
//       fps: 10,
//       qrbox: { width: 250, height: 250 },
//     });

//     scanner.render(
//       async (decodedText) => {
//         try {
//           // stop scanning after first detection
//           await scanner.clear();

//           // send to backend
//           await axios.post(`${BACKEND_URL}/api/barcode-data`, {
//             barcode: decodedText,
//           });

//           alert(`✅ Barcode sent: ${decodedText}`);
//         } catch (err) {
//           console.error("Error sending barcode:", err);
//           alert("❌ Failed to send barcode");
//         }
//       },
//       (errorMessage) => {
//         // scanner keeps scanning, only log occasional errors
//         console.log("Scanning error:", errorMessage);
//       }
//     );

//     return () => {
//       scanner.clear().catch(() => {});
//     };
//   }, [selectedScanType, BACKEND_URL]);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//     setIsModalOpen(true);
//   };

//   const handleSave = async () => {
//     const imageElement = document.createElement("img");
//     imageElement.src = imgSrc;

//     imageElement.onload = async () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       canvas.width = crop.width;
//       canvas.height = crop.height;

//       ctx.drawImage(
//         imageElement,
//         crop.x,
//         crop.y,
//         crop.width,
//         crop.height,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );

//       const croppedImage = canvas.toDataURL("image/jpeg");

//       try {
//         const res = await fetch(croppedImage);
//         const blob = await res.blob();

//         const formData = new FormData();
//         formData.append("image", blob, "capture.jpg");

//         const endpoint =
//           selectedScanType === "verbiage"
//             ? "/api/verbiage"
//             : "/api/ingredient";

//         const response = await fetch(`${BACKEND_URL}${endpoint}`, {
//           method: "POST",
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to upload image");
//         }

//         const data = await response.json();
//         console.log("Server Response:", data);

//         setIsModalOpen(false);
//         setImgSrc(null);
//         navigate("/result", { state: { result: data } });
//       } catch (err) {
//         console.error("Error uploading image:", err);
//       }
//     };
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6 space-y-6">
//       <h2 className="text-xl font-semibold mb-4">Select Scan Type</h2>
//       <div className="flex space-x-4">
//         <button
//           onClick={() => setSelectedScanType("verbiage")}
//           className={`px-4 py-2 rounded ${
//             selectedScanType === "verbiage"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Scan by Verbiage
//         </button>
//         <button
//           onClick={() => setSelectedScanType("ingredient")}
//           className={`px-4 py-2 rounded ${
//             selectedScanType === "ingredient"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Scan by Ingredient
//         </button>
//         <button
//           onClick={() => setSelectedScanType("barcode")}
//           className={`px-4 py-2 rounded ${
//             selectedScanType === "barcode"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Scan with Barcode
//         </button>
//       </div>

//       {selectedScanType === "barcode" && (
//         <div id="barcode-reader" style={{ width: "100%" }} />
//       )}

//       {(selectedScanType === "verbiage" ||
//         selectedScanType === "ingredient") && (
//         <div className="flex flex-col items-center">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={400}
//             height={300}
//             videoConstraints={{
//               facingMode: "environment",
//             }}
//           />
//           <button
//             onClick={capture}
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
//           >
//             <FaCamera className="inline mr-2" />
//             Capture
//           </button>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-4">Crop Your Image</h3>
//             {imgSrc && (
//               <div style={{ position: "relative" }}>
//                 <img src={imgSrc} alt="Capture" width={400} height={300} />
//                 <Rnd
//                   bounds="parent"
//                   size={{ width: crop.width, height: crop.height }}
//                   position={{ x: crop.x, y: crop.y }}
//                   onDragStop={(e, d) => setCrop({ ...crop, x: d.x, y: d.y })}
//                   onResizeStop={(e, direction, ref, delta, position) => {
//                     setCrop({
//                       width: parseInt(ref.style.width, 10),
//                       height: parseInt(ref.style.height, 10),
//                       ...position,
//                     });
//                   }}
//                   style={{
//                     border: "2px dashed red",
//                     zIndex: 10,
//                   }}
//                 />
//               </div>
//             )}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded"
//               >
//                 <FaTimes className="inline mr-2" />
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Save & Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InitiateScan;
