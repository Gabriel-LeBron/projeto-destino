import { ROUTES } from "@/paths";
import { useSession } from "@/store/sessionStore";
import logo from "/LogoPaulaViagensVetor_2.png";
import { Link } from "react-router-dom";
import { LuPackageSearch } from "react-icons/lu";
import { MdContactMail } from "react-icons/md";
import { TbMapPinCog } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { BiSolidLogInCircle } from "react-icons/bi";
import { BiSolidLogOutCircle } from "react-icons/bi";


export default function Navbar() {
  const session = useSession();

  return (
    <header className="flex flex-wrap items-center place-content-between py-1 px-[30px] bg-[#ff944d] pt-3 pb-1">
      <Link
        to={ROUTES.LANDINGPAGE}
        className="font-bold text-3xl text-white pl-15"
      >
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" className="w-25 select-none" />
        </div>
      </Link>
      <nav className="flex flex-wrap gap-15 pr-20 pl-10 text-xl">
        <Link
          to={ROUTES.BUSCAR_PACOTES}
          className="text-white hover:text-[#2071b3] flex items-center space-x-2"
        >
          <LuPackageSearch className="text-2xl" />
          <span>Buscar Pacotes</span>
        </Link>
        <Link to={ROUTES.CONTATO} className="text-white hover:text-[#2071b3] flex items-center space-x-2">
          <MdContactMail className="text-2xl" />
          <span>Contato</span>
        </Link>
        {session.usuario?.perfil == "ADMINISTRADOR" && (
          <Link
            to={ROUTES.RELATORIO}
            className="text-white font-bold hover:text-[#2071b3] flex items-center space-x-2"
          >
            <TbMapPinCog className="text-2xl" />
            <span>Administração</span>
          </Link>
        )}
        {session.isLoged ? (
          <span className="text-white font-bold flex items-center space-x-2">
            <FaUser className="text-2xl" />
            <Link to={ROUTES.MINHAS_VIAGENS}>
              Usuário: {session.usuario?.nomeCompleto}
            </Link>
            <p className="ml-2">|</p>
            <button
              className="text-(--navbar-blue-text) hover:underline hover:cursor-pointer ml-2 flex items-center space-x-1"
              onClick={() => {
                useSession.getState().logout();
              }}
            >
              <BiSolidLogOutCircle className="text-2xl" />
              <span>Logout</span>
            </button>
          </span>
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className="text-white font-bold hover:text-[#2071b3] flex items-center space-x-2"
          >
            <BiSolidLogInCircle className="text-2xl" />
            <span>Conecte-se</span>
          </Link>
        )}
      </nav>
    </header>
  );
}