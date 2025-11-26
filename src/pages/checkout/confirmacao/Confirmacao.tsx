import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/paths';

const ConfirmacaoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tempoRestante, setTempoRestante] = useState(5);

  
  const dadosCompra = location.state || {
    numeroPedido: 'PED' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    pacote: 'Pacote Premium Fernando de Noronha',
    valor: 5000.00,
    metodoPagamento: 'PIX',
    data: new Date().toLocaleDateString('pt-BR')
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`${ROUTES.VIAGEM}/visualizar`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const irParaMinhasViagens = () => {
    navigate(`${ROUTES.VIAGEM}/visualizar`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Sua viagem foi reservada com sucesso. Em breve você receberá um email com todos os detalhes.
          </p>

          {dadosCompra.metodoPagamento === 'PIX' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-700 text-sm">
                ✅ QR Code PIX enviado para seu email!
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Número do Pedido:</span>
                <span className="font-semibold">{dadosCompra.numeroPedido}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pacote:</span>
                <span className="font-semibold text-right">{dadosCompra.pacote}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-semibold text-green-600">{formatarValor(dadosCompra.valor)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método:</span>
                <span className="font-semibold">{dadosCompra.metodoPagamento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-semibold">{dadosCompra.data}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-700 text-sm">
              Redirecionando para suas viagens em <span className="font-bold">{tempoRestante}</span> segundos...
            </p>
          </div>

          <button
            onClick={irParaMinhasViagens}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Minhas Viagens Agora
          </button>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => window.print()}
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir
            </button>
            
            <button
              onClick={() => navigate(ROUTES.CONTATO)}
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ajuda
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Obrigado por escolher a Destino! 🌴
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoPage;