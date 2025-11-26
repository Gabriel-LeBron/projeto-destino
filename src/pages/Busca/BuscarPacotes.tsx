import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/paths";
import placeholder from "/placeholder.jpg";
interface Pacote {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  destino: string;
  status: string; // Importante para identificar
  fotosDoPacote?: {
    fotoDoPacote: string;
  };
}

interface TopDestino {
  id: number;
  cidade: string;
  estado: string;
  vendas: number;
  imagem: string;
}

export default function BuscarPacotes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [topDestinos, setTopDestinos] = useState<TopDestino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("todos"); // 'todos', 'disponiveis'
  const [faixaPreco, setFaixaPreco] = useState("todas");
  const [pacotesFiltrados, setPacotesFiltrados] = useState<Pacote[]>([]);

  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // USA O ENDPOINT PÚBLICO FILTRADO (Sem Cancelados)
        const resPacotes = await fetch("/api/pacote/publico");
        if (!resPacotes.ok) throw new Error("Falha ao buscar pacotes.");
        const dataPacotes = await resPacotes.json();

        setPacotes(dataPacotes);
        setPacotesFiltrados(dataPacotes);

        // Busca Top Destinos
        try {
          const resDestinos = await fetch("/api/pacote/destinos-populares");
          if (resDestinos.ok) {
            const dataDestinos = await resDestinos.json();
            setTopDestinos(dataDestinos.slice(0, 10));
          }
        } catch (e) {
          console.warn(e);
        }
      } catch (err) {
        setError("Não foi possível carregar os pacotes. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let resultados = pacotes;

    // Filtro Texto
    if (termoBusca.trim()) {
      const lower = termoBusca.toLowerCase();
      resultados = resultados.filter(
        (p) =>
          p.nome.toLowerCase().includes(lower) ||
          (p.descricao && p.descricao.toLowerCase().includes(lower))
      );
    }

    // Filtro Preço
    if (faixaPreco === "ate-1000") {
      resultados = resultados.filter((p) => p.preco <= 1000);
    } else if (faixaPreco === "1000-2000") {
      resultados = resultados.filter((p) => p.preco > 1000 && p.preco <= 2000);
    } else if (faixaPreco === "acima-2000") {
      resultados = resultados.filter((p) => p.preco > 2000);
    }

    // Filtro Status (Opcional, pois o backend já filtrou cancelados)
    // Mas podemos querer ver SÓ os ativos para compra
    if (filtroAtivo === "disponiveis") {
      resultados = resultados.filter((p) => p.status === "EMANDAMENTO");
    }

    setPacotesFiltrados(resultados);
    setPaginaAtual(1);
  }, [termoBusca, faixaPreco, filtroAtivo, pacotes]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("q");
    if (query) setTermoBusca(query);
  }, [location.search]);

  // Paginação Client-Side (já que buscamos a lista filtrada)
  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const pacotesAtuais = pacotesFiltrados.slice(indexPrimeiro, indexUltimo);
  const totalPaginas = Math.ceil(pacotesFiltrados.length / itensPorPagina);

  const handleVisualizar = (id: number) => {
    navigate(ROUTES.PACOTE_DETALHES.replace(":id", String(id)));
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Filtros */}
      <div className="w-80 bg-white shadow-lg flex-shrink-0 hidden lg:block">
        <div className="p-6 border-b border-gray-200">
          <h1
            className="text-xl font-bold text-gray-900 cursor-pointer"
            onClick={() => navigate(ROUTES.LANDINGPAGE)}
          >
            Logo
          </h1>
        </div>
        <nav className="p-6 space-y-8">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Exibir
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setFiltroAtivo("todos")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  filtroAtivo === "todos"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Tudo (Inclui Histórico)
              </button>
              <button
                onClick={() => setFiltroAtivo("disponiveis")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  filtroAtivo === "disponiveis"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Apenas Disponíveis
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Preço
            </h2>
            <select
              value={faixaPreco}
              onChange={(e) => setFaixaPreco(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="todas">Qualquer preço</option>
              <option value="ate-1000">Até R$ 1.000</option>
              <option value="1000-2000">R$ 1.000 - R$ 2.000</option>
              <option value="acima-2000">Acima de R$ 2.000</option>
            </select>
          </div>
        </nav>
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="mb-8">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Busque por destino ou nome do pacote..."
                className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
              />
            </div>
          </form>
        </div>

        {loading && <div className="text-center p-10">Carregando...</div>}

        {!loading && !error && (
          <>
            {/* Top Destinos */}
            {topDestinos.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🔥 Destinos Mais Buscados
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {topDestinos.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setTermoBusca(d.cidade)}
                      className="min-w-[160px] bg-white rounded-xl shadow-sm border cursor-pointer hover:shadow-md"
                    >
                      <img
                        src={d.imagem || "https://via.placeholder.com/150"}
                        className="h-28 w-full object-cover rounded-t-xl"
                      />
                      <div className="p-3">
                        <h3 className="font-bold text-sm truncate">
                          {d.cidade}
                        </h3>
                        <p className="text-xs text-blue-600">
                          {d.vendas} vendas
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Lista de Pacotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pacotesAtuais.map((pacote) => (
                <div
                  key={pacote.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col overflow-hidden"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={pacote.fotosDoPacote?.fotoDoPacote || placeholder}
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
                    <p className="text-sm text-gray-500 mb-2">
                      📍 {pacote.destino || "Destino Incrível"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
                      {pacote.descricao}
                    </p>
                    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase">
                          A partir de
                        </p>
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
              ))}
            </div>

            {/* Paginação Simples */}
            {totalPaginas > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual((p) => p - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="px-4 py-2">
                  Página {paginaAtual} de {totalPaginas}
                </span>
                <button
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => setPaginaAtual((p) => p + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
