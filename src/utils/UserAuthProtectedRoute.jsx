import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const UserAuthProtectedRoute = ({ children }) => {
   const { userAuth, authLoading } = useAppContext();
 
  const navigate = useNavigate();

    if (authLoading) {
      return <p className="text-center py-10">Checking access...</p>;
    }

    if (!userAuth) {
      navigate("/login", { replace: true }); 
    }


  return children
};

export default UserAuthProtectedRoute;
