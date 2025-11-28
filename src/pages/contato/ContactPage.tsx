import logo from "/icon.png";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

export default function ContactPage() {
  return (
    <div className="h-[75%] flex flex-col bg-white pt-35">
      <section className="h-[50%] flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="text-4xl font-bold text-[#2071b3]">Fale Conosco</h1>
          <p className="text-gray-700 leading-relaxed">
            Precisa de ajuda para planejar sua viagem, tirar dúvidas sobre
            pacotes ou fazer uma parceria? Nossa equipe está pronta para te
            atender.
          </p>

          <ul className="space-y-2 text-gray-800 drop-shadow-md">
            <div className="flex items-center">
              <BsFillTelephoneFill className="text-2xl mr-2" />
              <li> (11) 4002-8922</li>
            </div>
            <div className="flex items-center">
              <MdEmail className="text-2xl mr-2" />
              <li>contato@destinoviagens.com</li>
            </div>
            <div className="flex items-center">
              <MdPlace className="text-2xl mr-2" />
              <li>São Paulo - Lorena</li>
            </div>
          </ul>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-900 drop-shadow-md hover:text-[#2071b3] transition"
            >
              <div className="flex items-center">
                <FaFacebookSquare className="text-2xl" />
              </div>
            </a>
            <a
              href="#"
              className="text-gray-800 drop-shadow-md hover:text-[#2071b3] transition"
            >
              <div className="flex items-center">
                <PiInstagramLogoFill className="text-2xl" />
              </div>
            </a>
          </div>
        </div>

        <div className="flex justify-center md:w-2.4">
          <img
            src={logo}
            alt="Equipe de atendimento"
            className="max-w-[350px] rounded-xl shadow-lg object-contain p-2"
          />
        </div>
      </section>
    </div>
  );
}
