import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/paths";

// Dados mockados para viagens compradas e concluídas
const viagensCompradas = [
  {
    id: 1,
    nome: "Pacote Premium Fernando de Noronha",
    descricao: "7 dias nas ilhas paradisíacas",
    valor: 2500.00,
    status: "confirmada",
    dataPartida: "2024-03-15",
    dataRetorno: "2024-03-22",
    itens: [
      "Hospedagem em resort 5 estrelas",
      "Café da manhã buffet",
      "Passeio de barco pelas ilhas",
      "Transfer aeroporto-hotel"
    ]
  },
  {
    id: 2,
    nome: "Rio de Janeiro - Passeio Completo",
    descricao: "5 dias na cidade maravilhosa",
    valor: 1200.00,
    status: "pendente",
    dataPartida: "2024-04-10",
    dataRetorno: "2024-04-15",
    itens: [
      "Hospedagem em hotel 4 estrelas",
      "Café da manhã incluso",
      "City tour pelas principais atrações",
      "Ingresso para Cristo Redentor"
    ]
  }
];

const viagensConcluidas = [
  {
    id: 3,
    nome: "Gramado - Natal Luz",
    descricao: "Experiência de Natal na Serra Gaúcha",
    valor: 1800.00,
    status: "concluída",
    dataPartida: "2023-12-01",
    dataRetorno: "2023-12-08",
    itens: [
      "Hospedagem em hotel temático",
      "Café colonial incluso",
      "Ingresso para o Natal Luz",
      "Tour pelas vinícolas da região"
    ]
  },
  {
    id: 4,
    nome: "Bonito - MS - Ecoturismo",
    descricao: "Aventura nas águas cristalinas",
    valor: 2200.00,
    status: "concluída",
    dataPartida: "2023-08-15",
    dataRetorno: "2023-08-22",
    itens: [
      "Hospedagem em pousada ecológica",
      "Passeio gruta do Lago Azul",
      "Flutuação no Rio Sucuri",
      "Guia especializado"
    ]
  }
];

export default function MinhasViagens() {
  const navigate = useNavigate();
  const location = useLocation();

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleVisualizar = (viagemId: number) => {
  // Navega para a tela de visualização padrão (sem ID)
  navigate(`${ROUTES.VIAGEM}/visualizar`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluída':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendente':
        return 'Pagamento Pendente';
      case 'concluída':
        return 'Concluída';
      default:
        return status;
    }
  };

  // Determina qual aba está ativa
  const isViagensCompradas = location.pathname === ROUTES.VIAGEM;
  const isViagensConcluidas = location.search === '?concluidas';

  // Seleciona as viagens baseado na aba ativa
  const viagensAtivas = isViagensConcluidas ? viagensConcluidas : viagensCompradas;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Logo</h1>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate(ROUTES.VIAGEM)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                isViagensCompradas && !isViagensConcluidas
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Viagens Compradas
            </button>

            <button
              onClick={() => navigate(`${ROUTES.VIAGEM}?concluidas`)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                isViagensConcluidas
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Viagens Concluídas
            </button>
          </div>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isViagensConcluidas ? 'Viagens Concluídas' : 'Minhas Viagens'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isViagensConcluidas 
                ? 'Histórico de todas as suas viagens realizadas' 
                : 'Acompanhe suas viagens confirmadas e pendentes'
              }
            </p>
          </div>
          
          {/* Contador de viagens */}
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">
              Total: <strong>{viagensAtivas.length}</strong> viagem{viagensAtivas.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {viagensAtivas.map((viagem) => (
            <div
              key={viagem.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Header do Card com Status */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">
                    {viagem.nome}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viagem.status)}`}>
                    {getStatusText(viagem.status)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{viagem.descricao}</p>
                
                {/* Datas */}
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <span>📅 {formatarData(viagem.dataPartida)} - {formatarData(viagem.dataRetorno)}</span>
                </div>
              </div>

              {/* Corpo do Card */}
              <div className="p-6">
                {/* Itens Inclusos */}
                <ul className="space-y-2 mb-4">
                  {viagem.itens.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
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
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Valor */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Valor:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatarValor(viagem.valor)}
                  </span>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Apenas Botão Visualizar */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleVisualizar(viagem.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Visualizar Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há viagens */}
        {viagensAtivas.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🌴</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isViagensConcluidas ? 'Nenhuma viagem concluída' : 'Nenhuma viagem comprada'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isViagensConcluidas 
                  ? 'Suas viagens concluídas aparecerão aqui' 
                  : 'Explore nossos pacotes e reserve sua próxima aventura!'
                }
              </p>
              {!isViagensConcluidas && (
                <button
                  onClick={() => navigate(ROUTES.PRODUCT)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Explorar Pacotes
                </button>
              )}
            </div>
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {isViagensConcluidas ? 'Histórico de Viagens' : 'Acompanhamento'}
            </h3>
            <p className="text-gray-600">
              {isViagensConcluidas 
                ? 'Aqui você encontra o histórico completo de todas as suas viagens realizadas. Reviva as melhores experiências!'
                : 'Acompanhe o status das suas reservas, datas de viagem e detalhes dos pacotes adquiridos.'
              }
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Precisa de Ajuda?
            </h3>
            <p className="text-gray-600 mb-3">
              Tem dúvidas sobre suas reservas ou precisa de suporte?
            </p>
            <button
              onClick={() => navigate(ROUTES.CONTATO)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Falar com Suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}