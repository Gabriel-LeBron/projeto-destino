import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PacoteFormData {
  id?: string;
  nome: string;
  valor: number;
  status: 'ativo' | 'inativo';
  descricao: string;
  dataTipo: 'cliente' | 'administrador';
  dataIda: string;
  dataVolta: string;
}

// Dados mockados para simular uma viagem sendo editada
const viagemPadraoParaEdicao: PacoteFormData = {
  id: '1',
  nome: 'Pacote Premium Fernando de Noronha',
  valor: 2500.00,
  status: 'ativo',
  descricao: 'Experiência única nas ilhas paradisíacas de Fernando de Noronha com hospedagem em resort 5 estrelas, café da manhã buffet, transfer aeroporto-hotel-aeroporto, passeio de barco pelas ilhas, guia turístico especializado e seguro viagem.',
  dataTipo: 'administrador',
  dataIda: '2024-03-15',
  dataVolta: '2024-03-22'
};

const CadastrarViagem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const [isEditando, setIsEditando] = useState(false);
  const [formData, setFormData] = useState<PacoteFormData>({
    nome: '',
    valor: 0,
    status: 'ativo',
    descricao: '',
    dataTipo: 'administrador',
    dataIda: '',
    dataVolta: ''
  });

  
  useEffect(() => {
    
    const veioParaEditar = location.state?.editar === true;
    
    if (veioParaEditar) {
      
      setFormData(viagemPadraoParaEdicao);
      setIsEditando(true);
      console.log('Modo Edição - Dados carregados');
    } else {
      
      setIsEditando(false);
      setFormData({
        nome: '',
        valor: 0,
        status: 'ativo',
        descricao: '',
        dataTipo: 'administrador',
        dataIda: '',
        dataVolta: ''
      });
      console.log('Modo Cadastro - Formulário limpo');
    }
  }, [location.state]);

  const handleInputChange = (field: keyof PacoteFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalvar = () => {
    
    if (!formData.nome.trim()) {
      alert('Por favor, informe o nome do pacote');
      return;
    }

    if (formData.valor <= 0) {
      alert('Por favor, informe um valor válido');
      return;
    }

    if (isEditando) {
      console.log('Atualizando viagem:', formData);
      alert(`Viagem "${formData.nome}" atualizada com sucesso!`);
    } else {
      console.log('Criando nova viagem:', formData);
      alert(`Viagem "${formData.nome}" cadastrada com sucesso!`);
    }
    
    navigate(-1);
  };

  const handleExcluir = () => {
    if (window.confirm(`Tem certeza que deseja excluir a viagem "${formData.nome}"?`)) {
      console.log('Excluindo viagem:', formData.id);
      alert('Viagem excluída com sucesso!');
      navigate(-1);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleLimpar = () => {
    setFormData({
      nome: '',
      valor: 0,
      status: 'ativo',
      descricao: '',
      dataTipo: 'administrador',
      dataIda: '',
      dataVolta: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Logo</h1>
          <div className="flex items-center space-x-4">
            {/* Indicador visual do modo */}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isEditando 
                ? 'bg-orange-100 text-black-800 border border-black-200' 
                : 'bg-blue-100 text-black-800 border border-black-200'
            }`}>
              {isEditando ? '✏️ Editando Viagem' : '➕ Nova Viagem'}
            </span>
            
          </div>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditando ? 'Editar Viagem' : 'Cadastrar Nova Viagem'}
          </h1>
          <p className="text-gray-600">
            {isEditando 
              ? `Editando: ${formData.nome}` 
              : 'Preencha os dados para criar uma nova viagem'
            }
          </p>
          {isEditando && (
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Viagem de Exemplo
              </span>
              <span className="text-sm text-gray-500">
                {formData.status === 'ativo' ? '✅ Ativa' : '❌ Inativa'}
              </span>
            </div>
          )}
        </div>

        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Viagem
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Ex: Pacote Premium Fernando de Noronha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as 'ativo' | 'inativo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>

          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva os detalhes da viagem, incluídos, atrações, etc..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

          
          <div className="border-t border-gray-200 my-6"></div>

          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Datas da Viagem:</h3>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="dataTipo"
                  checked={formData.dataTipo === 'cliente'}
                  onChange={() => handleInputChange('dataTipo', 'cliente')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Decidido pelo cliente</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="dataTipo"
                  checked={formData.dataTipo === 'administrador'}
                  onChange={() => handleInputChange('dataTipo', 'administrador')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Decidido pelo Administrador</span>
              </label>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Ida
                </label>
                <input
                  type="date"
                  value={formData.dataIda}
                  onChange={(e) => handleInputChange('dataIda', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Volta
                </label>
                <input
                  type="date"
                  value={formData.dataVolta}
                  onChange={(e) => handleInputChange('dataVolta', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={handleVoltar}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Voltar
              </button>
              
              {!isEditando && (
                <button
                  onClick={handleLimpar}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              {isEditando && (
                <button
                  onClick={handleExcluir}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Excluir Viagem
                </button>
              )}
              
              <button
                onClick={handleSalvar}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isEditando ? 'Salvar Alterações' : 'Cadastrar Viagem'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarViagem;