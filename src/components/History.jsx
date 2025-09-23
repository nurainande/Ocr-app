// // import { useAppContext } from "../context/AppContextProvider";
// // import { FaBalanceScale } from "react-icons/fa";

// // function History() {
// //   const { historyData, setCompareModal, setSelectedHistory } = useAppContext();

// //   const handleOpenCompare = (item) => {
// //     setSelectedHistory(item);
// //     setCompareModal(true);
// //   };

// //   if (!historyData || historyData.length === 0) {
// //     return (
// //       <div className="p-6 text-center text-gray-500">
// //         No scan history available.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-semibold mb-4">Scan History</h2>

// //       <div className="space-y-3">
// //         {historyData.map((scan) => (
// //           <div
// //             key={scan.id}
// //             className="flex items-center justify-between bg-white shadow-sm border rounded-lg p-3 hover:shadow-md transition"
// //           >
// //             {/* Left side: Image + basic info */}
// //             <div className="flex items-center gap-3">
// //               <img
// //                 src={`http://localhost:4000/${scan.scan_image_url}`}
// //                 alt="Scanned"
// //                 className="w-12 h-12 object-cover rounded-md"
// //               />
// //               <div>
// //                 <h3 className="text-sm font-medium">
// //                   {scan.product?.name || "Unknown Product"}
// //                 </h3>
// //                 <p className="text-xs text-gray-500">
// //                   {new Date(scan.created_at).toLocaleDateString()}{" "}
// //                   {new Date(scan.created_at).toLocaleTimeString()}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Right side: Button */}
// //             <button
// //               onClick={() => handleOpenCompare(scan)}
// //               className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-white rounded-lg shadow hover:bg-primary transition"
// //             >
// //               <FaBalanceScale />
// //               View
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default History;


// import { useAppContext } from "../context/AppContextProvider";
// import { FaBalanceScale, FaTimes } from "react-icons/fa";

// function History() {
//   const {
//     historyData,
//     compareModal,
//     setCompareModal,
//     selectedHistory,
//     setSelectedHistory,
//   } = useAppContext();

//   const handleOpenCompare = (item) => {
//     setSelectedHistory(item);
//     setCompareModal(true);
//   };

//   if (!historyData || historyData.length === 0) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         No scan history available.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Scan History</h2>

//       <div className="space-y-3">
//         {historyData.map((scan) => (
//           <div
//             key={scan.id}
//             className="flex items-center justify-between bg-white shadow-sm border rounded-lg p-3 hover:shadow-md transition"
//           >
//             {/* Left side: Image + basic info */}
//             <div className="flex items-center gap-3">
//               <img
//                 src={`http://localhost:4000/${scan.scan_image_url}`}
//                 alt="Scanned"
//                 className="w-12 h-12 object-cover rounded-md"
//               />
//               <div>
//                 <h3 className="text-sm font-medium">
//                   {scan.product?.name || "Unknown Product"}
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   {new Date(scan.created_at).toLocaleDateString()}{" "}
//                   {new Date(scan.created_at).toLocaleTimeString()}
//                 </p>
//               </div>
//             </div>

//             {/* Right side: Button */}
//             <button
//               onClick={() => handleOpenCompare(scan)}
//               className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-white rounded-lg shadow hover:bg-primary transition"
//             >
//               <FaBalanceScale />
//               View
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* -------- Modal -------- */}
//       {compareModal && selectedHistory && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
//             {/* Close button */}
//             <button
//               onClick={() => setCompareModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               <FaTimes size={18} />
//             </button>

//             {/* Content */}
//             <h3 className="text-xl font-semibold mb-2">
//               {selectedHistory.product?.name || "Unknown Product"}
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               {new Date(selectedHistory.created_at).toLocaleString()}
//             </p>

//             {/* Images */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <img
//                   src={`http://localhost:4000/${selectedHistory.scan_image_url}`}
//                   alt="Scanned"
//                   className="rounded-md shadow w-full max-h-40 object-contain"
//                 />
//                 <p className="text-xs mt-2 text-center text-gray-600">
//                   Captured Image
//                 </p>
//               </div>
//               {selectedHistory.product?.image_url && (
//                 <div>
//                   <img
//                     src={selectedHistory.product.image_url}
//                     alt="Database"
//                     className="rounded-md shadow w-full max-h-40 object-contain"
//                   />
//                   <p className="text-xs mt-2 text-center text-gray-600">
//                     Database Image
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* OCR Text */}
//             {selectedHistory.ocr_text && (
//               <div className="mb-4">
//                 <h4 className="font-medium mb-1">OCR Extracted Text</h4>
//                 <pre className="bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap">
//                   {selectedHistory.ocr_text}
//                 </pre>
//               </div>
//             )}

//             {/* Similarity Score */}
//             {selectedHistory.similarity_score !== null && (
//               <div className="mb-4">
//                 <h4 className="font-medium mb-1">Similarity Score</h4>
//                 <p
//                   className={`text-sm font-medium ${
//                     selectedHistory.similarity_score >= 0.8
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {(selectedHistory.similarity_score * 100).toFixed(1)}%
//                 </p>
//               </div>
//             )}

//             {/* Discrepancy Notes */}
//             {selectedHistory.discrepancy_notes?.length > 0 && (
//               <div>
//                 <h4 className="font-medium mb-1">Discrepancy Notes</h4>
//                 <ul className="list-disc pl-5 text-sm text-gray-700">
//                   {selectedHistory.discrepancy_notes.map((note, i) => (
//                     <li key={i}>
//                       <span className="font-medium capitalize">{note.type}: </span>
//                       {note.message}
//                       {note.confidence &&
//                         ` (Confidence: ${note.confidence})`}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default History;


import { useAppContext } from "../context/AppContextProvider";
import { FaBalanceScale, FaTimes } from "react-icons/fa";

function History({ limit }) {
  const {
    historyData,
    compareModal,
    setCompareModal,
    selectedHistory,
    setSelectedHistory,
  } = useAppContext();

  const handleOpenCompare = (item) => {
    setSelectedHistory(item);
    setCompareModal(true);
  };

  if (!historyData || historyData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No scan history available.
      </div>
    );
  }

  // Apply limit if provided
  const displayedData = limit ? historyData.slice(0, limit) : historyData;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Scan History</h2>

      <div className="space-y-3">
        {displayedData.map((scan) => (
          <div
            key={scan.id}
            className="flex items-center justify-between bg-white shadow-sm border rounded-lg p-3 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={`http://localhost:4000/${scan.scan_image_url}`}
                alt="Scanned"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="text-sm font-medium">
                  {scan.product?.name || "Unknown Product"}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(scan.created_at).toLocaleDateString()}{" "}
                  {new Date(scan.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenCompare(scan)}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-white rounded-lg shadow hover:bg-primary transition"
            >
              <FaBalanceScale />
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {compareModal && selectedHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setCompareModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-2">
              {selectedHistory.product?.name || "Unknown Product"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selectedHistory.created_at).toLocaleString()}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <img
                  src={`http://localhost:4000/${selectedHistory.scan_image_url}`}
                  alt="Scanned"
                  className="rounded-md shadow w-full max-h-40 object-contain"
                />
                <p className="text-xs mt-2 text-center text-gray-600">
                  Captured Image
                </p>
              </div>
              {selectedHistory.product?.image_url && (
                <div>
                  <img
                    src={selectedHistory.product.image_url}
                    alt="Database"
                    className="rounded-md shadow w-full max-h-40 object-contain"
                  />
                  <p className="text-xs mt-2 text-center text-gray-600">
                    Database Image
                  </p>
                </div>
              )}
            </div>

            {selectedHistory.ocr_text && (
              <div className="mb-4">
                <h4 className="font-medium mb-1">OCR Extracted Text</h4>
                <pre className="bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap">
                  {selectedHistory.ocr_text}
                </pre>
              </div>
            )}

            {selectedHistory.similarity_score !== null && (
              <div className="mb-4">
                <h4 className="font-medium mb-1">Similarity Score</h4>
                <p
                  className={`text-sm font-medium ${
                    selectedHistory.similarity_score >= 0.8
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {(selectedHistory.similarity_score * 100).toFixed(1)}%
                </p>
              </div>
            )}

            {selectedHistory.discrepancy_notes?.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Discrepancy Notes</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {selectedHistory.discrepancy_notes.map((note, i) => (
                    <li key={i}>
                      <span className="font-medium capitalize">{note.type}: </span>
                      {note.message}
                      {note.confidence &&
                        ` (Confidence: ${note.confidence})`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
