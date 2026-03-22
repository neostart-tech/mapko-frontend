<template>
  <footer class="footer">

    <!-- ── Corps principal ── -->
    <div class="footer__body">
      <div class="footer__grid">

        <!-- COLONNE 1 — Logo + Baseline + Réseaux -->
        <div class="footer__col footer__col--brand">
          <NuxtLink to="/" class="footer__logo-link">
            <img src="/images/logo_blanc.png" alt="Mapko & Partners" class="footer__logo" />
          </NuxtLink>
          <p class="footer__tagline">CREATE A GREAT VALUE FOR ALL</p>
          <p class="footer__desc">
            Rigueur, Excellence, Innovation.<br />
            Nous accompagnons les organisations dans leurs projets stratégiques et opérationnels.
          </p>
          <div class="footer__socials">
            <a :href="lienStore.lien?.linkedin || '#'" target="_blank" rel="noopener noreferrer" class="footer__social-btn" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a :href="lienStore.lien?.x || '#'" target="_blank" rel="noopener noreferrer" class="footer__social-btn" aria-label="X / Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a :href="lienStore.lien?.facebook || '#'" target="_blank" rel="noopener noreferrer" class="footer__social-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- COLONNE 2 — Navigation -->
        <div class="footer__col">
          <h3 class="footer__heading">Navigation</h3>
          <ul class="footer__links">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer__link">
                <span class="footer__link-arrow">›</span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- COLONNE 3 — Secteurs -->
        <div class="footer__col">
          <h3 class="footer__heading">Secteurs d'activités</h3>
          <ul class="footer__links">
            <li v-for="sector in sectorsList" :key="sector.to">
              <NuxtLink class="footer__link">
                <span class="footer__link-dot" />
                {{ sector.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- COLONNE 4 — Contact -->
        <div class="footer__col">
          <h3 class="footer__heading">Nous Contacter</h3>
          <ul class="footer__contact-list">
            <li class="footer__contact-item">
              <span class="footer__contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                </svg>
              </span>
              <span>Lomé · Cotonou · Abidjan</span>
            </li>
            <li class="footer__contact-item">
              <span class="footer__contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </span>
              <a href="mailto:contact@mapko-partners.com" class="footer__contact-link">contact@mapko-partners.com</a>
            </li>
            <li v-for="c in contactPhones" :key="c.tel" class="footer__contact-item">
              <span class="footer__contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                </svg>
              </span>
              <div class="footer__contact-details">
                <span class="footer__contact-country">{{ c.country }} : </span>
                <a :href="`tel:${c.tel.replace(/\s/g, '')}`" class="footer__contact-link">{{ c.tel }}</a>
              </div>
            </li>
          </ul>

          <NuxtLink to="/contact" class="footer__cta">
            Prendre contact
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>

      </div>
    </div>

    <!-- ── Barre copyright ── -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <p class="footer__copy">
          © {{ currentYear }} Mapko &amp; Partners. Tous droits réservés.
        </p>
        <div class="footer__credits">
          Développé par 
          <a href="https://neostart.tech" target="_blank" rel="noopener" class="footer__credits-link">
            Neo Start Technology
          </a>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
import { useSecteurStore } from '~~/stores/secteur'
import { useLienStore } from '~~/stores/lien'
import { computed, onMounted } from 'vue'

const secteurStore = useSecteurStore()
const lienStore = useLienStore()
const currentYear = new Date().getFullYear()

const navLinks = [
  { label: 'Accueil',    to: '/' },
  { label: 'À propos',   to: '/a-propos' },
  { label: 'Secteurs',   to: '/secteurs' },
  { label: 'Références', to: '/references' },
  { label: 'Blogs',      to: '/blogs' },
  { label: 'Contact',    to: '/contact' },
]

const sectorsList = computed(() => 
  [...secteurStore.secteurs]
    .sort((a, b) => a.titre.localeCompare(b.titre))
    .slice(0, 10)
    .map(s => ({
      label: s.titre,
      to: `/secteurs/${s.id}`
    }))
)

const contactPhones = [
  { country: 'Togo', tel: '+228 91 11 82 75' },
  { country: 'Bénin', tel: '+229 01 98 63 61 12' },
  { country: 'CI', tel: '+225 01 60 60 74 55' },
]

onMounted(() => {
  if (secteurStore.secteurs.length === 0) {
    secteurStore.fetch()
  }
  if (!lienStore.lien) {
    lienStore.fetch()
  }
})
</script>

<style scoped>
/* =============================================
   FOOTER — MAPKO
   ============================================= */

.footer {
  background: #0d0d1a;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.9rem;
}

/* ── Corps ── */
.footer__body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.3fr 1.2fr;
  gap: 3rem;
}

/* ── Colonne Brand ── */
.footer__col--brand {
  padding-right: 1rem;
}

.footer__logo-link {
  display: inline-block;
  margin-bottom: 1rem;
  transition: opacity 0.2s ease;
}
.footer__logo-link:hover { opacity: 0.8; }

.footer__logo {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.footer__tagline {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-violet-light);
  margin-bottom: 0.75rem;
}

.footer__desc {
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
}

/* ── Réseaux ── */
.footer__socials {
  display: flex;
  gap: 0.6rem;
}

.footer__social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.footer__social-btn svg { width: 16px; height: 16px; }
.footer__social-btn:hover {
  background: var(--color-violet);
  border-color: var(--color-violet);
  color: #ffffff;
}

/* ── Headings ── */
.footer__heading {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 1.25rem;
  padding-bottom: 0.65rem;
  border-bottom: 2px solid var(--color-violet);
  display: inline-block;
}

/* ── Liens ── */
.footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.footer__link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.58);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  cursor: pointer;
}
.footer__link:not(.footer__link--static):hover {
  color: #ffffff;
}

.footer__link-arrow {
  font-size: 1rem;
  color: var(--color-violet-light);
  flex-shrink: 0;
}

.footer__link-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-blue-light);
  flex-shrink: 0;
}

/* ── Contact ── */
.footer__contact-list {
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer__contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

.footer__contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: var(--color-violet);
  flex-shrink: 0;
  color: #ffffff;
}
.footer__contact-icon svg { width: 14px; height: 14px; }

.footer__contact-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}
.footer__contact-link:hover { color: #ffffff; }

.footer__contact-country {
  font-weight: 700;
  color: var(--color-violet-light);
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-right: 0.25rem;
}

/* ── CTA ── */
.footer__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  background: var(--color-violet);
  transition: background 0.2s ease, transform 0.2s ease;
}
.footer__cta svg { width: 14px; height: 14px; transition: transform 0.2s ease; }
.footer__cta:hover { background: var(--color-blue); transform: translateY(-1px); }
.footer__cta:hover svg { transform: translateX(3px); }

/* ── Bottom bar ── */
.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.footer__bottom-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.footer__copy {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}

.footer__credits {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}

.footer__credits-link {
  color: var(--color-violet-light);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease;
}

.footer__credits-link:hover {
  color: #ffffff;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
  .footer__col--brand {
    grid-column: 1 / -1;
    padding-right: 0;
  }
}

@media (max-width: 640px) {
  .footer__body { padding: 3rem 1.25rem 2rem; }
  .footer__grid { grid-template-columns: 1fr; gap: 2rem; }
  .footer__bottom-inner {
    padding: 1rem 1.25rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
