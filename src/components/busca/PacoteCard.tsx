import { ROUTES } from "@/paths";
import { useNavigate } from "react-router-dom";
import placeholder from "/placeholder.jpg";
import type { Pacote } from "@/pages/landingPage/LandingPage";
import { MdOutlineMyLocation } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";

interface PacoteCardProps {
 pacote: Pacote;
}

const formatarValor = (valor: number) => {
 return new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
 }).format(valor);
};

export default function PacoteCard({ pacote }: PacoteCardProps) {
 const navigate = useNavigate();

 const handleVisualizar = () => {
  navigate(ROUTES.PACOTE_DETALHES.replace(":nome", pacote.nome));
 };

 const destino = pacote.hotel?.cidade?.nome || "Destino Desconhecido";
 const fotoUrl = pacote.fotosDoPacote?.fotoDoPacote || placeholder;

 return (
  <div
   key={pacote.id}
   className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col overflow-hidden"
  >
   <div className="h-48 overflow-hidden relative">
    <img
     src={fotoUrl}
     alt={pacote.nome}
     className="w-full h-full object-cover hover:scale-105 transition-transform"
    />
    {pacote.status === "CONCLUIDO" && (
     <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-80">
      Encerrado
     </div>
    )}
   </div>
   <div className="p-5 flex flex-col flex-1">
    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
     {pacote.nome}
    </h3>
    <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
     <MdOutlineMyLocation className="text-xl" />
     {destino}
    </p>
    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
     {pacote.descricao}
    </p>
    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
     <div className="mr-4">
      <p className="text-xs text-gray-400 uppercase flex items-center gap-1">
       <FaMoneyCheckAlt className="text-xl" />
       A partir de
      </p>
      <p className="text-lg font-bold text-blue-600">
       {formatarValor(pacote.preco)}
      </p>
     </div>
     <button
      onClick={() => handleVisualizar()}
      className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors"
     >
      Detalhes
     </button>
    </div>
   </div>
  </div>
 );
}

export type { Pacote };