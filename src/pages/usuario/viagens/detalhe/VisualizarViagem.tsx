import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "@/store/sessionStore";
import { ROUTES } from "@/paths";
import { FaMapMarkedAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { MdEmail, MdOutlineAirplanemodeActive } from "react-icons/md";
import { TbCalendarUp } from "react-icons/tb";
import { TbCalendarRepeat } from "react-icons/tb";
import { FaHotel } from "react-icons/fa6";
import { FaTruckPlane } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

// Interface compatível com o DTO Java ViagemDetalhadaDTO
interface ViagemDetalhada {
  id: number;
  nomePacote: string;
  descricao: string;
  valor: number;
  statusCompra: string;
  dataPartida: string;
  dataRetorno: string;
  dataCompra: string;
  numeroReserva: string;
  imagemPrincipal: string;
  galeria: string[];
  inclusoes: string[];
  nomeHotel: string;
  tipoTransporte: string;
  contatoEmergencia: {
    telefone: string;
    email: string;
  };
}

export default function VisualizarViagem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuario } = useSession();

  const [viagem, setViagem] = useState<ViagemDetalhada | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagemSelecionada, setImagemSelecionada] = useState("");

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  useEffect(() => {
    const fetchDetalhes = async () => {
      if (!id || !usuario?.accessToken) return;

      try {
        const response = await fetch(`/api/compra/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${usuario.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setViagem(data);
          setImagemSelecionada(data.imagemPrincipal);
        } else {
          console.error("Erro ao buscar detalhes");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalhes();
  }, [id, usuario]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando detalhes...
      </div>
    );
  }

  if (!viagem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Viagem não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de Navegação */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Voltar
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {viagem.nomePacote}
            </h1>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 font-bold">
              {viagem.statusCompra}
            </span>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              Imprimir Voucher
            </button>
          </div>
        </div>

        {/* Galeria de Imagens */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden h-96">
            {imagemSelecionada ? (
              <img
                src={imagemSelecionada}
                alt={viagem.nomePacote}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                Sem imagem
              </div>
            )}
          </div>

          {viagem.galeria && viagem.galeria.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {viagem.galeria.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImagemSelecionada(img)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 ${
                    imagemSelecionada === img
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Galeria ${index}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal (Esquerda) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cards de Datas e Infos Básicas */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkedAlt className="text-xl" />
                Resumo da Reserva
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  {/* Ícone Partida: Mantido o layout com a bolha azul */}
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <MdOutlineAirplanemodeActive className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 uppercase flex items-center gap-1">
                      <TbCalendarUp className="text-lg" />
                      Partida
                    </h3>
                    <p className="font-semibold text-gray-900">
                      {viagem.dataPartida}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Ícone Retorno: Mantido o layout com a bolha azul (Adicionado) */}
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <TbCalendarRepeat className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 uppercase flex items-center gap-1">
                      <TbCalendarRepeat className="text-lg" />
                      Retorno
                    </h3>
                    <p className="font-semibold text-gray-900">
                      {viagem.dataRetorno}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Ícone Hotel: Mantido o layout com a bolha azul (Adicionado) */}
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <FaHotel className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 uppercase flex items-center gap-1">
                      <FaHotel className="text-lg" />
                      Hotel
                    </h3>
                    <p className="font-semibold text-gray-900">
                      {viagem.nomeHotel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Ícone Transporte: Mantido o layout com a bolha azul (Adicionado) */}
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <FaTruckPlane className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 uppercase flex items-center gap-1">
                      <FaTruckPlane className="text-lg" />
                      Transporte
                    </h3>
                    <p className="font-semibold text-gray-900">
                      {viagem.tipoTransporte}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {viagem.descricao}
                </p>
              </div>
            </div>

            {/* Inclusões */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaSearchLocation className="text-xl" />
                Itens Inclusos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {viagem.inclusoes &&
                  viagem.inclusoes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Coluna Lateral (Direita) */}
          <div className="space-y-6">
            {/* Card de Valor e Status */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMoneyCheckAlt className="text-lg" />
                Detalhes do Pagamento
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Código Reserva</span>
                  <span className="font-mono text-gray-900">
                    {viagem.numeroReserva}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data Compra</span>
                  <span className="text-gray-900">{viagem.dataCompra}</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    Total Pago
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatarValor(viagem.valor)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contato Emergência */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Suporte / Emergência
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <BsFillTelephoneFill className="text-lg" />
                  <span className="text-gray-700">(11) 4002-8922</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail className="text-lg" />
                  <span className="text-gray-700">
                    contato@destinoviagens.com
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(ROUTES.CONTATO)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow"
            >
              Precisa de ajuda?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}