import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate()
  return (
   <button
       onClick={() => navigate("/")}
       className="absolute top-4 left-4 text-secondary-600 hover:text-secondary-light"
   >
       <FaArrowLeft size={22} />
   </button>
  )
}

export default BackButton