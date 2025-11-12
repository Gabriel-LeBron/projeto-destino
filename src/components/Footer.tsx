import { Link } from "react-router-dom";
import logo from "/assets/paulaViagensLogo.jpg";

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-[#ffc27a] to-[#ff9e3f] text-blue-800 py-10 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start ">
          <img src={logo} alt="Logo" className="w-28 mb-4 select-none" />
          <p className="text-sm leading-relaxed">
            Conectamos você aos melhores destinos com praticidade e segurança.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Navegação</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-900 transition">
                Início
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-blue-900 transition">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-900 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/cadastro" className="hover:text-blue-900 transition">
                Cadastro
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Contato</h3>
          <ul className="space-y-2">
            <li>📞 (11) 4002-8922</li>
            <li>✉️ contato@destinoviagens.com</li>
            <li>📍 São Paulo - SP</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-900 transition text-xl">
              🌐
            </a>
            <a href="#" className="hover:text-blue-900 transition text-xl">
              📘
            </a>
            <a href="#" className="hover:text-blue-900 transition text-xl">
              📸
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
