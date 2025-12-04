import React, { type Dispatch } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartComponentProps {
  title: string;
  data: any[];
  xAxisKey: string; // Qual chave usar no eixo X (ex: "mes")
  bars: {
    key: string; // Chave do dado (ex: "lorem")
    label: string; // Nome visível (ex: "Vendas")
    color: string; // Cor da barra
  }[];
  year: number;
  setYear: Dispatch<React.SetStateAction<number>>;
}

// Gera uma lista de anos a partir de 2020 até ano atual + 1
const currentYear = new Date().getFullYear() + 1;
const years = Array.from(
  { length: currentYear - 2020 + 1 },
  (_, i) => currentYear - i
);

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  title,
  data,
  xAxisKey,
  bars,
  year,
  setYear,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          {title}
        </h2>
        <div className="flex flex-rol items-center gap-2">
          <label className="text-gray-600 font-medium">Filtrar Ano:</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {bars.map((bar) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  name={bar.label}
                  fill={bar.color}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
