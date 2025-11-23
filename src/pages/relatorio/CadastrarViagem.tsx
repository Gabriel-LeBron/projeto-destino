import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



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

const CadastrarViagem: React.FC = () => {
  const navigate = useNavigate();
  const [isEditando, setIsEditando] = useState(false); // true se estiver editando, false se cadastrando
  
  const [formData, setFormData] = useState<PacoteFormData>({
    nome: '',
    valor: 0,
    status: 'ativo',
    descricao: '',
    dataTipo: 'administrador',
    dataIda: '',
    dataVolta: ''
  });

  const handleInputChange = (field: keyof PacoteFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalvar = () => {
    console.log('Salvando pacote:', formData);
    alert(isEditando ? 'Pacote atualizado com sucesso!' : 'Pacote cadastrado com sucesso!');
    navigate(-1); // Volta para a página anterior
  };

  const handleExcluir = () => {
    if (window.confirm('Tem certeza que deseja excluir este pacote?')) {
      console.log('Excluindo pacote:', formData.id);
      alert('Pacote excluído com sucesso!');
      navigate(-1);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Logo</h1>
          
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditando ? 'Editar Pacote' : 'Cadastrar Novo Pacote'}
          </h1>
          <p className="text-gray-600">
            {isEditando ? 'Modifique os dados do pacote de viagem' : 'Preencha os dados para criar um novo pacote de viagem'}
          </p>
        </div>

        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Nome do Pacote</h2>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Digite o nome do pacote"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="number"
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
              placeholder="Descreva o pacote de viagem..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

          
          <div className="border-t border-gray-200 my-6"></div>

          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data do Pacote:</h3>
            
            
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
            <button
              onClick={handleVoltar}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Voltar
            </button>

            <div className="flex space-x-3">
              {isEditando && (
                <button
                  onClick={handleExcluir}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Excluir
                </button>
              )}
              
              <button
                onClick={handleSalvar}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isEditando ? 'Salvar Alterações' : 'Cadastrar Pacote'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarViagem;