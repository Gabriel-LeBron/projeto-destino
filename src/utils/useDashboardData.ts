import { useSession } from "@/store/sessionStore";
import { useState, useEffect, type SetStateAction, type Dispatch } from "react";

export interface ChartData {
  name: string;
  value: number;
}

interface DashboardDataState {
  statusData: ChartData[];
  transporteData: ChartData[];
  viagensMensaisData: ChartData[];
  comprasMensaisData: ChartData[];
  loading: boolean;
  error: string | null;
}

export const useDashboardData = () => {
  // 1. Pegamos o token atual da sessão
  const { usuario } = useSession();
  const [viagensYear, setViagensYear] = useState(new Date().getFullYear());
  const [comprasYear, setcomprasYear] = useState(new Date().getFullYear());

  const [data, setData] = useState<DashboardDataState>({
    statusData: [],
    transporteData: [],
    viagensMensaisData: [],
    comprasMensaisData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Se não tiver token (usuário não logado), nem tenta buscar
      if (!usuario?.accessToken) return;

      try {
        // 2. Criamos as opções padrão para todas as requisições
        const requestOptions: RequestInit = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.accessToken}`, // Injeta o Token JWT
          },
          credentials: "include", // Importante para enviar/receber Cookies HttpOnly
        };

        // 3. Array de URLs para facilitar
        const urls = [
          "/api/dashboard/status-viagem",
          "/api/dashboard/transporte-stats",
          `/api/dashboard/viagens/mensais?ano=${viagensYear}`,
          `/api/dashboard/viagens/vendidos?ano=${comprasYear}`,
        ];

        // 4. Executa o Promise.all mapeando as URLs e aplicando as opções
        const responses = await Promise.all(
          urls.map((url) => fetch(url, requestOptions))
        );

        // Verifica se alguma deu erro (status fora de 200-299)
        for (const res of responses) {
          if (!res.ok) throw new Error(`Falha na requisição: ${res.url}`);
        }

        // 5. Extrai o JSON de todas as respostas
        const [
          statusData,
          transporteData,
          viagensMensaisData,
          comprasMensaisData,
        ] = await Promise.all(responses.map((res) => res.json()));

        setData({
          statusData,
          transporteData,
          viagensMensaisData,
          comprasMensaisData,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        console.error(err);
        setData((prev) => ({
          ...prev,
          loading: false,
          error: err.message || "Erro ao carregar dados.",
        }));
      }
    };

    fetchData();
  }, [usuario?.accessToken, viagensYear, comprasYear]);

  return { data, viagensYear, setViagensYear, comprasYear, setcomprasYear };
};
