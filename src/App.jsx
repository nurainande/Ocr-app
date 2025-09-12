import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ResultPage from "./pages/result/ResultPage";
import HistoryPage from "./pages/history/HistoryPage";
import ProductUploadPage from "./pages/product/ProductUploadPage";
import AllProductsPage from "./pages/product/AllProductsPage";


import TopBarModal from "./components/ui/TopBarModal";

function App() {
  const [modal, setModal] = useState({
    open: false,
    type: "info",
    message: "",
  });

  // helper to show modal from anywhere
  const showModal = (type, msg) => {
    setModal({ open: true, type, message: msg });
  };
  return (
    <>
      {/* Global notification bar */}
      <TopBarModal
        type={modal.type}
        message={modal.message}
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
      />
      <Routes>
        <Route path="/" element={<HomePage showModal={showModal} />} />
        <Route path="/result" element={<ResultPage showModal={showModal} />} />
        <Route path="/history" element={<HistoryPage showModal={showModal} />} />
        <Route path="/login" element={<LoginPage showModal={showModal} />} />
        <Route path="/products" element={<ProductUploadPage showModal={showModal} />} />
        <Route path="/all-products" element={<AllProductsPage showModal={showModal} />} />
      </Routes>
    </>
  );
}

export default App;
