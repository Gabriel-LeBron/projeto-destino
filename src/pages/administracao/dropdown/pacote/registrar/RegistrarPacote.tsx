import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "@/store/sessionStore";

import { FaMapMarkedAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { FaHotel, FaTruckPlane, FaTags } from "react-icons/fa6";
import { TbPencilPin, TbCalendarUp, TbCalendarRepeat } from "react-icons/tb";
import { MdDiversity3, MdDescription } from "react-icons/md";
import { HiMiniCamera } from "react-icons/hi2";
import { LuPackageX, LuPackagePlus } from "react-icons/lu";

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
  const { id } = useParams<{ id: string }>();

  const [listaHoteis, setListaHoteis] = useState<Hotel[]>([]);
  const [listaTransportes, setListaTransportes] = useState<Transporte[]>([]);
  const [listaFotos, setListaFotos] = useState<PacoteFoto[]>([]);

  const [carregando, setCarregando] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);

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

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      if (!usuario?.accessToken) return;

      setCarregando(true);
      try {
        await buscarListasAuxiliares();

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

    setFormulario({
      nome: dadosPacote.nome,
      valor: dadosPacote.preco,
      descricao: dadosPacote.descricao,
      dataIda: dadosPacote.inicio,
      dataVolta: dadosPacote.fim,
      disponibilidade: dadosPacote.disponibilidade,
      tags: Array.isArray(dadosPacote.tags) ? dadosPacote.tags.join(", ") : "",

      hotelId: dadosPacote.hotel?.id || "",
      transporteId: dadosPacote.transporte?.id || "",
      pacoteFotoId: dadosPacote.fotosDoPacote?.id || "",
    });
  };

  const aoMudarInput = (campo: keyof DadosFormulario, valor: any) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const aoSalvar = async () => {
    if (
      !formulario.nome.trim() ||
      !formulario.hotelId ||
      !formulario.transporteId
    ) {
      alert("Por favor, preencha Nome, Hotel, Transporte e Pacote de Fotos.");
      return;
    }

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
      hotel: Number(formulario.hotelId),
      transporte: Number(formulario.transporteId),
      pacoteFoto: Number(formulario.pacoteFotoId),
      funcionario: usuario?.id,
    };

    const url = modoEdicao ? `/api/pacote/${id}` : "/api/pacote";
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
        navigate(-1);
      } else {
        const erroMsg = await response.text();
        alert(`Erro ao salvar: ${erroMsg}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-6 border-b border-gray-100 pb-4">
            {/* Título - Alinhado */}
            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <FaMapMarkedAlt className="text-xl" />
              <span>{modoEdicao ? "Editar Pacote" : "Adicionar Pacote"}</span>
            </h1>
          </div>

          {/* Nome */}
          <div className="mb-6">
            {/* Label - Alinhado */}
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
              <TbPencilPin className="text-lg" />
              <span>Nome do Pacote</span>
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
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <FaMoneyCheckAlt className="text-lg" />
                <span>Preço Total (R$)</span>
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
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <MdDiversity3 className="text-lg" />
                <span>Vagas Disponíveis</span>
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
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <FaHotel className="text-lg" />
                <span>Hotel</span>
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
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <FaTruckPlane className="text-lg" />
                <span>Transporte</span>
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
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <HiMiniCamera className="text-lg" />
                <span>Fotos Promocionais</span>
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
            {/* Label - Alinhado */}
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
              <MdDescription className="text-lg" />
              <span>Descrição Detalhada</span>
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
            {/* Label - Alinhado */}
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
              <FaTags className="text-lg" />
              <span>Tags (separação por VÍRGULA)</span>
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
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <TbCalendarUp className="text-lg" />
                <span>Data de Ida</span>
              </label>
              <input
                type="date"
                value={formulario.dataIda}
                onChange={(e) => aoMudarInput("dataIda", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              {/* Label - Alinhado */}
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <TbCalendarRepeat className="text-lg" />
                <span>Data de Volta</span>
              </label>
              <input
                type="date"
                value={formulario.dataVolta}
                onChange={(e) => aoMudarInput("dataVolta", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200 gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold shadow-md transition-colors hover:bg-red-500 flex items-center space-x-1"
            >
              <LuPackageX className="text-lg" />
              <span>Cancelar</span>
            </button>
            <button
              onClick={aoSalvar}
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-bold shadow-md transition-colors hover:bg-blue-500 flex items-center space-x-1"
            >
              <LuPackagePlus className="text-lg" />
              <span>
                {modoEdicao ? "Salvar Alterações" : "Cadastrar Pacote"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
