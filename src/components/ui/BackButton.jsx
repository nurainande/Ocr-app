import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate()
  return (
   <button
       onClick={() => navigate("/")}
       className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
   >
       <FaArrowLeft size={22} />
   </button>
  )
}

export default BackButton