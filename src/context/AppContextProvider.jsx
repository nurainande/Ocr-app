import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/getLoggedInUser";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
//   const [loadingUser, setLoadingUser] = useState(true);
  console.log(userAuth)
  // const BACKEND_URL = "http://localhost:3000/api";
  const BACKEND_URL = "https://nurray-server.onrender.com/api";


useEffect(() => {
  const fetchUser = async () => {
    try {
      const user = await getLoggedInUser(BACKEND_URL);
      if (user && user._id) {
        setUserAuth(user); // ✅ set only if valid user
      } else {
        setUserAuth(null);
      }
    } catch (error) {
      console.log(error)
      setUserAuth(null);
    } finally {
      setAuthLoading(false); // ✅ end loading
    }
  };

  fetchUser();
}, []);


// useEffect(() => {
//   const fetchUser = async () => {
//     const user = await getLoggedInUser(BACKEND_URL);
//     if (user) {
//       console.log('user',user)
//       setUserAuth(user);
//     }
//     // setLoadingUser(false);
//   };

//   fetchUser();
// }, []);



  return (
    <AppContext.Provider
      value={{ userAuth, setUserAuth, BACKEND_URL, authLoading }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  console.log(context);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export default AppContextProvider;
