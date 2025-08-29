import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Result from "./pages/result/Result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
