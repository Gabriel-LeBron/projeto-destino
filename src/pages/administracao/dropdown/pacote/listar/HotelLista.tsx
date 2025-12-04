import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/paths";
import DataList from "@/components/administracao/lista/dataList";
import { useSession } from "@/store/sessionStore";

// --- Interfaces ---

interface cidade {
  id: number;
  nome: String;
  endereco: String;
  diaria: number;
  estado: {
    id: number;
    nome: String;
    sigla: String;
    regiao: {
      id: number;
      nome: String;
      sigla: String;
    };
  };
}

interface Hotel {
  id: number;
  nome: string;
  diaria: number;
  cidade: cidade;
}

// --- Funções Auxiliares ---

const renderHotelValue = (hotel: Hotel, key: string) => {
  switch (key) {
    case "local":
      return hotel.cidade
        ? `${hotel.cidade.nome}/${hotel.cidade.estado.sigla}`
        : "-";
    case "diaria":
      // Formata a diária para Real Brasileiro (R$ 0,00)
      return `R$ ${hotel.diaria.toFixed(2).replace(".", ",")}`;
    default:
      return hotel[key as keyof Hotel] as React.ReactNode;
  }
};

const hotelHeaders = ["ID", "Nome", "Local", "Diária"];
const hotelKeys = ["id", "nome", "local", "diaria"];

// --- Componente Principal ---

export default function HotelLista() {
  const navigate = useNavigate();
  const { usuario, isLoading } = useSession();
  const [hoteis, setHoteis] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  // Função única para buscar os hotéis
  const fetchHoteis = async () => {
    if (!usuario || !usuario.accessToken) return;

    setLoading(true);
    try {
      const response = await fetch("/api/hotel", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.accessToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao buscar hotéis");

      const result = await response.json();
      setHoteis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Chama fetchHoteis ao carregar o componente ou quando o usuário/loading muda
  useEffect(() => {
    if (!isLoading && usuario) {
      // É necessário incluir 'fetchHoteis' nas dependências
      // para satisfazer as regras do React Hooks (ESLint)
      fetchHoteis();
    }
  }, [usuario, isLoading, fetchHoteis]);

  const handleEdit = (id: number) => {
    navigate(ROUTES.EDITAR_HOTEL.replace(":id", String(id)));
  };

  const handleDelete = async (id: number) => {
    if (!usuario || !usuario.accessToken) return;
    if (!window.confirm("Deseja realmente excluir este hotel?")) return;

    try {
      const response = await fetch(`/api/hotel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${usuario.accessToken}`,
        },
      });

      if (response.ok) {
        alert("Hotel excluído com sucesso!");
        // Atualiza a lista após a exclusão
        fetchHoteis(); 
      } else {
        const msg = await response.text();
        alert(`Erro: ${msg}`);
      }
    } catch (error) {
      alert("Erro de conexão ao tentar excluir.");
    }
  };

  const hotelActions = [
    {
      name: "Editar",
      colorClass:
        "bg-blue-700 text-white hover:bg-blue-500 p-2 rounded-md transition-colors",
      handler: handleEdit,
    },
    {
      name: "Excluir",
      colorClass:
        "bg-red-600 text-white hover:bg-red-500 p-2 rounded-md transition-colors",
      handler: handleDelete,
    },
  ];

  return (
    <DataList<Hotel>
      loading={loading}
      pageTitle="Gerenciar Hotéis"
      buttonText="Novo Hotel"
      registerPath={ROUTES.REGISTRAR_HOTEL}
      data={hoteis}
      headers={hotelHeaders}
      dataKeys={hotelKeys}
      renderValue={renderHotelValue}
      actions={hotelActions}
    />
  );
}