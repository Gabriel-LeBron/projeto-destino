import { useState } from "react";
import { Link } from "react-router-dom";

import CampoInput from "@/components/auth/CampoInput";
import AuthModal, { type Modal } from "@/components/auth/AuthModal";
import AuthLogo from "@/components/auth/AuthLogo";
import { ROUTES } from "@/paths";
import { cadastrarUsuario, type Usuario } from "@/utils/authFunctions";

export default function Cadastro() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [modal, setModal] = useState<Modal>({
    show: false,
    msg: "",
    url: null,
  });

  const handleSubmit = async () => {
    if (usuario?.senha !== confirmarSenha) {
      setModal({ show: true, msg: "As senhas não coincidem!", url: null });
    }

    const response = await cadastrarUsuario(usuario);

    if (response.error) {
      setModal({ show: true, msg: "erro ao cadastrar usuário!", url: null });
    } else {
      setModal({
        show: true,
        msg: "Cadastro efetuado com sucesso!\n Agora espere o email da administração com a confirmação",
        url: ROUTES.LANDINGPAGE,
      });
      setUsuario(null);
    }
  };

  return (
    <div
      className={` w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed 
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
              label="Nome"
              type="text"
              value={usuario?.nome}
              onChange={(e) =>
                setUsuario((user) => ({ ...user, nome: e.target.value }))
              }
              required
              minLength={3}
              maxLength={20}
            />
            <CampoInput
              label="Sobrenome"
              type="text"
              value={usuario?.sobreNome}
              onChange={(e) =>
                setUsuario((user) => ({ ...user, sobreNome: e.target.value }))
              }
              required
              minLength={3}
              maxLength={20}
            />
            <CampoInput
              label="CPF"
              type="text"
              value={usuario?.cpf}
              onChange={(e) =>
                setUsuario((user) => ({ ...user, cpf: e.target.value }))
              }
              required
              minLength={8}
              maxLength={100}
            />
            <CampoInput
              label="E-mail"
              type="email"
              value={usuario?.email}
              onChange={(e) =>
                setUsuario((user) => ({ ...user, email: e.target.value }))
              }
              required
              minLength={3}
              maxLength={100}
            />
            <CampoInput
              label="Telefone"
              type="text"
              value={usuario?.telefone}
              onChange={(e) =>
                setUsuario((user) => ({ ...user, telefone: e.target.value }))
              }
              required
              minLength={3}
              maxLength={100}
            />
            <CampoInput
              label="Senha"
              type="password"
              value={usuario?.senha}
              onChange={(e) =>
                setUsuario((user) => ({ ...user, senha: e.target.value }))
              }
              required
              minLength={8}
              maxLength={100}
            />
            <CampoInput
              label="SenhaConfirmar"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              minLength={8}
              maxLength={100}
            />

            <button
              type="button"
              onClick={() => handleSubmit()}
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

      {modal.show && <AuthModal setModal={setModal} modalData={modal} />}
    </div>
  );
}
