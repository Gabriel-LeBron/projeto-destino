import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import CampoInput from "@/components/auth/CampoInput";
import AuthModal from "@/components/auth/AuthModal";
import AuthLogo from "@/components/auth/AuthLogo";
import { ROUTES } from "@/paths";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (senha !== confirmar) {
      setModalMsg("As senhas não coincidem!");
      setShowModal(true);
      return;
    }

    const cadastrarUser = () => {
      try {
        localStorage.setItem(
          `User:${email.toLowerCase().split("@")[0]}`,
          JSON.stringify({ email: email, senha: senha })
        );
        return true;
      } catch (error) {
        console.log("Erro ao fazer login: ", e);
        return false;
      }
    };

    const result = cadastrarUser();

    if (result) {
      setModalMsg("Cadastro efetuado com sucesso!");
      setShowModal(true);
      setEmail("");
      setSenha("");
      setConfirmar("");
    } else {
      alert("erro ao cadastrar usuário!");
    }
  };

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed 
      "bg-gradient-to-br from-[#fff4e6] via-[#ffe6cc] to-[#ffebd6]"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 p-4">
        <div
          className="bg-white/95 p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] w-full max-w-md 
        text-center z-10 backdrop-blur-sm"
        >
          <h1 className="text-[#333] mb-8 text-3xl font-bold">Cadastre-se</h1>

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
              minLength={8}
              maxLength={100}
            />

            <CampoInput
              label="Confirmar Senha"
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              minLength={8}
              maxLength={100}
            />

            <button
              type="submit"
              className={`w-full py-3 rounded-lg cursor-pointer text-lg font-bold mt-3 
                transition duration-300 active:scale-[0.98] text-white bg-[#ff7300] hover:bg-[#cc5c00]`}
            >
              Cadastre-se
            </button>
          </form>

          <p className="mt-6 text-sm text-[#666]">
            Já tem conta?
            <Link
              to={"/login"}
              className="text-[#007bff] no-underline font-bold hover:underline ml-1"
            >
              Fazer login
            </Link>
          </p>
        </div>

        <AuthLogo />
      </div>

      {showModal && (
        <AuthModal
          setShowModal={setShowModal}
          modalMsg={modalMsg}
          url={ROUTES.LOGIN}
        />
      )}
    </div>
  );
}
