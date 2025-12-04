import { Link } from "react-router-dom";
import logo from "/LogoPaulaViagensVetor_2.png";

import { PiMapPinAreaFill, PiInstagramLogoFill } from "react-icons/pi";
import { MdContactMail, MdEmail, MdPlace } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ff944d] text-blue-900 py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-lg">
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-65 mb-4 select-none pt-4 pl-15"
          />
        </div>

        <div>
          {/* Título Navegação - Alinhamento aplicado aqui */}
          <h3 className="font-bold text-xl mb-4 text-blue-700 flex items-center space-x-2">
            <PiMapPinAreaFill className="text-2xl" />
            <span>Navegação</span>
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-white drop-shadow-md hover:text-[#2071b3] transition"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/pacotes"
                className="text-white drop-shadow-md hover:text-[#2071b3] transition"
              >
                Pacotes
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white drop-shadow-md hover:text-[#2071b3] transition"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/cadastro"
                className="text-white drop-shadow-md hover:text-[#2071b3] transition"
              >
                Cadastro
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-blue-700 flex items-center space-x-2">
            <MdContactMail className="text-2xl" />
            <span>Contato</span>
          </h3>
          <ul className="space-y-2 text-white drop-shadow-md">
            <li className="flex items-center space-x-2">
              <BsFillTelephoneFill className="text-xl" />
              <span>(11) 4002-8922</span>
            </li>
            <li className="flex items-center space-x-2">
              <MdEmail className="text-xl" />
              <span>contato@destinoviagens.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MdPlace className="text-xl" />
              <span>São Paulo - Lorena</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-blue-700 flex items-center space-x-2">
            <RiUserFollowFill className="text-2xl" />
            <span>Siga-nos</span>
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white drop-shadow-md hover:text-[#2071b3] transition flex items-center space-x-2"
            >
              <FaFacebookSquare className="text-2xl" />
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="text-white drop-shadow-md hover:text-[#2071b3] transition flex items-center space-x-2"
            >
              <PiInstagramLogoFill className="text-2xl" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}