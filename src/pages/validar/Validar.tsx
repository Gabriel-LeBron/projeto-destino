import UsersList from "@/components/validar/usersList";
import {
  listInvalidUsers,
  type InvalidUsersResponse,
} from "@/utils/authFunctions";
import { useEffect, useState } from "react";

export default function Validar() {
  const [users, setUsers] = useState<InvalidUsersResponse>({
    error: false,
    mensagem: "",
    users: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await listInvalidUsers();
        setUsers(result);
      } catch (error) {
        setUsers({
          error: true,
          mensagem: "Falha ao chamar a função de busca!",
          users: null,
        });
      }
    })();
  }, []);

  return (
    <>
      {users.users ? (
        users.users.length > 0 &&
        users.users?.map((user) => <UsersList key={user.id} user={user} />)
      ) : (
        <p>{users.mensagem}</p>
      )}
    </>
  );
}
