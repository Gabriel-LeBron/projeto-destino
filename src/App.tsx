import { Routes, Route } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import ContactPage from "@/pages/ContactPage";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";


export default function App() {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/login" element={<AuthPage />} /> 
          <Route path="/Cadastro" element={<AuthPage />} />
          <Route path="/Contato" element={<ContactPage />} />
        </Routes>
        <Footer />
      </>
  );
}