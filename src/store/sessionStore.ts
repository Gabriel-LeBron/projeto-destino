import { create } from "zustand";

export interface UserInfo {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: string;
  accessToken: string;
  expiracaoEmSegundos: number;
}

type LoginParams = {
  email: string;
  senha: string;
};

type UserState = {
  usuario: UserInfo | null;
  isLoged: boolean;
  isLoading: boolean;
  error: string | null;
};

type UserActions = {
  login: (creds: LoginParams) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  clearError: () => void;
};

const API_URL = "/api/auth";

export const useSession = create<UserState & UserActions>((set, get) => ({
  usuario: null,
  isLoged: false,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async ({ email, senha }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/entrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Falha ao realizar login");
      }

      set({
        usuario: data.dados,
        isLoged: true,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (err: any) {
      const mensagemErro = err.message || "Erro de conexão";

      set({
        usuario: null,
        isLoged: false,
        isLoading: false,
        error: mensagemErro,
      });

      return { success: false, error: mensagemErro };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await fetch(`${API_URL}/sair`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao notificar logout ao servidor", error);
    } finally {
      set({
        usuario: null,
        isLoged: false,
        isLoading: false,
        error: null,
      });
    }
  },

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/renovar-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && !data.erro) {
        set({
          usuario: data.dados,
          isLoged: true,
          isLoading: false,
        });
      } else {
        set({ usuario: null, isLoged: false, isLoading: false });
      }
    } catch (error) {
      set({ usuario: null, isLoged: false, isLoading: false });
    }
  },
}));
