<template>
  <div class="secteurs-page">
    <!-- HERO -->
    <section class="secteurs-hero">
      <div class="secteurs-hero__bg">
        <img src="/images/sector-agro.png" alt="Secteurs Mapko" class="secteurs-hero__img" />
        <div class="secteurs-hero__overlay" />
      </div>
      <div class="secteurs-hero__container" :class="{ 'is-visible': isHeroVisible }">
        <h1 class="secteurs-hero__eyebrow animate-reveal">Nos Secteurs</h1>
        <h2 class="secteurs-hero__title animate-reveal">
          Une expertise pointue pour des enjeux stratégiques
        </h2>
        <p class="secteurs-hero__subtitle animate-reveal">
          Nous intervenons dans plusieurs secteurs clés pour accompagner les entreprises et institutions dans leur transformation stratégique et financière.
        </p>
      </div>
    </section>

    <!-- GRID -->
    <section class="secteurs-grid-section">
      <div class="secteurs-grid-section__container">
        <!-- Loader spécifique pour les données -->
        <AdminLoader :visible="secteurStore.loading && secteurStore.secteurs.length === 0" inline />

        <!-- Message si vide -->
        <div v-if="!secteurStore.loading && secteurStore.secteurs.length === 0" class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
           <p class="text-lg font-medium text-gray-900">Aucun secteur d'activité répertorié pour le moment.</p>
           <p class="text-gray-500 mt-2">Nous mettons à jour nos pôles d'expertise régulièrement.</p>
        </div>

        <div v-if="secteurStore.secteurs.length > 0" class="secteurs-grid" ref="secteursSection" :class="{ 'is-visible': isVisible }">
          <div 
            v-for="(sector, index) in shuffledSecteurs" 
            :key="sector.id"
            class="sector-card animate-reveal"
            :style="{ 'animation-delay': (index * 0.1) + 's' }"
          >
            <div class="sector-card__bg">
              <img :src="getImageUrl(sector.image) || '/images/sector-agro.png'" :alt="sector.titre" class="sector-card__img" />
              <div class="sector-card__overlay" />
            </div>
            <div class="sector-card__content">
              <h3 class="sector-card__title">{{ sector.titre }}</h3>
              <p class="sector-card__tagline">{{ sector.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSecteurStore } from '~~/stores/secteur'

const secteurStore = useSecteurStore()
const config = useRuntimeConfig()

const secteursSection = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHeroVisible = ref(false)

const shuffledSecteurs = computed(() => {
  return [...secteurStore.secteurs].sort(() => Math.random() - 0.5)
})

const getImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.public.storageBase}/${path}`;
};

onMounted(() => {
  isHeroVisible.value = true
  secteurStore.fetch()
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) isVisible.value = true
  }, { threshold: 0.1 })
  if (secteursSection.value) observer.observe(secteursSection.value)
})

useHead({
  title: 'Nos Secteurs - Mapko & Partners',
  meta: [
    { name: 'description', content: 'Découvrez les secteurs d\'intervention de Mapko & Partners : Finance, Énergie, Agro-business, Infrastructure, etc.' }
  ]
})
</script>

<style scoped>
.secteurs-page {
  background: #ffffff;
}

/* ── HERO ── */
.secteurs-hero {
  position: relative;
  padding: 5rem 1.5rem 8rem;
  background: #0d121f;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
}

.secteurs-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.secteurs-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px) brightness(0.4);
  transform: scale(1.1); /* Pour éviter les bords blancs du blur */
}

.secteurs-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13, 18, 31, 0.4), rgba(13, 18, 31, 0.8));
}

.secteurs-hero__container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.secteurs-hero__eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-violet-light);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}

.secteurs-hero__title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.secteurs-hero__subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 750px;
  margin: 0 auto;
}

/* ── GRID ── */
.secteurs-grid-section {
  padding: 6rem 1.5rem 10rem;
}

.secteurs-grid-section__container {
  max-width: 1280px;
  margin: 0 auto;
}

.secteurs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.sector-card {
  position: relative;
  height: 480px;
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  align-items: flex-end;
  padding: 2.5rem;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.sector-card__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.sector-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.sector-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13, 18, 31, 0) 20%, rgba(13, 18, 31, 0.95) 100%);
  transition: opacity 0.4s ease;
}

.sector-card__content {
  position: relative;
  z-index: 1;
  color: #ffffff;
  width: 100%;
}

.sector-card__icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.25rem;
  color: var(--color-violet-light);
  opacity: 0.9;
  transition: transform 0.4s ease;
}

.sector-card__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.sector-card__tagline {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

/* ── HOVER ── */
.sector-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.sector-card:hover .sector-card__img {
  transform: scale(1.1);
}

.sector-card:hover .sector-card__tagline {
  opacity: 1;
  transform: translateY(0);
}

.sector-card:hover .sector-card__icon {
  transform: scale(1.1) rotate(-5deg);
}

/* ── ANIMATIONS ── */
.animate-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.is-visible .animate-reveal {
  opacity: 1;
  transform: translateY(0);
}

/* ── MOBILE ── */
@media (max-width: 640px) {
  .secteurs-grid {
    grid-template-columns: 1fr;
  }
  .sector-card {
    height: 400px;
    padding: 2rem;
  }
  .sector-card__tagline {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
