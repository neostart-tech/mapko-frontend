<template>
  <div class="dashboard-wrapper">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard' }]" class="animate-reveal" />

    <!-- BANNER / WELCOME -->
    <div class="welcome-banner animate-reveal reveal-delay-1">
      <div class="welcome-banner__content">
        <h1 class="welcome-title">Content de vous revoir !</h1>
        <p class="welcome-subtitle">Voici ce qui se passe sur Mapko & Partners aujourd'hui.</p>
        <div class="welcome-actions">
          <NuxtLink to="/admin/blogs/ajouter" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Nouvel Article
          </NuxtLink>
          <button class="btn-secondary" @click="refreshData">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            Rafraîchir
          </button>
        </div>
      </div>
      <div class="welcome-banner__img">
        <img src="/images/logo_blanc.png" alt="Mapko Logo" />
      </div>
    </div>

    <!-- QUICK STATS -->
    <div class="stats-container">
      <div v-for="(stat, idx) in stats" :key="stat.title" 
           class="premium-stat-card animate-reveal" 
           :class="'reveal-delay-' + (idx + 1)">
        <div class="stat-icon-box" :style="{ background: stat.bg, color: stat.color }">
          <component :is="stat.icon" />
        </div>
        <div class="stat-info">
          <span class="stat-title">{{ stat.title }}</span>
          <div class="stat-value-row">
            <span class="stat-number">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN GRID -->
    <div class="dashboard-grid">
      
      <!-- LEFT COL: Projects & Blogs -->
      <div class="grid-col main-col">
        
        <!-- PROJECTS TABLE -->
        <section class="mega-card animate-reveal reveal-delay-2">
          <div class="mega-card__header">
            <h2 class="mega-card__title">Projets Récents</h2>
            <NuxtLink to="/admin/references" class="mega-card__link">Voir tout</NuxtLink>
          </div>
          <div class="table-container">
            <table class="premium-table">
              <thead>
                <tr>
                  <th>Projet</th>
                  <th>Localisation</th>
                  <th>Secteur</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prj in recentProjects" :key="prj.id" @click="router.push(`/admin/references/${prj.id}`)">
                  <td>
                    <div class="item-name-cell">
                      <div class="item-avatar">{{ prj.name?.charAt(0) || '?' }}</div>
                      <span>{{ prj.name }}</span>
                    </div>
                  </td>
                  <td>{{ prj.country }}</td>
                  <td><span class="sector-tag">{{ prj.sector }}</span></td>
                  <td>
                    <span class="status-pill" :class="prj.statusClass">{{ prj.status }}</span>
                  </td>
                </tr>
                <tr v-if="!recentProjects.length">
                  <td colspan="4" class="p-0">
                    <div v-if="referenceStore.loading" class="py-12">
                      <AdminLoader :visible="true" inline />
                    </div>
                    <div v-else class="empty-state py-12">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                      </svg>
                      <p>Aucun projet récent trouvé.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- LATEST BLOGS -->
        <section class="mega-card animate-reveal reveal-delay-3 mt-6">
          <div class="mega-card__header">
            <h2 class="mega-card__title">Derniers Articles de Blog</h2>
            <NuxtLink to="/admin/blogs" class="mega-card__link">Gérer les blogs</NuxtLink>
          </div>
          <div class="blogs-preview-grid">
            <div v-for="blog in recentBlogs" :key="blog.id" class="blog-preview-card" @click="router.push(`/admin/blogs/${blog.id}`)">
              <img :src="getImageUrl(blog.images?.find(i => i.is_couverture)?.path || blog.images?.[0]?.path)" alt="" class="blog-preview-img" />
              <div class="blog-preview-content">
                <span class="blog-preview-cat">{{ blog.categorie }}</span>
                <h4 class="blog-preview-title">{{ blog.titre }}</h4>
                <p class="blog-preview-date">{{ formatDate(blog.created_at) }}</p>
              </div>
            </div>
            <div v-if="!recentBlogs.length" class="w-full col-span-2">
              <div v-if="blogStore.loading" class="py-12">
                <AdminLoader :visible="true" inline />
              </div>
              <div v-else class="empty-state py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" />
                </svg>
                <p>Aucun article de blog disponible.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- RIGHT COL: Messages -->
      <div class="grid-col sidebar-col">
        
        <section class="mega-card animate-reveal reveal-delay-4 h-full">
          <div class="mega-card__header">
            <h2 class="mega-card__title">Messagerie</h2>
            <NuxtLink to="/admin/messages" class="mega-card__link">Boîte de réception</NuxtLink>
          </div>
          <div class="messages-stack">
            <div v-for="msg in latestMessages" :key="msg.id" class="message-row" :class="{ 'is-new': !msg.isRead }" @click="router.push('/admin/messages')">
              <div class="message-user">
                <div class="message-avatar" :style="{ background: msg.avatarBg }">
                  {{ msg.author?.charAt(0) || '?' }}
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-author">{{ msg.author }}</span>
                    <span class="message-time">{{ msg.time }}</span>
                  </div>
                  <p class="message-subject">{{ msg.subject }}</p>
                  <p class="message-snippet">{{ msg.snippet }}</p>
                </div>
              </div>
            </div>
            <div v-if="!latestMessages.length" class="w-full">
              <div v-if="messageStore.loading" class="py-12">
                <AdminLoader :visible="true" inline />
              </div>
              <div v-else class="empty-state py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>Aucun message reçu.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { h, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '~~/stores/blog'
import { useReferenceStore } from '~~/stores/reference'
import { useSecteurStore } from '~~/stores/secteur'
import { useMessageStore } from '~~/stores/message'
import { usePartenaireStore } from '~~/stores/partenaire'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const config = useRuntimeConfig()
const blogStore = useBlogStore()
const referenceStore = useReferenceStore()
const secteurStore = useSecteurStore()
const messageStore = useMessageStore()
const partenaireStore = usePartenaireStore()

// Icons
const IconBriefcase = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2' }), h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })])
const IconMail = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('polyline', { points: '22,6 12,13 2,6' })])
const IconUsers = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), h('circle', { cx: '9', cy: '7', r: '4' })])
const IconGrid = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '7', height: '7' }), h('rect', { x: '14', y: '3', width: '7', height: '7' }), h('rect', { x: '14', y: '14', width: '7', height: '7' }), h('rect', { x: '3', y: '14', width: '7', height: '7' })])

const stats = computed(() => [
  { title: 'Projets', value: referenceStore.references?.length || 0, icon: IconBriefcase, color: 'var(--color-violet)', bg: 'rgba(122, 46, 142, 0.1)' },
  { title: 'Secteurs', value: secteurStore.secteurs?.length || 0, icon: IconGrid, color: 'var(--color-blue)', bg: 'rgba(15, 76, 129, 0.1)' },
  { title: 'Partenaires', value: partenaireStore.partenaires?.length || 0, icon: IconUsers, color: 'var(--color-violet)', bg: 'rgba(122, 46, 142, 0.1)' },
  { title: 'Messages', value: messageStore.unreadCount || 0, icon: IconMail, color: 'var(--color-blue)', bg: 'rgba(15, 76, 129, 0.1)' },
])

const recentProjects = computed(() => {
  return [...(referenceStore.references || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      name: p.titre,
      country: p.pays,
      sector: p.secteur?.titre || 'N/A',
      status: p.statut === 'termine' ? 'Terminé' : 'En cours',
      statusClass: p.statut === 'termine' ? 'st-done' : 'st-process'
    }))
})

const recentBlogs = computed(() => {
  return [...(blogStore.blogs || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 2)
})

const latestMessages = computed(() => {
  return [...(messageStore.messages || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(m => ({
      id: m.id,
      author: m.expediteur,
      time: formatDate(m.created_at),
      subject: m.objet,
      snippet: (m.contenu?.length || 0) > 50 ? m.contenu.substring(0, 50) + '...' : m.contenu,
      isRead: m.statut,
      avatarBg: m.statut ? '#cbd5e1' : `linear-gradient(135deg, var(--color-violet), var(--color-blue))`
    }))
})

const getImageUrl = (path?: string) => {
  if (!path) return '/images/blog-placeholder.jpg';
  return `${config.public.storageBase}/${path}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const diff = new Date().getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 24) return hours === 0 ? 'À l\'instant' : `Il y a ${hours}h`
  return date.toLocaleDateString('fr-FR')
}

const refreshData = async () => {
    await Promise.all([
      blogStore.fetch(),
      referenceStore.fetch(),
      secteurStore.fetch(),
      messageStore.fetch(),
      partenaireStore.fetch()
    ])
}

onMounted(() => {
  refreshData()
})
</script>

<style scoped>
.dashboard-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* --- BANNER --- */
.welcome-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 20px;
  padding: 1.75rem 2.5rem;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.welcome-title { font-size: 1.5rem;  margin-bottom: 0.25rem; }
.welcome-subtitle { font-size: 0.95rem; opacity: 0.7; margin-bottom: 1.25rem; }

.welcome-actions { display: flex; gap: 0.75rem; }
.btn-primary { 
  background: var(--color-violet); color: #ffffff; border: none; padding: 0.6rem 1.2rem; border-radius: 10px;
  display: flex; align-items: center; gap: 0.5rem;  text-decoration: none; transition: transform 0.2s; font-size: 0.85rem;
}
.btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }

.btn-secondary {
  background: rgba(255,255,255,0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); padding: 0.6rem 1.2rem; border-radius: 10px;
  display: flex; align-items: center; gap: 0.5rem;  cursor: pointer; transition: all 0.2s; font-size: 0.85rem;
}
.btn-secondary:hover { background: rgba(255,255,255,0.2); }

.welcome-banner__img img { height: 80px; pointer-events: none; }

/* --- STATS --- */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.premium-stat-card {
  background: #ffffff;
  padding: 1.1rem 1.25rem;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.premium-stat-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }

.stat-icon-box {
  width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon-box :deep(svg) { width: 18px; height: 18px; }

.stat-info { display: flex; flex-direction: column; overflow: hidden; }
.stat-title { font-size: 0.65rem;  color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.15rem; }
.stat-number { font-size: 1.4rem;  color: #0f172a; }

/* --- GRID --- */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}

.mega-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.mega-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.mega-card__title { font-size: 1.1rem;; color: #0f172a; }
.mega-card__link { color: var(--color-blue); font-size: 0.8rem;  text-decoration: none; }

/* --- TABLE --- */
.table-container { overflow-x: auto; }
.premium-table { width: 100%; border-collapse: separate; border-spacing: 0 0.75rem; margin-top: -0.75rem; }
.premium-table th { text-align: left; padding: 1rem; color: #94a3b8; font-size: 0.7rem; text-transform: uppercase; border-bottom: 1px solid #f8fafc; }
.premium-table td { padding: 1rem; background: #ffffff; border-bottom: 1px solid #f8fafc; cursor: pointer; transition: background 0.2s; }
.premium-table tr:hover td { background: #f8fafc; }

.item-name-cell { display: flex; align-items: center; gap: 0.75rem;; color: #0f172a; }
.item-avatar {
  width: 32px; height: 32px; border-radius: 8px; background: #f1f5f9; color: var(--color-violet);
  display: flex; align-items: center; justify-content: center; font-size: 0.8rem;
}

.sector-tag { background: #f1f5f9; color: #475569; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.75rem;  }
.status-pill { padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.7rem;  }
.st-done { background: #eff6ff; color: var(--color-blue); }
.st-process { background: #fdf4ff; color: var(--color-violet); }

/* --- BLOGS PREVIEW --- */
.blogs-preview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 640px) { .blogs-preview-grid { grid-template-columns: 1fr; } }

.blog-preview-card {
  display: flex; gap: 1rem; padding: 1rem; border-radius: 16px; background: #f8fafc; cursor: pointer; transition: all 0.2s;
}
.blog-preview-card:hover { background: #f1f5f9; transform: scale(1.02); }

.blog-preview-img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; }
.blog-preview-content { display: flex; flex-direction: column; justify-content: center; }
.blog-preview-cat { color: var(--color-blue); font-size: 0.65rem;  text-transform: uppercase; }
.blog-preview-title { font-size: 0.95rem;  color: #0f172a; margin: 0.1rem 0; line-height: 1.3; }
.blog-preview-date { font-size: 0.75rem; color: #94a3b8; }

/* --- MESSAGES --- */
.messages-stack { display: flex; flex-direction: column; gap: 1rem; }
.message-row { 
  padding: 1.25rem; border-radius: 16px; border: 1px solid #f1f5f9; cursor: pointer; transition: all 0.2s;
}
.message-row:hover { background: #f8fafc; border-color: var(--color-violet-light); }
.message-row.is-new { background: #fdf4ff; border-color: #f5d0fe; }

.message-user { display: flex; gap: 1rem; }
.message-avatar { 
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; display: flex;
  align-items: center; justify-content: center; color: #ffffff; 
}

.message-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
.message-author { font-size: 0.9rem;  color: #0f172a; }
.message-time { font-size: 0.7rem; color: #94a3b8; }
.message-subject { font-size: 0.8rem;  color: var(--color-violet); margin-bottom: 0.1rem; }
.message-snippet { font-size: 0.8rem; color: #64748b; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 4rem 2rem; color: #94a3b8; gap: 1rem; text-align: center;
}
</style>
