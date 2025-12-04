import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/paths";
import { useSession } from "@/store/sessionStore";

import { FaLink } from "react-icons/fa";
import { HiMiniCamera } from "react-icons/hi2";
import { TbCameraCancel, TbPencilPin, TbPhotoShare } from "react-icons/tb";
import { IoMdPhotos } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";
import { MdCancel, MdOutlineAddPhotoAlternate } from "react-icons/md";

interface FotoAdicional {
  nome: string;
  url: string;
}

export default function RegistrarPacoteFoto() {
  const navigate = useNavigate();
  const { usuario } = useSession();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [nomePacote, setNomePacote] = useState("");
  const [urlPrincipal, setUrlPrincipal] = useState("");

  const [fotosAdicionais, setFotosAdicionais] = useState<FotoAdicional[]>(
    Array(4).fill({ nome: "", url: "" })
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      fetch(`/api/pacote-foto/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario?.accessToken}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setNomePacote(data.nome);
          setUrlPrincipal(data.fotoDoPacote);

          let loadedFotos = [];
          if (data.fotos && data.fotos.length > 0) {
            loadedFotos = data.fotos.map((f: any) => ({
              nome: f.nome,
              url: f.url,
            }));
          }

          while (loadedFotos.length < 4) {
            loadedFotos.push({ nome: "", url: "" });
          }

          setFotosAdicionais(loadedFotos);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleFotoChange = (
    index: number,
    field: keyof FotoAdicional,
    value: string
  ) => {
    const novasFotos = [...fotosAdicionais];
    novasFotos[index] = { ...novasFotos[index], [field]: value };
    setFotosAdicionais(novasFotos);
  };

  const adicionarCampo = () => {
    setFotosAdicionais([...fotosAdicionais, { nome: "", url: "" }]);
  };

  const removerCampo = (index: number) => {
    const novasFotos = fotosAdicionais.filter((_, i) => i !== index);
    setFotosAdicionais(novasFotos);
  };

  const handleSalvar = async () => {
    if (!nomePacote || !urlPrincipal) {
      alert("Nome do pacote e Foto Principal são obrigatórios.");
      return;
    }

    const fotosParaEnviar = fotosAdicionais.filter(
      (f) => f.nome.trim() !== "" && f.url.trim() !== ""
    );

    const payload = {
      nome: nomePacote,
      url: urlPrincipal,
      fotosAdicionais: fotosParaEnviar,
    };

    try {
      const url = isEditing ? `/api/pacote-foto/${id}` : "/api/pacote-foto";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario?.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Salvo com sucesso!");
        navigate(ROUTES.PACOTES_FOTO_LISTA);
      } else {
        alert("Erro ao salvar.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <HiMiniCamera className="text-2xl" />
              <span>
                {isEditing ? "Editar Pacote de Fotos" : "Novo Pacote de Fotos"}
              </span>
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-500 transition-colors shadow-md flex items-center space-x-2"
            >
              <TbCameraCancel className="text-lg" />
              <span>Cancelar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <TbPencilPin className="text-lg" />
                <span>Nome do Pacote</span>
              </label>
              <input
                type="text"
                value={nomePacote}
                onChange={(e) => setNomePacote(e.target.value)}
                placeholder="Ex: Praias do Nordeste"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <FaLink className="text-lg" />
                <span>URL da Foto em Destaque</span>
              </label>
              <input
                type="text"
                value={urlPrincipal}
                onChange={(e) => setUrlPrincipal(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {urlPrincipal && (
            <div className="mb-8">
              <span className="text-xs text-gray-400">
                Prévia da Imagem em Destaque:
              </span>
              <img
                src={urlPrincipal}
                alt="Capa"
                className="h-40 w-full object-cover rounded-md mt-1 bg-gray-100"
              />
            </div>
          )}

          <div className="border-t border-gray-200 my-6"></div>

          <div className="mb-4 flex justify-between items-end">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <IoMdPhotos className="text-lg" />
              <span>Fotos Adicionais</span>
            </h2>
          </div>

          <div className="space-y-4">
            {fotosAdicionais.map((foto, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center space-x-2">
                    <BiSolidPencil className="text-lg" />
                    <span>Nome da Foto Adicional {index + 1}</span>
                  </label>
                  <input
                    type="text"
                    value={foto.nome}
                    onChange={(e) =>
                      handleFotoChange(index, "nome", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="flex-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center space-x-2">
                    <FaLink className="text-lg" />
                    <span>URL da Imagem Adicional {index + 1}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={foto.url}
                    onChange={(e) =>
                      handleFotoChange(index, "url", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <button
                  onClick={() => removerCampo(index)}
                  className="mt-6 text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
                  title="Remover foto"
                >
                  <MdCancel className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={adicionarCampo}
              className="font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 bg-blue-700 hover:bg-blue-500 text-white shadow-md"
            >
              <MdOutlineAddPhotoAlternate className="text-lg" />
              <span>Adicionar mais 1 foto</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSalvar}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <TbPhotoShare className="text-lg" />
              <span>
                {isEditing ? "Salvar Alterações" : "Registrar Pacote de Fotos"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}