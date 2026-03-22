import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
  }),

  actions: {
    async updateProfile(data: { nom: string; prenom: string; email: string; telephone?: string }) {
      const { $api } = useNuxtApp();
      const auth = useAuthStore();
      this.loading = true;

      try {
        const res: any = await $api("/user", {
          method: "PUT",
          body: data,
        });

        // Mettre à jour l'utilisateur dans le store auth et dans le localStorage
        auth.user = res.user;
        if (import.meta.client) {
          localStorage.setItem("user", JSON.stringify(res.user));
        }

        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updatePassword(data: { old_password: string; new_password: string; new_password_confirmation: string }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/user/password", {
          method: "PUT",
          body: data,
        });
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
