import { ROUTES } from "@/paths";
import { useSession } from "@/store/usuarioStore";
import logo from "/LogoPaulaViagensVetor_2.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState<string | null>();

  useEffect(() => {
    setUser(useSession.getState().email);
  }, []);

  return (
    <header className="flex flex-wrap items-center place-content-between py-1 px-[30px] bg-[#ff944d] pt-3 pb-1">
      <Link
        to={ROUTES.LANDINGPAGE}
        className="font-bold text-3xl text-white pl-15"
      >
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-25 select-none"
          />
        </div>
      </Link>
      <nav className="flex flex-wrap gap-15 pr-20 pl-10 text-xl">
        <Link
          to={ROUTES.RELATORIO}
          className="text-white font-bold hover:text-[#2071b3]"
        >
          Administração
        </Link>
        <Link
          to={ROUTES.CONTATO}
          className="text-white font-bold hover:text-[#2071b3]"
        >
          Contato
        </Link>
        {user ? (
          <div>
            <span className="text-white font-bold">Usuário: {user} | </span>
            <button
              className="text-(--navbar-blue-text) hover:underline hover:cursor-pointer"
              onClick={() => {
                setUser(null);
                useSession.getState().logoutUser();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="text-white font-bold hover:text-[#2071b3]"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
