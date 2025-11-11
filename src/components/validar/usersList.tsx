import { ValidarUsuario, type Usuario } from "@/utils/authFunctions";

interface UsersListProps {
  user: Usuario;
}

export default function UsersList({ user }: UsersListProps) {
  return (
    <>
      <div>
        <p>{user.nome}</p>
        <p>{user.cpf}</p>
        <p>{user.email}</p>
        <p>{user.telefone}</p>
        <p>{user.cadastro}</p>
        <button
          className="cursor-pointer"
          onClick={() => {
            ValidarUsuario(user.id);
          }}
        >
          Validar
        </button>
      </div>
    </>
  );
}
