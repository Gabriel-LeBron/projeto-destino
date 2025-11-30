import { useSession } from "@/store/sessionStore";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Hotel {
  id: number;
  nome: string;
  diaria: number;
}

interface Transporte {
  id: number;
  empresa: string;
  meio: string;
  preco: number;
}

interface PacoteFoto {
  id: number;
  nome: string;
  fotoDoPacote: string;
}

interface PacoteDetalhes {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  inicio: string;
  fim: string;
  disponibilidade: number;
  tags: string[];
  status: string;

  hotel?: { id: number; nome: string };
  transporte?: { id: number; empresa: string; meio: string };
  fotosDoPacote?: { id: number; nome: string };
}

interface DadosFormulario {
  nome: string;
  valor: number;
  descricao: string;
  dataIda: string;
  dataVolta: string;
  disponibilidade: number;
  tags: string;
  hotelId: number | "";
  transporteId: number | "";
  pacoteFotoId: number | "";
}

export default function RegistrarPacote() {
  const navigate = useNavigate();
  const { usuario } = useSession();
  const { id } = useParams<{ id: string }>(); // Se existir ID, é modo de edição

  // --- Estados de Dados Auxiliares (Listas para os Selects) ---
  const [listaHoteis, setListaHoteis] = useState<Hotel[]>([]);
  const [listaTransportes, setListaTransportes] = useState<Transporte[]>([]);
  const [listaFotos, setListaFotos] = useState<PacoteFoto[]>([]);

  // --- Estados de Controle ---
  const [carregando, setCarregando] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);

  // --- Estado do Formulário ---
  const [formulario, setFormulario] = useState<DadosFormulario>({
    nome: "",
    valor: 0,
    descricao: "",
    dataIda: "",
    dataVolta: "",
    disponibilidade: 10,
    tags: "",
    hotelId: "",
    transporteId: "",
    pacoteFotoId: "",
  });

  // --- 1. Efeito Principal: Carregamento de Dados ---
  useEffect(() => {
    const carregarDadosIniciais = async () => {
      if (!usuario?.accessToken) return;

      setCarregando(true);
      try {
        // Passo A: Buscar as listas necessárias para os selects
        await buscarListasAuxiliares();

        // Passo B: Se houver ID na URL, buscar dados do pacote para preencher
        if (id) {
          setModoEdicao(true);
          await buscarDadosDoPacoteParaEdicao(id);
        }
      } catch (erro) {
        console.error("Erro ao inicializar página:", erro);
        alert("Ocorreu um erro ao carregar os dados.");
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosIniciais();
  }, [id, usuario]);

  // --- Funções Auxiliares de Fetch ---

  const buscarListasAuxiliares = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuario?.accessToken}`,
    };

    const [resHoteis, resTransportes, resFotos] = await Promise.all([
      fetch("/api/hotel", { headers }),
      fetch("/api/transporte", { headers }),
      fetch("/api/pacote-foto", { headers }),
    ]);

    if (resHoteis.ok) setListaHoteis(await resHoteis.json());
    if (resTransportes.ok) setListaTransportes(await resTransportes.json());
    if (resFotos.ok) setListaFotos(await resFotos.json());
  };

  const buscarDadosDoPacoteParaEdicao = async (pacoteId: string) => {
    const response = await fetch(`/api/publico/pacote/${pacoteId}`, {
      headers: { Authorization: `Bearer ${usuario?.accessToken}` },
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar o pacote.");
    }

    const dadosPacote: PacoteDetalhes = await response.json();

    // Passo C: Mapear o objeto recebido para o formato do formulário
    // Aqui extraímos os IDs dos objetos aninhados (hotel, transporte, fotos)
    setFormulario({
      nome: dadosPacote.nome,
      valor: dadosPacote.preco,
      descricao: dadosPacote.descricao,
      dataIda: dadosPacote.inicio,
      dataVolta: dadosPacote.fim,
      disponibilidade: dadosPacote.disponibilidade,
      tags: Array.isArray(dadosPacote.tags) ? dadosPacote.tags.join(", ") : "",

      // Extrair IDs ou deixar vazio
      hotelId: dadosPacote.hotel?.id || "",
      transporteId: dadosPacote.transporte?.id || "",
      pacoteFotoId: dadosPacote.fotosDoPacote?.id || "",
    });
  };

  // --- Manipuladores de Eventos ---

  const aoMudarInput = (campo: keyof DadosFormulario, valor: any) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const aoSalvar = async () => {
    // 1. Validação Básica
    if (
      !formulario.nome.trim() ||
      !formulario.hotelId ||
      !formulario.transporteId
    ) {
      alert("Por favor, preencha Nome, Hotel, Transporte e Pacote de Fotos.");
      return;
    }

    // 2. Montar Payload (Objeto de envio)
    const payload = {
      nome: formulario.nome,
      descricao: formulario.descricao,
      preco: formulario.valor,
      inicio: formulario.dataIda,
      fim: formulario.dataVolta,
      disponibilidade: formulario.disponibilidade,
      tags: formulario.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      hotel: Number(formulario.hotelId), // Envia apenas o ID
      transporte: Number(formulario.transporteId), // Envia apenas o ID
      pacoteFoto: Number(formulario.pacoteFotoId), // Envia apenas o ID
      funcionario: usuario?.id,
    };

    // 3. Definir URL e Método (POST ou PUT)
    const url = modoEdicao ? `/api/publico/pacote/${id}` : "/api/pacote";
    const metodo = modoEdicao ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario?.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          modoEdicao
            ? "Pacote atualizado com sucesso!"
            : "Pacote cadastrado com sucesso!"
        );
        navigate(-1); // Volta para a tela anterior
      } else {
        const erroMsg = await response.text();
        alert(`Erro ao salvar: ${erroMsg}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  // --- Renderização ---

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Cabeçalho */}
      <div className="max-w-4xl mx-auto px-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Viagens</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            modoEdicao
              ? "bg-orange-100 text-orange-800 border border-orange-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          {modoEdicao ? "✏️ Editando Pacote" : "➕ Novo Pacote"}
        </span>
      </div>

      {/* Cartão do Formulário */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {modoEdicao
                ? `Editar: ${formulario.nome}`
                : "Informações do Pacote"}
            </h2>
          </div>

          {/* Nome */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Pacote
            </label>
            <input
              type="text"
              value={formulario.nome}
              onChange={(e) => aoMudarInput("nome", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Ex: Aventura no Acre"
            />
          </div>

          {/* Preço e Vagas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Total (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={formulario.valor}
                onChange={(e) =>
                  aoMudarInput("valor", parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vagas Disponíveis
              </label>
              <input
                type="number"
                value={formulario.disponibilidade}
                onChange={(e) =>
                  aoMudarInput("disponibilidade", parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Selects: Hotel, Transporte, Fotos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏨 Hotel
              </label>
              <select
                value={formulario.hotelId}
                onChange={(e) =>
                  aoMudarInput("hotelId", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Selecione...</option>
                {listaHoteis.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.nome} (Diária: R$ {h.diaria})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ✈️ Transporte
              </label>
              <select
                value={formulario.transporteId}
                onChange={(e) =>
                  aoMudarInput("transporteId", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Selecione...</option>
                {listaTransportes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.empresa} - {t.meio} (R$ {t.preco})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📸 Fotos Promocionais
              </label>
              <select
                value={formulario.pacoteFotoId}
                onChange={(e) =>
                  aoMudarInput("pacoteFotoId", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Selecione...</option>
                {listaFotos.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição Detalhada
            </label>
            <textarea
              rows={4}
              value={formulario.descricao}
              onChange={(e) => aoMudarInput("descricao", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              value={formulario.tags}
              onChange={(e) => aoMudarInput("tags", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Ex: praia, verão, família"
            />
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Ida
              </label>
              <input
                type="date"
                value={formulario.dataIda}
                onChange={(e) => aoMudarInput("dataIda", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Volta
              </label>
              <input
                type="date"
                value={formulario.dataVolta}
                onChange={(e) => aoMudarInput("dataVolta", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end pt-6 border-t border-gray-200 gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={aoSalvar}
              className={`px-6 py-3 text-white rounded-lg font-bold shadow-md transition-colors ${
                modoEdicao
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {modoEdicao ? "Salvar Alterações" : "Cadastrar Viagem"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
