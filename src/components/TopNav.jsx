import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const TopNav = () => {
  const navigate = useNavigate();
  const { userAuth, logoutUser } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-light shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="logo-heading cursor-pointer"
        onClick={() => navigate("/")}
      >
        Oscan
      </h1>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        {/* Show user info */}
        <div className="flex flex-col text-secondary-light text-sm">
          <span>{userAuth?.username || "User"}</span>
          <span className="text-xs capitalize">
            {userAuth?.role || "role"}
          </span>
        </div>

        {/* If admin, show register button */}
        {userAuth?.role === "admin" && (
          <button
            onClick={() => navigate("/register")}
            className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary"
          >
            Register User
          </button>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-error-light text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        {menuOpen ? (
          <FaTimes
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <FaBars
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile dropdown modal */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48 flex flex-col gap-3 md:hidden z-50">
          <div className="flex flex-col text-secondary-light text-sm border-b pb-2">
            <span>{userAuth?.username || "User"}</span>
            <span className="text-xs capitalize">{userAuth?.role || "role"}</span>
          </div>

          {userAuth?.role === "admin" && (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/register");
              }}
              className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary"
            >
              Register User
            </button>
          )}

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="bg-error-light text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default TopNav;
