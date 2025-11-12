import { useSession } from "@/store/usuarioStore";

export interface Usuario {
  id: string;
  nome: string;
  sobreNome: string;
  cpf: string;
  email: string;
  telefone: string;
  perfil: string;
  valido: boolean;
  atualização: string;
  cadastro: string;
  senha: string;
}

export interface RegistroUser {
  nome?: string;
  sobreNome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  senha?: string;
}

interface RegistrationResponse {
  error: boolean;
  mensagem: string;
}

export const cadastrarUsuario = async (
  usuario: RegistroUser | null
): Promise<RegistrationResponse> => {
  if (usuario) {
    try {
      const response = await fetch("api/auth/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      return await response.json();
    } catch (error: unknown) {
      return { error: true, mensagem: "Erro inesperado!" };
    }
  }
  return { error: true, mensagem: "Usuário inválido" };
};

export interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  error: boolean;
  mensagem: string;
  userInfo?: UserInfo;
}

export interface UserInfo {
  id: string;
  nome: string;
}

export const loginUsuario = async (
  credenciaisUsuario: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credenciaisUsuario),
    });
    const result: LoginResponse = await response.json();
    if (result.userInfo) {
      useSession.getState().updateUser({
        id: result.userInfo.id,
        email: result.userInfo.nome,
        isLoged: true,
      });
      return { error: result.error, mensagem: result.mensagem };
    }
    return { error: result.error, mensagem: result.mensagem };
  } catch (error: unknown) {
    return { error: true, mensagem: "Erro inesperado!" };
  }
};

export const logout = async (): Promise<string> => {
  try {
    const response = await fetch("api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const result: string = await response.json();
    return result;
  } catch (error: unknown) {
    return "erro";
  }
};

export interface InvalidUsersResponse {
  error: boolean;
  mensagem: string;
  users: Usuario[] | null;
}

export const listInvalidUsers = async (): Promise<InvalidUsersResponse> => {
  try {
    const response = await fetch("api/auth/usuarios/invalidos", {
      credentials: "include",
    });

    if (!response.ok) {
      return {
        error: true,
        mensagem: "Não foi possivel chamar a API",
        users: null,
      };
    }

    const result: Usuario[] = await response.json();
    if (result.length > 0) {
      return {
        error: false,
        mensagem: "Nenhum usuários encontrado para validação!",
        users: result,
      };
    }
    return { error: false, mensagem: "Usuários encontrados!", users: result };
  } catch (error: unknown) {
    return { error: true, mensagem: "Erro inesperado!", users: null };
  }
};

export interface ValidarUsuarioResponse {
  error: boolean;
  mensagem: string;
}

export const ValidarUsuario = async (
  userId: string
): Promise<ValidarUsuarioResponse> => {
  try {
    const response = await fetch(`api/auth/usuarios/validar/${userId}`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!response.ok) {
      return {
        error: true,
        mensagem: "Não foi possivel chamar a API",
      };
    }

    return await response.json();
  } catch (error: unknown) {
    return { error: true, mensagem: "Erro inesperado!" };
  }
};
