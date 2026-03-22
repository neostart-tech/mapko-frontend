<template>
  <div class="layout">
    <Header />
    <main class="layout__main">
      <slot />
    </main>
    <Prefooter v-if="route.path !== '/contact'" />
    <Footer />

    <!-- Floating Back to Top -->
    <button 
      class="back-to-top" 
      :class="{ 'is-show': showScrollTop }" 
      @click="scrollToTop"
      aria-label="Retour en haut"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const route = useRoute()
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initRevealObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// REVEAL ON SCROLL LOGIC
const initRevealObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const elements = document.querySelectorAll('.reveal')
  elements.forEach(el => observer.observe(el))
}

// Relancer l'observer après chaque changement de page
watch(() => route.path, () => {
  setTimeout(() => {
    initRevealObserver()
  }, 300)
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1;
  padding-top: 80px; /* hauteur du header fixe */
}

/* Floating Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--color-violet);
  color: #ffffff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(122, 46, 142, 0.3);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px) scale(0.8);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.back-to-top.is-show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.back-to-top:hover {
  background: var(--color-blue);
  box-shadow: 0 15px 40px rgba(15, 76, 129, 0.4);
  transform: translateY(-5px);
}

@media (max-width: 640px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
  }
}
</style>

