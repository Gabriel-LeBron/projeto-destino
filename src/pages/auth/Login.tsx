import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import CampoInput from "@/components/auth/CampoInput";
import AuthModal from "@/components/auth/AuthModal";
import AuthLogo from "@/components/auth/AuthLogo";
import { setCookie } from "@/utils/cookieHandler";
import { ROUTES } from "@/paths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const carregarUser = () => {
      try {
        const user = localStorage.getItem(
          `User:${email.toLowerCase().split("@")[0]}`
        );
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.log("Erro ao fazer login: ", error);
        return null;
      }
    };

    const user = carregarUser();

    if (email == user.email && senha == user.senha) {
      setModalMsg("Login Efetuado!");
      setShowModal(true);
      setCookie("session", user.email, 30);
      setEmail("");
      setSenha("");
    } else {
      alert("Email ou senha incorreta!");
    }
  };

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed 
      "bg-gradient-to-br from-[#e6f4ff] via-[#d6efff] to-[#cde8ff]"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 p-4">
        <div
          className="bg-white/95 p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] w-full max-w-md 
        text-center z-10 backdrop-blur-sm"
        >
          <h1 className="text-[#333] mb-8 text-3xl font-bold">Conecte-se</h1>

          <form onSubmit={handleSubmit}>
            <CampoInput
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={3}
              maxLength={100}
            />
            <CampoInput
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={0}
              maxLength={100}
            />

            <button
              type="submit"
              className={`w-full py-3 rounded-lg cursor-pointer text-lg font-bold mt-3 transition 
                duration-300 active:scale-[0.98] text-white bg-[#2071b3] hover:bg-[#1a5b8e]`}
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-sm text-[#666]">
            Não tem conta
            <Link
              to="/cadastro"
              className="text-[#007bff] no-underline font-bold hover:underline ml-1"
            >
              Cadastre-se
            </Link>
          </p>
        </div>

        <AuthLogo />
      </div>

      {showModal && (
        <AuthModal
          setShowModal={setShowModal}
          modalMsg={modalMsg}
          url={ROUTES.LANDINGPAGE}
        />
      )}
    </div>
  );
}
