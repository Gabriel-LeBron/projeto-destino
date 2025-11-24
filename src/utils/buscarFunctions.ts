import { useEffect, useState } from "react";

export interface PacoteViagem {
  id: number;
  nome: string;
  descricao: string;
  itens: string[];
  valor: number;
}

export const useViagens = () => {
  const [viagens, setViagens] = useState<PacoteViagem[]>([]);

  useEffect(() => {
    const carregarViagens = async () => {
      try {
        const response = await fetch("/api/pacote/viagens");
        const result = await response.json();
        console.log(result);
        setViagens(result);
      } catch (error) {
        console.error("Erro ao carregar os dados do JSON:", error);
        throw new Error(`Não foi possível carregar as viagens.`);
      }
    };
    carregarViagens();
  }, []);

  return { viagens };
};

export interface Pacotes {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const usePacotes = () => {
  const [pacotes, setPacotes] = useState<Pacotes[]>([]);
  useEffect(() => {
    const carregarViagens = async () => {
      try {
        const response = await fetch("/json/pacotes.json");
        const resuilt = await response.json();
        setPacotes(resuilt);
      } catch (error) {
        console.error("Erro ao carregar os dados do JSON:", error);
        throw new Error(`Não foi possível carregar as pacotes do arquivo.`);
      }
    };
    carregarViagens();
  }, []);

  return { pacotes };
};
