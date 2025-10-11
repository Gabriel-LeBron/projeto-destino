import { useState } from "react";
import { Link } from "react-router-dom";
import CampoInput from "../components/CampoInput"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }
    alert(`Usuário cadastrado:\nEmail: ${email}`);
  };

  return (
    <div className="auth-wrapper signup-page">
      <div className="card">
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <CampoInput label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <CampoInput label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <CampoInput label="Confirmar Senha" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
          <button type="submit" className="btn warning">Cadastrar</button>
        </form>
        <p className="switch">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}