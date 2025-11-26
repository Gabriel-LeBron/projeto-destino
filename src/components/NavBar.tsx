import { ROUTES } from "@/paths";
import { useSession } from "@/store/usuarioStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState<string | null>();
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(useSession.getState().email);
  }, []);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();

    if (termoBusca.trim()) {
      navigate(`${ROUTES.BUSCAR_PACOTES}?q=${encodeURIComponent(termoBusca)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBuscar(e);
    }
  };

  return (
    <header className="flex flex-wrap items-center place-content-between py-[15px] px-[30px] bg-[#ff944d]">
      <Link
        to={ROUTES.LANDINGPAGE}
        className="font-bold text-3xl text-white pl-15"
      >
        DESTINO
      </Link>

      <nav className="flex flex-wrap gap-10 pr-20 pl-10 text-xl">
        <Link
          to={ROUTES.RELATORIO}
          className="text-white hover:text-[#2071b3]"
        >
          Administração
        </Link>
        <Link
          to={ROUTES.CONTATO}
          className="text-white hover:text-[#2071b3]"
        >
          Contato
        </Link>
        {user ? (
          <div>
            <span className="text-white">Usuário: {user} | </span>
            <button
              className="text-(--navbar-blue-text) hover:underline hover:cursor-pointer"
              onClick={() => {
                setUser(null);
                useSession.getState().logoutUser();
              }}
            >
              logout
            </button>
          </div>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="text-white hover:text-[#2071b3]"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
