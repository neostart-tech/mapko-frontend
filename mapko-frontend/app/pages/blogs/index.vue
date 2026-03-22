<template>
  <div class="blogs-page">
    <!-- HERO -->
    <section class="blogs-hero">
      <div class="blogs-hero__bg">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" alt="Mapko Blogs" class="blogs-hero__img" />
        <div class="blogs-hero__overlay" />
      </div>
      <div class="blogs-hero__container is-visible">
        <h1 class="blogs-hero__eyebrow animate-reveal">Nos Blogs</h1>
        <h2 class="blogs-hero__title animate-reveal">Actualités & Analyses</h2>
        <p class="blogs-hero__subtitle animate-reveal reveal-delay-1">
          Découvrez nos connaissances, nos réflexions et les dernières actualités expertes de l'industrie.
        </p>
      </div>
    </section>

    <!-- CONTENT LAYOUT -->
    <section class="blogs-section">
      <div class="blogs-container">
        
        <!-- MAIN CONTENT -->
        <main class="blogs-main">
          
          <div v-if="paginatedBlogs.length === 0" class="no-results shadow-card animate-reveal">
            <p>Aucun article trouvé pour "{{ searchQuery }}".</p>
            <button @click="searchQuery = ''" class="btn-reset">Réinitialiser la recherche</button>
          </div>

          <div class="blogs-list">
            <NuxtLink 
              v-for="(blog, index) in paginatedBlogs" 
              :key="blog.id" 
              :to="`/blogs/${blog.id}`"
              class="blog-card shadow-card animate-reveal"
              :style="{ 'animation-delay': (index * 0.1) + 's' }"
            >
              <div class="blog-card__image-container">
                <img :src="blog.couverture" :alt="blog.titre" class="blog-card__img" />
                <span class="blog-card__category">{{ blog.categorie }}</span>
              </div>
              <div class="blog-card__content">
                <div class="blog-card__meta">
                  <svg xmlns="http://www.w3.org/2000/svg" class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>{{ formatDate(blog.date) }}</span>
                </div>
                <h2 class="blog-card__title">{{ blog.titre }}</h2>
                <p class="blog-card__excerpt" v-html="generateExcerpt(blog.contenu)"></p>
                <span class="blog-card__readmore">
                  Lire l'article <span class="arrow">→</span>
                </span>
              </div>
            </NuxtLink>
          </div>

          <!-- PAGINATION -->
          <div class="pagination" v-if="totalPages > 1">
            <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page"
              class="page-btn"
              :class="{ 'is-active': currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

        </main>

        <!-- SIDEBAR -->
        <aside class="blogs-sidebar">
          <div class="sidebar-widget search-widget shadow-card animate-reveal">
            <h3 class="widget-title">Rechercher</h3>
            <div class="search-input-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" v-model="searchQuery" placeholder="Mot-clé ou catégorie..." />
            </div>
          </div>

          <div class="sidebar-widget categories-widget shadow-card animate-reveal reveal-delay-1">
            <h3 class="widget-title">Catégories</h3>
            <ul class="category-list">
              <li 
                v-for="cat in categoriesCount" 
                :key="cat.name"
                class="category-item"
                @click="filterByCategory(cat.name)"
                :class="{ 'is-active': searchQuery === cat.name }"
              >
                <span class="category-name">{{ cat.name }}</span>
                <span class="category-count">({{ cat.count }})</span>
              </li>
              <li class="category-item text-xs mt-2 text-violet-600 font-bold justify-center" v-if="searchQuery" @click="searchQuery = ''">
                 Réinitialiser le filtre
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

useHead({
  title: 'Nos Blogs - Mapko & Partners',
  meta: [
    { name: 'description', content: 'Explorez nos articles et réflexions expertes sur les stratégies financières et industrielles.' }
  ]
})

// Mock Data
const allBlogs = ref([
  { 
    id: 1, 
    titre: 'Les nouvelles initiatives en énergie solaire et l\'impact global', 
    categorie: 'Énergies Renouvelables',
    contenu: 'Face au réchauffement climatique, notre nouvelle approche pour le développement énergétique permet de réduire les empreintes carbone de façon drastique. Le photovoltaïque s\'impose aujourd\'hui comme le premier vecteur d\'investissement propre en Afrique.', 
    date: '2026-03-20',
    couverture: 'https://images.unsplash.com/photo-1509391366360-12009cb9f3ac?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    titre: 'Modernisation des infrastructures de transport en Afrique', 
    categorie: 'Infrastructures',
    contenu: 'La logistique de transport moderne passe par la rationalisation des réseaux routiers existants, notamment par l\'utilisation de solutions d\'intelligence artificielle pour la gestion du trafic et des flottes marchandes.', 
    date: '2026-03-10',
    couverture: 'https://images.unsplash.com/photo-1541888081622-3a27a36cb3a1?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    titre: 'Conférence annuelle de logistique : Les retours d\'expérience', 
    categorie: 'Événements',
    contenu: 'Nous étions présents à la dernière grande convention sur la logistique transport au mois de février. L\'occasion d\'aborder les enjeux de l\'import/export sécurisé sur le continent, mais aussi au niveau global.', 
    date: '2026-02-28',
    couverture: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1524f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, 
    titre: 'Étude d\'impact sociétal : Projet Horizon', 
    categorie: 'Étude de cas',
    contenu: 'Comment mesurer le retentissement direct et indirect de la création d\'une nouvelle agence en milieu semi-rural ? Notre étude complète de 30 pages révèle que l\'impact se compte en centaines d\'emplois stabilisés indirectement.', 
    date: '2026-01-15',
    couverture: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, 
    titre: 'Le rôle clé de la finance verte dans les PME', 
    categorie: 'Actualités',
    contenu: 'Il est plus que temps d\'impliquer les plus petites structures dans la dimension "Verte" de leurs finances. De nouvelles subventions permettent d\'amortir ces transitions en l\'espace de quelques mois.', 
    date: '2025-12-05',
    couverture: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
  }
])

// Pagination & Search settings
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 3

// Reset pagination when searching
watch(searchQuery, () => {
  currentPage.value = 1
})

// Filter Engine
const filteredBlogs = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return allBlogs.value
  return allBlogs.value.filter(b => 
    b.titre.toLowerCase().includes(query) || 
    b.categorie.toLowerCase().includes(query)
  )
})

const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / itemsPerPage))

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredBlogs.value.slice(start, start + itemsPerPage)
})

// Categories dynamic count
const categoriesCount = computed(() => {
  const counts: Record<string, number> = {}
  allBlogs.value.forEach(b => {
    counts[b.categorie] = (counts[b.categorie] || 0) + 1
  })
  // sort alphabetically
  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }))
})

// Helpers
const filterByCategory = (catName: string) => {
  // Toggle selection
  if (searchQuery.value === catName) {
    searchQuery.value = '';
  } else {
    searchQuery.value = catName;
  }
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const generateExcerpt = (htmlString: string) => {
  const rawText = htmlString.replace(/<[^>]+>/g, '') // Strip basic HTML if any
  return rawText.length > 140 ? rawText.substring(0, 140) + '...' : rawText
}
</script>

<style scoped>
.blogs-page {
  background: #f8fafc;
  min-height: 100vh;
}

/* ── HERO ── */
.blogs-hero {
  position: relative;
  padding: 6rem 1.5rem 8rem;
  background: #0d121f;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
}

.blogs-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.blogs-hero__eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-violet-light);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}

.blogs-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px) brightness(0.4);
  transform: scale(1.05); /* fix blur edges */
}

.blogs-hero__overlay {
  position: absolute;
  inset: 0;
}

.blogs-hero__container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.blogs-hero__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.blogs-hero__subtitle {
  font-size: 1.25rem;
  color: #cad0d8;
  line-height: 1.6;
}

/* ── LAYOUT ── */
.blogs-section {
  position: relative;
  z-index: 2;
  margin-top: -3rem; /* overlap over hero */
  padding-bottom: 6rem;
}

.blogs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

@media (min-width: 960px) {
  .blogs-container {
    flex-direction: row; /* Main Left, Sidebar Right */
    align-items: flex-start;
  }
}

/* ── SIDEBAR ── */
.blogs-sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 960px) {
  .blogs-sidebar {
    width: 320px;
    position: sticky;
    top: 100px;
    flex-shrink: 0;
  }
}

.sidebar-widget {
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
}

.shadow-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.widget-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.widget-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background: var(--color-violet);
  border-radius: 4px;
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 18px;
  height: 18px;
  color: #94a3b8;
}

.search-input-wrap input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.8rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #0f172a;
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;
}

.search-input-wrap input:focus {
  background: #ffffff;
  border-color: var(--color-violet);
  box-shadow: 0 0 0 4px rgba(122, 46, 142, 0.1);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  color: #475569;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: transparent;
}

.category-item:hover {
  background: #f1f5f9;
  color: var(--color-violet);
}

.category-item.is-active {
  background: var(--color-violet);
  color: #ffffff;
}

.category-count {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* ── MAIN CONTENT ── */
.blogs-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
}

.blogs-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    height: 280px;
  }
}

.blog-card__image-container {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .blog-card__image-container {
    width: 40%;
    height: 100%;
  }
}

.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-card__img {
  transform: scale(1.05);
}

.blog-card__category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--color-violet);
  color: #ffffff;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(15, 76, 129, 0.4);
}

.blog-card__content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.blog-card__title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.blog-card:hover .blog-card__title {
  color: var(--color-violet);
}

.blog-card__excerpt {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.blog-card__readmore {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-violet);
  font-weight: 800;
  font-size: 0.9rem;
  align-self: flex-start;
}

.blog-card__readmore .arrow {
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-card__readmore .arrow {
  transform: translateX(4px);
}

/* ── PAGINATION ── */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
  color: #475569;
  font-weight: 700;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-violet);
  color: var(--color-violet);
}

.page-btn.is-active {
  background: var(--color-violet);
  color: #ffffff;
  border-color: var(--color-violet);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Utils */
.no-results {
  padding: 3rem;
  background: #ffffff;
  border-radius: 16px;
  text-align: center;
  color: #475569;
  font-weight: 600;
}

.btn-reset {
  margin-top: 1rem;
  background: #f1f5f9;
  color: var(--color-violet);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.btn-reset:hover {
  background: #e2e8f0;
}

/* ── ANIMATIONS ── */
.animate-reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: revealUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.reveal-delay-1 {
  animation-delay: 0.2s;
}

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
