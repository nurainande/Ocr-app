// components/BarcodeScannerWeb.jsx
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BarcodeScannerWeb({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    let timeoutId;

    const success = async (decodedText) => {
      console.log("Decoded:", decodedText);
      clearTimeout(timeoutId);

      // Send to API
      await fetch("/scan/barcode-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: decodedText }),
      });

      scanner.clear().catch(console.error);
      onClose();
    };

    const error = (err) => {
      console.warn("Scanning error:", err);
    };

    scanner.render(success, error);

    // ⏳ Retry timeout: stop scanning after 10s if nothing is detected
    timeoutId = setTimeout(() => {
      console.log("No barcode detected, retry needed.");
      scanner.clear().catch(console.error);
      onClose();
      alert("No barcode detected, please try again.");
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
      scanner.clear().catch(console.error);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">Scan a Barcode</h2>
        <div id="reader" className="w-full" />
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
