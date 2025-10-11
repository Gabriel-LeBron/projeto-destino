import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"
import LandingPage from "./pages/LandingPage" 
import "./index.css";
import "./AuthStyles.css";

export default function App() {
  return (
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
      </div>
  );
}