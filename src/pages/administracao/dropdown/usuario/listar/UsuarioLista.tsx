import DataList from "@/components/administracao/lista/dataList";
import { useSession } from "@/store/sessionStore";
import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cadastro: string;
}

export interface InvalidUsersResponse {
  users: Usuario[];
}

const renderUserValue = (user: Usuario, key: string) => {
  switch (key) {
    case "cadastro":
      return user.cadastro;
    default:
      return user[key as keyof Usuario];
  }
};

const userHeaders = ["Nome", "CPF", "Email", "Telefone", "Cadastro", "Valido"];
const userKeys = ["nome", "cpf", "email", "telefone", "cadastro", "valido"];

export default function UsuarioLista() {
  const { usuario, isLoading } = useSession();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuariosInvalidos = async () => {
    if (!usuario || !usuario.accessToken) return;

    setLoading(true);
    try {
      const response = await fetch("/api/usuario/invalidos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.accessToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao buscar usuários inválidos");

      const result = await response.json();
      setUsuarios(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const ValidarUsuario = async (id: number) => {
    if (!usuario || !usuario.accessToken) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/usuario/validar/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.accessToken}`,
        },
      });

      if (response.ok) {
        alert("Usuário validado com sucesso!");
        fetchUsuariosInvalidos();
      } else {
        const msg = await response.text();
        alert(`Erro ao validar: ${msg}`);
      }
    } catch (error) {
      alert("Erro de conexão ao tentar validar.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading && usuario) {
      fetchUsuariosInvalidos();
    }
  }, [usuario, isLoading]);

  const usuarioActions = [
    {
      name: "Validar",
      colorClass: "bg-blue-600 text-white hover:bg-blue-500 p-2 rounded-md transition-colors",
      handler: ValidarUsuario,
    },
  ];

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Carregando usuários...</p>;
  }

  if (usuarios.length <= 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nenhum cadastro precisando de avalição foi encontrado!
      </div>
    );
  }

  return (
    <DataList<Usuario>
      loading={loading}
      pageTitle="Atualizar Usuários"
      buttonText="Novo Usuário"
      registerPath="#"
      data={usuarios}
      headers={userHeaders}
      dataKeys={userKeys}
      renderValue={renderUserValue}
      actions={usuarioActions}
    />
  );
}