import { BarChartComponent } from "@/components/administracao/dashboard/BarChartComponent";
import { PieChartComponent } from "@/components/administracao/dashboard/PieChartComponent";
import { useDashboardData } from "@/utils/useDashboardData";

const COLORS_STATUS = ["#00C49F", "#FFBB28", "#FF8042"];
const COLORS_TRANSPORTE = ["#0088FE", "#8884d8", "#82ca9d"];

export default function Dashboard() {
  const { data, viagensYear, setViagensYear, comprasYear, setcomprasYear } =
    useDashboardData();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* --- Conteúdo Principal --- */}
      <div className="flex-1 p-8">
        {data.loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg animate-pulse">
              Carregando indicadores...
            </p>
          </div>
        )}

        {data.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{data.error}</span>
          </div>
        )}

        {!data.loading && !data.error && (
          <>
            {/* Linha 1: Gráficos de Pizza */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <PieChartComponent
                title="Status das Viagens"
                data={data.statusData}
                colors={COLORS_STATUS}
              />
              <PieChartComponent
                title="Meios de Transporte"
                data={data.transporteData}
                colors={COLORS_TRANSPORTE}
              />
            </div>

            {/* Linha 2: Gráficos de Barra*/}
            <div className="space-y-8">
              <BarChartComponent
                title={`Viagens Concluídas em ${viagensYear}`}
                data={data.viagensMensaisData}
                xAxisKey="name"
                bars={[
                  {
                    key: "value",
                    label: "Viagens Concluídas",
                    color: "#82ca9d",
                  },
                ]}
                year={viagensYear}
                setYear={setViagensYear}
              />

              {/* Compras Realizadas por Mês */}
              <BarChartComponent
                title={`Volume de Compras em ${comprasYear}`}
                data={data.comprasMensaisData}
                xAxisKey="name"
                bars={[
                  {
                    key: "value",
                    label: "Vendas Realizadas",
                    color: "#8884d8",
                  },
                ]}
                year={comprasYear}
                setYear={setcomprasYear}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
