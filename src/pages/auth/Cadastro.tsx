import AuthLogo from "@/components/auth/AuthLogo";
import CampoInput from "@/components/auth/CampoInput";
import CustomModal, { type Modal } from "@/components/CustomModal";
import { ROUTES } from "@/paths";
import {
  validarApenasLetras,
  formatarCPF,
  validarCPF,
  formatarTelefone,
  validarEmail,
  validarSenhaForte,
} from "@/utils/auth/FormValidation";
import { type RegistroUser } from "@/utils/auth/authFunctions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface RegistrationResponse {
  erro: boolean;
  mensagem: string;
}

export default function Cadastro() {
  const [usuario, setUsuario] = useState<RegistroUser>({
    nome: "",
    sobreNome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [formValido, setFormValido] = useState(false);
  const [loading, setLoading] = useState(false);

  const [erros, setErros] = useState({
    nome: false,
    sobreNome: false,
    cpf: false,
    telefone: false,
    email: false,
    senha: false,
    confirmarSenha: false,
  });

  const [modal, setModal] = useState<Modal>({
    show: false,
    mensagem: "",
    url: null,
  });

  // Lógica para verificar requisitos individuais da senha para a UI
  const requisitosSenha = [
    { label: "Mínimo de 8 caracteres", valido: usuario.senha.length >= 8 },
    { label: "Uma letra maiúscula", valido: /[A-Z]/.test(usuario.senha) },
    { label: "Uma letra minúscula", valido: /[a-z]/.test(usuario.senha) },
    { label: "Um número", valido: /\d/.test(usuario.senha) },
    {
      label: "Um caractere especial (@$!%*?&#-_)",
      valido: /[@$!%*?&#\-_]/.test(usuario.senha),
    },
  ];

  const handleChange = (
    campo: keyof RegistroUser | "confirmarSenha",
    valor: string
  ) => {
    let valorFinal = valor;
    let temErro = false;

    switch (campo) {
      case "nome":
      case "sobreNome":
        if (!validarApenasLetras(valor) && valor !== "") {
          valorFinal = valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "");
        }
        temErro = valorFinal.length < 3;
        break;

      case "cpf":
        valorFinal = formatarCPF(valor);
        temErro = !validarCPF(valorFinal);
        break;

      case "telefone":
        valorFinal = formatarTelefone(valor);
        temErro = valorFinal.length < 15;
        break;

      case "email":
        temErro = !validarEmail(valorFinal);
        break;

      case "senha":
        temErro = !validarSenhaForte(valorFinal);
        break;

      case "confirmarSenha":
        temErro = valorFinal !== usuario.senha;
        break;
    }

    if (campo === "confirmarSenha") {
      setConfirmarSenha(valorFinal);
      setErros((prev) => ({ ...prev, confirmarSenha: temErro }));
    } else {
      setUsuario((prev) => ({ ...prev, [campo]: valorFinal }));
      setErros((prev) => ({ ...prev, [campo]: temErro }));

      if (campo === "senha" && confirmarSenha) {
        setErros((prev) => ({
          ...prev,
          confirmarSenha: valorFinal !== confirmarSenha,
        }));
      }
    }
  };

  useEffect(() => {
    const isNomeValido = usuario.nome.length >= 3 && !erros.nome;
    const isSobreNomeValido = usuario.sobreNome.length >= 3 && !erros.sobreNome;
    const isCpfValido = validarCPF(usuario.cpf);
    const isTelValido = usuario.telefone.length === 15;
    const isEmailValido = validarEmail(usuario.email);
    const isSenhaValida = validarSenhaForte(usuario.senha);
    const isConfirmacaoValida =
      usuario.senha === confirmarSenha &&
      confirmarSenha.length > 0 &&
      usuario.senha === confirmarSenha;

    setFormValido(
      isNomeValido &&
        isSobreNomeValido &&
        isCpfValido &&
        isTelValido &&
        isEmailValido &&
        isSenhaValida &&
        isConfirmacaoValida
    );
  }, [usuario, confirmarSenha, erros]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValido) return;

    setLoading(true);

    // Remove tudo que não for dígito (0-9) do CPF e do Telefone
    const usuarioParaEnvio = {
      ...usuario,
      cpf: usuario.cpf.replace(/\D/g, ""),
      telefone: usuario.telefone.replace(/\D/g, ""),
    };

    try {
      setLoading(true);

      if (usuario) {
        const response = await fetch("api/auth/cadastrar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuarioParaEnvio),
        });
        const result: RegistrationResponse = await response.json();

        if (!response.ok) {
          setModal({
            show: true,
            mensagem: result.mensagem || "Ocorreu um erro inesperado.",
            url: null,
          });
          setCadastroSucesso(false);
          return result;
        }
        setCadastroSucesso(true);
        setModal({
          show: true,
          mensagem:
            "Cadastro efetuado com sucesso!\n Aguarde o email de confirmação.",
          url: ROUTES.LANDINGPAGE,
        });
        reset();
      }
    } catch (erro) {
      console.log(erro);
      setModal({
        show: true,
        mensagem: "Erro de conexão. Verifique sua internet.",
        url: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUsuario({
      nome: "",
      sobreNome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
    });
    setConfirmarSenha("");
    setErros({
      nome: false,
      sobreNome: false,
      cpf: false,
      telefone: false,
      email: false,
      senha: false,
      confirmarSenha: false,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#fff6ea] via-[#ffffff] to-[#fff6ea] overflow-y-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-6 px-4">
        <div className="bg-white/95 p-6 rounded-xl shadow-2xl w-full max-w-md text-center z-10 backdrop-blur-sm border border-gray-100">
          <h1 className="text-[#333] mb-6 text-2xl font-bold">Cadastre-se</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-left">
              <CampoInput
                label="Nome"
                type="text"
                value={usuario.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
                minLength={3}
                maxLength={20}
                isError={erros.nome && usuario.nome.length > 0}
                isSuccess={cadastroSucesso}
                placeholder="Nome"
              />
              <CampoInput
                label="Sobrenome"
                type="text"
                value={usuario.sobreNome}
                onChange={(e) => handleChange("sobreNome", e.target.value)}
                required
                minLength={3}
                maxLength={20}
                isError={erros.sobreNome && usuario.sobreNome.length > 0}
                isSuccess={cadastroSucesso}
                placeholder="Sobrenome"
              />

              <CampoInput
                label="CPF"
                type="text"
                value={usuario.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
                required
                maxLength={14}
                isError={erros.cpf && usuario.cpf.length > 0}
                isSuccess={cadastroSucesso}
                placeholder="000.000.000-00"
              />
              <CampoInput
                label="Telefone"
                type="tel"
                value={usuario.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                required
                maxLength={15}
                isError={erros.telefone && usuario.telefone.length > 0}
                isSuccess={cadastroSucesso}
                placeholder="(00) 00000-0000"
              />

              <div className="col-span-2">
                <CampoInput
                  label="E-mail"
                  type="email"
                  value={usuario.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  isError={erros.email && usuario.email.length > 0}
                  isSuccess={cadastroSucesso}
                  placeholder="exemplo@email.com"
                />
              </div>

              <div className="col-span-2">
                <CampoInput
                  label="Senha"
                  type="password"
                  value={usuario.senha}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  required
                  isError={erros.senha && usuario.senha.length > 0}
                  isSuccess={cadastroSucesso}
                  placeholder="Senha"
                />
              </div>

              <div className="col-span-2">
                <CampoInput
                  label="Confirmar Senha"
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) =>
                    handleChange("confirmarSenha", e.target.value)
                  }
                  required
                  isError={erros.confirmarSenha && confirmarSenha.length > 0}
                  isSuccess={cadastroSucesso}
                  placeholder="Repita a senha"
                />
              </div>

              {usuario.senha.length > 0 && (
                <div className="col-span-2 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    Requisitos da senha:
                  </p>
                  <ul className="text-xs space-y-1">
                    {requisitosSenha.map((req, index) => (
                      <li
                        key={index}
                        className={`flex items-center gap-2 ${
                          req.valido
                            ? "text-green-600 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 flex items-center justify-center rounded-full text-[10px] ${
                            req.valido ? "bg-green-100" : "bg-gray-200"
                          }`}
                        >
                          {req.valido ? "✓" : "•"}
                        </span>
                        {req.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`
                w-full py-3 rounded-md text-sm font-bold mt-4 transition-all duration-300 shadow-md
                ${
                  formValido
                    ? "bg-[#ff7300] hover:bg-[#cc5c00] text-white active:scale-[0.98] cursor-pointer hover:shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
              disabled={!formValido || loading}
            >
              {loading ? "Processando..." : "CADASTRAR"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#666]">
            Já possui uma conta?
            <Link
              to={"/login"}
              className="text-[#007bff] no-underline font-semibold hover:underline ml-1"
            >
              Faça o Login
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
