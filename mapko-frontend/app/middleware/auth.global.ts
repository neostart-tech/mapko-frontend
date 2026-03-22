// middleware/auth.global.ts
import { navigateTo } from "#imports";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  // Vérifie que le code s'exécute côté client
  if (!import.meta.client) {
    return;
  }

  const auth = useAuthStore();

  // Si on est sur une page d'administration, mais pas le login admin
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    // Si l'utilisateur n'est pas connecté
    if (!auth.isLogged) {
      return navigateTo('/admin/login');
    }
  }
});
