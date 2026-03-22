import { defineStore } from "pinia";

export interface Partenaire {
  id: string;
  nom: string;
  logo?: string;
  created_at: string;
  updated_at: string;
}

export const usePartenaireStore = defineStore("partenaire", {
  state: () => ({
    partenaires: [] as Partenaire[],
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/partenaires");
        this.partenaires = res;
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
        const res: any = await $api(`/partenaires/${id}`);
        return res as Partenaire;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async store(formData: FormData) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/partenaires", {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        this.partenaires.unshift(res);
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async update(id: string, formData: FormData) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        if (!formData.has('_method')) formData.append('_method', 'PUT');

        const res: any = await $api(`/partenaires/${id}`, {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        const index = this.partenaires.findIndex(p => p.id === id);
        if (index !== -1) {
          this.partenaires[index] = res;
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
        await $api(`/partenaires/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.partenaires = this.partenaires.filter(p => p.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
