<template>
  <div class="blog-detail-page pt-32">
    <!-- CONTENT LAYOUT -->
    <section class="blogs-section">
      <div class="blogs-container">
        
        <!-- SIDEBAR -->
        <aside class="blogs-sidebar">
          <div class="sidebar-widget search-widget shadow-card animate-reveal">
            <h3 class="widget-title">Rechercher</h3>
            <div class="search-input-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" v-model="localSearch" @keyup.enter="onSearch" placeholder="Mot-clé ou catégorie..." />
            </div>
          </div>

          <div class="sidebar-widget categories-widget shadow-card animate-reveal reveal-delay-1">
            <h3 class="widget-title">Catégories</h3>
            <ul class="category-list">
              <li 
                v-for="cat in categoriesCount" 
                :key="cat.name"
                class="category-item"
                @click="onCategorySelect(cat.name)"
              >
                <span class="category-name">{{ cat.name }}</span>
                <span class="category-count">({{ cat.count }})</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- MAIN CONTENT -->
        <main class="blogs-main" v-if="currentBlog">
          
          <article class="blog-article shadow-card animate-reveal">
            
            <div class="article-header">
              <div class="article-meta">
                <span class="article-category">{{ currentBlog.categorie }}</span>
                <span class="article-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {{ formatDate(currentBlog.date) }}
                </span>
              </div>
              <h1 class="article-title">{{ currentBlog.titre }}</h1>
            </div>

            <div class="article-cover relative cursor-pointer group" @click="openLightbox(currentBlog.couverture)">
              <img :src="currentBlog.couverture" :alt="currentBlog.titre" class="article-cover-img" />
              <div class="article-cover-overlay">
                 <svg class="zoom-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
              </div>
            </div>

            <div class="article-body ql-editor" v-html="currentBlog.contenu"></div>

            <!-- GALERIE -->
            <div v-if="currentBlog.galerie && currentBlog.galerie.length" class="article-gallery border-t border-gray-100 pt-8 mt-12">
              <h3 class="text-xl font-bold text-gray-800 mb-6">Galerie multimédia</h3>
              <div class="gallery-grid">
                <div 
                  v-for="(img, idx) in currentBlog.galerie" 
                  :key="idx" 
                  class="gallery-item cursor-pointer group"
                  @click="openLightbox(img)"
                >
                  <img :src="img" class="gallery-img" />
                  <div class="gallery-overlay">
                    <svg class="zoom-icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="article-share border-t border-gray-100 pt-8 mt-12 flex items-center justify-between">
              <span class="font-bold text-gray-800">Partager cet article</span>
              <div class="flex gap-4">
                 <!-- Obvious share placeholders -->
                 <button class="share-btn text-blue-600 bg-blue-50 hover:bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                 <button class="share-btn text-blue-400 bg-blue-50 hover:bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></button>
              </div>
            </div>
            
          </article>

          <!-- RECENT POSTS SAME CATEGORY -->
          <div class="recent-posts mt-16 animate-reveal reveal-delay-2" v-if="relatedBlogs.length">
            <h2 class="section-title">À lire également</h2>
            <div class="related-grid">
               <NuxtLink 
                 v-for="blog in relatedBlogs" 
                 :key="blog.id"
                 :to="`/blogs/${blog.id}`"
                 class="related-card shadow-card"
               >
                 <img :src="blog.couverture" :alt="blog.titre" class="related-img" />
                 <div class="related-content">
                    <span class="related-cat">{{ blog.categorie }}</span>
                    <h3 class="related-title">{{ blog.titre }}</h3>
                    <span class="related-date">{{ formatDate(blog.date) }}</span>
                 </div>
               </NuxtLink>
            </div>
          </div>

        </main>

      </div>
    </section>

    <!-- LIGHTBOX OVERLAY -->
    <Transition name="fade">
      <div v-if="lightboxImg" class="lightbox-overlay" @click="closeLightbox">
        <button class="lightbox-close" @click.stop="closeLightbox">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <img :src="lightboxImg" class="lightbox-image" @click.stop />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// We need Quill's base CSS to render the saved HTML cleanly (lists, indents, formatting constraints)
import 'quill/dist/quill.snow.css' 

const route = useRoute()
const router = useRouter()
const blogId = Number(route.params.id)

// We mock the database just like the index
const allBlogs = [
  { 
    id: 1, 
    titre: 'Les nouvelles initiatives en énergie solaire et l\'impact global', 
    categorie: 'Énergies Renouvelables',
    contenu: '<p>Face au réchauffement climatique, notre nouvelle approche pour le développement énergétique permet de réduire les empreintes carbone de façon drastique.</p><h3>Une opportunité en or</h3><p>Le photovoltaïque s\'impose aujourd\'hui comme le premier vecteur d\'investissement propre en Afrique. L\'innovation constante réduit les coûts d\'installation tout en maximisant la capacité d\'emmagasinage, ce qui garantit non seulement un accès durable mais aussi très rentable pour les partenaires de long terme.</p><ul><li>Baisse des coûts de production</li><li>Investissements institutionnels croissants</li><li>Impact social positif</li></ul>', 
    date: '2026-03-20',
    couverture: 'https://images.unsplash.com/photo-1509391366360-12009cb9f3ac?auto=format&fit=crop&q=80&w=800',
    galerie: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  { 
    id: 2, 
    titre: 'Modernisation des infrastructures de transport en Afrique', 
    categorie: 'Infrastructures',
    contenu: '<p>La logistique de transport moderne passe par la rationalisation des réseaux routiers existants, notamment par l\'utilisation de solutions d\'intelligence artificielle pour la gestion du trafic et des flottes marchandes.</p>', 
    date: '2026-03-10',
    couverture: 'https://images.unsplash.com/photo-1541888081622-3a27a36cb3a1?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    titre: 'Conférence annuelle de logistique : Les retours d\'expérience', 
    categorie: 'Événements',
    contenu: '<p>Nous étions présents à la dernière grande convention sur la logistique transport au mois de février. L\'occasion d\'aborder les enjeux de l\'import/export sécurisé sur le continent, mais aussi au niveau global.</p>', 
    date: '2026-02-28',
    couverture: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1524f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, 
    titre: 'L\'avenir de l\'énergie renouvelable : éolien ou solaire ?', 
    categorie: 'Énergies Renouvelables',
    contenu: '<p>Nous avons analysé l\'impact des deux principales énergies vertes sur les dix dernières années...</p>', 
    date: '2026-01-20',
    couverture: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, 
    titre: 'Parcs éoliens : Les nouveaux champions de demain', 
    categorie: 'Énergies Renouvelables',
    contenu: '<p>Le potentiel de l\'éolien offshore est immense...</p>', 
    date: '2025-12-10',
    couverture: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'
  }
]

// Current Blog
const currentBlog = computed(() => {
  return allBlogs.find(b => b.id === blogId) || allBlogs[0] // fallback for testing
})

// Meta tags
useHead({
  title: `${currentBlog.value?.titre || 'Blog'} - Mapko & Partners`,
  meta: [
    { name: 'description', content: currentBlog.value?.contenu?.replace(/<[^>]+>/g, '').substring(0, 150) + '...' || '' }
  ]
})

// Related Blogs
const relatedBlogs = computed(() => {
  return allBlogs
    .filter(b => b.categorie === currentBlog.value?.categorie && b.id !== currentBlog.value?.id)
    .slice(0, 2) // only 2 latest
})

// Categories dynamic count
const categoriesCount = computed(() => {
  const counts: Record<string, number> = {}
  allBlogs.forEach(b => {
    counts[b.categorie] = (counts[b.categorie] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }))
})

// Sidebar logic
const localSearch = ref('')

const onSearch = () => {
  if (localSearch.value.trim().length > 0) {
    // Navigate to the list page with the query param (this is how you fake search routing in pure Vue without a store)
    router.push({ path: '/blogs' })
  }
}

const onCategorySelect = (catName: string) => {
  // same as search
  router.push({ path: '/blogs' })
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

// Lightbox logic
const lightboxImg = ref<string | null>(null)

const openLightbox = (url: string) => {
  lightboxImg.value = url
  document.body.style.overflow = 'hidden' // hide scroll
}

const closeLightbox = () => {
  lightboxImg.value = null
  document.body.style.overflow = '' // restore scroll
}
</script>

<style scoped>
.blog-detail-page {
  background: #f8fafc;
  min-height: 100vh;
}

/* ── LAYOUT ── */
.blogs-section {
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
    flex-direction: row-reverse; /* Sidebar Right */
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

.category-count {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* ── MAIN CONTENT (ARTICLE) ── */
.blogs-main {
  flex: 1;
  width: 100%;
}

.blog-article {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  padding: 2.5rem;
}

@media (max-width: 640px) {
  .blog-article {
    padding: 1.5rem;
  }
}

.article-header {
  margin-bottom: 2rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.article-category {
  background: var(--color-violet);
  color: #ffffff;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(122, 46, 142, 0.3);
}

.article-date {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
}

.article-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
}

.article-cover {
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .article-cover {
    height: 250px;
  }
}

.article-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Base Quill Overrides mapped for nice rendering outside of the editor */
.article-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  border: none;
  padding: 0;
}

:deep(.article-body h2),
:deep(.article-body h3) {
  color: #0f172a;
  font-weight: 800;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

:deep(.article-body p) {
  margin-bottom: 1.5rem;
}

:deep(.article-body ul) {
  list-style: none; /* Quill injects its own classes sometimes or we use custom list */
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

:deep(.article-body ul li) {
  position: relative;
  margin-bottom: 0.5rem;
}

:deep(.article-body ul li::before) {
  content: '•';
  color: var(--color-violet);
  font-weight: bold;
  font-size: 1.5rem;
  position: absolute;
  left: -1rem;
  top: -0.4rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.share-btn:hover {
  transform: translateY(-2px);
}

/* ── RELATED ── */
.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.related-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.related-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.related-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.related-cat {
  color: var(--color-blue);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.related-title {
  color: #0f172a;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.4;
  margin-bottom: 0.8rem;
}

.related-date {
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: auto;
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

.reveal-delay-2 {
  animation-delay: 0.4s;
}

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── GALLERY & LIGHTBOX ── */
.article-cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-cover:hover .article-cover-overlay {
  background: rgba(0,0,0,0.15);
}

.zoom-icon {
  width: 48px;
  height: 48px;
  color: #ffffff;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

.article-cover:hover .zoom-icon {
  opacity: 1;
  transform: scale(1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 18, 31, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.zoom-icon-sm {
  width: 32px;
  height: 32px;
  color: #ffffff;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.08);
}

.gallery-item:hover .gallery-overlay {
  background: rgba(13, 18, 31, 0.3);
}

.gallery-item:hover .zoom-icon-sm {
  opacity: 1;
  transform: scale(1);
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: zoom-out;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: #ffffff;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 10000;
}

.lightbox-close:hover {
  transform: scale(1.2) rotate(90deg);
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  cursor: default;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
