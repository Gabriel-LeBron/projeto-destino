import { useState } from "react";
import { Link } from "react-router-dom";

import CampoInput from "@/components/auth/CampoInput";
import AuthModal, { type Modal } from "@/components/auth/AuthModal";
import AuthLogo from "@/components/auth/AuthLogo";
import { ROUTES } from "@/paths";
import { loginUsuario } from "@/utils/authFunctions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [modal, setModal] = useState<Modal>({
    show: false,
    msg: "",
    url: null,
  });

  const handleSubmit = async () => {
    try {
      const response = await loginUsuario({ email, senha });
      console.log(response);
      if (response.error) {
        setModal({ show: true, msg: response.mensagem, url: null });
      }

      if (!response.error) {
        setModal({
          show: true,
          msg: response.mensagem,
          url: ROUTES.LANDINGPAGE,
        });
      }
    } catch (error) {
      console.log("Erro ao fazer login: ", error);
    }
  };

  return (
    <div
      className={` w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed 
      "bg-gradient-to-br from-[#e6f4ff] via-[#d6efff] to-[#cde8ff]"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 p-4">
        <div
          className="bg-white/95 p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] w-full max-w-md 
        text-center z-10 backdrop-blur-sm"
        >
          <h1 className="text-[#333] mb-8 text-3xl font-bold">Conecte-se</h1>

          <form>
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
              onClick={() => handleSubmit()}
              type="button"
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

      {modal.show && <AuthModal setModal={setModal} modalData={modal} />}
    </div>
  );
}
