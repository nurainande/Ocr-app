import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const AdminProtectedRoute = ({ children }) => {
  const { userAuth, authLoading } = useAppContext();
  const navigate = useNavigate();

  if (authLoading) {
    return <p className="text-center py-10">Checking access...</p>;
  }

  // if not logged in → redirect
  if (!userAuth) {
    navigate("/login", { replace: true });
    return null;
  }

  // check if user is not admin → redirect
  if (userAuth.role !== "admin") {
    navigate("/", { replace: true }); // redirect them somewhere safe (e.g., home)
    return null;
  }

  return children;
};

export default AdminProtectedRoute;

