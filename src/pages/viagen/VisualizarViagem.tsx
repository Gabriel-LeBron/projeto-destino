import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/paths';

// Dados mockados da viagem (padrão para todas as visualizações)
const viagemDetalhada = {
  id: '1',
  nome: 'Pacote Premium Fernando de Noronha',
  descricao: 'Experiência única nas ilhas paradisíacas de Fernando de Noronha',
  valor: 2500.00,
  status: 'confirmada',
  dataPartida: '2024-03-15',
  dataRetorno: '2024-03-22',
  dataCompra: '2024-01-10',
  numeroReserva: 'RES2024001',
  imagemPrincipal: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  galeria: [
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1455&q=80',
    'https://images.unsplash.com/photo-1591824438703-2dbb2efc2c78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1456&q=80'
  ],
  inclusoes: [
    'Hospedagem em resort 5 estrelas por 7 noites',
    'Café da manhã buffet incluído',
    'Transfer aeroporto-hotel-aeroporto',
    'Passeio de barco pelas ilhas',
    'Guia turístico especializado',
    'Seguro viagem',
    'Snorkeling com equipamento',
    'Trilha ecológica guiada'
  ],
  informacoesImportantes: [
    'Check-in: 14h | Check-out: 12h',
    'Documentação: RG ou CNH original',
    'Vacina: Certificado de vacinação obrigatório',
    'Bagagem: 23kg por pessoa',
    'Cancelamento: Consulte políticas'
  ],
  contatoEmergencia: {
    telefone: '+55 (81) 99999-9999',
    email: 'suporte@noronhatours.com'
  }
};

const VisualizarViagem: React.FC = () => {
  const navigate = useNavigate();
  const [imagemSelecionada, setImagemSelecionada] = React.useState(viagemDetalhada.imagemPrincipal);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <button
              onClick={handleVoltar}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para Minhas Viagens
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{viagemDetalhada.nome}</h1>
            <p className="text-gray-600 mt-2">{viagemDetalhada.descricao}</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleImprimir}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir
            </button>
          </div>
        </div>

        
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <img
              src={imagemSelecionada}
              alt={viagemDetalhada.nome}
              className="w-full h-96 object-cover"
            />
          </div>
          
          
          <div className="grid grid-cols-4 gap-4 mt-4">
            <button
              onClick={() => setImagemSelecionada(viagemDetalhada.imagemPrincipal)}
              className={`aspect-video rounded-lg overflow-hidden border-2 ${
                imagemSelecionada === viagemDetalhada.imagemPrincipal 
                  ? 'border-blue-500' 
                  : 'border-gray-200'
              }`}
            >
              <img
                src={viagemDetalhada.imagemPrincipal}
                alt="Imagem principal"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </button>
            
            {viagemDetalhada.galeria.map((imagem, index) => (
              <button
                key={index}
                onClick={() => setImagemSelecionada(imagem)}
                className={`aspect-video rounded-lg overflow-hidden border-2 ${
                  imagemSelecionada === imagem 
                    ? 'border-blue-500' 
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={imagem}
                  alt={`Galeria ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          
          <div className="lg:col-span-2 space-y-6">
            
            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📅</span>
                Informações da Viagem
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">✈️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data de Partida</h3>
                    <p className="text-lg font-semibold text-gray-900">{formatarData(viagemDetalhada.dataPartida)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">🏠</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data de Retorno</h3>
                    <p className="text-lg font-semibold text-gray-900">{formatarData(viagemDetalhada.dataRetorno)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">🛒</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data da Compra</h3>
                    <p className="text-lg font-semibold text-gray-900">{formatarData(viagemDetalhada.dataCompra)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600">📋</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Número da Reserva</h3>
                    <p className="text-lg font-semibold text-blue-600">{viagemDetalhada.numeroReserva}</p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">✅</span>
                O que está incluso na sua viagem
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {viagemDetalhada.inclusoes.map((inclusao, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{inclusao}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Informações Importantes
              </h2>
              
              <div className="space-y-3">
                {viagemDetalhada.informacoesImportantes.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <span className="text-gray-700 font-medium">{info}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="space-y-6">
            
            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Status da Reserva
              </h2>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl mb-2">✅</div>
                  <h3 className="text-lg font-bold text-green-800">Reserva Confirmada</h3>
                  <p className="text-green-600 text-sm">Sua viagem está garantida!</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Valor Total</h3>
                  <p className="text-3xl font-bold text-blue-600">{formatarValor(viagemDetalhada.valor)}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Forma de Pagamento</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💳</span>
                    <p className="text-gray-900 font-medium">Cartão de Crédito - 3x sem juros</p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📞</span>
                Contato de Emergência
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">📱</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                    <p className="text-gray-900 font-medium">{viagemDetalhada.contatoEmergencia.telefone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-900 font-medium">{viagemDetalhada.contatoEmergencia.email}</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Disponível 24h para emergências durante sua viagem
                  </p>
                </div>
              </div>
            </div>

            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="mr-2">🤝</span>
                Precisa de Ajuda?
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                Tem dúvidas sobre sua reserva ou precisa de assistência durante a viagem?
              </p>
              <button
                onClick={() => navigate(ROUTES.CONTATO)}
                className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Falar com Suporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizarViagem;