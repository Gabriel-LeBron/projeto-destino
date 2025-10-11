import { useState } from "react";
import { Link } from "react-router-dom";
import CampoInput from "../components/CampoInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login com:\nEmail: ${email}\nSenha: ${senha}`);
  };

  return (
    <div className="auth-wrapper login-page">
      <div className="card">
        <h1>Conecte-se</h1>
        <form onSubmit={handleSubmit}>
          <CampoInput label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <CampoInput label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="submit" className="btn primary">Entrar</button>
        </form>
        <p className="switch">
          Não tem conta? <Link to="/Cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}