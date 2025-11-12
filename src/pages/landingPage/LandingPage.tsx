import { useEffect, useState } from "react";

import Card from "@/components/landingPage/Card";

import destaqueImage from "/assets/Destaque.jpg";

interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function LandingPage() {
  const [pacotes, setPacotes] = useState<CardProps[]>([]);

  const getPacotes = async () => {
    try {
      const response = await fetch("/json/pacotes.json");

      if (!response.ok) {
        throw new Error(
          `Erro HTTP: Status ${response.status}. Verifique o caminho`
        );
      }

      const data: CardProps[] = await response.json();

      setPacotes(data);
    } catch (err) {
      console.error("Falha ao carregar dados dos cards:", err);
      setPacotes([]);
    }
  };

  useEffect(() => {
    getPacotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-white to-sky-200">
      <main className="grow p-4 md:p-8">
        <section className="flex flex-wrap items-center pt-4 gap-8">
          <div className="flex flex-col w-full xl:w-[48%] mb-4">
            <h1 className="text-center md:text-left text-4xl lg:text-5xl font-extrabold mb-4 px-4">
              O Mundo Todo em Suas Mãos
            </h1>

            <div className="text-lg p-4 md:px-8">
              <p>
                Planeje a jornada dos seus sonhos sem complicações. Descubra
                roteiros exclusivos, personalize cada detalhe e acesse pacotes
                de viagem inesquecíveis. Nossa plataforma conecta você aos
                destinos mais fantásticos do Brasil e do mundo com apenas alguns
                cliques. Sua próxima grande aventura começa aqui!
              </p>
            </div>

            <div className="px-4 md:px-8 flex justify-center md:justify-start mt-6">
              <button className="bg-[#2071b3] text-white py-3 px-8 rounded-lg shadow-lg transition duration-300 hover:bg-blue-800">
                Comece a Planejar
              </button>
            </div>
          </div>

          <div className="flex justify-center w-full xl:w-[48%] mt-8 xl:mt-0">
            <img
              className="rounded-2xl w-full max-w-lg shadow-xl"
              src={destaqueImage}
              alt="Imagem de destaque"
            />
          </div>
        </section>

        <hr className="my-9 border-t-2 border-sky-300/50" />

        <section className="mt-7">
          <h2 className="text-center text-3xl font-bold mb-9">
            Confira Nossos Pacotes
          </h2>
          <div className="flex justify-center gap-6 flex-wrap px-4">
            {pacotes.map((data) => (
              <Card
                key={data.id}
                title={data.title}
                description={data.description}
                imageUrl={data.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
