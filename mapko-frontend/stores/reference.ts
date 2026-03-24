import { defineStore } from "pinia";
import type { Secteur } from "./secteur";

export interface Reference {
  id: string;
  titre: string;
  description?: string;
  annee_debut: number;
  annee_fin?: number;
  montant?: string;
  pays: string;
  statut: 'en_cours' | 'termine';
  secteur_id: string;
  secteur?: Secteur;
  created_at: string;
  updated_at: string;
}

export const useReferenceStore = defineStore("reference", {
  state: () => ({
    references: [] as Reference[],
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/references");
        this.references = res || [];
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
        const res: any = await $api(`/references/${id}`);
        return res as Reference;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async store(data: any) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/references", {
          method: "POST",
          body: data,
        });

        // Mise à jour locale
        this.references.unshift(res.data);
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async update(id: string, data: any) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/references/${id}`, {
          method: "PUT",
          body: data,
        });

        // Mise à jour locale
        const index = this.references.findIndex(r => r.id === id);
        if (index !== -1) {
          this.references[index] = res.data;
        }

        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async destroy(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api(`/references/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.references = this.references.filter(r => r.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
