import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../paths";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dadosPizza1 = [
  { name: "Concluídas", value: 75 },
  { name: "Em Andamento", value: 15 },
  { name: "Canceladas", value: 10 },
];

const dadosPizza2 = [
  { name: "Econômica", value: 45 },
  { name: "Executiva", value: 30 },
  { name: "Primeira Classe", value: 25 },
];

const dadosBarra1 = [
  { mes: "Jan", ipsum: 45, lorem: 35 },
  { mes: "Fev", ipsum: 52, lorem: 42 },
  { mes: "Mar", ipsum: 48, lorem: 38 },
  { mes: "Abr", ipsum: 60, lorem: 50 },
  { mes: "Mai", ipsum: 55, lorem: 45 },
  { mes: "Jun", ipsum: 65, lorem: 55 },
];

const dadosBarra2 = [
  { mes: "Jan", lorem: 30, ipsum: 40 },
  { mes: "Fev", lorem: 35, ipsum: 45 },
  { mes: "Mar", lorem: 25, ipsum: 35 },
  { mes: "Abr", lorem: 45, ipsum: 55 },
  { mes: "Mai", lorem: 40, ipsum: 50 },
  { mes: "Jun", lorem: 50, ipsum: 60 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS2 = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Logo</h1>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate(ROUTES.VIAGENS_CADASTRADAS)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === ROUTES.VIAGENS_CADASTRADAS
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Viagens Cadastradas
            </button>

            <button
              onClick={() => navigate(ROUTES.RELATORIO)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === ROUTES.RELATORIO
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Relatórios
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Status das Viagens
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosPizza1}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPizza1.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Distribuição por Classe
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosPizza2}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPizza2.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS2[index % COLORS2.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                RELATORIO Ipsum x Lorem
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosBarra1}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="ipsum"
                      fill="#0088FE"
                      name="Ipsum"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="lorem"
                      fill="#00C49F"
                      name="Lorem"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                RELATORIO Lorem x Ipsum
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosBarra2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="lorem"
                      fill="#0088FE"
                      name="Lorem"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="ipsum"
                      fill="#00C49F"
                      name="Ipsum"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
