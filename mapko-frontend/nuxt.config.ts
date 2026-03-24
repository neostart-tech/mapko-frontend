// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      // apiBase: "http://localhost:8000/api",
      // storageBase: "http://localhost:8000/storage",
      apiBase: "https://dashboard.mapko-partners.com/api",
      storageBase: "https://dashboard.mapko-partners.com/storage",
    },
  },

  app: {
    head: {
      title: "MAPKO - Conseil Stratégique & Financier",
      meta: [
        {
          name: "description",
          content:
            "Cabinet de conseil stratégique, financier et organisationnel en Afrique",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/images/logo_mixte.png" },
        // Google Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap",
        },
      ],
    },
  },

  modules: ["@pinia/nuxt", "nuxt-toast"],
});