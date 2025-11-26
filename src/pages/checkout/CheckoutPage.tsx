import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/paths';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  
  
  const usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
    endereco: 'Rua Exemplo, 123 - São Paulo, SP'
  };

  const pacoteSelecionado = {
    nome: 'Pacote Premium Fernando de Noronha',
    destino: 'Fernando de Noronha, PE',
    data: '15/03/2024 - 22/03/2024',
    viajantes: 2,
    valorTotal: 5000.00
  };

  const [metodoPagamento, setMetodoPagamento] = useState('cartao-credito');
  const [parcelas, setParcelas] = useState(1);

  const finalizarCompra = () => {
    if (metodoPagamento === 'pix') {
      
      alert('QR Code PIX enviado para seu email! Verifique sua caixa de entrada.');
    }
    
    
    navigate(ROUTES.CONFIRMACAO, {
      state: {
        numeroPedido: 'PED' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        pacote: pacoteSelecionado.nome,
        valor: metodoPagamento === 'pix' ? valorComDescontoPix : pacoteSelecionado.valorTotal,
        metodoPagamento: metodoPagamento === 'cartao-credito' ? 'Cartão de Crédito' : 
                        metodoPagamento === 'cartao-debito' ? 'Cartão de Débito' : 'PIX'
      }
    });
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  
  const calcularDescontoPix = () => {
    return pacoteSelecionado.valorTotal * 0.05;
  };

  const valorComDescontoPix = pacoteSelecionado.valorTotal - calcularDescontoPix();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
            ← Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Confirmar Compra</h1>
          <p className="text-gray-600 mt-2">Revise os dados e confirme sua reserva</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          
          <div className="lg:col-span-2 space-y-6">
            
            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">👤 Suas Informações</h2>
              <div className="space-y-2">
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Endereço:</strong> {usuario.endereco}</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Alterar dados do perfil
                </button>
              </div>
            </div>

            
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">💳 Forma de Pagamento</h2>
              
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Selecione como deseja pagar:
                </label>
                <select
                  value={metodoPagamento}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cartao-credito">💳 Cartão de Crédito</option>
                  <option value="cartao-debito">💳 Cartão de Débito</option>
                  <option value="pix">🧾 PIX</option>
                </select>
              </div>

              
              {metodoPagamento === 'cartao-credito' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cartão Salvo
                    </label>
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💳</span>
                        <div>
                          <p className="font-semibold">Cartão terminado em 4321</p>
                          <p className="text-sm text-gray-600">Visa • Válido até 12/2025</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Alterar
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcelas
                    </label>
                    <select
                      value={parcelas}
                      onChange={(e) => setParcelas(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                        <option key={num} value={num}>
                          {num}x de {formatarValor(pacoteSelecionado.valorTotal / num)}
                          {num > 1 ? ' sem juros' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              
              {metodoPagamento === 'cartao-debito' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">💳</span>
                      <div>
                        <p className="font-semibold text-blue-800">Pagamento à vista</p>
                        <p className="text-sm text-blue-600">O valor será debitado instantaneamente</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cartão Salvo
                    </label>
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💳</span>
                        <div>
                          <p className="font-semibold">Cartão terminado em 5678</p>
                          <p className="text-sm text-gray-600">Mastercard • Débito</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Alterar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              
              {metodoPagamento === 'pix' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🧾</span>
                      <div>
                        <p className="font-semibold text-green-800">5% de desconto no PIX!</p>
                        <p className="text-sm text-green-600">Pagamento instantâneo e seguro</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-4xl mb-4">🧾</div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {formatarValor(valorComDescontoPix)}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Economize {formatarValor(calcularDescontoPix())} com PIX
                    </p>
                    <p className="text-xs text-gray-500">
                      O QR Code será enviado para seu email após confirmação
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Como funciona:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Confirme a compra para receber o QR Code PIX por email</li>
                      <li>• Use seu app bancário para escanear o código</li>
                      <li>• Pagamento confirmado instantaneamente</li>
                      <li>• Receba a confirmação da viagem por email</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            
            <button
              onClick={finalizarCompra}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 shadow-lg"
            >
              {metodoPagamento === 'pix' ? (
                <>✅ Pagar com PIX - {formatarValor(valorComDescontoPix)}</>
              ) : (
                <>✅ Confirmar Compra - {formatarValor(pacoteSelecionado.valorTotal)}</>
              )}
            </button>
          </div>

          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📦 Resumo</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Pacote:</span>
                  <span className="font-semibold text-sm text-right">{pacoteSelecionado.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span>Viajantes:</span>
                  <span>{pacoteSelecionado.viajantes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data:</span>
                  <span>{pacoteSelecionado.data}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {metodoPagamento === 'pix' && (
                  <>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal:</span>
                      <span>{formatarValor(pacoteSelecionado.valorTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 mb-2">
                      <span>Desconto PIX (5%):</span>
                      <span>-{formatarValor(calcularDescontoPix())}</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    {metodoPagamento === 'pix' 
                      ? formatarValor(valorComDescontoPix) 
                      : formatarValor(pacoteSelecionado.valorTotal)
                    }
                  </span>
                </div>

                {metodoPagamento === 'cartao-credito' && parcelas > 1 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {parcelas}x de {formatarValor(pacoteSelecionado.valorTotal / parcelas)}
                  </p>
                )}
              </div>
            </div>

            
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                <span className="mr-2">🔒</span>
                Compra 100% Segura
              </h3>
              <p className="text-blue-700 text-sm">
                Seus dados estão protegidos com criptografia SSL. 
                Ambiente seguro e certificado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;