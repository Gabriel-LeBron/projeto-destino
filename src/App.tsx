import { Routes, Route } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ContactPage from "@/pages/ContactPage";


export default function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<AuthPage />} /> 
          <Route path="/Cadastro" element={<AuthPage />} />
          <Route path="/Contato" element={<ContactPage />} />
        </Routes>
      </>
  );
}