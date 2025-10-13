import Navbar from '@/components/NavBar'; 
import Card from '@/components/landingPage/Card';

import ubatubaImg from '@/assets/Ubatuba.jpg';
import paratyImg from '@/assets/Paraty.jpg';
import noronhaImg from '@/assets/Noronha.jpg';
import destaqueImage from '@/assets/Destaque.jpg'; 

export default function LandingPage() {
  const packagesData = [
    { 
      id: 1,
      title: "Ubatuba - SP", 
      description: "Mais de 100 praias entre a Mata Atlântica e o mar. De enseadas desertas à badalada Ilha Anchieta, Ubatuba é a combinação perfeita de aventura, natureza e sossego no litoral norte paulista. Seu refúgio caiçara te espera!",
      imageUrl: ubatubaImg 
    },
    { 
      id: 2,
      title: "Paraty - RJ", 
      description: "Charme colonial e história viva nas ruas de pedra. Explore o Centro Histórico, descubra cachoeiras na Bocaina e navegue pelas ilhas paradisíacas. Uma viagem única onde arte e natureza se encontram no Rio de Janeiro. Volte no tempo com estilo!",
      imageUrl: paratyImg
    },
    { 
      id: 3,
      title: "Fernando de Noronha - PE", 
      description: "O santuário ecológico mais desejado. Mergulhe nas águas cristalinas da Baía do Sancho e nade com a rica vida marinha. Golfinhos, tartarugas e paisagens icônicas como o Morro do Pico. A viagem dos seus sonhos é real!",
      imageUrl: noronhaImg
    },
  ];

  return (
    <div className='flex-col min-h-screen flex bg-gradient-to-br from-white to-sky-200'>
      <Navbar /> 
      <main className='flex-grow h-fit justify-evenly flex-col p-4 pl-3 pr-3'>
        
        <section className="flex items-center flex-wrap pt-4">
          
          <div className="flex flex-col w-full xl:w-1/2 mb-2">
            <h1 className='text-center text-4xl font-bold pr-25'>O Mundo Todo em Suas Mãos</h1>

            <div className='text-lg p-8 pl-10 pr-22'>
              <p>
                Planeje a jornada dos seus sonhos sem complicações. Descubra roteiros exclusivos, personalize cada detalhe e acesse pacotes de viagem inesquecíveis.
                Nossa plataforma conecta você aos destinos mais fantásticos do Brasil e do mundo com apenas alguns cliques Sua próxima grande aventura começa aqui!
              </p>
            </div>

            <div className='pl-8 flex justify-center xl:inline'>
              <button className='bg-[#2071b3] text-white py-2.5 px-6 border-none cursor-pointer rounded-sm hover:bg-blue-800'>
                Comece a Planejar
              </button>
            </div>
          </div>

          <div className="flex justify-center w-full xl:w-1/2 mb-2">
            <img
              className='rounded-2xl w-fit'
              src={destaqueImage}
              alt="Imagem de destaque"
            />
          </div>
        </section>

        <section>
          <h2 className='text-center text-2xl font-bold p-10'>Confira Nossos Pacotes</h2>
          <div className='flex justify-around flex-wrap'>
            {packagesData.map((data) => (
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

      <footer className='text-center p-10'>
        <span>@PAULA VIAGENS E TURISMO - PAULA VIAGENS E TURISMO</span>
      </footer>
    </div>
  );
}