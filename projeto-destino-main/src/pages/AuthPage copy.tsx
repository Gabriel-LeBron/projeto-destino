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

  // 🔧 ADIÇÃO: estados para modal de feedback (substituem alerts)
  const [showModal, setShowModal] = useState(false); // 🔧 ADIÇÃO
  const [modalMsg, setModalMsg] = useState(""); // 🔧 ADIÇÃO

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
      // antigo: alert("As senhas não coincidem!");
      setModalMsg("As senhas não coincidem!"); // 🔧 ADIÇÃO: mensagem de erro
      setShowModal(true); // 🔧 ADIÇÃO: mostra modal
      return;
    }
    
    if (isLogin) {
      // antigo: alert(`Login com:\nEmail: ${email}\nSenha: ${senha}`);
      setModalMsg(`Login efetuado com sucesso!`); // 🔧 ADIÇÃO
      setShowModal(true); // 🔧 ADIÇÃO
      setTimeout(() => {
        navigate("/"); // mantém redirecionamento para landing page
      }, 1300); // pequeno delay para o usuário ver o modal
    } else {
      // antigo: alert(`Usuário cadastrado:\nEmail: ${email}`);
      setModalMsg("Cadastro efetuado com sucesso!"); // 🔧 ADIÇÃO
      setShowModal(true); // 🔧 ADIÇÃO
      // 🔧 ADIÇÃO: limpar campos após cadastro bem-sucedido (mantendo a validação original)
      setNomeEmailSenhaEmpty(); // 🔧 ADIÇÃO: função auxiliar definida abaixo
      // 🔧 OBS: não redirecionar após cadastro (seguir sua instrução)
    }
  };

  // 🔧 ADIÇÃO: função auxiliar para limpar campos (evita mexer no restante do fluxo)
  function setNomeEmailSenhaEmpty() {
    setEmail("");
    setSenha("");
    setConfirmar("");
  }

  return (
    // 🔧 ALTERAÇÃO: removi bg-[url(...)] e adicionei gradientes leves conforme solicitado
    <div className={`w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed 
                     ${isLogin 
                       ? "bg-gradient-to-br from-[#e6f4ff] via-[#d6efff] to-[#cde8ff]"  // 🔧 ADIÇÃO: gradiente azul leve
                       : "bg-gradient-to-br from-[#fff4e6] via-[#ffe6cc] to-[#ffebd6]"  // 🔧 ADIÇÃO: gradiente laranja leve
                     }`}>
      {/* 🔧 ADIÇÃO: container dividido para manter seu card à esquerda e imagem à direita */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Mantive EXATAMENTE o seu card (linhas internas não mudadas) */}
        <div className="bg-white/95 p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] w-full max-w-md text-center z-10">
          
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

        {/* 🔧 ADIÇÃO: painel direito com imagem placeholder (substituível pelo logo) */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
          <div className="w-80 h-80 rounded-lg flex items-center justify-center bg-white/60 shadow-md">
            <img
              src="https://via.placeholder.com/300x300.png?text=Logo+Empresa"
              alt="Logo da empresa (placeholder)"
              className="object-contain max-w-full max-h-full"
            />
          </div>
        </div>
      </div>

      {/* 🔧 ADIÇÃO: modal simples substituindo alert() */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full transform transition-all duration-200 scale-100">
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
