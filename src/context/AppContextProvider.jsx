import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser } from "../services/services";

const AppContext = createContext();

function AppContextProvider({ children }) {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_URL = "http://localhost:3000/api";

  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [extractedText, setExtractedText] = useState("");

  const [compareModal, setCompareModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const [historyData, setHistoryData] = useState([]); // initially empty

  async function logoutUser() {
    await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // include cookies
    });
    setUserAuth(null);
    localStorage.removeItem("userAuth");
  }

  // ✅ Fetch logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedInUser(`${BACKEND_URL}/auth/me`);
        if (user && user.id) {
          console.log("User fetched:", user);
          setUserAuth(user);
        } else {
          setUserAuth(null);
        }
      } catch (error) {
        console.log(error);
        setUserAuth(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch scan history
  
  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/scans`, {
          credentials: "include",
        });
      const data = await res.json();
      console.log("Scan history:", data);
      setHistoryData(data.scans || []); // ✅ only set the array
    } catch (err) {
      console.error("❌ Failed to fetch history:", err);
      setHistoryData([]); // fallback
    }
  };
  fetchHistory();
}, [BACKEND_URL]);


  return (
    <AppContext.Provider
      value={{
        BACKEND_URL,
        userAuth,
        setUserAuth,
        extractedText,
        setExtractedText,
        historyData,
        setHistoryData,
        compareModal,
        setCompareModal,
        selectedHistory,
        setSelectedHistory,
        authLoading,
        setAuthLoading,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ✅ Custom hook for consuming context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
}

export default AppContextProvider;
