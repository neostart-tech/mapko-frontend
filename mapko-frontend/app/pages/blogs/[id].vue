<template>
  <div class="blog-detail-page pt-10">
    <!-- CONTENT LAYOUT -->
    <section class="blogs-section">
      <div class="blogs-container">
        
        <!-- MAIN CONTENT -->
        <main class="blogs-main">
          <!-- Loader spécifique pour le détail -->
          <AdminLoader :visible="!currentBlog" inline />

          <template v-if="currentBlog">
          
          <!-- BREADCRUMB -->
          <nav class="breadcrumb animate-reveal">
            <NuxtLink to="/blogs" class="breadcrumb-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
               Retour aux blogs
            </NuxtLink>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ currentBlog.categorie }}</span>
          </nav>

          <article class="blog-article shadow-card animate-reveal">
            
            <div class="article-header">
              <div class="article-meta">
                <span class="article-category">{{ currentBlog.categorie }}</span>
                <span class="article-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {{ formatDate(currentBlog.created_at) }}
                </span>
              </div>
              <h1 class="article-title">{{ currentBlog.titre }}</h1>
            </div>

            <div class="article-cover relative cursor-pointer group" @click="openLightbox(getImageUrl(currentBlog.images?.find(img => img.is_couverture)?.path || currentBlog.images?.[0]?.path))">
              <img :src="getImageUrl(currentBlog.images?.find(img => img.is_couverture)?.path || currentBlog.images?.[0]?.path)" :alt="currentBlog.titre" class="article-cover-img" />
              <div class="article-cover-overlay">
                 <svg class="zoom-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
              </div>
            </div>

            <div class="article-body ql-editor" v-html="currentBlog.contenu"></div>

            <!-- GALERIE -->
            <div v-if="currentBlog.images && currentBlog.images.length > 1" class="article-gallery border-t border-gray-100 pt-8 mt-12">
              <h3 class="text-xl font-bold text-gray-800 mb-6">Galerie multimédia</h3>
              <div class="gallery-grid">
                <div 
                  v-for="(img, idx) in currentBlog.images.filter(i => !i.is_couverture)" 
                  :key="idx" 
                  class="gallery-item cursor-pointer group"
                  @click="openLightbox(getImageUrl(img.path))"
                >
                  <img :src="getImageUrl(img.path)" class="gallery-img" />
                  <div class="gallery-overlay">
                    <svg class="zoom-icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="article-share border-t border-gray-100 pt-8 mt-12 flex items-center justify-between">
              <span class="font-bold text-gray-800">Partager cet article</span>
              <div class="flex gap-4">
                 <button @click="shareOnFacebook" class="share-btn text-blue-800 bg-blue-50 hover:bg-blue-100" title="Partager sur Facebook">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                 </button>
                 <button @click="shareOnLinkedIn" class="share-btn text-blue-700 bg-blue-50 hover:bg-blue-100" title="Partager sur LinkedIn">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                 </button>
                 <button @click="shareOnX" class="share-btn text-gray-900 bg-gray-50 hover:bg-gray-100" title="Partager sur X">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464L20 4"></path></svg>
                 </button>
                 <button @click="shareOnWhatsApp" class="share-btn text-green-600 bg-green-50 hover:bg-green-100" title="Partager sur WhatsApp">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                 </button>
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
                 <img :src="getImageUrl(blog.images?.find(img => img.is_couverture)?.path || blog.images?.[0]?.path)" :alt="blog.titre" class="related-img" />
                 <div class="related-content">
                    <span class="related-cat">{{ blog.categorie }}</span>
                    <h3 class="related-title">{{ blog.titre }}</h3>
                    <span class="related-date">{{ formatDate(blog.created_at) }}</span>
                 </div>
               </NuxtLink>
            </div>
          </div>

          </template>
        </main>

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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore, type Blog } from '~~/stores/blog'
import { useSecteurStore } from '~~/stores/secteur'

// We need Quill's base CSS to render the saved HTML cleanly (lists, indents, formatting constraints)
import 'quill/dist/quill.snow.css' 

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const secteurStore = useSecteurStore()
const config = useRuntimeConfig()
const blogId = route.params.id as string

const currentBlog = ref<Blog | null>(null)
const loading = ref(true)

const getImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.public.storageBase}/${path}`;
};

onMounted(async () => {
  try {
    const data = await blogStore.show(blogId)
    currentBlog.value = data
    blogStore.fetch() // pour les articles suggérés
    secteurStore.fetch()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

// Meta tags
useHead({
  title: computed(() => `${currentBlog.value?.titre || 'Blog'} - Mapko & Partners`),
  meta: [
    { name: 'description', content: computed(() => currentBlog.value?.contenu?.replace(/<[^>]+>/g, '').substring(0, 150) + '...' || '') }
  ]
})

// Sharing Logic
const requestUrl = useRequestURL()
const shareUrl = computed(() => requestUrl.href)

const shareOnFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`, '_blank')
}

const shareOnLinkedIn = () => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`, '_blank')
}

const shareOnX = () => {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(currentBlog.value?.titre || '')}`, '_blank')
}

const shareOnWhatsApp = () => {
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent((currentBlog.value?.titre || '') + ' ' + shareUrl.value)}`, '_blank')
}

// Related Blogs
const relatedBlogs = computed(() => {
  if (!currentBlog.value) return []
  return blogStore.blogs
    .filter(b => b.categorie === currentBlog.value?.categorie && b.id !== currentBlog.value?.id)
    .slice(0, 2)
})

// Categories dynamic count
const categoriesCount = computed(() => {
  const sectors = [...secteurStore.secteurs].sort((a, b) => a.titre.localeCompare(b.titre))
  const list = sectors.map(s => {
    const count = blogStore.blogs.filter(b => b.categorie === s.titre).length
    return { name: s.titre, count }
  })
  
  // Toujours ajouter AUTRE
  const autreCount = blogStore.blogs.filter(b => b.categorie === 'AUTRE').length
  list.push({ name: 'AUTRE', count: autreCount })
  
  return list
})

// Sidebar logic
const localSearch = ref('')

const onSearch = () => {
  if (localSearch.value.trim().length > 0) {
    router.push({ path: '/blogs', query: { q: localSearch.value } })
  }
}

const onCategorySelect = (catName: string) => {
  router.push({ path: '/blogs', query: { q: catName } })
}

const formatDate = (dateString: string) => {
  if (!dateString) return '...'
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

// Lightbox logic
const lightboxImg = ref<string | null>(null)

const openLightbox = (url: string) => {
  lightboxImg.value = url
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxImg.value = null
  document.body.style.overflow = ''
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

/* ── BREADCRUMB ── */
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  font-weight: 700;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-blue);
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.breadcrumb-link:hover {
  color: #ffffff;
  background: var(--color-violet);
  border-color: var(--color-violet);
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(122, 46, 142, 0.2);
}

.breadcrumb-separator {
  color: #94a3b8;
  font-weight: 500;
  margin: 0 0.5rem;
}

.breadcrumb-current {
  color: #475569;
  background: #f1f5f9;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}
</style>
