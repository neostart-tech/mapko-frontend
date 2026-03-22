import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export interface Message {
  id: string;
  expediteur: string;
  email: string;
  telephone?: string;
  objet: string;
  contenu: string;
  statut: boolean; // false = nouveau, true = lu
  created_at: string;
  updated_at: string;
}

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Message[],
    loading: false,
    refreshInterval: null as any,
  }),

  getters: {
    unreadCount: (state) => state.messages.filter(m => !m.statut).length,
  },

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/messages");
        this.messages = res;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/messages/${id}`);
        
        // Si le message n'est pas déjà lu, on le marque comme lu en DB
        if (!res.statut) {
          await this.updateStatus(id, true);
        }
        
        return res as Message;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async store(data: { expediteur: string; email: string; telephone?: string; objet: string; contenu: string }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/messages", {
          method: "POST",
          body: data,
        });
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateStatus(id: string, statut: boolean) {
      const { $api } = useNuxtApp();
      // On n'active pas le loading ici pour plus de fluidité si on le fait en tâche de fond

      try {
        const res: any = await $api(`/messages/${id}`, {
          method: "PUT",
          body: { statut },
        });

        // Mise à jour locale
        const msg = this.messages.find(m => m.id === id);
        if (msg) {
          msg.statut = statut;
        }

        return res;
      } catch (error: any) {
        throw error;
      }
    },

    async destroy(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api(`/messages/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.messages = this.messages.filter(m => m.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    startPolling() {
      if (this.refreshInterval) return;
      this.fetch();
      this.refreshInterval = setInterval(() => {
        this.fetch();
      }, 30000); // Toutes les 30 secondes
    },

    stopPolling() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    }
  },
});
