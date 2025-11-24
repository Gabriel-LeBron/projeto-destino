import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/paths';

// Autor: Gabriel Santos Pereira
// Data: 2024
// Tela de Busca de Viagens - Projeto Destino

// Dados mockados para busca
const todasViagens = [
  {
    id: 1,
    nome: 'Pacote Premium Fernando de Noronha',
    descricao: '7 dias nas ilhas paradisíacas de Pernambuco',
    valor: 2500.00,
    destino: 'Fernando de Noronha, PE',
    tipo: 'praia',
    promocional: true,
    dataProxima: '2024-03-15',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    itens: ['Hospedagem 5 estrelas', 'Café da manhã', 'Passeio de barco']
  },
  {
    id: 2,
    nome: 'Rio de Janeiro - Passeio Completo',
    descricao: '5 dias na cidade maravilhosa',
    valor: 1200.00,
    destino: 'Rio de Janeiro, RJ',
    tipo: 'cidade',
    promocional: false,
    dataProxima: '2024-04-10',
    imagem: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    itens: ['Hotel 4 estrelas', 'City tour', 'Cristo Redentor']
  },
  {
    id: 3,
    nome: 'Gramado - Natal Luz',
    descricao: 'Experiência de Natal na Serra Gaúcha',
    valor: 1800.00,
    destino: 'Gramado, RS',
    tipo: 'montanha',
    promocional: true,
    dataProxima: '2024-12-01',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    itens: ['Hotel temático', 'Café colonial', 'Natal Luz']
  },
  {
    id: 4,
    nome: 'Bonito - MS - Ecoturismo',
    descricao: 'Aventura nas águas cristalinas do Mato Grosso do Sul',
    valor: 2200.00,
    destino: 'Bonito, MS',
    tipo: 'trilha',
    promocional: false,
    dataProxima: '2024-05-20',
    imagem: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1456&q=80',
    itens: ['Pousada ecológica', 'Gruta do Lago Azul', 'Flutuação']
  },
  {
    id: 5,
    nome: 'Praia dos Carneiros - Pernambuco',
    descricao: 'Fim de semana nas piscinas naturais',
    valor: 800.00,
    destino: 'Tamandaré, PE',
    tipo: 'praia',
    promocional: true,
    dataProxima: '2024-02-28',
    imagem: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    itens: ['Pousada à beira-mar', 'Passeio de catamarã', 'Almoço incluído']
  },
  {
    id: 6,
    nome: 'Chapada Diamantina - Bahia',
    descricao: 'Trilhas e cachoeiras no coração da Bahia',
    valor: 1500.00,
    destino: 'Lençóis, BA',
    tipo: 'trilha',
    promocional: false,
    dataProxima: '2024-06-15',
    imagem: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1455&q=80',
    itens: ['Guia especializado', 'Hospedagem rústica', 'Todas as trilhas']
  }
];

// Destinos mais buscados
const destinosMaisBuscados = [
  'Fernando de Noronha',
  'Rio de Janeiro', 
  'Gramado',
  'Bonito',
  'Porto de Galinhas',
  'Jericoacoara',
  'Chapada Diamantina',
  'Florianópolis'
];

export default function BuscarViagens() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [termoBusca, setTermoBusca] = useState('');
  const [viagensFiltradas, setViagensFiltradas] = useState(todasViagens);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [faixaPreco, setFaixaPreco] = useState('todas');

  // Effect para capturar busca da navbar
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    
    if (query) {
      setTermoBusca(query);
      realizarBusca(query);
    }
  }, [location.search]);

  // Função de busca
  const realizarBusca = (termo: string) => {
    if (!termo.trim()) {
      setViagensFiltradas(todasViagens);
      return;
    }

    const termoLower = termo.toLowerCase();
    const resultados = todasViagens.filter(viagem =>
      viagem.nome.toLowerCase().includes(termoLower) ||
      viagem.destino.toLowerCase().includes(termoLower) ||
      viagem.tipo.toLowerCase().includes(termoLower) ||
      viagem.descricao.toLowerCase().includes(termoLower)
    );

    setViagensFiltradas(resultados);
  };

  // Aplicar filtros
  const aplicarFiltros = () => {
    let resultados = todasViagens;

    // Filtro por tipo
    if (filtroAtivo === 'promocionais') {
      resultados = resultados.filter(viagem => viagem.promocional);
    } else if (filtroAtivo === 'proximas') {
      const hoje = new Date();
      resultados = resultados.filter(viagem => {
        const dataViagem = new Date(viagem.dataProxima);
        return dataViagem >= hoje;
      });
    }

    // Filtro por faixa de preço
    if (faixaPreco === 'ate-1000') {
      resultados = resultados.filter(viagem => viagem.valor <= 1000);
    } else if (faixaPreco === '1000-2000') {
      resultados = resultados.filter(viagem => viagem.valor > 1000 && viagem.valor <= 2000);
    } else if (faixaPreco === 'acima-2000') {
      resultados = resultados.filter(viagem => viagem.valor > 2000);
    }

    // Aplica busca se houver termo
    if (termoBusca.trim()) {
      const termoLower = termoBusca.toLowerCase();
      resultados = resultados.filter(viagem =>
        viagem.nome.toLowerCase().includes(termoLower) ||
        viagem.destino.toLowerCase().includes(termoLower) ||
        viagem.tipo.toLowerCase().includes(termoLower)
      );
    }

    setViagensFiltradas(resultados);
  };

  // Efeito para aplicar filtros quando mudam
  useEffect(() => {
    aplicarFiltros();
  }, [filtroAtivo, faixaPreco, termoBusca]);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    realizarBusca(termoBusca);
  };

  const handleVisualizar = (viagemId: number) => {
    navigate(ROUTES.PRODUCT);
  };

  const handleFiltroRapido = (destino: string) => {
    setTermoBusca(destino);
    realizarBusca(destino);
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar de Filtros */}
      <div className="w-80 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Logo</h1>
        </div>

        <nav className="p-6">

          {/* Filtros de Busca */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filtros de Busca</h2>
            
            {/* Tópicos de Filtro */}
            <div className="space-y-2 mb-6">
              <button
                onClick={() => setFiltroAtivo('todos')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  filtroAtivo === 'todos'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🌟 Todos os Destinos
              </button>

              <button
                onClick={() => setFiltroAtivo('promocionais')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  filtroAtivo === 'promocionais'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                💰 Preços Promocionais
              </button>

              <button
                onClick={() => setFiltroAtivo('proximas')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  filtroAtivo === 'proximas'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📅 Viagens Próximas
              </button>
            </div>

            {/* Faixa de Preço */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Faixa de Preço</h3>
              <select
                value={faixaPreco}
                onChange={(e) => setFaixaPreco(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todas">Todas as faixas</option>
                <option value="ate-1000">Até R$ 1.000</option>
                <option value="1000-2000">R$ 1.000 - R$ 2.000</option>
                <option value="acima-2000">Acima de R$ 2.000</option>
              </select>
            </div>

            {/* Destinos Mais Buscados */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">🏆 Destinos Mais Buscados</h3>
              <div className="space-y-2">
                {destinosMaisBuscados.map((destino, index) => (
                  <button
                    key={index}
                    onClick={() => handleFiltroRapido(destino)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    {destino}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        
        {/* Barra de Busca */}
        <div className="mb-8">
          <form onSubmit={handleBuscar} className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Buscar por destino, cidade, estado ou tipo de viagem..."
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button type="submit" className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Resultados da Busca */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {termoBusca ? `Resultados para "${termoBusca}"` : 'Todos os Destinos'}
            </h1>
            <p className="text-gray-600 mt-1">
              {viagensFiltradas.length} viagem{viagensFiltradas.length !== 1 ? 's' : ''} encontrada{viagensFiltradas.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Filtros Ativos */}
          <div className="flex items-center space-x-2">
            {(filtroAtivo !== 'todos' || faixaPreco !== 'todas') && (
              <button
                onClick={() => {
                  setFiltroAtivo('todos');
                  setFaixaPreco('todas');
                  setTermoBusca('');
                }}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {viagensFiltradas.map((viagem) => (
            <div
              key={viagem.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Imagem do Destino */}
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img
                  src={viagem.imagem}
                  alt={viagem.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">
                    {viagem.nome}
                  </h3>
                  <span className="text-sm text-gray-500 capitalize">{viagem.tipo}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{viagem.descricao}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="mr-2">📍</span>
                  {viagem.destino}
                </div>

                {/* Itens Inclusos */}
                <ul className="space-y-1 mb-4">
                  {viagem.itens.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <svg
                        className="w-3 h-3 text-green-500 mr-2 flex-shrink-0"
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

                {/* Botão Visualizar */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleVisualizar(viagem.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Visualizar e Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {viagensFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma viagem encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
              <button
                onClick={() => {
                  setTermoBusca('');
                  setFiltroAtivo('todos');
                  setFaixaPreco('todas');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Limpar Busca
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}