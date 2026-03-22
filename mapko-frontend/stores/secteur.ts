import { defineStore } from "pinia";

export interface Secteur {
  id: string;
  titre: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export const useSecteurStore = defineStore("secteur", {
  state: () => ({
    secteurs: [] as Secteur[],
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/secteurs");
        this.secteurs = res;
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
        const res: any = await $api(`/secteurs/${id}`);
        return res as Secteur;
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
        const res: any = await $api("/secteurs", {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        this.secteurs.unshift(res.data);
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
        // Laravel PUT with files needs `_method: 'PUT'` via a POST request
        if (!formData.has('_method')) formData.append('_method', 'PUT');

        const res: any = await $api(`/secteurs/${id}`, {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        const index = this.secteurs.findIndex(s => s.id === id);
        if (index !== -1) {
          this.secteurs[index] = res.data;
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
        await $api(`/secteurs/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.secteurs = this.secteurs.filter(s => s.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
