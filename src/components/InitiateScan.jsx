import { FaCamera } from "react-icons/fa";

const InitiateScan = ({ setIsModalOpen }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <FaCamera className="text-4xl text-main mb-2" />
      <h2 className="text-lg font-medium mb-2">Scan Product</h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        Capture a Product using your phone’s camera to extract text.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-main text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-600 transition w-full"
      >
        Start Scanning
      </button>
    </div>
  );
};

export default InitiateScan