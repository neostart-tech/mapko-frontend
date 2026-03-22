<template>
  <div class="contact-page">
    
    <!-- HERO -->
    <section class="contact-hero">
      <div class="contact-hero__bg">
        <img src="/images/contact-bg.jpg" alt="Mapko & Partners Office" class="contact-hero__img" />
        <div class="contact-hero__overlay" />
      </div>
      <div class="contact-hero__container" :class="{ 'is-visible': isHeroVisible }">
        <h1 class="contact-hero__eyebrow animate-reveal">Contact</h1>
        <h2 class="contact-hero__title animate-reveal">
          Engageons le dialogue pour vos projets
        </h2>
        <p class="contact-hero__subtitle animate-reveal">
          Une question ? Un projet de transformation ? Nos équipes panafricaines sont à votre écoute pour vous apporter des solutions sur mesure.
        </p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="contact-content" ref="contentSection" :class="{ 'is-visible': isContentVisible }">
      <div class="contact-content__container">
        
        <div class="contact-grid">
          
          <!-- FORMULAIRE -->
          <div class="contact-form-wrapper animate-reveal">
            <div class="form-card">
              <h3 class="form-title">Envoyez-nous un message</h3>
              <form @submit.prevent="handleSubmit" class="form">
                <div class="form-group">
                  <label for="name">Nom complet</label>
                  <input type="text" id="name" v-model="form.name" placeholder="Votre nom" required />
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="email">Email professionnel</label>
                    <input type="email" id="email" v-model="form.email" placeholder="votre@email.com" required />
                  </div>
                  <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone" v-model="form.phone" placeholder="votre numéro" required />
                  </div>
                </div>

                <div class="form-group">
                  <label for="subject">Objet de votre demande</label>
                  <select id="subject" v-model="form.subject" required>
                    <option value="" disabled selected>Sélectionnez un sujet</option>
                    <option value="Prestation">Conseil & Prestation</option>
                    <option value="Rendez-vous">Demande de rendez-vous</option>
                    <option value="Recrutement">Recrutement / Carrières</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre">Autre demande</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" v-model="form.message" rows="7" placeholder="Comment pouvons-nous vous aider ?" required></textarea>
                </div>

                <button type="submit" class="btn-submit" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
                </button>
              </form>
            </div>
          </div>

          <!-- COORDONNEES -->
          <div class="contact-info-wrapper">
            <div 
              v-for="(office, index) in offices" 
              :key="office.city" 
              class="office-card animate-reveal"
              :style="{ 'animation-delay': (0.15 * index) + 's' }"
            >
              <div class="office-card__header">
                <div class="office-flag">
                  <!-- Togo Flag -->
                  <svg v-if="office.city === 'Lomé'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 307"><path fill="#006a4e" d="M0 0h512v307H0z"/><path fill="#ffce00" d="M0 61.4h512v61.4H0zm0 122.8h512v61.4H0z"/><path fill="#d21034" d="M0 0h184.2v184.2H0z"/><path fill="#fff" d="m92.1 138-23.7 17.2 9-27.9L53.7 110h29.3L92.1 82l9.1 28h29.3l-23.7 17.3 9.1 27.9z"/></svg>
                  <!-- Benin Flag -->
                  <svg v-if="office.city === 'Cotonou'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 341"><path fill="#e8112d" d="M0 0h512v341H0z"/><path fill="#fcd116" d="M0 0h512v170.7H0z"/><path fill="#008751" d="M0 0h204.8v341H0z"/></svg>
                  <!-- Ivory Coast Flag -->
                  <svg v-if="office.city === 'Abidjan'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 341"><path fill="#009e60" d="M0 0h512v341H0z"/><path fill="#fff" d="M0 0h341.3v341H0z"/><path fill="#f77f00" d="M0 0h170.7v341H0z"/></svg>
                </div>
                <h4 class="office-city">{{ office.city }} <small v-if="office.isHq">(Siège)</small></h4>
              </div>
              <div class="office-card__body">
                <p class="office-address">{{ office.address }}</p>
                <div class="office-contact">
                  <a :href="'tel:' + office.tel.replace(/\s/g, '')" class="contact-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    {{ office.tel }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Global Email Link -->
            <div class="global-contact animate-reveal" style="animation-delay: 0.6s">
              <span class="global-contact__label">Besoin d'un renseignement ?</span>
              <a href="mailto:contact@mapko-partners.com" class="global-contact__link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Nous envoyer un mail
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isHeroVisible = ref(false)
const isContentVisible = ref(false)
const contentSection = ref<HTMLElement | null>(null)
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const offices = [
  {
    city: 'Lomé',
    isHq: true,
    flag: '🇹🇬',
    address: 'Adidogomé, Lomé - Togo',
    tel: '+228 91 11 82 75',
    email: 'contact@mapko-partners.com'
  },
  {
    city: 'Cotonou',
    isHq: false,
    flag: '🇧🇯',
    address: 'Avenue de la victoire, Gbèwa, Bénin - Cotonou',
    tel: '+229 01 98 63 61 12',
    email: 'contact@mapko-partners.com'
  },
  {
    city: 'Abidjan',
    isHq: false,
    flag: '🇨🇮',
    address: 'Riviera Attoban, Cocody, Abidjan - Côte d\'Ivoire',
    tel: '+225 01 60 60 74 55',
    email: 'contact@mapko-partners.com'
  }
]

onMounted(() => {
  isHeroVisible.value = true
  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      isContentVisible.value = true
    }
  }, { threshold: 0.1 })
  if (contentSection.value) observer.observe(contentSection.value)
})

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    alert('Merci ! Votre message a bien été envoyé.')
    form.value = { name: '', email: '', phone: '', subject: '', message: '' }
  }, 1500)
}

useHead({
  title: 'Contact - Mapko & Partners',
  meta: [
    { name: 'description', content: 'Contactez Mapko & Partners à Lomé, Cotonou ou Abidjan.' }
  ]
})
</script>

<style scoped>
.contact-page {
  background: #ffffff;
}

/* ── HERO ── */
.contact-hero {
  position: relative;
  padding: 8rem 1.5rem 6rem;
  background: #0d121f;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
}

.contact-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.contact-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px) brightness(0.45);
  transform: scale(1.1);
}

.contact-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13, 18, 31, 0.4), rgba(13, 18, 31, 0.9));
}

.contact-hero__container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.contact-hero__eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-violet-light);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}

.contact-hero__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.contact-hero__subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 750px;
  margin: 0 auto;
}

/* ── CONTENT ── */
.contact-content {
  padding: 8rem 1.5rem;
}

.contact-content__container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 5rem;
  align-items: flex-start;
}

/* Form Card */
.form-card {
  padding: 4rem;
  background: #ffffff;
  border-radius: 32px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.04);
}

.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 3rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-blue);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  width: 100%;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%237A2E8E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  background: #ffffff;
  border-color: var(--color-violet-light);
  box-shadow: 0 0 0 4px rgba(122, 46, 142, 0.1);
}

.btn-submit {
  padding: 1.2rem;
  background: var(--color-violet);
  color: #ffffff;
  font-weight: 800;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-submit:hover:not(:disabled) {
  background: #6a247c;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(122, 46, 142, 0.2);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Info Wrapper */
.contact-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.office-card {
  padding: 2.5rem;
  background: #f9fafb;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.office-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-violet-light);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.office-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.office-flag {
  width: 40px;
  height: 26px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.office-flag svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.office-city {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-blue);
}

.office-city small {
  font-size: 0.8rem;
  color: var(--color-violet);
  margin-left: 0.5rem;
}

.office-address {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.office-contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-blue);
  font-weight: 700;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.contact-link svg {
  color: var(--color-violet-light);
}

.contact-link:hover {
  color: var(--color-violet);
}

/* Global Email Link */
.global-contact {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--color-blue);
  border-radius: 24px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.global-contact__label {
  font-size: 0.85rem;
  opacity: 0.7;
  font-weight: 600;
}

.global-contact__link {
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.global-contact__link:hover {
  transform: translateX(8px);
  color: var(--color-violet-light);
}

.global-contact__link svg {
  color: var(--color-violet-light);
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
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 640px) {
  .contact-hero { padding: 5rem 1rem 3rem; }
  .contact-content { padding: 4rem 1rem; }
  .form-card { padding: 2rem; }
  .form-row { grid-template-columns: 1fr; }
  .office-card { padding: 1.5rem; }
}
</style>
