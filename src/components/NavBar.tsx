import { ROUTES } from "@/paths";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState<string | null>();

  useEffect(() => {
    const sessionEmail = getCookie("session");

    if (sessionEmail) {
      setUser(sessionEmail);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <header className="flex flex-wrap  items-center place-content-between py-[15px] px-[30px] bg-[var(--bg-color-orange)]">
      <Link
        to={ROUTES.LANDINGPAGE}
        className="font-bold text-2xl text-[var(--navbar-blue-text)]"
      >
        DESTINO
      </Link>

      <nav className="flex flex-wrap gap-7">
        <Link
          to={ROUTES.VIAGEM}
          className="text-white font-medium hover:underline"
        >
          Viagens
        </Link>
        <Link
          to={ROUTES.RELATORIO}
          className="text-white font-medium hover:underline"
        >
          Relatórios
        </Link>
        <Link
          to={ROUTES.CONTATO}
          className="text-white font-medium hover:underline"
        >
          Contato
        </Link>
        {user ? (
          <div>
            <span className="text-white font-medium">Usuário: {user} | </span>
            <button
              className="text-(--navbar-blue-text) hover:underline hover:cursor-pointer"
              onClick={() => {
                setCookie("session", "", -1);
                setUser(null);
              }}
            >
              logout
            </button>
          </div>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="text-(--navbar-blue-text) hover:underline"
          >
            Login
          </Link>
        )}
      </nav>

      <input
        className="text-lg bg-white text-black text-center 
      placeholder-black
      border-solid rounded-xl outline-2 border-b-neutral-100"
        type="search"
        placeholder="Buscar no site..."
      />
    </header>
  );
}
