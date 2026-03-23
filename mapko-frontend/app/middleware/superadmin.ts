// middleware/superadmin.ts
import { navigateTo } from '#imports'
import { useAuthStore } from '~~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) return

  const auth = useAuthStore()

  if (!auth.isLogged || auth.user?.role !== 'superadmin') {
    return navigateTo('/admin')
  }
})
