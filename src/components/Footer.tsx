import { Link } from "react-router-dom";
import logo from "@/assets/PaulaViagensLogo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#ffc27a] to-[#ff9e3f] text-white py-10 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-28 mb-4 select-none"
          />
          <p className="text-sm text-white/90 leading-relaxed">
            Conectamos você aos melhores destinos com praticidade e segurança.
          </p>
        </div>

        
        <div>
          <h3 className="font-bold text-lg mb-4">Navegação</h3>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/" className="hover:text-white transition">Início</Link></li>
            <li><Link to="/contato" className="hover:text-white transition">Contato</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            <li><Link to="/cadastro" className="hover:text-white transition">Cadastro</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold text-lg mb-4">Contato</h3>
          <ul className="space-y-2 text-white/90">
            <li>📞 (11) 4002-8922</li>
            <li>✉️ contato@destinoviagens.com</li>
            <li>📍 São Paulo - SP</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold text-lg mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition text-xl">🌐</a>
            <a href="#" className="hover:text-white transition text-xl">📘</a>
            <a href="#" className="hover:text-white transition text-xl">📸</a>
          </div>
        </div>
      </div>

      {/* 🔹 DIREITOS AUTORAIS */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Destino Viagens. Todos os direitos reservados.
      </div>
    </footer>
  );
}
