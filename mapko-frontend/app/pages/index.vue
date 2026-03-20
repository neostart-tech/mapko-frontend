<template>
  <div class="home-page">
    
    <!-- 1. HERO SECTION -->
    <section class="hero">
      <div class="hero__bg">
        <img src="/images/hero-bg.jpg" alt="Background Mapko" class="hero__img" />
        <div class="hero__overlay" />
      </div>
      <div class="hero__content">
        <div class="hero__inner">
          <h1 class="hero__title animate-reveal">
            <span class="hero__title-line-highlight">{{ typedText }}<span class="typewriter-cursor">|</span></span>
          </h1>
          <p class="hero__subtitle animate-fade-in">
            Cabinet de conseil stratégique, financier et organisationnel en Afrique
          </p>
          <div class="hero__actions">
            <a href="#expertises" class="hero__btn hero__btn--primary">
              Découvrir nos expertises
            </a>
            <NuxtLink to="/contact" class="hero__btn hero__btn--outline">
              Nous contacter
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. CHIFFRES CLÉS (STATS) -->
    <section class="stats animate-reveal" ref="statsSection">
      <div class="stats__inner">
        <div v-for="(stat, idx) in statsData" :key="idx" class="stats__item">
          <div class="stats__val">
            <span class="stats__val-plus">+</span>
            <span class="stats__val-num">{{ Math.floor(stat.current) }}{{ stat.suffix }}</span>
          </div>
          <div class="stats__label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- 3. NOS EXPERTISES -->
    <section class="expertise" id="expertises">
      <div class="expertise__container">
        <div class="expertise__header">
          <h2 class="section-eyebrow">Nos Expertises</h2>
          <h3 class="section-title">Conseil de haut niveau pour projets d'envergure</h3>
        </div>
        <div class="expertise__grid">
          <div v-for="(exp, idx) in expertises" :key="idx" class="exp-card animate-reveal" :style="{ 'animation-delay': (idx * 0.1) + 's' }">
            <div class="exp-card__icon" v-html="exp.icon" />
            <h4 class="exp-card__title">{{ exp.title }}</h4>
            <p class="exp-card__desc">{{ exp.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. SECTEURS D'ACTIVITÉS -->
    <section class="sectors" id="secteurs">
      <div class="sectors__container">
        <div class="sectors__header">
          <div class="sectors__badge">
            <h2 class="sectors__badge-title">SECTEURS D’ACTIVITÉS CLÉS</h2>
          </div>
        </div>
        
        <div class="sectors__list">
          <div v-for="(sector, idx) in sectors" :key="idx" class="sector-line animate-reveal" :style="{ 'animation-delay': (idx * 0.05) + 's' }">
            <div class="sector-line__icon">
              <!-- Utilisation d'icônes SVG simplifiées -->
              <div v-if="sector.icon === 'agro'" class="s-icon">🌾</div>
              <div v-if="sector.icon === 'bank'" class="s-icon">🏦</div>
              <div v-if="sector.icon === 'energy'" class="s-icon">⚡</div>
              <div v-if="sector.icon === 'edu'" class="s-icon">📚</div>
              <div v-if="sector.icon === 'industry'" class="s-icon">🏭</div>
              <div v-if="sector.icon === 'infra'" class="s-icon">🏗️</div>
              <div v-if="sector.icon === 'digital'" class="s-icon">💻</div>
              <div v-if="sector.icon === 'health'" class="s-icon">⚕️</div>
              <div v-if="sector.icon === 'sport'" class="s-icon">🏅</div>
              <div v-if="sector.icon === 'tech'" class="s-icon">⚙️</div>
              <div v-if="sector.icon === 'logistics'" class="s-icon">🚚</div>
            </div>
            <span class="sector-line__label">{{ sector.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. PROJETS RÉCENTS -->
    <section class="projects animate-reveal" id="projets" ref="projectsSection">
      <div class="projects__container">
        <div class="projects__header">
          <h2 class="section-eyebrow section-eyebrow--light">Réalisations récentes</h2>
          <h3 class="section-title section-title--light">Des chiffres qui témoignent de notre engagement</h3>
        </div>
        <div class="projects__timeline">
          <div v-for="(project, idx) in recentProjects" :key="idx" class="project-card">
            <div class="project-card__info">
              <span class="project-card__tag">{{ project.category }}</span>
              <h4 class="project-card__title">{{ project.label }}</h4>
            </div>
            <div class="project-card__value">
              <span class="p-greater">></span>
              <span class="p-num">{{ Math.floor(project.currentValue) }}</span>
              <span class="p-suffix">{{ project.suffix }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. POURQUOI MAPKO -->
    <section class="why">
      <div class="why__container">
        <!-- Gauche : Titre et Argument -->
        <div class="why__intro">
          <h2 class="section-eyebrow">Pourquoi MAPKO ?</h2>
          <h3 class="section-title">L'alliance de l'expertise globale et de l'ancrage local.</h3>
          <p class="why__intro-text text-justify">
            Nous accompagnons les décideurs africains dans la transformation de leurs organisations avec une rigueur internationale et une compréhension profonde des réalités du terrain.
          </p>
          <div class="why__btn-wrap">
            <NuxtLink to="/a-propos" class="why__link">
              En savoir plus sur notre ADN
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Droite : Les points forts -->
        <div class="why__grid">
          <div v-for="(reason, idx) in reasons" :key="idx" class="why-item animate-reveal" :style="{ 'animation-delay': (idx * 0.2) + 's' }">
            <div class="why-item__icon" v-html="reason.icon" />
            <div class="why-item__text">
              <h4 class="why-item__title">{{ reason.title }}</h4>
              <p class="why-item__desc">{{ reason.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const typedText = ref('')
const phrases = [
  "Chaque défi est une opportunité de grandir.",
  "Transformer vos défis en leviers de croissance",
  "Donner du sens à vos ambitions stratégiques",
  "Bâtir aujourd’hui les succès de demain",
  "Structurer, transformer, performer"
]

let phraseIndex = 0
let isDeleting = false
let typingSpeed = 100

const typeLoop = () => {
  const currentPhrase = phrases[phraseIndex] || ''
  
  if (isDeleting) {
    typedText.value = currentPhrase.substring(0, typedText.value.length - 1)
    typingSpeed = 50 // faster when deleting
  } else {
    typedText.value = currentPhrase.substring(0, typedText.value.length + 1)
    typingSpeed = 100
  }

  // If word is complete
  if (!isDeleting && typedText.value === currentPhrase) {
    isDeleting = true
    typingSpeed = 2000 // wait before deleting
  } else if (isDeleting && typedText.value === '') {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typingSpeed = 500 // wait before next word
  }

  setTimeout(typeLoop, typingSpeed)
}

const statsSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
let hasAnimatedStats = false
let hasAnimatedProjects = false

const animateStats = () => {
  if (hasAnimatedStats) return
  hasAnimatedStats = true

  const duration = 1500
  const frameRate = 16
  const totalFrames = duration / frameRate

  statsData.value.forEach(stat => {
    let frame = 0
    const increment = stat.value / totalFrames
    const counter = setInterval(() => {
      frame++
      stat.current = Math.min(increment * frame, stat.value)
      if (frame >= totalFrames) {
        clearInterval(counter)
        stat.current = stat.value
      }
    }, frameRate)
  })
}

const animateProjects = () => {
  if (hasAnimatedProjects) return
  hasAnimatedProjects = true

  const duration = 2000 // Slighly slower for impact
  const frameRate = 16
  const totalFrames = duration / frameRate

  recentProjects.value.forEach(project => {
    let frame = 0
    const increment = project.val / totalFrames
    const counter = setInterval(() => {
      frame++
      project.currentValue = Math.min(increment * frame, project.val)
      if (frame >= totalFrames) {
        clearInterval(counter)
        project.currentValue = project.val
      }
    }, frameRate)
  })
}

onMounted(() => {
  setTimeout(typeLoop, 800)

  const observerOptions = { threshold: 0.3 }

  // Observer pour les statistiques
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) animateStats()
  }, observerOptions)

  // Observer pour les projets
  const projectsObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) animateProjects()
  }, observerOptions)

  if (statsSection.value) statsObserver.observe(statsSection.value)
  if (projectsSection.value) projectsObserver.observe(projectsSection.value)
})

const statsData = ref([
  { value: 10,  current: 0, label: "ans d’expérience", suffix: "" },
  { value: 10,  current: 0, label: "pays couverts", suffix: "" },
  { value: 100, current: 0, label: "projets accompagnés", suffix: "" },
  { value: 80,  current: 0, label: "de projets structurés", suffix: "M€" },
])

const expertises = [
  {
    title: 'Stratégie',
    desc: 'Accompagnement dans la vision à long terme et le positionnement marché.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m1.861-4.413a3.562 3.562 0 0 1 1.66-1.66m-1.66 1.66L9.41 12.01L7.54 10.14l1.171-1.171a3.562 3.562 0 0 1 1.66-1.662L9.41 8.41Z" /></svg>'
  },
  {
    title: 'Finance',
    desc: 'Audit financier, levée de fonds et structuration de projets.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125V18.75m-1.125 1.125h-4.46a45.6 45.6 0 0 1-5.803-1.077 45.322 45.322 0 0 0-5.803-1.077l-4.46.101" /></svg>'
  },
  {
    title: 'Transformation',
    desc: 'Réingénierie des processus et pilotage du changement.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>'
  },
  {
    title: 'Gestion des risques',
    desc: 'Anticipation, évaluation et maîtrise des risques opérationnels.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.958 11.958 0 0 1 12 2.714Z" /></svg>'
  },
  {
    title: 'Systèmes d\'information',
    desc: 'Transformation digitale et sécurisation du patrimoine informatique.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>'
  },
  {
    title: 'Capital humain',
    desc: 'Développement des compétences et gestion de la performance.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0a5.995 5.995 0 0 0-4.058-3.006L12 12.003l-.001-.001a5.997 5.997 0 0 0-4.058 3.006 6.037 6.037 0 0 0-.941 3.197m0 0a5.997 5.997 0 0 1 1.584-3.963C7.61 12.427 9.646 12 12 12s4.39 0 5.416.427a6.002 6.002 0 0 1 1.584 3.963" /></svg>'
  },
]

const sectors = [
  { label: 'AGRO-BUSINESS', icon: 'agro' },
  { label: 'BANQUE, SERVICES FINANCIERS ET FINTECH', icon: 'bank' },
  { label: 'EAU, MINES ET ENERGIES', icon: 'energy' },
  { label: 'EDUCATION', icon: 'edu' },
  { label: 'INDUSTRIE', icon: 'industry' },
  { label: 'INFRASTRUCTURE', icon: 'infra' },
  { label: 'NUMÉRIQUE', icon: 'digital' },
  { label: 'SANTÉ', icon: 'health' },
  { label: 'SPORT', icon: 'sport' },
  { label: 'TECHNOLOGIE, MEDIA ET TELECOM', icon: 'tech' },
  { label: 'TRANSPORT ET LOGISTIQUE', icon: 'logistics' },
]

const recentProjects = ref([
  { label: 'Projet Logistique', val: 80, currentValue: 0, suffix: 'M€', category: 'Infrastructure' },
  { label: 'Projet Gazier',     val: 30, currentValue: 0, suffix: 'M€', category: 'Énergie' },
  { label: 'Projet Immobilier', val: 50, currentValue: 0, suffix: 'M€', category: 'Développement' },
])

const reasons = [
  {
    title: 'Expertise internationale',
    desc: 'Un savoir-faire global adapté aux spécificités des marchés africains.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>'
  },
  {
    title: 'Solutions sur mesure',
    desc: 'Des interventions personnalisées répondant précisément à vos enjeux locaux.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>'
  },
  {
    title: 'Approche orientée résultats',
    desc: 'Une culture de la performance focalisée sur la création de valeur durable.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>'
  },
]
</script>

<style scoped>
/* ── GÉNÉRAL ── */
.home-page {
  width: 100%;
}

.section-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-violet);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}
.section-eyebrow--light { color: var(--color-violet-light); }

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--color-blue);
  line-height: 1.25;
}
.section-title--light { color: #ffffff; }

/* ── 1. HERO ── */
.hero {
  position: relative;
  height: min(90vh, 1000px);
  min-height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #ffffff;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero__inner {
  max-width: 800px;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero__title-line-highlight {
  display: block;
  color: #ffffff;
}

.hero__subtitle {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.hero__btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.hero__btn--primary {
  background: var(--color-violet);
  color: #ffffff;
}
.hero__btn--primary:hover {
  background: var(--color-blue);
  transform: translateY(-2px);
}

.hero__btn--outline {
  border: 2px solid #ffffff;
  color: #ffffff;
}
.hero__btn--outline:hover {
  background: #ffffff;
  color: var(--color-violet);
  transform: translateY(-2px);
}

/* ── 2. STATS ── */
.stats {
  background: var(--color-blue);
  color: #ffffff;
  padding: 4rem 1.5rem;
}

.stats__inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stats__item {
  text-align: center;
  position: relative;
}

.stats__val {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.stats__val-plus { color: var(--color-violet-light); }

.stats__label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

/* ── 3. EXPERTISES ── */
.expertise {
  padding: 6rem 1.5rem;
  background: #f9fafb;
}

.expertise__container {
  max-width: 1280px;
  margin: 0 auto;
}

.expertise__header {
  text-align: center;
  margin-bottom: 4rem;
}

.expertise__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.exp-card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.exp-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-violet-light);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.exp-card__icon {
  width: 50px;
  height: 50px;
  color: var(--color-violet);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}
.exp-card:hover .exp-card__icon { transform: scale(1.1); color: var(--color-violet-dark); }

.exp-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-blue);
  margin-bottom: 0.75rem;
}

.exp-card__desc {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.6;
}

/* ── 4. SECTEURS ── */
.sectors {
  padding: 8rem 1.5rem 6rem;
  background: #f4f7f9; /* Un bleu-gris ultra clair pour faire ressortir le badge blanc */
  position: relative;
}

.sectors__header {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: auto;
  min-width: 320px;
}

.sectors__badge {
  background: #ffffff;
  padding: 1rem 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  text-align: center;
}

.sectors__badge-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-blue);
  letter-spacing: 0.05em;
  margin: 0;
  white-space: nowrap;
}

.sectors__list {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem 2rem;
}

.sector-line {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  transition: transform 0.2s ease;
}

.sector-line:hover {
  transform: translateX(5px);
}

.sector-line__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.s-icon {
  font-size: 1.5rem;
}

.sector-line__label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-blue);
  line-height: 1.3;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .sectors__list { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .sectors__list { grid-template-columns: 1fr; }
  .sectors__header { min-width: 90%; }
}

/* ── 5. PROJETS ── */
.projects {
  padding: 8rem 1.5rem;
  background: #0d121f; /* Bleu-noir très profond */
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Effets de lumière en fond */
.projects::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(122, 46, 142, 0.15) 0%, transparent 70%);
  z-index: 1;
}

.projects__container {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.projects__header { text-align: center; margin-bottom: 5rem; }

.projects__timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  backdrop-filter: blur(10px);
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: var(--color-violet-light);
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-card__tag {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-violet-light);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  display: block;
}

.project-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.4;
}

.project-card__value {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  font-family: 'Inter', sans-serif;
}

.p-greater {
  font-size: 1.5rem;
  color: var(--color-violet-light);
  font-weight: 800;
}

.p-num {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
}

.p-suffix {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .projects__timeline { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .projects { padding: 5rem 1.5rem; }
  .projects__timeline { grid-template-columns: 1fr; }
  .project-card { padding: 2.5rem; gap: 2rem; }
  .p-num { font-size: 2.75rem; }
}

/* ── 6. WHY MAPKO ── */
.why {
  padding: 8rem 1.5rem;
  background: #ffffff;
}

.why__container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.why__intro-text {
  font-size: 1.15rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 2rem 0 3rem;
}

.why__btn-wrap {
  display: flex;
}

.why__link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-violet);
  text-decoration: none;
  border-bottom: 2px solid rgba(122, 46, 142, 0.1);
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.why__link svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.why__link:hover {
  border-color: var(--color-violet);
  gap: 1rem;
}

.why__link:hover svg {
  transform: translateX(5px);
}

.why__grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.why-item {
  display: flex;
  gap: 2rem;
  padding: 2.5rem;
  background: #f9fafb;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.why-item:hover {
  background: #ffffff;
  border-color: var(--color-violet-light);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.why-item__icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  padding: 12px;
  background: #ffffff;
  border-radius: 14px;
  color: var(--color-violet);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.why-item__title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 0.5rem;
}

.why-item__desc {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .why__container { grid-template-columns: 1fr; gap: 4rem; }
  .why__intro { text-align: center; }
  .why__btn-wrap { justify-content: center; }
}

@media (max-width: 640px) {
  .why { padding: 5rem 1.5rem; }
  .why-item { flex-direction: column; gap: 1.5rem; padding: 2rem; }
}

@media (max-width: 960px) {
  .stats__inner { grid-template-columns: repeat(2, 1fr); }
  .why-mapko__grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .stats__inner { grid-template-columns: 1fr; }
  .hero__actions { flex-direction: column; }
  .hero__btn { text-align: center; }
}

/* ── ANIMATIONS ── */
.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from, to { color: transparent }
  50% { color: var(--color-violet-light) }
}

.animate-reveal {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: 0.2s;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0.6s;
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>