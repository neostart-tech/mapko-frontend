import { defineStore } from "pinia";

export interface Lien {
  id: string;
  facebook?: string;
  linkedin?: string;
  x?: string;
  created_at: string;
  updated_at: string;
}

export const useLienStore = defineStore("lien", {
  state: () => ({
    lien: null as Lien | null,
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/liens");
        this.lien = res;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async update(id: string, data: { facebook?: string; linkedin?: string; x?: string }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/liens/${id}`, {
          method: "PUT",
          body: data,
        });

        this.lien = res.data;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
