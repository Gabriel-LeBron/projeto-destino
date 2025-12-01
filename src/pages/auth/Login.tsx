import { useState } from "react";
import { Link } from "react-router-dom";

import CampoInput from "@/components/auth/CampoInput";
import AuthLogo from "@/components/auth/AuthLogo";
import CustomModal, { type Modal } from "@/components/CustomModal";
import { useSession } from "@/store/sessionStore";
import { ROUTES } from "@/paths";

export default function Login() {
  const { login, isLoading } = useSession();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [modal, setModal] = useState<Modal>({
    show: false,
    mensagem: "",
    url: null,
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const resultado = await login({ email, senha });

    setSenha("");

    if (resultado.success) {
      setModal({
        show: true,
        mensagem: "Login realizado com sucesso!",
        url: ROUTES.LANDINGPAGE,
      });
    } else {
      setModal({
        show: true,
        mensagem: resultado.error || "Erro desconhecido",
        url: null,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-fixed bg-cover bg-center bg-linear-to-br from-[#e4f3ff] via-[#ffffff] to-[#e4f3ff]">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 p-4">
        <div className="bg-white/95 p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] w-full max-w-md text-center z-10 backdrop-blur-sm">
          <h1 className="text-[#333] mb-8 text-3xl font-bold">Conecte-se</h1>

          <form onSubmit={handleSubmit}>
            <CampoInput
              label="E-mail"
              type="username"
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
              className={`w-full py-3 rounded-lg cursor-pointer text-lg font-bold mt-3 transition duration-300 active:scale-[0.98] text-white bg-[#2071b3] hover:bg-[#1a5b8e] ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#666]">
            Não possui uma conta?
            <Link
              to="/cadastro"
              className="text-[#007bff] no-underline font-bold hover:underline ml-1"
            >
              Cadastre-se
            </Link>
          </p>

          <p className="mt-6 text-sm text-[#666]">
            Voltar para a
            <Link
              to="/"
              className="text-[#007bff] no-underline font-bold hover:underline ml-1"
            >
              Tela Inicial
            </Link>
          </p>
        </div>

        <AuthLogo />
      </div>

      {modal.show && <CustomModal modalData={modal} setModal={setModal} />}
    </div>
  );
}
