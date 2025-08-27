import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Result from "./pages/Result";
import Loading from "./components/Loading";


function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
