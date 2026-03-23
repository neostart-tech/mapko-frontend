import { defineStore } from 'pinia'

interface Admin {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  role: string
  created_at: string
  updated_at: string
}

interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

function parseApiError(error: any): ApiError {
  if (typeof error === 'string') return { message: 'Erreur serveur.' }
  return {
    message: error?.message || 'Une erreur est survenue.',
    errors: error?.errors,
  }
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admins: [] as Admin[],
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp()
      this.loading = true
      try {
        this.admins = await $api('/admins') as Admin[]
      } catch (error: any) {
        throw parseApiError(error)
      } finally {
        this.loading = false
      }
    },

    async create(data: {
      nom: string
      prenom: string
      email: string
      telephone?: string
    }) {
      const { $api } = useNuxtApp()
      try {
        const res: any = await $api('/admins', { method: 'POST', body: data })
        this.admins.unshift(res.admin)
        return res
      } catch (error: any) {
        throw parseApiError(error)
      }
    },

    async update(
      id: string,
      data: {
        nom: string
        prenom: string
        email: string
        telephone?: string
        password?: string
        password_confirmation?: string
      }
    ) {
      const { $api } = useNuxtApp()
      try {
        const res: any = await $api(`/admins/${id}`, { method: 'PUT', body: data })
        const idx = this.admins.findIndex((a) => a.id === id)
        if (idx !== -1) this.admins[idx] = res.admin
        return res
      } catch (error: any) {
        throw parseApiError(error)
      }
    },

    async remove(id: string) {
      const { $api } = useNuxtApp()
      try {
        await $api(`/admins/${id}`, { method: 'DELETE' })
        this.admins = this.admins.filter((a) => a.id !== id)
      } catch (error: any) {
        throw parseApiError(error)
      }
    },
  },
})
