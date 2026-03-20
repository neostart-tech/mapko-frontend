<template>
  <div class="about-page">
    
    <!-- 1. PRÉSENTATION / HERO -->
    <section class="about-hero">
      <div class="about-hero__bg">
        <img src="/images/a-propos.png" alt="Mapko Partners" class="about-hero__img" />
        <div class="about-hero__overlay" />
      </div>
      <div class="about-hero__container" :class="{ 'is-visible': isHeroVisible }">
        <h1 class="about-hero__eyebrow animate-reveal">Notre identité</h1>
        <h2 class="about-hero__title animate-reveal">
          L'alliance de l'expertise globale et de l'ancrage local pour bâtir l'avenir.
        </h2>
        <p class="about-hero__subtitle animate-reveal">
          MAPKO & Partners accompagne les organisations dans leur transformation stratégique et financière sur le continent africain.
        </p>
      </div>
    </section>

    <!-- 2. VISION & OBJECTIF -->
    <section class="vision" ref="visionSection" :class="{ 'is-visible': isVisible }">
      <div class="vision__container">
        <div class="vision__grid">
          <!-- Vision -->
          <div class="vision-card animate-reveal" style="animation-delay: 0.2s">
            <h3 class="vision-card__title">Notre Vision</h3>
            <p class="vision-card__text text-justify">
              Notre ambition est d’être un partenaire stratégique de référence, reconnu pour son excellence et son engagement à accompagner les entreprises et organisations dans leur quête de performance et de croissance durable.
            </p>
          </div>
          <!-- Objectif -->
          <div class="vision-card animate-reveal" style="animation-delay: 0.4s">
            <h3 class="vision-card__title">Notre Objectif</h3>
            <p class="vision-card__text text-justify">
              Aider les entreprises à relever efficacement les défis qui se présentent à elles en tirant parti de notre expertise et de nos solutions innovantes grâce à un réseau mondial et à des équipes pluridisciplinaires, leur permettant ainsi de se démarquer dans un environnement en constante évolution.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. VALEURS -->
    <section class="values">
      <div class="values__container">
        <div class="values__header">
          <h2 class="section-eyebrow">Nos Valeurs</h2>
          <h3 class="section-title">Rigueur, Excellence, Innovation</h3>
        </div>
        <div class="values__grid">
          <div v-for="(value, idx) in values" :key="idx" class="value-card">
            <div class="value-card__icon" v-html="value.icon" />
            <h4 class="value-card__title">{{ value.title }}</h4>
            <p class="value-card__text">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. PRÉSENCE GÉOGRAPHIQUE -->
    <section class="geo">
      <div class="geo__container">
        <div class="geo__content">
          <h2 class="section-eyebrow">Présence géographique</h2>
          <h3 class="section-title">Une couverture panafricaine</h3>
          <p class="geo__text text-justify">
            Nous avons une présence directe dans trois pays stratégiques et opérons dans plus de dix pays sur le continent pour accompagner vos projets d'envergure.
          </p>
          <div class="geo__countries">
            <div class="geo__country-list">
              <span v-for="c in countries" :key="c" class="geo__tag">{{ c }}</span>
            </div>
          </div>
        </div>
        <div class="geo__map">
          <img src="/images/africa_map_full_presence.png" alt="Carte de présence stratégique en Afrique" class="map-img" />
        </div>
      </div>
    </section>

    <!-- 5. LEADERSHIP -->
    <section class="leadership" ref="leadershipSection" :class="{ 'is-visible': isLeadershipVisible }">
      <div class="leadership__container">
        <div class="leadership__grid">
          
          <!-- Photo & Intro courte -->
          <div class="leadership__sidebar animate-reveal">
            <div class="leadership__photo-frame">
              <img src="/images/awoute.jpg" alt="Marius Awoute" class="leader-img" />
            </div>
            <div class="leadership__role">
              <h4 class="leadership__name">Marius Awoute</h4>
              <p class="leadership__title">Associé, Directeur Général</p>
            </div>
            <!-- Bouton LinkedIn Optionnel -->
            <a href="https://www.linkedin.com/in/marius-awoute-69aa9454/" target="_blank" class="leadership__social">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
              <span>Connecter sur LinkedIn</span>
            </a>
          </div>

          <!-- Bio & Expertise -->
          <div class="leadership__content animate-reveal" style="animation-delay: 0.2s">
            <div class="leadership__quote-icon">«</div>
            <p class="leadership__bio text-justify">
              Marius dispose de plus d’une dizaine d’années d'expérience professionnelle acquise majoritairement dans des Big Four (<strong>PwC, Deloitte et KPMG</strong>) et à la <strong>BCEAO</strong>.
            </p>
            <p class="leadership__bio text-justify">
              Il a mené de nombreux projets en Afrique pour des acteurs publics et privés dans des secteurs stratégiques comme la banque, l’Oil & Gas, l'énergie, les télécoms et l'industrie.
            </p>
            
            <div class="leadership__footer">
              <div class="expertises-box">
                <h4 class="expertises-title">Domaines d'expertise</h4>
                <ul class="expertises-list">
                  <li>Conseil en finance & Stratégie</li>
                  <li>Audit & Contrôle interne</li>
                  <li>Gestion des risques</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visionSection = ref<HTMLElement | null>(null)
const leadershipSection = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHeroVisible = ref(false)
const isLeadershipVisible = ref(false)

onMounted(() => {
  isHeroVisible.value = true
  
  const observerOptions = { threshold: 0.2 }

  const visionObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) isVisible.value = true
  }, observerOptions)

  const leadershipObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) isLeadershipVisible.value = true
  }, observerOptions)

  if (visionSection.value) visionObserver.observe(visionSection.value)
  if (leadershipSection.value) leadershipObserver.observe(leadershipSection.value)
})
const values = [
  {
    title: 'Rigueur',
    desc: 'Notre exigence en matière de qualité et de professionnalisme nous permet d’assurer un accompagnement optimal.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>'
  },
  {
    title: 'Excellence',
    desc: 'Prestations de haut niveau, s’appuyant sur une expertise approfondie et une amélioration continue.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>'
  },
  {
    title: 'Innovation',
    desc: 'Solutions sur mesure adaptées aux évolutions économiques, technologiques et managériales.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.503 7.503 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>'
  },
]

const countries = [
  'Bénin', 'Mali', 'Sénégal', 'Côte d’Ivoire', 'Niger', 'Togo', 'Guinée', 'Nigéria', 'Ghana', 'RDC'
]
</script>

<style scoped>
.about-page {
  background: #ffffff;
}

.section-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-violet);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--color-blue);
  line-height: 1.2;
}

/* ── 1. HERO ── */
.about-hero {
  position: relative;
  min-height: 500px;
  padding: 5rem 1.5rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
}

.about-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.about-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05); /* Un léger zoom pour l'effet de profondeur */
}

.about-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(15, 76, 129, 0.4), rgba(13, 18, 31, 0.85));
}

.about-hero__container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.about-hero__eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-violet-light);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}

.about-hero__title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.about-hero__subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── 2. VISION & OBJECTIF ── */
.vision {
  padding: 6rem 1.5rem;
  background: #ffffff;
}

.vision__container {
  max-width: 1280px;
  margin: 0 auto;
}

.vision__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.vision-card {
  padding: 3rem;
  background: #f9fafb;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
}

.vision-card__title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-violet);
  margin-bottom: 1.5rem;
  position: relative;
}

.vision-card__title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--color-violet);
}

.vision-card__text {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.7;
}

/* ── 3. VALEURS ── */
.values {
  padding: 6rem 1.5rem;
  background: #fdfdfd;
}

.values__container {
  max-width: 1280px;
  margin: 0 auto;
}

.values__header {
  text-align: center;
  margin-bottom: 4rem;
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.value-card {
  background: #ffffff;
  padding: 3rem 2.5rem;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  text-align: center;
}

.value-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-violet-light);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
}

.value-card__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  padding: 1rem;
  background: #f5f3ff;
  color: var(--color-violet);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.value-card:hover .value-card__icon {
  background: var(--color-violet);
  color: #ffffff;
}

.value-card__title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 1rem;
}

.value-card__text {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
}

/* ── 4. GÉO ── */
.geo {
  padding: 8rem 1.5rem;
  background: #ffffff;
  overflow: hidden;
}

.geo__container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.geo__text {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 2rem 0;
}

.geo__tag {
  display: inline-block;
  padding: 0.4rem 1rem;
  margin: 0.3rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-blue);
}

.map-img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  background: #ffffff;
}

/* ── 5. LEADERSHIP ── */
.leadership {
  padding: 8rem 1.5rem;
  background: #f9fafb;
}

.leadership__container {
  max-width: 1000px;
  margin: 0 auto;
}

.leadership__grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 5rem;
  align-items: flex-start;
}

.leadership__photo-frame {
  width: 280px;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 4px solid #ffffff;
  margin-bottom: 1.5rem;
}

.leader-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.leadership__name {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 0.25rem;
}

.leadership__title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-violet);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.leadership__social {
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  transition: all 0.3s ease;
}

.leadership__social:hover {
  border-color: var(--color-violet);
  color: var(--color-violet);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.leadership__social svg { width: 18px; height: 18px; }

.leadership__content {
  position: relative;
  padding-top: 2rem;
}

.leadership__quote-icon {
  position: absolute;
  top: -2.5rem;
  left: -2rem;
  font-size: 8rem;
  color: rgba(122, 46, 142, 0.05);
  font-family: serif;
  line-height: 1;
  pointer-events: none;
}

.leadership__bio {
  font-size: 1.15rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.expertises-box {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
}

.expertises-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-violet);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
}

.expertises-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.expertises-list li {
  font-weight: 700;
  color: var(--color-blue);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.expertises-list li::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--color-violet);
  border-radius: 50%;
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

@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── MOBILE ── */
@media (max-width: 1024px) {
  .vision__grid, .geo__container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .leadership__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .leadership__sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .about-hero { min-height: 400px; padding-top: 5.5rem; }
  .about-hero__subtitle { font-size: 1.1rem; }
  .values__grid { grid-template-columns: 1fr; }
  .leadership__name { font-size: 2rem; }
  .leadership__info { padding: 2rem; }
  .expertises-list { grid-template-columns: 1fr; }
  .leadership__content { padding-top: 1rem; }
  .leadership__quote-icon { left: 0; font-size: 5rem; top: -1.5rem; }
}
</style>
