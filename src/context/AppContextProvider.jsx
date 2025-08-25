import { createContext, useContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  return (
    <AppContext.Provider
      value={{ userAuth, setUserAuth, authLoading,setAuthLoading }}
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
