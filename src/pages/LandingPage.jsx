import React from 'react';
import Navbar from '../components/NavBar/NavBar'; 
import Card from '../components/Card/Card';
import ubatubaImg from '../assets/Ubatuba.jpg';
import paratyImg from '../assets/Paraty.jpg';
import noronhaImg from '../assets/Noronha.jpg';
import destaqueImage from '../assets/Destaque.jpg'; 

/* SE DER PAU NA ALTURA DA TELA OU NAVBAR, OU NA RELAÇÃO DAS DUAS, MEXER AQUI!!!!! */
const NAVBAR_HEIGHT = '400px'; 
/* Ass.: Miguel. */

function LandingPage() {
  const packagesData = [
    { 
      title: "Ubatuba - SP", 
      description: "Mais de 100 praias entre a Mata Atlântica e o mar. De enseadas desertas à badalada Ilha Anchieta, Ubatuba é a combinação perfeita de aventura, natureza e sossego no litoral norte paulista. Seu refúgio caiçara te espera!",
      imageUrl: ubatubaImg 
    },
    { 
      title: "Paraty - RJ", 
      description: "Charme colonial e história viva nas ruas de pedra. Explore o Centro Histórico, descubra cachoeiras na Bocaina e navegue pelas ilhas paradisíacas. Uma viagem única onde arte e natureza se encontram no Rio de Janeiro. Volte no tempo com estilo!",
      imageUrl: paratyImg
    },
    { 
      title: "Fernando de Noronha - PE", 
      description: "O santuário ecológico mais desejado. Mergulhe nas águas cristalinas da Baía do Sancho e nade com a rica vida marinha. Golfinhos, tartarugas e paisagens icônicas como o Morro do Pico. A viagem dos seus sonhos é real!",
      imageUrl: noronhaImg
    },
  ];

  return (
    <div 
      className="landing-page-container" 
      style={{ 
        margin: 0, 
        padding: 0,
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #2071b3ff, #d5e2fdff 50%, #2071b3ff)' 
      }}
    >
      <Navbar /> 
      
      <main style={{ 
          padding: `calc(${NAVBAR_HEIGHT} + 40px) 60px 40px 60px` 
      }}>
        
        <section className="hero-section" style={{ display: 'flex', gap: '50px', marginBottom: '60px', alignItems: 'center', minHeight: '350px' }}>
          
          <div className="hero-content" style={{ flex: 1, paddingRight: '20px' }}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '15px', color: '#202020ff' }}>O Mundo Todo em Suas Mãos</h1>
            
            <p style={{ lineHeight: 1.6, maxWidth: '550px', color: '#333' }}>
              Planeje a jornada dos seus sonhos sem complicações. Descubra roteiros exclusivos, personalize cada detalhe e acesse pacotes de viagem inesquecíveis.
            </p>  
            <p style={{ lineHeight: 1.6, marginBottom: '20px', maxWidth: '550px', color: '#333' }}>
              Nossa plataforma conecta você aos destinos mais fantásticos do Brasil e do mundo com apenas alguns cliques Sua próxima grande aventura começa aqui!
            </p>
            
            <button style={{ backgroundColor: '#2071b3ff', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Comece a Planejar
            </button>
          </div>

          <div className="hero-image-wrapper" style={{ flex: 1, height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <img 
              src={destaqueImage} 
              alt="Imagem de destaque" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </section>

        
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#202020ff' }}>Confira Nossos Pacotes</h2>
        <section className="cards-section" style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
          {packagesData.map((data, index) => (
            <Card 
              key={index}
              title={data.title}
              description={data.description}
              imageUrl={data.imageUrl} 
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default LandingPage;