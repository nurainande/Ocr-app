import { createContext, useContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const [compareModal, setCompareModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  // Dummy past scans
  const historyData = [
    {
      id: 1,
      title: "Coke",
      date: "2025-08-20",
      databaseImg:
        "https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D",
      scannedImg:
        "https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D",
      matched: true,
      reasonNotMatched: "",
    },
    {
      id: 2,
      title: "Fanta",
      date: "2025-08-21",
      databaseImg:
        "https://m.media-amazon.com/images/I/41mLN2BN8EL._UF1000,1000_QL80_.jpg",
      scannedImg:
        "https://m.media-amazon.com/images/I/41mLN2BN8EL._UF1000,1000_QL80_.jpg",
      matched: true,
      reasonNotMatched: "",
    },
    {
      id: 3,
      title: "Elim",
      date: "2025-08-22",
      databaseImg:
        "https://images.squarespace-cdn.com/content/v1/64cad9ec789ea73ddbef4cb8/1f169ce3-83ca-4ae4-89f1-2b6fb8fdfefa/832e664a25e90ba33c089514ec9a24be.JPG",
      scannedImg:
        "https://i0.wp.com/nextcashandcarry.com.ng/wp-content/uploads/2022/06/Elim-Water-600x600-1.png?fit=600%2C600&ssl=1",
      matched: false,
      reasonNotMatched: "Ingredients mismatch",
    },
    
  ];
  
  return (
    <AppContext.Provider
      value={{
        userAuth,
        setUserAuth,
        extractedText,
        setExtractedText,
        historyData,
        compareModal,
        setCompareModal,
        selectedHistory,
        setSelectedHistory,
      }}
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
