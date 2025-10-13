import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CampoInput from "@/components/auth/CampoInput";

export default function AuthPage() {
  let navigate = useNavigate();
  
  const location = useLocation();
  const isLogin = location.pathname === '/login'; 

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState(""); 

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const pageTitle = isLogin ? "Conecte-se" : "Cadastre-se";
  const buttonText = isLogin ? "Entrar" : "Cadastrar";

  const switchText = isLogin ? "Não tem conta?" : "Já tem conta?";
  const switchLinkPath = isLogin ? "/cadastro" : "/login";
  const switchLinkText = isLogin ? "Cadastre-se" : "Fazer login";

  const buttonClasses = isLogin 
    ? "bg-[#2071b3] hover:bg-[#1a5b8e]"
    : "bg-[#ff7300] hover:bg-[#cc5c00]";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && senha !== confirmar) {
      setModalMsg("As senhas não coincidem!");
      setShowModal(true);
      return;
    }
    
    if (isLogin) {
      setModalMsg(`Login efetuado com sucesso!`);
      setShowModal(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setModalMsg("Cadastro efetuado com sucesso!");
      setShowModal(true); 
      setNomeEmailSenhaEmpty();
    }
  };

  function setNomeEmailSenhaEmpty() {
    setEmail("");
    setSenha("");
    setConfirmar("");
  }

  return (
    <div className={`w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed 
      ${isLogin 
        ? "bg-gradient-to-br from-[#e6f4ff] via-[#d6efff] to-[#cde8ff]" 
        : "bg-gradient-to-br from-[#fff4e6] via-[#ffe6cc] to-[#ffebd6]"
      }`}
    >
      
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 p-4">
        
        
        <div className="bg-white/95 p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] w-full max-w-md text-center z-10 backdrop-blur-sm">
          
          <h1 className="text-[#333] mb-8 text-3xl font-bold">{pageTitle}</h1>
          
          <form onSubmit={handleSubmit}>
            
            <CampoInput 
              label="E-mail" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <CampoInput 
              label="Senha" 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
            />
            
            {!isLogin && (
              <CampoInput 
                label="Confirmar Senha" 
                type="password" 
                value={confirmar} 
                onChange={(e) => setConfirmar(e.target.value)} 
                required 
              />
            )}
            
            <button 
              type="submit" 
              className={`w-full py-3 rounded-lg cursor-pointer text-lg font-bold mt-3 transition duration-300 active:scale-[0.98] text-white ${buttonClasses}`}
            >
              {buttonText}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#666]">
            {switchText}
            <Link to={switchLinkPath} className="text-[#007bff] no-underline font-bold hover:underline ml-1">
              {switchLinkText}
            </Link>
          </p>
        </div>

        
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="w-80 h-80 bg-white/60 rounded-2xl shadow-md flex items-center justify-center">
            <img
              src="src/assets/PaulaViagensLogo.png"
              alt="Logo Paula Vigens"
              className="object-contain max-w-full max-h-full rounded-xl"
            />
          </div>
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full transform transition-all duration-200">
            <h3 className="text-lg font-semibold text-gray-800">{modalMsg}</h3>
            <button
              className="mt-4 px-6 py-2 bg-[#2071b3] hover:bg-[#1a5b8e] text-white rounded-lg font-medium"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
