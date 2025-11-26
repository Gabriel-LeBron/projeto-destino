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

  const montarUsuario = (campo: keyof Usuario, valor: string) => {
    if (usuario) {
      setUsuario({ ...usuario, [campo]: valor } as Usuario);
    }
  };

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
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed bg-linear-to-br from-[#fff6ea] via-[#ffffff] to-[#fff6ea]">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-2">
        {/* Alterado p-6 para p-4 para reduzir altura do container */}
        <div className="bg-white/95 p-4 rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] w-full max-w-sm text-center z-5 backdrop-blur-sm">
          <h1 className="text-[#333] mb-2 text-xg font-bold">Cadastre-se</h1>

          <form onSubmit={handleSubmit}>
            {/* Grid layout para colocar campos lado a lado */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-left">
              <CampoInput
                label="Nome"
                type="text"
                value={usuario?.nome}
                onChange={(e) => montarUsuario("nome", e.target.value)}
                required
                minLength={3}
                maxLength={20}
              />
              <CampoInput
                label="Sobrenome"
                type="text"
                value={usuario?.sobreNome}
                onChange={(e) => montarUsuario("sobreNome", e.target.value)}
                required
                minLength={3}
                maxLength={20}
              />
              
              <CampoInput
                label="CPF"
                type="text"
                value={usuario?.cpf}
                onChange={(e) => montarUsuario("cpf", e.target.value)}
                required
                minLength={8}
                maxLength={100}
              />
              <CampoInput
                label="Telefone"
                type="text"
                value={usuario?.telefone}
                onChange={(e) => montarUsuario("telefone", e.target.value)}
                required
                minLength={3}
                maxLength={100}
              />
              
              {/* O Email ocupa as duas colunas */}
              <div className="col-span-2">
                <CampoInput
                  label="E-mail"
                  type="email"
                  value={usuario?.email}
                  onChange={(e) => montarUsuario("email", e.target.value)}
                  required
                  minLength={3}
                  maxLength={100}
                />
              </div>

              <CampoInput
                label="Senha"
                type="password"
                value={usuario?.senha}
                onChange={(e) => montarUsuario("senha", e.target.value)}
                required
                minLength={8}
                maxLength={100}
              />
              <CampoInput
                label="Confirmar Senha" // Abreviei o label para caber melhor
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                minLength={8}
                maxLength={100}
              />
            </div>

            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full py-1.5 rounded-md cursor-pointer text-sm font-semibold mt-3 transition duration-300 active:scale-[0.98] text-white bg-[#ff7300] hover:bg-[#cc5c00]"
            >
              Cadastre-se
            </button>
          </form>

          <p className="mt-2 text-xg text-[#666]">
            Já tem conta?
            <Link
              to={"/login"}
              className="text-[#007bff] no-underline font-semibold hover:underline ml-1"
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