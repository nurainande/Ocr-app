import { createContext, useContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  
  
  return (
    <AppContext.Provider
      value={{ userAuth, setUserAuth, extractedText, setExtractedText }}
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
