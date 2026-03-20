<template>
  <div class="references-page">
    
    <!-- HERO -->
    <section class="ref-hero">
      <div class="ref-hero__bg">
        <img src="/images/reference-bg.jpg" alt="Références Mapko" class="ref-hero__img" />
        <div class="ref-hero__overlay" />
      </div>
      <div class="ref-hero__container" :class="{ 'is-visible': isHeroVisible }">
        <h1 class="ref-hero__eyebrow animate-reveal">Nos Références</h1>
        <h2 class="ref-hero__title animate-reveal">
          Des projets structurants pour l'avenir de l'Afrique
        </h2>
        <p class="ref-hero__subtitle animate-reveal">
          Nos références témoignent de notre expertise et de la confiance que nous accordent nos partenaires publics, privés et institutionnels.
        </p>

        <!-- DOMAINES intégrés au Hero -->
        <div class="ref-hero__domains domains-wrapper animate-reveal">
          <span v-for="domain in domains" :key="domain" class="domain-badge">
            <span class="domain-badge__icon" />
            {{ domain }}
          </span>
        </div>
      </div>
    </section>

    <!-- PROJECTS GRID -->
    <section class="ref-projects" ref="projectsSection" :class="{ 'is-visible': isVisible }">
      <div class="ref-projects__container">
        <div class="projects-grid">
          <div 
            v-for="(project, index) in projects" 
            :key="project.title"
            class="project-card animate-reveal"
            :style="{ 'animation-delay': (index * 0.1) + 's' }"
          >
            <div class="project-card__header">
              <span class="project-card__category">{{ project.category }}</span>
              <span class="project-card__status" :class="project.status === 'En cours' ? 'status--active' : 'status--done'">
                {{ project.status }}
              </span>
            </div>
            <h3 class="project-card__title">{{ project.title }}</h3>
            <div class="project-card__meta">
              <div class="meta-item">
                <span class="meta-label">Montant</span>
                <span class="meta-value">{{ project.amount }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Année</span>
                <span class="meta-value">{{ project.year }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Pays</span>
                <span class="meta-value">{{ project.country }}</span>
              </div>
            </div>
            <p class="project-card__desc">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CLIENTS / LOGOS -->
    <section class="ref-clients">
      <div class="ref-clients__container">
        <h3 class="clients-title">Ils nous font confiance</h3>
        <p class="clients-subtitle">Banques, Institutions, Bailleurs de fonds, Gouvernements</p>
        
        <div class="logos-wall">
          <div v-for="i in 12" :key="i" class="logo-box">
             <div class="logo-placeholder">PARTENAIRE #{{ i }}</div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { projects, domains } from '~/data/references'

const projectsSection = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHeroVisible = ref(false)

onMounted(() => {
  isHeroVisible.value = true
  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) isVisible.value = true
  }, { threshold: 0.1 })
  if (projectsSection.value) observer.observe(projectsSection.value)
})

useHead({
  title: 'Nos Références - Mapko & Partners',
  meta: [
    { name: 'description', content: 'Découvrez nos références et projets structurants en Afrique.' }
  ]
})
</script>

<style scoped>
.references-page {
  background: #ffffff;
}

/* ── HERO ── */
.ref-hero {
  position: relative;
  padding: 8rem 1.5rem 8rem;
  background: #0d121f;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
}

.ref-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.ref-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px) brightness(0.4);
  transform: scale(1.1);
}

.ref-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13, 18, 31, 0.4), rgba(13, 18, 31, 0.95));
}

.ref-hero__container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.ref-hero__eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-violet-light);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}

.ref-hero__title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.ref-hero__subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.ref-hero__domains {
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.domain-badge {
  padding: 0.6rem 1.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-weight: 700;
  color: #ffffff;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  backdrop-filter: blur(10px);
}

.domain-badge__icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-violet-light);
  box-shadow: 0 0 10px var(--color-violet-light);
}

.domain-badge:hover {
  border-color: var(--color-violet);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* ── PROJECTS ── */
.ref-projects {
  padding: 8rem 1.5rem;
}

.ref-projects__container {
  max-width: 1200px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.project-card {
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
  border-color: var(--color-violet-light);
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.project-card__category {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--color-violet);
  text-transform: uppercase;
}

.project-card__status {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.status--active { background: #fff5e6; color: #d97706; }
.status--done { background: #f0fdf4; color: #16a34a; }

.project-card__title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.project-card__meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.7rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.meta-value {
  font-weight: 700;
  color: var(--color-blue);
  font-size: 1rem;
}

.project-card__desc {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* ── CLIENTS ── */
.ref-clients {
  padding: 8rem 1.5rem;
}

.ref-clients__container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.clients-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 1rem;
}

.clients-subtitle {
  color: #6b7280;
  margin-bottom: 5rem;
}

.logos-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.logo-box {
  height: 110px;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.logo-box:hover {
  border-color: var(--color-violet-light);
  transform: scale(1.05);
}

.logo-placeholder {
  font-size: 0.75rem;
  font-weight: 700;
  color: #d1d5db;
  text-transform: uppercase;
}

/* ── ANIMATIONS ── */
.animate-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.ref-hero__container.is-visible .animate-reveal,
.ref-projects.is-visible .animate-reveal {
  opacity: 1;
  transform: translateY(0);
}

/* ── MOBILE ── */
@media (max-width: 640px) {
  .ref-hero { padding: 6rem 1rem 4rem; }
  .ref-hero__title { font-size: 2.1rem; }
  .ref-hero__domains { gap: 0.5rem; margin-top: 3rem; justify-content: flex-start; }
  .domain-badge { padding: 0.4rem 0.8rem; font-size: 0.75rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .project-card { padding: 1.5rem; }
}
</style>
