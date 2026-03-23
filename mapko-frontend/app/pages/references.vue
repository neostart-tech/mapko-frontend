<template>
  <div class="references-page">
    
    <!-- HERO -->
    <section class="ref-hero">
      <div class="ref-hero__bg">
        <img src="/images/reference-bg.jpg" alt="Références Mapko" class="ref-hero__img" />
        <div class="ref-hero__overlay" />
      </div>
      <div class="ref-hero__container">
        <h1 class="ref-hero__eyebrow reveal">Nos Références</h1>
        <h2 class="ref-hero__title reveal delay-100">
          Des projets structurants pour l'avenir de l'Afrique
        </h2>
        <p class="ref-hero__subtitle reveal delay-200">
          Nos références témoignent de notre expertise et de la confiance que nous accordent nos partenaires publics, privés et institutionnels.
        </p>

        <!-- DOMAINES intégrés au Hero -->
        <div class="ref-hero__domains domains-wrapper reveal delay-300">
          <span v-for="domain in domains" :key="domain" class="domain-badge">
            <span class="domain-badge__icon" />
            {{ domain }}
          </span>
        </div>
      </div>
    </section>

    <!-- PROJECTS GRID -->
    <section class="ref-projects">
      <div class="ref-projects__container">
        <!-- Loader spécifique pour les données -->
        <AdminLoader :visible="referenceStore.references.length === 0" inline />

        <div v-if="referenceStore.references.length > 0" class="projects-grid">
          <div 
            v-for="(project, index) in referenceStore.references" 
            :key="project.id"
            class="project-card reveal"
            :style="{ 'transition-delay': (index * 0.1) + 's' }"
          >
            <div class="project-card__header">
              <span class="project-card__category" v-if="project.secteur">{{ project.secteur.titre }}</span>
              <span class="project-card__status" :class="project.statut === 'en_cours' ? 'status--active' : 'status--done'">
                {{ project.statut === 'en_cours' ? 'En cours' : 'Terminé' }}
              </span>
            </div>
            <h3 class="project-card__title">{{ project.titre }}</h3>
            <div class="project-card__meta">
              <div class="meta-item">
                <span class="meta-label">Montant</span>
                <span class="meta-value">{{ project.montant || 'Confidentiel' }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Période</span>
                <span class="meta-value text-nowrap">
                   {{ project.annee_debut }}{{ project.annee_fin ? ` — ${project.annee_fin}` : '' }}
                </span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Pays</span>
                <span class="meta-value">{{ project.pays }}</span>
              </div>
            </div>
            <p class="project-card__desc" v-html="project.description"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- CLIENTS / LOGOS -->
    <section class="ref-clients">
      <div class="ref-clients__container">
        <h3 class="clients-title text-balance">Nous avons eu à intervenir pour leur compte sur des thématiques variées :</h3>
        <p class="clients-subtitle">stratégie, études, finance, capital humain, risques…</p>
      </div>

      <div class="logos-carousel">
        <!-- Loader spécifique pour les partenaires -->
        <AdminLoader :visible="partenaireStore.partenaires.length === 0" inline />

        <div class="logos-track" v-if="partenaireStore.partenaires.length > 0">
          <!-- Premier set -->
          <div v-for="partenaire in partenaireStore.partenaires" :key="'a-'+partenaire.id" class="logo-box" :title="partenaire.nom">
             <img v-if="partenaire.logo" :src="getImageUrl(partenaire.logo)" :alt="partenaire.nom" class="carousel-img" />
             <div v-else class="logo-placeholder">{{ partenaire.nom }}</div>
          </div>
          <!-- Second set pour boucle infinie -->
          <div v-for="partenaire in partenaireStore.partenaires" :key="'b-'+partenaire.id" class="logo-box" :title="partenaire.nom">
             <img v-if="partenaire.logo" :src="getImageUrl(partenaire.logo)" :alt="partenaire.nom" class="carousel-img" />
             <div v-else class="logo-placeholder">{{ partenaire.nom }}</div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReferenceStore } from '~~/stores/reference'
import { usePartenaireStore } from '~~/stores/partenaire'
import { domains } from '~/data/references'

const referenceStore = useReferenceStore()
const partenaireStore = usePartenaireStore()
const config = useRuntimeConfig()

const getImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.public.storageBase}/${path}`;
};

onMounted(async () => {
  referenceStore.fetch()
  partenaireStore.fetch()
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

/* ── CLIENTS CAROUSEL ── */
.ref-clients {
  padding: 8rem 0;
  background: #fcfcfc;
  overflow: hidden;
}

.ref-clients__container {
  max-width: 1100px;
  margin: 0 auto 4rem;
  text-align: center;
  padding: 0 1.5rem;
}

.clients-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.clients-subtitle {
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.85rem;
  font-weight: 700;
}

.logos-carousel {
  position: relative;
  width: 100%;
  display: flex;
}

/* Gradients for fading edges */
.logos-carousel::before,
.logos-carousel::after {
  content: "";
  position: absolute;
  top: 0;
  width: 200px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.logos-carousel::before { left: 0; background: linear-gradient(to right, #fcfcfc, transparent); }

.logos-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: scroll 40s linear infinite;
  gap: 2.5rem;
  padding: 0 1.25rem;
}

.logos-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.logo-box {
  flex: 0 0 240px;
  height: 120px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  user-select: none;
}

.logo-box:hover {
  border-color: var(--color-violet-light);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.carousel-img {
  max-height: 65px;
  max-width: 170px;
  object-fit: contain;
  transition: all 0.4s ease;
}

.logo-box:hover .carousel-img {
  transform: scale(1.05);
}

.logo-placeholder {
  font-size: 0.8rem;
  font-weight: 700;
  color: #d1d5db;
  text-transform: uppercase;
}

/* ── ANIMATIONS ── */
/* Animations gérées globalement par .reveal */

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
