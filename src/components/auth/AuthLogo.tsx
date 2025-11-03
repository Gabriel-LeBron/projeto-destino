import { Link } from "react-router-dom";

import PaulaViagens from "@/assets/PaulaViagensLogo.png";

export default function AuthLogo() {
  return (
    <div className="hidden md:flex w-1/2 items-center justify-center">
      <div className="w-80 h-80 bg-white/60 rounded-2xl shadow-md flex items-center justify-center">
        <Link to={"/"}>
          <img
            src={PaulaViagens}
            alt="Logo Paula Vigens"
            className="object-contain max-w-full max-h-full rounded-xl"
          />
        </Link>
      </div>
    </div>
  );
}
