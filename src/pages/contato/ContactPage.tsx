import logo from "/assets/paulaViagensLogo.jpg";

export default function ContactPage() {
  return (
    <div className="h-[95%] flex flex-col bg-white">
      <section className="h-[50%] flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="text-4xl font-bold text-[#2071b3]">Fale Conosco</h1>
          <p className="text-gray-700 leading-relaxed">
            Precisa de ajuda para planejar sua viagem, tirar dúvidas sobre
            pacotes ou fazer uma parceria? Nossa equipe está pronta para te
            atender.
          </p>

          <ul className="space-y-3 text-gray-800">
            <li>📞 (11) 4002-8922</li>
            <li>📍 Lorena, 1234 — São Paulo, SP</li>
          </ul>

          <div className="flex space-x-4 text-2xl mt-4">
            <a href="#" className="hover:text-[#ff7300] transition">
              🌐
            </a>
            <a href="#" className="hover:text-[#ff7300] transition">
              📘
            </a>
            <a href="#" className="hover:text-[#ff7300] transition">
              📸
            </a>
          </div>
        </div>

        <div className="flex justify-center md:w-1/2">
          <img
            src={logo}
            alt="Equipe de atendimento"
            className="max-w-[350px] rounded-xl shadow-lg object-contain p-2"
          />
        </div>
      </section>

      <main className="h-[50%] flex flex-col items-center justify-center px-6 py-16 bg-linear-to-br from-[#e6f4ff] via-[#d6efff] to-[#cde8ff]">
        <h2 className="text-3xl font-bold text-[#1a5b8e] mb-10">
          Envie uma Mensagem
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-white/90 shadow-[0_8px_20px_rgba(0,0,0,0.2)] rounded-2xl p-10 gap-10">
          <form className="flex flex-col w-full md:w-1/2 space-y-5">
            <div className="flex flex-col">
              <label
                htmlFor="nome"
                className="font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <h1>emailexemplo@gmail.com</h1>
            </div>
          </form>

          <div className="flex justify-center md:w-1/2">
            <img
              src={logo}
              alt="Equipe de atendimento"
              className="max-w-[350px] rounded-xl shadow-lg object-contain p-2"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
