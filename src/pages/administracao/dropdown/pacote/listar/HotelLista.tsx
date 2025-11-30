import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/paths";
import DataList from "@/components/administracao/lista/dataList";
import { FaHotel } from "react-icons/fa6";

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

const renderHotelValue = (hotel: Hotel, key: string) => {
  switch (key) {
    case "local":
      return hotel.cidade
        ? `${hotel.cidade.nome}/${hotel.cidade.estado.sigla}`
        : "-";
    case "diaria":
      return `R$ ${hotel.diaria.toFixed(2).replace(".", ",")}`;
    default:
      return hotel[key as keyof Hotel] as React.ReactNode;
  }
};

const hotelHeaders = ["ID", "Nome", "Local", "Diária"];
const hotelKeys = ["id", "nome", "local", "diaria"];

export default function HotelLista() {
  const navigate = useNavigate();
  const [hoteis, setHoteis] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHoteis = () => {
    fetch("/api/hotel/")
      .then((res) => res.json())
      .then((data) => {
        setHoteis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHoteis();
  }, []);

  const handleEdit = (id: number) => {
    navigate(ROUTES.EDITAR_HOTEL.replace(":id", String(id)));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este hotel?")) return;

    try {
      const response = await fetch(`/api/hotel/${id}`, { method: "DELETE" });

      if (response.ok) {
        alert("Hotel excluído com sucesso!");
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
      colorClass: "text-blue-600 hover:text-blue-900",
      handler: handleEdit,
    },
    {
      name: "Excluir",
      colorClass: "text-red-600 hover:text-red-900",
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
