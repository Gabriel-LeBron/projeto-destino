import { ROUTES } from "@/paths";
import { useNavigate } from "react-router-dom";
import placeholder from "/placeholder.jpg";
import type { Pacote } from "@/pages/landingPage/LandingPage";

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

  const handleVisualizar = (id: number) => {
    navigate(ROUTES.PACOTE_DETALHES.replace(":id", String(id)));
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
        <p className="text-sm text-gray-500 mb-2">📍 {destino}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
          {pacote.descricao}
        </p>
        <div className="flex justify-between items-end pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase">A partir de</p>
            <p className="text-xl font-bold text-blue-600">
              {formatarValor(pacote.preco)}
            </p>
          </div>
          <button
            onClick={() => handleVisualizar(pacote.id)}
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

export type { Pacote };
