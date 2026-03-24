import { defineStore } from "pinia";

export interface BlogImage {
  id: string;
  path: string;
  blog_id: string;
  is_couverture: boolean;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  titre: string;
  contenu: string;
  categorie: string;
  images: BlogImage[];
  created_at: string;
  updated_at: string;
}

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [] as Blog[],
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/blogs");
        this.blogs = res || [];
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
        const res: any = await $api(`/blogs/${id}`);
        return res as Blog;
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
        const res: any = await $api("/blogs", {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        this.blogs.unshift(res.data);
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

        const res: any = await $api(`/blogs/${id}`, {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        const index = this.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
          this.blogs[index] = res;
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
        await $api(`/blogs/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.blogs = this.blogs.filter(b => b.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
