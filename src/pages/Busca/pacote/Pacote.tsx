import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/paths";
import placeholder from "/placeholder.jpg";
import { FaTreeCity } from "react-icons/fa6";
import { FaCalendarAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { MdAirplaneTicket, MdOutlineAirplanemodeActive } from "react-icons/md";

interface Foto {
 id: number;
 url: string;
 nome: string;
}

interface PacoteDetalhes {
 id: number;
 nome: string;
 preco: number;
 descricao: string;
 inicio: string;
 fim: string;
 disponibilidade: number;
 tags: string[];
 hotel: {
  nome: string;
  diaria: number;
  cidade: {
   nome: string;
   estado: { sigla: string };
  };
 };
 transporte: {
  empresa: string;
  meio: string;
 };
 fotosDoPacote: {
  fotoDoPacote: string;
  fotos: Foto[];
 };
}

export default function Pacote() {
 const { id } = useParams<{ id: string }>();
 const navigate = useNavigate();

 const [pacote, setPacote] = useState<PacoteDetalhes | null>(null);
 const [loading, setLoading] = useState(true);
 const [imagemSelecionada, setImagemSelecionada] = useState<string>("");
 const [numeroPessoas, setNumeroPessoas] = useState<number>(1);
 const [modalAberto, setModalAberto] = useState(false);

 // Busca os dados do pacote
 useEffect(() => {
  if (id) {
   fetch(`/api/publico/pacote/${id}`)
    .then((res) => {
     if (!res.ok) throw new Error("Pacote não encontrado");
     return res.json();
    })
    .then((data) => {
     setPacote(data);
     if (data.fotosDoPacote || data.fotosDoPacote != "") {
      setImagemSelecionada(data.fotosDoPacote.fotoDoPacote);
     }
     setLoading(false);
    })
    .catch((err) => {
     console.error(err);
     setLoading(false);
    });
  }
 }, [id]);

 // Cálculos e Formatações
 const calcularPrecoTotal = () => {
  if (!pacote) return 0;
  return pacote.preco * numeroPessoas;
 };

 const formatarPreco = (preco: number) => {
  return preco.toLocaleString("pt-BR", {
   style: "currency",
   currency: "BRL",
  });
 };

 const formatarData = (dataIso: string) => {
  const [ano, mes, dia] = dataIso.split("-"); // yyyy-MM-dd
  return `${dia}/${mes}/${ano}`;
 };

 const handleComprar = () => {
  navigate(ROUTES.CHECKOUT, { state: { pacote } });
 };

 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-xl text-gray-600 animate-pulse">
     Carregando detalhes da viagem...
    </div>
   
   </div>
  );
 }

 if (!pacote) {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
     <h2 className="text-2xl font-bold text-gray-800">
      Pacote não encontrado
     </h2>
     <button
      onClick={() => navigate(-1)}
      className="mt-4 text-blue-600 hover:underline"
     >
      Voltar
     </button>
    </div>
   </div>
  );
 }

 // Monta lista com todas as fotos (Principal + Adicionais)
 const todasFotos = [
  { id: -1, url: pacote.fotosDoPacote?.fotoDoPacote, nome: "Principal" },
  ...(pacote.fotosDoPacote?.fotos || []),
 ].filter((f) => f.url); // Filtra vazios

 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Breadcrumb */}
    <nav className="flex mb-8" aria-label="Breadcrumb">
     <ol className="flex items-center space-x-4 text-sm">
      <li>
       <Link
        to={ROUTES.LANDINGPAGE}
        className="text-gray-400 hover:text-gray-500"
       >
        Início
       </Link>
      </li>
      <li>
       <span className="text-gray-300">/</span>
      </li>
      <li>
       <Link
        to={ROUTES.BUSCAR_PACOTES}
        className="text-gray-400 hover:text-gray-500"
       >
        Busca
       </Link>
      </li>
      <li>
       <span className="text-gray-300">/</span>
      </li>
      <li>
       <span className="text-gray-600 font-medium truncate max-w-[200px]">
        {pacote.nome}
       </span>
      </li>
     </ol>
    </nav>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {/* --- SEÇÃO DE IMAGENS (GALERIA) --- */}
      <div className="space-y-4">
       {/* Imagem Principal Grande */}
       <div
        className="aspect-w-16 aspect-h-12 bg-gray-100 rounded-xl overflow-hidden cursor-zoom-in group relative"
        onClick={() => setModalAberto(true)}
       >
        <img
         src={
          imagemSelecionada != "" ? imagemSelecionada : placeholder
         }
         alt={pacote.nome}
         className="w-full h-96 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
         <span className="text-white opacity-0 group-hover:opacity-100 font-medium bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
          Ver em tela cheia
         </span>
        </div>
       </div>

       {/* Miniaturas (Slide) */}
       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {todasFotos.map((foto, index) => (
         <button
          key={index}
          onClick={() => setImagemSelecionada(foto.url)}
          className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
           imagemSelecionada === foto.url
            ? "border-blue-500 opacity-100"
            : "border-transparent opacity-70 hover:opacity-100"
          }`}
         >
          <img
           src={foto.url}
           alt={foto.nome}
           className="w-full h-full object-cover"
          />
         </button>
        ))}
       </div>
      </div>

      {/* --- SEÇÃO DE DETALHES --- */}
      <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
         {pacote.nome}
        </h1>

        {/* Informações do Pacote (Localização, Data, Transporte) */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
         <div className="flex items-center">
          <span className="mr-1">
           <FaTreeCity className="text-xl" />
          </span>
          <span>
           {pacote.hotel?.cidade?.nome} -{" "}
           {pacote.hotel?.cidade?.estado?.sigla}
          </span>
         </div>
         <div className="flex items-center">
          <span className="mr-1">
          <FaCalendarAlt className="text-xl" />
          </span>
          <span>
           {formatarData(pacote.inicio)} até {formatarData(pacote.fim)}
          </span>
         </div>
         <div className="flex items-center">
          <span className="mr-1">
           <MdOutlineAirplanemodeActive className="text-xl" />
          </span>
          <span>
           {pacote.transporte?.meio} ({pacote.transporte?.empresa})
          </span>
         </div>
        </div>

        {/* Tags */}
        {pacote.tags && (
         <div className="flex flex-wrap gap-2 mt-3">
          {pacote.tags.map((tag, idx) => (
           <span
            key={idx}
            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide"
           >
            {tag}
           </span>
          ))}
         </div>
        )}
       </div>

       {/* Preço e Pessoas */}
       <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-baseline space-x-2">
         <span className="text-4xl font-bold text-blue-900">
          {formatarPreco(calcularPrecoTotal())}
         </span>
         <span className="text-gray-600 text-sm">
          / total para {numeroPessoas}{" "}
          {numeroPessoas > 1 ? "pessoas" : "pessoa"}
         </span>
        </div>
        {/* Preço Individual com Ícone */}
        <div className="text-sm text-gray-500 mt-1 flex items-center">
         <FaMoneyCheckAlt className="mr-1" />
         Preço individual: {formatarPreco(pacote.preco)}
        </div>
       </div>

       {/* Controle de Pessoas (BOTÕES DESATIVADOS) */}
       <div className="space-y-3">
        <label className="block text-lg font-semibold text-gray-900">
         Quantos viajantes? (Apenas visual)
        </label>
        <div className="flex items-center space-x-3">
         <button
          // onClick removido para desativar a funcionalidade
          disabled={true} // Desativado conforme solicitado
          className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
         >
          -
         </button>
         <span className="w-12 text-center font-bold text-lg">
          {numeroPessoas}
         </span>
         <button
          // onClick removido para desativar a funcionalidade
          disabled={true} // Desativado conforme solicitado
          className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
         >
          +
         </button>
         <span className="text-sm text-gray-500">
          ({pacote.disponibilidade} vagas disponíveis)
         </span>
        </div>
       </div>

       {/* Botão Comprar */}
       <button
        onClick={handleComprar}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform active:scale-95 flex items-center justify-center space-x-2"
       >
        <MdAirplaneTicket className="text-2xl" />
        <span>Reservar Agora</span>
       </button>

       {/* Descrição Curta */}
       <div className="text-gray-700 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2 text-gray-900">Sobre o Pacote</h3>
        <p className="text-sm leading-relaxed">{pacote.descricao}</p>
       </div>
      </div>
     </div>

     {/* Detalhes Inferiores */}
     <div className="border-t border-gray-200 px-8 py-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">
         Hospedagem
        </h3>
        <div className="bg-white p-4 rounded-lg border">
         <p className="font-semibold text-blue-800">
          {pacote.hotel?.nome}
         </p>
         <p className="text-gray-600 text-sm">
          Diária média inclusa: R$ {pacote.hotel?.diaria}
         </p>
         <p className="text-gray-500 text-sm mt-1">
          {pacote.hotel?.cidade?.nome},{" "}
          {pacote.hotel?.cidade?.estado?.sigla}
         </p>
        </div>
       </div>
       <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">
         Transporte Incluso
        </h3>
        <div className="bg-white p-4 rounded-lg border">
         <p className="font-semibold text-blue-800">
          {pacote.transporte?.empresa}
         </p>
         <p className="text-gray-600 text-sm">
          Tipo: {pacote.transporte?.meio}
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* --- MODAL LIGHTBOX (Tela Cheia) --- */}
   {modalAberto && (
    <div
     className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
     onClick={() => setModalAberto(false)}
    >
     <button
      className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 focus:outline-none"
      onClick={() => setModalAberto(false)}
     >
      &times;
     </button>
     <img
      src={imagemSelecionada}
      alt="Tela cheia"
      className="max-w-full max-h-full rounded-lg shadow-2xl"
      onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar na imagem
     />

     {/* Navegação no Modal */}
     <div
      className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto"
      onClick={(e) => e.stopPropagation()}
     >
      {todasFotos.map((foto, index) => (
       <img
        key={index}
        src={foto.url}
        onClick={() => setImagemSelecionada(foto.url)}
        className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
         imagemSelecionada === foto.url
          ? "border-white"
          : "border-transparent opacity-50"
        }`}
       />
      ))}
     </div>
    </div>
   )}
  </div>
 );
}