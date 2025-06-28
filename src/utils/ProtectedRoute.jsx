import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const ProtectedRoute = ({ children }) => {
  const { userAuth, authLoading } = useAppContext();

  if (authLoading) {
    return <p className="text-center py-10">Checking access...</p>;
  }

  if (!userAuth || !userAuth._id) {
    return <Navigate to="/login" replace />;
  }

  if (userAuth.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
