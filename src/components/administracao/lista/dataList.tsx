import { useNavigate } from "react-router-dom";

interface DataItem {
  id: number;
  [key: string]: any;
}

interface ActionButton<T> {
  name: string;
  colorClass: string;
  icon?: React.ReactNode;
  handler: (id: number, item: T) => void;
}

interface DataListProps<T extends DataItem> {
  loading: boolean;
  pageTitle: string;
  buttonText: string;
  registerPath: string;
  data: T[];
  headers: string[];
  dataKeys: string[];
  renderValue: (item: T, key: string) => React.ReactNode;
  actions: ActionButton<T>[];
}

export default function DataList<T extends DataItem>({
  loading,
  pageTitle,
  buttonText,
  registerPath,
  data,
  headers,
  dataKeys,
  renderValue,
  actions,
}: DataListProps<T>) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <button
          onClick={() => navigate(registerPath)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {buttonText}
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Nenhum dado encontrado.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  {dataKeys.map((key, index) => (
                    <td
                      key={index}
                      className={`px-4 py-2 whitespace-nowrap text-sm ${
                        index === 1
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {renderValue(item, key)}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-1">
                        {actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => action.handler(item.id, item)}
                            className={`${action.colorClass}`} 
                          >
                            {action.icon}
                            {action.name}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}