<template>
  <header :class="['header', { 'header--scrolled': isScrolled, 'header--open': menuOpen }]">
    <div class="header__inner">

      <!-- LOGO -->
      <NuxtLink to="/" class="header__logo" @click="closeMenu">
        <!-- Utilisation du logo mixte sur fond blanc -->
        <img src="/images/logo_mixte.png" alt="Mapko Logo" class="header__logo-img" />
      </NuxtLink>

      <!-- NAV DESKTOP -->
      <nav class="header__nav" aria-label="Navigation principale">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="header__link"
          active-class="header__link--active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- CTA DESKTOP -->
      <div class="header__actions">
        <NuxtLink to="/contact" class="header__cta">
          Nous Contacter
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="header__cta-icon">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>

      <!-- BURGER MOBILE -->
      <button
        class="header__burger"
        :aria-expanded="menuOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span class="header__burger-bar" />
        <span class="header__burger-bar" />
        <span class="header__burger-bar" />
      </button>
    </div>

    <!-- MENU MOBILE -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="header__mobile">
        <nav class="header__mobile-nav">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="header__mobile-link"
            active-class="header__mobile-link--active"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <NuxtLink to="/contact" class="header__cta header__cta--mobile" @click="closeMenu">
          Nous Contacter
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="header__cta-icon">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { label: 'Accueil',    to: '/' },
  { label: 'À propos',   to: '/a-propos' },
  { label: 'Secteurs',   to: '/secteurs' },
  { label: 'Références', to: '/references' },
  { label: 'Blogs',      to: '/blogs' },
  { label: 'Contact',    to: '/contact' },
]

const isScrolled = ref(false)
const menuOpen   = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* =============================================
   HEADER — MAPKO (MODÉLE CLAIR)
   ============================================= */

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  transition: box-shadow 0.3s ease;
}

.header--scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Menu mobile ouvert : on garde le fond violet pour le contraste */
.header--open {
  background: #ffffff;
}

/* ── Inner ── */
.header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Logo ── */
.header__logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.header__logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
}

/* ── Nav Desktop ── */
.header__nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.header__link {
  position: relative;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4b5563; /* Gris foncé neutre */
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
}

.header__link:hover {
  color: var(--color-violet);
}

.header__link--active {
  color: var(--color-violet);
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: var(--color-violet);
  transform: scaleX(0);
  transition: transform 0.25s ease;
  border-radius: 2px;
}

.header__link:hover::after,
.header__link--active::after {
  transform: scaleX(1);
}

/* ── Actions ── */
.header__actions {
  flex-shrink: 0;
}

/* ── CTA ── */
.header__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  background: var(--color-violet);
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.header__cta:hover {
  background: var(--color-blue);
  transform: translateY(-1px);
}

.header__cta-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.header__cta:hover .header__cta-icon {
  transform: translateX(4px);
}

/* ── Burger ── */
.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 44px;
  height: 44px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
}

.header__burger:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.header__burger-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-violet);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.header--open .header__burger-bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.header--open .header__burger-bar:nth-child(2) {
  opacity: 0;
}
.header--open .header__burger-bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* ── Menu Mobile ── */
.header__mobile {
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header__mobile-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.header__mobile-link:hover,
.header__mobile-link--active {
  background: #f5f3ff;
  color: var(--color-violet);
}

.header__cta--mobile {
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

/* ── Transition ── */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 960px) {
  .header__nav,
  .header__actions {
    display: none;
  }
  .header__burger {
    display: flex;
  }
}
</style>
