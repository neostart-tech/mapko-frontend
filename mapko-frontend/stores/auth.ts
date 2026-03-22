import { defineStore } from "pinia";

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

function parseApiError(error: any): ApiError {
  // $api throw directement response._data (objet Laravel)
  // donc error = { message: "...", errors: {...} } directement
  if (typeof error === "string") {
    return { message: "Erreur serveur." };
  }

  return {
    message: error?.message || "Une erreur est survenue.",
    errors: error?.errors,
  };
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    token: null as string | null,
    loading: false,
  }),

  getters: {
    isLogged: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/login", {
          method: "POST",
          body: { email, password },
        });

        this.token = res.token;
        this.user = res.user;

        if (process.client) {
          localStorage.setItem("mapko-token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
        }

        return res;
      } catch (error: any) {
        throw parseApiError(error);
      } finally {
        this.loading = false;
      }
    },

    logout(redirect = true) {
      this.token = null;
      this.user = null;

      if (process.client) {
        localStorage.removeItem("mapko-token");
        localStorage.removeItem("user");
      }

      if (redirect) return navigateTo("/admin/login");
    },

    init() {
      if (!process.client) return;

      const token = localStorage.getItem("mapko-token");
      const user = localStorage.getItem("user");

      if (token) this.token = token;
      if (user && user !== "undefined") {
        try {
          this.user = JSON.parse(user);
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
          this.user = null;
        }
      }
    },
  },
});
