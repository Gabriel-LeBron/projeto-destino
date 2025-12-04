import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/paths";
import DataList from "@/components/administracao/lista/dataList";
import { useSession } from "@/store/sessionStore";

interface Transporte {
  id: number;
  empresa: string;
  meio: string;
  preco: number;
}

const renderTransporteValue = (item: Transporte, key: string) => {
  switch (key) {
    case "preco":
      return `R$ ${item.preco.toFixed(2).replace(".", ",")}`;
    default:
      return item[key as keyof Transporte];
  }
};

const transporteHeaders = ["ID", "Empresa", "Meio", "Custo Base"];
const transporteKeys = ["id", "empresa", "meio", "preco"];

export default function TransporteLista() {
  const navigate = useNavigate();
  const { usuario, isLoading } = useSession();
  const [transportes, setTransportes] = useState<Transporte[]>([]);
  const [loading, setLoading] = useState(true);

  // NOVO: Definindo a função de fetch fora do useEffect para que handleDelete possa chamá-la.
  const fetchTransportes = async () => {
    if (!usuario || !usuario.accessToken) return;

    setLoading(true);
    try {
      const response = await fetch("/api/transporte", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.accessToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao buscar transportes");

      const result = await response.json();
      setTransportes(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && usuario) {
      fetchTransportes(); // Alterado de fetchHoteis para fetchTransportes
    }
    // OBS: Removido `setLoading(false);` do final do useEffect para evitar estado inconsistente.
  }, [usuario, isLoading]); // Dependências ok

  const handleEdit = (id: number) => {
    navigate(ROUTES.EDITAR_TRANSPORTE.replace(":id", String(id)));
  };

  const handleDelete = async (id: number) => {
    if (!usuario || !usuario.accessToken) return;
    if (!window.confirm("Deseja realmente excluir este transporte?")) return;

    try {
      const response = await fetch(`/api/transporte/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${usuario.accessToken}`,
        },
      });

      if (response.ok) {
        alert("Transporte excluído com sucesso!");
        fetchTransportes(); // Recarrega a lista
      } else {
        const msg = await response.text();
        alert(`Erro: ${msg}`);
      }
    } catch (error) {
      alert("Erro de conexão ao tentar excluir.");
    }
  };

  const transporteActions = [
    {
      name: "Editar",
      colorClass:
        "bg-blue-700 text-white hover:bg-blue-500 p-2 rounded-md transition-colors",
      handler: handleEdit,
    },
    {
      name: "Excluir",
      colorClass:
        "bg-red-600 text-white hover:bg-red-600 p-2 rounded-md transition-colors",
      handler: handleDelete,
    },
  ];

  return (
    <DataList<Transporte>
      loading={loading}
      pageTitle="Gerenciar Transportes"
      buttonText="Novo Transporte"
      registerPath={ROUTES.REGISTRAR_TRANSPORTE}
      data={transportes}
      headers={transporteHeaders}
      dataKeys={transporteKeys}
      renderValue={renderTransporteValue}
      actions={transporteActions}
    />
  );
}
