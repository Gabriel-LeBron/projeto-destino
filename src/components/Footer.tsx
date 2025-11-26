import { Link } from "react-router-dom";
import logo from "/icon.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ff944d] text-blue-900 py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-lg">
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-55 mb-4 select-none pt-4 pl-15"
          />
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-blue-700">Navegação</h3>
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
                to="/contato"
                className="text-white drop-shadow-md hover:text-[#2071b3] transition"
              >
                Contato
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
          <h3 className="font-bold text-xl mb-4 text-blue-700">Contato</h3>
          <ul className="space-y-2 text-white drop-shadow-md">
            <li>📞 (11) 4002-8922</li>
            <li>✉️ contato@destinoviagens.com</li>
            <li>📍 São Paulo - SP</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-blue-700">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-900 transition text-2xl">
              🌐
            </a>
            <a href="#" className="hover:text-blue-900 transition text-2xl">
              📘
            </a>
            <a href="#" className="hover:text-blue-900 transition text-2xl">
              📸
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
