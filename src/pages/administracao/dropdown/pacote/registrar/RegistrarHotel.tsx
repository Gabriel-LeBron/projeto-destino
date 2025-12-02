import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/paths";
import { useSession } from "@/store/sessionStore";
import { FaHotel } from "react-icons/fa6";
import { TbPencilPin } from "react-icons/tb";
import { MdOutlineMyLocation } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiTreasureMapFill } from "react-icons/ri";
import { FaSearchLocation } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { TbBuildingOff } from "react-icons/tb";
import { TbBuildingPlus } from "react-icons/tb";

interface Regiao {
 id: number;
 nome: string;
 sigla: string;
}

interface Estado {
 id: number;
 nome: string;
 sigla: string;
 regiao: Regiao;
}

interface Cidade {
 id: number;
 nome: string;
 estado: Estado;
}

export default function RegistrarHotel() {
 const navigate = useNavigate();
 const { usuario } = useSession();
 const { id } = useParams<{ id: string }>();
 const isEditing = !!id;

 const [nome, setNome] = useState("");
 const [endereco, setEndereco] = useState("");
 const [diaria, setDiaria] = useState<number>(0);

 const [selectedRegiao, setSelectedRegiao] = useState<number | "">("");
 const [selectedEstado, setSelectedEstado] = useState<number | "">("");
 const [selectedCidade, setSelectedCidade] = useState<number | "">("");

 const [regioes, setRegioes] = useState<Regiao[]>([]);
 const [estados, setEstados] = useState<Estado[]>([]);
 const [cidades, setCidades] = useState<Cidade[]>([]);

 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetch("/api/hotel/regioes", {
   credentials: "include",
   headers: {
    Authorization: `Bearer ${usuario?.accessToken}`,
   },
  })
   .then((res) => res.json())
   .then((data) => {
    setRegioes(data);
    if (!isEditing) setLoading(false);
   })
   .catch(console.error);
 }, [isEditing, usuario]);

 useEffect(() => {
  if (selectedRegiao) {
   fetch(`/api/hotel/estados/${selectedRegiao}`, {
    credentials: "include",
    headers: {
     Authorization: `Bearer ${usuario?.accessToken}`,
    },
   })
    .then((res) => res.json())
    .then(setEstados)
    .catch(console.error);
  } else {
   setEstados([]);
   setCidades([]);
  }
 }, [selectedRegiao, usuario]);

 useEffect(() => {
  if (selectedEstado) {
   fetch(`/api/hotel/cidades/${selectedEstado}`, {
    credentials: "include",
    headers: {
     Authorization: `Bearer ${usuario?.accessToken}`,
    },
   })
    .then((res) => res.json())
    .then(setCidades)
    .catch(console.error);
  } else {
   setCidades([]);
  }
 }, [selectedEstado, usuario]);

 useEffect(() => {
  if (isEditing) {
   const loadData = async () => {
    try {
     const res = await fetch(`/api/hotel/${id}`, {
      credentials: "include",
      headers: {
       Authorization: `Bearer ${usuario?.accessToken}`,
      },
     });
     if (res.ok) {
      const hotel = await res.json();
      setNome(hotel.nome);
      setEndereco(hotel.endereco);
      setDiaria(hotel.diaria);

      if (hotel.cidade) {
       const cidadeId = hotel.cidade.id;
       const estadoId = hotel.cidade.estado.id;
       const regiaoId = hotel.cidade.estado.regiao.id;

       setSelectedRegiao(regiaoId);

       const resEstados = await fetch(`/api/hotel/estados/${regiaoId}`, {
        credentials: "include",
        headers: {
         Authorization: `Bearer ${usuario?.accessToken}`,
        },
       });
       const listaEstados = await resEstados.json();
       setEstados(listaEstados);
       setSelectedEstado(estadoId);

       const resCidades = await fetch(`/api/hotel/cidades/${estadoId}`, {
        credentials: "include",
        headers: {
         Authorization: `Bearer ${usuario?.accessToken}`,
        },
       });
       const listaCidades = await resCidades.json();
       setCidades(listaCidades);
       setSelectedCidade(cidadeId);
      }
     }
    } catch (error) {
     console.error(error);
    } finally {
     setLoading(false);
    }
   };
   loadData();
  }
 }, [id, isEditing, usuario]);

 const handleSalvar = async () => {
  if (!nome || !endereco || !selectedCidade) {
   alert("Preencha todos os campos obrigatórios.");
   return;
  }

  const payload = {
   nome,
   endereco,
   diaria: Number(diaria),
   cidade: Number(selectedCidade),
  };

  try {
   const url = isEditing ? `/api/hotel/${id}` : "/api/hotel/";
   const method = isEditing ? "PUT" : "POST";

   const response = await fetch(url, {
    method,
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${usuario?.accessToken}`,
    },
    body: JSON.stringify(payload),
   });

   if (response.ok) {
    alert(isEditing ? "Hotel atualizado!" : "Hotel criado!");
    navigate(ROUTES.HOTEIS_LISTA);
   } else {
    alert("Erro ao salvar.");
   }
  } catch (error) {
   console.error(error);
   alert("Erro de conexão.");
  }
 };

 if (loading) return <div className="p-8">Carregando...</div>;
  
  // Estilo unificado para inputs (suave e moderno)
 const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800";
 const selectStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 text-gray-800";


 return (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
   
   <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3 text-gray-900">
    <FaHotel className="text-2xl" />
    <span>{isEditing ? "Editar Hotel" : "Novo Hotel"}</span>
   </h1>

   <div className="space-y-4">
    <div>
     <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
      <TbPencilPin className="text-lg" />
      <span>Nome do Hotel</span>
     </label>
     <input
      type="text"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      className={inputStyle}
      placeholder="Ex: Hotel Copacabana Palace"
     />
    </div>

    <div>
     <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
      <MdOutlineMyLocation className="text-lg" />
      <span>Endereço</span>
     </label>
     <input
      type="text"
      value={endereco}
      onChange={(e) => setEndereco(e.target.value)}
      className={inputStyle}
      placeholder="Av. Atlântica, 1702"
     />
    </div>

    <div className="pb-2">
     <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
      <FaMoneyCheckAlt className="text-lg" />
      <span>Diária (R$)</span>
     </label>
     <input
      type="number"
      value={diaria}
      onChange={(e) => setDiaria(Number(e.target.value))}
      className={inputStyle}
     />
    </div>
        
        <div className="border-t border-gray-200 my-6"></div>
    <div className="pt-4 mt-4">
     <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-gray-900">
      <RiTreasureMapFill className="text-xl" />
      <span>LOCALIZAÇÃO</span>
     </h3>

     <div className="grid grid-cols-1 gap-4">
      <div>
       <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
        <FaSearchLocation className="text-lg" />
        <span>Região</span>
       </label>
       <select
        value={selectedRegiao}
        onChange={(e) => {
         setSelectedRegiao(Number(e.target.value));
         setSelectedEstado("");
         setSelectedCidade("");
        }}
        className={selectStyle}
       >
        <option value="">Selecione a Região...</option>
        {regioes.map((r) => (
         <option key={r.id} value={r.id}>
          {r.nome}
         </option>
        ))}
       </select>
      </div>

      <div>
       <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
        <FaFlag className="text-lg" />
        <span>Estado</span>
       </label>
       <select
        value={selectedEstado}
        onChange={(e) => {
         setSelectedEstado(Number(e.target.value));
         setSelectedCidade("");
        }}
        className={selectStyle}
        disabled={!selectedRegiao}
       >
        <option value="">Selecione o Estado...</option>
        {estados.map((e) => (
         <option key={e.id} value={e.id}>
          {e.nome} ({e.sigla})
         </option>
        ))}
       </select>
      </div>
      <div>
       <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
        <FaTreeCity className="text-lg" />
        <span>Cidade</span>
       </label>
       <select
        value={selectedCidade}
        onChange={(e) => setSelectedCidade(Number(e.target.value))}
        className={selectStyle}
        disabled={!selectedEstado}
       >
        <option value="">Selecione a Cidade...</option>
        {cidades.map((c) => (
         <option key={c.id} value={c.id}>
          {c.nome}
         </option>
        ))}
       </select>
      </div>
     </div>
    </div>

    <div className="flex justify-end gap-2 mt-6">
     <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-red-700 transition-colors flex items-center space-x-2"
     >
      <TbBuildingOff className="text-lg" />
      <span>Cancelar</span>
     </button>
     
     <button
      onClick={handleSalvar}
      className="px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-green-700 transition-colors flex items-center space-x-2"
     >
      <TbBuildingPlus className="text-lg" />
      <span>Salvar</span>
     </button>
    </div>
   </div>
  </div>
 );
}