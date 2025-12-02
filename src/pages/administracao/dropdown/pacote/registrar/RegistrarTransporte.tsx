import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/paths";
import { useSession } from "@/store/sessionStore";
import { FaTruckPlane } from "react-icons/fa6";
import { TbBuildingAirport } from "react-icons/tb";
import { MdLocalShipping } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";
import { MdOutlineAirplanemodeActive } from "react-icons/md";

export default function RegistrarTransporte() {
 const navigate = useNavigate();
 const { usuario } = useSession();
 const { id } = useParams<{ id: string }>();
 const isEditing = !!id;

 const [empresa, setEmpresa] = useState("");
 const [meio, setMeio] = useState("AEREO");
 const [preco, setPreco] = useState<number>(0);
 const [loading, setLoading] = useState(isEditing);

 useEffect(() => {
  const editar = async () => {
   try {
    const response = await fetch(`/api/transporte/${id}`, {
     credentials: "include",
     headers: {
      Authorization: `Bearer ${usuario?.accessToken}`,
     },
    });

    if (!response.ok) {
     throw new Error("Transporte não existe");
    }

    const result = await response.json();

    setEmpresa(result.empresa);
    setMeio(result.meio);
    setPreco(result.preco);
   } catch (erro) {
    console.log(erro);
   } finally {
    setLoading(false);
   }
  };
  if (isEditing) {
   editar();
  } else {
        setLoading(false); // Adicionado para garantir que o formulário carregue quando não está editando
    }
 }, [id, isEditing, usuario]); // Adicionado 'usuario' nas dependências

 const handleSalvar = async () => {
  if (!empresa) {
   alert("Informe o nome da empresa.");
   return;
  }

  const payload = {
   empresa,
   meio,
   preco: Number(preco),
  };

  try {
   const url = isEditing ? `/api/transporte/${id}` : "/api/transporte";
   const method = isEditing ? "PUT" : "POST";

   const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${usuario?.accessToken}`,
    },
    body: JSON.stringify(payload),
   });

   if (response.ok) {
    alert(isEditing ? "Transporte atualizado!" : "Transporte criado!");
    navigate(ROUTES.TRANSPORTES_LISTA);
   } else {
    alert("Erro ao salvar.");
   }
  } catch (error) {
   console.error(error);
   alert("Erro de conexão.");
  }
 };

 if (loading) return <div className="p-8">Carregando...</div>;
  
  // Estilo unificado para inputs e selects, incluindo cinza escuro no texto
 const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800";


 return (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
   <h1 className="text-2xl font-bold mb-6 flex items-center space-x-3 text-gray-900">
    <FaTruckPlane className="text-2xl" />
    <span>{isEditing ? "Editar Transporte" : "Novo Transporte"}</span>
   </h1>

   <div className="space-y-4">
    <div>
     <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
      <TbBuildingAirport className="text-lg text-gray-600" />
      <span>Empresa</span>
     </label>
     <input
      type="text"
      value={empresa}
      onChange={(e) => setEmpresa(e.target.value)}
      className={inputStyle}
      placeholder="Ex: Latam"
     />
    </div>

    <div className="grid grid-cols-2 gap-4">
     <div>
      <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
       <MdLocalShipping className="text-lg text-gray-600" />
       <span>Meio de Transporte</span>
      </label>
      <select
       value={meio}
       onChange={(e) => setMeio(e.target.value)}
       className={inputStyle}
      >
       <option value="AEREO">Aéreo</option>
       <option value="TERRESTRE">Terrestre</option>
       <option value="MARITIMO">Marítimo</option>
      </select>
     </div>
     <div>
      <label className="block text-sm font-medium mb-1 flex items-center space-x-2 text-gray-700">
       <FaMoneyCheckAlt className="text-lg text-gray-600" />
       <span>Custo Base (R$)</span>
      </label>
      <input
       type="number"
       value={preco}
       onChange={(e) => setPreco(Number(e.target.value))}
       className={inputStyle}
      />
     </div>
    </div>

    <div className="flex justify-end gap-2 mt-6">
     <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-red-700 transition-colors flex items-center space-x-2"
     >
      <MdOutlineAirplanemodeInactive className="text-lg" />
      <span>Cancelar</span>
     </button>
     
     <button
      onClick={handleSalvar}
      className="px-4 py-2 rounded font-medium bg-blue-600 text-white hover:bg-green-700 transition-colors flex items-center space-x-2"
     >
      <MdOutlineAirplanemodeActive className="text-lg" />
      <span>Salvar</span>
     </button>
    </div>
   </div>
  </div>
 );
}