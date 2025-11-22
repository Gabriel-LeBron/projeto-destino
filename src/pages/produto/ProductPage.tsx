import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [numeroPessoas, setNumeroPessoas] = useState<number>(1);
  
  // Dados no Hardcode mesmo depois é só substituir por API call
  const produto = {
    id: id || '1',
    nome: 'Pacote Premium Fernando de Noronha',
    preco: 2500.00,
    descricao: 'Experiência única nas ilhas paradisíacas de Fernando de Noronha',
    descricaoCompleta: 'Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inclusoes: [
      'Hospedagem em resort 5 estrelas',
      'Café da manhã buffet',
      'Transfer aeroporto-hotel-aeroporto',
      'Passeio de barco pelas ilhas',
      'Guia turístico especializado',
      'Seguro viagem'
    ],
    duracao: 7,
    destino: 'Fernando de Noronha, PE',
    disponivel: true,
    tags: ['praia', 'luxo', 'natureza'],
    galeria: [],
    restricoes: [],
    dataPartida: new Date('2024-03-15'),
    dataRetorno: new Date('2024-03-22')
  };

  const calcularPrecoTotal = () => {
    return produto.preco * numeroPessoas;
  };

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleComprar = () => {
    alert(`Compra realizada para ${numeroPessoas} pessoa(s)! Total: ${formatarPreco(calcularPrecoTotal())}`);
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link 
                to="/relatorio/viagens-cadastradas" 
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                Viagens
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-600 font-medium">{produto.destino}</span>
            </li>
            {!id && (
              <>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <span className="text-yellow-600 font-medium">(Modo Demonstração)</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
              
              
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-square bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>

            
            <div className="space-y-6">
              
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {produto.nome}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-600">{produto.destino}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-lg text-gray-600">{produto.duracao} dias</span>
                </div>
              </div>

              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatarPreco(calcularPrecoTotal())}
                  </span>
                  <span className="text-gray-600 text-lg">
                    {numeroPessoas > 1 ? `para ${numeroPessoas} pessoas` : 'por pessoa'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Preço base: {formatarPreco(produto.preco)} por pessoa
                </div>
              </div>

              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">O pacote inclui:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {produto.inclusoes.map((inclusao, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{inclusao}</span>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div className="space-y-3">
                <label htmlFor="pessoas" className="block text-lg font-semibold text-gray-900">
                  Número de Pessoas
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setNumeroPessoas(prev => Math.max(1, prev - 1))}
                    disabled={numeroPessoas <= 1}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="text-lg font-semibold">-</span>
                  </button>
                  
                  <input
                    id="pessoas"
                    type="number"
                    min="1"
                    max="10"
                    value={numeroPessoas}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 1 && value <= 10) {
                        setNumeroPessoas(value);
                      }
                    }}
                    className="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <button
                    onClick={() => setNumeroPessoas(prev => Math.min(10, prev + 1))}
                    disabled={numeroPessoas >= 10}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="text-lg font-semibold">+</span>
                  </button>
                  
                  <span className="text-gray-600 ml-2">
                    {numeroPessoas === 1 ? 'pessoa' : 'pessoas'}
                  </span>
                </div>
                
                
                {numeroPessoas >= 8 && (
                  <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-lg mt-2">
                    ⚠️ Limite máximo de 10 pessoas por reserva
                  </div>
                )}
              </div>

              
              <button
                onClick={handleComprar}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Comprar Agora
              </button>

            </div>
          </div>

          
          <div className="border-t border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre esta viagem</h2>
            <p className="text-gray-700 leading-relaxed">
              {produto.descricaoCompleta}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;