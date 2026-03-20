<template>
  <div class="sector-detail" v-if="sector">
    <!-- HERO SECTEUR -->
    <section class="sector-hero">
      <div class="sector-hero__bg">
        <img :src="sector.image" :alt="sector.title" class="sector-hero__img" />
        <div class="sector-hero__overlay" />
      </div>
      <div class="sector-hero__container">
        <NuxtLink to="/secteurs" class="sector-hero__back animate-reveal">
          <span class="arrow">←</span> Tous les secteurs
        </NuxtLink>
        <h1 class="sector-hero__title animate-reveal">{{ sector.title }}</h1>
        <p class="sector-hero__subtitle animate-reveal">{{ sector.tagline }}</p>
      </div>
    </section>

    <!-- CONTENT SECTEUR -->
    <section class="sector-content">
      <div class="sector-content__container">
        <div class="sector-content__grid">
          
          <!-- Sidebar: Services/Expertises -->
          <aside class="sector-sidebar">
            <div class="services-card">
              <h3 class="services-title">Nos expertises {{ sector.title }}</h3>
              <ul class="services-list">
                <li v-for="service in sector.services" :key="service">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                  </svg>
                  {{ service }}
                </li>
              </ul>
            </div>
            
            <div class="cta-card">
              <h4>Un projet dans ce secteur ?</h4>
              <p>Nos experts vous accompagnent dans votre structuration.</p>
              <NuxtLink to="/contact" class="btn-cta">Prendre contact</NuxtLink>
            </div>
          </aside>

          <!-- Main Text -->
          <main class="sector-main">
            <div class="sector-main__body">
              <h2 class="sector-main__heading">Accompagner la transformation</h2>
              <p class="sector-main__text text-justify">
                {{ sector.description }}
              </p>
              <p class="sector-main__text text-justify">
                {{ sector.details }}
              </p>
              
              <div class="sector-main__quote">
                « Notre objectif est d'apporter des solutions innovantes et structurées pour transformer les défis de ce secteur en leviers de croissance durable. »
              </div>
            </div>
          </main>

        </div>
      </div>
    </section>

    <!-- AUTRES SECTEURS -->
    <section class="related-sectors">
      <div class="related-sectors__container">
        <h3 class="related-title">Autres secteurs d'intervention</h3>
        <div class="related-grid">
          <NuxtLink 
            v-for="other in otherSectors" 
            :key="other.slug"
            :to="`/secteurs/${other.slug}`"
            class="related-card"
          >
            <span class="related-card__name">{{ other.title }}</span>
            <span class="arrow">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { sectors, type Sector } from '~/data/sectors'

const route = useRoute()
const sectorContent = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHeroVisible = ref(false)

onMounted(() => {
  isHeroVisible.value = true
  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) isVisible.value = true
  }, { threshold: 0.1 })
  if (sectorContent.value) observer.observe(sectorContent.value)
})

const sector = computed<Sector | undefined>(() => {
  return sectors.find(s => s.slug === route.params.slug)
})

const otherSectors = computed(() => {
  return sectors.filter(s => s.slug !== route.params.slug).slice(0, 3)
})

useHead({
  title: sector.value ? `${sector.value.title} - Mapko & Partners` : 'Secteur d\'activité',
  meta: [
    { name: 'description', content: sector.value?.description }
  ]
})
</script>

<style scoped>
.sector-detail {
  background: #ffffff;
}

/* ── HERO ── */
.sector-hero {
  position: relative;
  height: 450px;
  display: flex;
  align-items: center;
  color: #ffffff;
  overflow: hidden;
}

.sector-hero__bg {
  position: absolute;
  inset: 0;
}

.sector-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sector-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(13, 18, 31, 0.4), rgba(13, 18, 31, 0.85));
}

.sector-hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
  width: 100%;
}

.sector-hero__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
}

.sector-hero__back:hover { color: #ffffff; }

.sector-hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.sector-hero__subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.9);
}

/* ── CONTENT ── */
.sector-content {
  padding: 8rem 1.5rem;
}

.sector-content__container {
  max-width: 1200px;
  margin: 0 auto;
}

.sector-content__grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 5rem;
}

/* Sidebar */
.services-card {
  background: #f9fafb;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  margin-bottom: 2rem;
}

.services-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 2rem;
}

.services-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.services-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.4;
}

.services-list li svg {
  width: 20px;
  height: 20px;
  color: var(--color-violet);
  flex-shrink: 0;
  margin-top: 2px;
}

.cta-card {
  background: var(--color-blue);
  color: #ffffff;
  padding: 2.5rem;
  border-radius: 24px;
}

.cta-card h4 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-card p {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.btn-cta {
  display: block;
  width: 100%;
  padding: 1rem;
  background: var(--color-violet);
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  transition: transform 0.3s ease;
}

.btn-cta:hover { transform: translateY(-3px); }

/* Main Content */
.sector-main__heading {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 2.5rem;
}

.sector-main__text {
  font-size: 1.15rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.sector-main__quote {
  margin-top: 4rem;
  padding: 3rem;
  background: #fdf2ff;
  border-left: 6px solid var(--color-violet);
  border-radius: 0 24px 24px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-violet);
  font-style: italic;
  line-height: 1.6;
}

/* Related */
.related-sectors {
  padding-bottom: 8rem;
}

.related-sectors__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  border-top: 1px solid #f0f0f0;
  padding-top: 5rem;
}

.related-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 3rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.related-card {
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.related-card__name {
  font-weight: 700;
  color: var(--color-blue);
  font-size: 1.1rem;
}

.related-card .arrow {
  color: var(--color-violet);
  transition: transform 0.3s ease;
}

.related-card:hover {
  border-color: var(--color-violet);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
}

.related-card:hover .arrow { transform: translateX(5px); }

/* ── MOBILE ── */
@media (max-width: 1024px) {
  .sector-content__grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 640px) {
  .sector-hero { height: 350px; }
  .sector-main__heading { font-size: 1.5rem; }
  .sector-main__quote { padding: 2rem; font-size: 1.1rem; }
}
</style>
