import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/paths";
import { useViagens } from "@/utils/buscarFunctions";

export default function ViagensCadastradas() {
  const { viagens } = useViagens();
  const navigate = useNavigate();
  const location = useLocation();

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const handleEditar = (viagemId: number) => {
    console.log("Editando viagem:", viagemId);
  };

  const handleVisualizar = (viagemId: number) => {
    // Quando formos implementar a integração com ID, o navigate vai ficar // navigate(`${ROUTES.PRODUCT}/${viagemId}`);
    navigate(ROUTES.PRODUCT);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Logo</h1>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate(ROUTES.VIAGENS_CADASTRADAS)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === ROUTES.VIAGENS_CADASTRADAS
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Viagens Cadastradas
            </button>

            <button
              onClick={() => navigate(ROUTES.RELATORIO)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === ROUTES.RELATORIO
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Relatórios
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Viagens Cadastradas
          </h1>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Cadastrar Viagem
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {viagens.map((viagem) => (
            <div
              key={viagem.id}
              className="bg-white rounded-lg shadow-md border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  {viagem.nome}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{viagem.descricao}</p>
              </div>

              <div className="p-6">
                <ul className="space-y-2 mb-4">
                  {viagem.itens.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
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
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Valor:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatarValor(viagem.valor)}
                  </span>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditar(viagem.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleVisualizar(viagem.id)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Gerenciamento de Viagens
            </h3>
            <p className="text-gray-600">
              Aqui você pode visualizar, editar e gerenciar todos os pacotes de
              viagem cadastrados no sistema. Utilize o botão "Cadastrar Viagem"
              para adicionar novos pacotes.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Informações Importantes
            </h3>
            <p className="text-gray-600">
              Todos os pacotes são exibidos com detalhes completos incluindo
              serviços, valores e opções de personalização. Clique em "Editar"
              para modificar qualquer pacote existente ou "Visualizar" para ver
              detalhes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
