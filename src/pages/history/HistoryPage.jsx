import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Header with Back button */}
          <div className="relative bg-white shadow p-4">
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-semibold text-center">History</h1>
          </div>
          
    </div>
  )
}

export default HistoryPage