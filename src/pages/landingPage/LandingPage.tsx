import Card from "@/components/landingPage/Card";
import destaqueImage from "/destaque.jpg";
import placeholder from "/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/paths";
import { useState, useEffect } from "react";

interface PacoteDisplay {
  id: number;
  nome: string;
  descricao: string;
  fotosDoPacote: {
  fotoDoPacote: string; // URL da imagem principal
  };
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [pacotes, setPacotes] = useState<PacoteDisplay[]>([]);

  useEffect(() => {
    const fetchPacotes = async () => {
      try {
        const response = await fetch("/api/pacote"); // Endpoint público
        if (response.ok) {
          const data = await response.json();
          setPacotes(data.content);
        }
      } catch (error) {
        console.error("Erro ao buscar pacotes da API", error);
      }
    };
    fetchPacotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br bg-white">
      <main className="grow p-4 md:p-8">
        <section className="flex flex-wrap items-center pt-4 gap-8">
          <div className="flex flex-col w-full xl:w-[48%] mb-4">
            <h1 className="text-center md:text-left text-4xl lg:text-5xl font-extrabold pt-3 mb-4 px-4">
              O Mundo Todo em Suas Mãos
            </h1>
            <div className="text-lg p-4 md:px-8">
              <p>
                Planeje a jornada dos seus sonhos sem complicações. Descubra
                roteiros exclusivos, personalize cada detalhe e acesse pacotes
                de viagem inesquecíveis.
              </p>
            </div>
            <div className="px-4 md:px-8 flex justify-center md:justify-start mt-6">
              <button
                onClick={() => navigate(ROUTES.BUSCAR_PACOTES)}
                className="bg-[#2071b3] text-white py-3 px-8 rounded-lg shadow-lg transition duration-300 hover:bg-blue-800"
              >
                Comece a Planejar
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full xl:w-[48%] mt-8 xl:mt-0">
            <img
              className="rounded-3xl w-full max-w-xgg shadow-xl"
              src={destaqueImage}
              alt="Destaque"
            />
          </div>
        </section>

        <hr className="my-9 border-t-2 border-sky-300/50" />

        <section className="mt-7">
          <h2 className="text-center text-4xl font-bold mb-9">
            Confira Nossos Pacotes
          </h2>
          <div className="flex justify-center gap-6 flex-wrap px-4">
            {pacotes.map((data) => (
              <Card
                key={data.id}
                title={data.nome}
                description={data.descricao}
                imageUrl={data.fotosDoPacote?.fotoDoPacote || placeholder}
                detalhar={() =>
                  navigate(
                    ROUTES.PACOTE_DETALHES.replace(":id", String(data.id))
                  )
                }
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
