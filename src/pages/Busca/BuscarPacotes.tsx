import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PacoteCard, { type Pacote } from "@/components/busca/PacoteCard";
import logo from "/icon.png";

import { FaChevronLeft, FaChevronRight, FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { PiPackageBold } from "react-icons/pi";

export default function BuscarPacotes() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estados dos dados
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [paginacao, setPaginacao] = useState({
    page: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(false);

  // Leitura inicial da URL
  const termoURL = searchParams.get("pacote") || "";
  const precoURL = searchParams.get("precoMax") || "";
  const pageURL = parseInt(searchParams.get("page") || "0");
  const sizeURL = parseInt(searchParams.get("size") || "12");

  // Estados locais dos inputs
  const [inputTermo, setInputTermo] = useState(termoURL);
  const [inputPreco, setInputPreco] = useState(precoURL);
  const [itensPorPagina, setItensPorPagina] = useState(sizeURL);

  useEffect(() => {
    const buscarDados = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", pageURL.toString());
        params.append("size", sizeURL.toString());
        if (termoURL) params.append("nome", termoURL);
        if (precoURL) params.append("precoMax", precoURL);

        const response = await fetch(
          `/api/publico/pacote?${params.toString()}`
        );
        if (response.ok) {
          const data = await response.json();
          setPacotes(data.content);
          setPaginacao({
            page: data.number,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
          });
        }
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [termoURL, precoURL, pageURL, sizeURL]);

  const atualizarURL = (novosParams: any) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(novosParams).forEach((key) => {
      if (novosParams[key]) {
        params.set(key, novosParams[key]);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    atualizarURL({ pacote: inputTermo, precoMax: inputPreco, page: "0" });
  };

  const handleMudarPagina = (novaPagina: number) => {
    atualizarURL({ page: novaPagina.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMudarTamanhoPagina = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const novoTamanho = e.target.value;
    setItensPorPagina(Number(novoTamanho));
    atualizarURL({ size: novoTamanho, page: "0" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar de Filtros */}
      <aside className="w-full lg:w-80 bg-white shadow-lg shrink-0 p-6 z-10">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="w-32 object-contain" />
        </div>

        <form onSubmit={handleBuscar} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FaMoneyCheckAlt /> Preço Máximo
            </label>
            <input
              type="number"
              value={inputPreco}
              onChange={(e) => setInputPreco(e.target.value)}
              placeholder="Ex: 2000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <PiPackageBold /> Pacotes por página
            </label>
            <select
              value={itensPorPagina}
              onChange={handleMudarTamanhoPagina}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="6">6 itens</option>
              <option value="12">12 itens</option>
              <option value="24">24 itens</option>
              <option value="48">48 itens</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Aplicar Filtros
          </button>
        </form>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Barra de Busca Topo */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex items-center text-xl font-semibold text-gray-700 mb-4 gap-2">
            <MdOutlineTravelExplore />
            <span>Encontre seu destino</span>
          </div>
          <form onSubmit={handleBuscar} className="flex gap-4">
            <input
              type="text"
              value={inputTermo}
              onChange={(e) => setInputTermo(e.target.value)}
              placeholder="Buscar por nome do pacote..."
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            />
            <button
              type="submit"
              className="bg-[#2071b3] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-md"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Listagem */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-xl animate-pulse">
            Buscando as melhores viagens...
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {paginacao.totalElements} Pacotes encontrados
              </h2>
              <span className="text-sm text-gray-500">
                Página {paginacao.page + 1} de {paginacao.totalPages}
              </span>
            </div>

            {pacotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {pacotes.map((pacote) => (
                  <PacoteCard key={pacote.id} pacote={pacote} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-500 text-lg">
                  Nenhum pacote encontrado com estes filtros.
                </p>
              </div>
            )}

            {/* Controles de Paginação */}
            {paginacao.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={() => handleMudarPagina(paginacao.page - 1)}
                  disabled={paginacao.page === 0}
                  className="p-3 rounded-full bg-white shadow hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-blue-600 transition"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-2">
                  {Array.from(
                    { length: Math.min(5, paginacao.totalPages) },
                    (_, i) => {
                      let p = i;
                      if (paginacao.totalPages > 5 && paginacao.page > 2) {
                        p = paginacao.page - 2 + i;
                        if (p >= paginacao.totalPages) p = i;
                      }

                      if (p < paginacao.totalPages)
                        return (
                          <button
                            key={p}
                            onClick={() => handleMudarPagina(p)}
                            className={`w-10 h-10 rounded-lg font-medium transition ${
                              paginacao.page === p
                                ? "bg-[#2071b3] text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {p + 1}
                          </button>
                        );
                    }
                  )}
                </div>

                <button
                  onClick={() => handleMudarPagina(paginacao.page + 1)}
                  disabled={paginacao.page === paginacao.totalPages - 1}
                  className="p-3 rounded-full bg-white shadow hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-blue-600 transition"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
