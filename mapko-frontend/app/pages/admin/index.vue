<template>
  <div class="dashboard">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard' }]" class="animate-reveal" />

    <!-- Header -->
    <div class="dashboard-header animate-reveal reveal-delay-1">
      <div class="welcome-text">
        <h1>Activité Globale</h1>
        <p>Aperçu en temps réel de la performance de Mapko & Partners.</p>
      </div>
      <div class="header-actions">
        <button class="btn-refresh" @click="refreshData">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          Actualiser
        </button>
        <NuxtLink to="/admin/references/ajouter" class="btn-add">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Créer un projet
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div 
        v-for="(stat, idx) in stats" 
        :key="stat.title" 
        class="stat-card animate-reveal"
        :class="'reveal-delay-' + (idx + 1)"
      >
        <div class="stat-card__icon" :style="{ background: stat.bg, color: stat.color }">
          <component :is="stat.icon" />
        </div>
        <div class="stat-card__content">
           <p class="stat-label">{{ stat.title }}</p>
           <h3 class="stat-value">{{ stat.value }}</h3>
           <p class="stat-trend" :class="stat.trendUp ? 'trend-up' : 'trend-down'">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline :points="stat.trendUp ? '23 6 13.5 15.5 8.5 10.5 1 18' : '23 18 13.5 8.5 8.5 13.5 1 6'"></polyline><polyline :points="stat.trendUp ? '17 6 23 6 23 12' : '17 18 23 18 23 12'"></polyline></svg>
             {{ stat.trend }}%
           </p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="dashboard-main-grid">
      <!-- Recent Projects -->
      <div class="card-section animate-reveal reveal-delay-3">
        <div class="card-header">
          <h3 class="card-title">Projets Récents</h3>
          <NuxtLink to="/admin/references" class="card-link">Toute la liste</NuxtLink>
        </div>
        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>PROJET</th>
                <th>SECTEUR</th>
                <th>STATUT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in recentProjects" :key="project.id">
                <td>
                  <div class="prj-info">
                    <p class="prj-name">{{ project.name }}</p>
                    <p class="prj-meta">{{ project.country }}</p>
                  </div>
                </td>
                <td><span class="badge-sct">{{ project.sector }}</span></td>
                <td>
                  <span class="status-token" :class="project.statusClass">
                    {{ project.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Messages -->
      <div class="card-section animate-reveal reveal-delay-4">
        <div class="card-header">
          <h3 class="card-title">Messages Récents</h3>
          <NuxtLink to="/admin/messages" class="card-link">Lire tout</NuxtLink>
        </div>
        <div class="msgs-list">
          <div v-for="msg in latestMessages" :key="msg.id" class="msg-item">
            <div class="msg-avatar" :style="{ background: msg.avatarBg }">
              {{ msg.author.charAt(0) }}
            </div>
            <div class="msg-body">
              <div class="msg-meta-row">
                <p class="msg-author">{{ msg.author }}</p>
                <p class="msg-time">{{ msg.time }}</p>
              </div>
              <p class="msg-subj">{{ msg.subject }}</p>
              <p class="msg-text">{{ msg.snippet }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

definePageMeta({
  layout: 'admin'
})

// Custom SVG Icons
const IconBriefcase = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2' }), h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })])
const IconMail = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('polyline', { points: '22,6 12,13 2,6' })])
const IconUsers = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), h('circle', { cx: '9', cy: '7', r: '4' }), h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }), h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })])

const stats = ref([
  { title: 'Projets Actifs', value: '12', trend: '+15', trendUp: true, icon: IconBriefcase, color: '#7A2E8E', bg: 'rgba(122, 46, 142, 0.1)' },
  { title: 'Derniers Messages', value: '03', trend: '-2', trendUp: false, icon: IconMail, color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  { title: 'Partenaires', value: '24', trend: '+5', trendUp: true, icon: IconUsers, color: '#7A2E8E', bg: 'rgba(122, 46, 142, 0.1)' },
])

const recentProjects = [
  { id: 1, name: 'Projet Logistique', country: 'Togo', sector: 'Transport', status: 'En cours', statusClass: 'st-vlt' },
  { id: 2, name: 'Centrale Solaire', country: 'Bénin', sector: 'Energie', status: 'Finalisé', statusClass: 'st-blu' },
  { id: 3, name: 'Palais Justice', country: 'Côte d\'Ivoire', sector: 'BTP', status: 'En cours', statusClass: 'st-vlt' },
]

const latestMessages = [
  { id: 1, author: 'K. Mensah', time: 'Il y a 2h', subject: 'Demande conseil', snippet: 'Question sur la logistique...', avatarBg: '#7A2E8E' },
  { id: 2, author: 'S. Diallo', time: 'Il y a 5h', subject: 'Partenariat', snippet: 'Opportunité de collaboration...', avatarBg: '#0F4C81' },
]

const refreshData = () => {
    console.log('Refresh data triggered')
}
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; }

/* Header */
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.welcome-text h1 {
  font-size: 1.5rem;
  font-weight: 700; /* Gras diminué */
  color: #000000;
  margin: 0;
}

.welcome-text p {
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.header-actions { display: flex; gap: 0.75rem; }

.btn-refresh, .btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-refresh {
  background: #ffffff;
  color: #000000;
  border: 1px solid #eef2f6;
}

.btn-add {
  background: var(--color-violet);
  color: #ffffff;
  border: none;
}

.btn-add:hover { filter: brightness(1.1); }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #eef2f6;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover { transform: translateY(-4px); }

.stat-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-label { font-size: 0.7rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin: 0; }
.stat-value { font-size: 1.25rem; font-weight: 700; color: #000000; margin: 0.1rem 0; }
.stat-trend { font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; gap: 0.2rem; }
.trend-up { color: var(--color-violet); }
.trend-down { color: var(--color-blue); }

/* Sections */
.dashboard-main-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.5rem;
}

.card-section {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #eef2f6;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.card-title { font-size: 1rem; font-weight: 700; color: #000000; margin: 0; }
.card-link { font-size: 0.8rem; font-weight: 600; color: var(--color-blue); text-decoration: none; }

/* Table */
.table-wrapper { overflow-x: auto; }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th { text-align: left; font-size: 0.65rem; color: #94a3b8; padding: 0.75rem 1rem; border-bottom: 2px solid #f8fafc; }
.admin-table td { padding: 1.1rem 1rem; border-bottom: 1px solid #f8fafc; }

.prj-name { font-weight: 600; color: #000000; font-size: 0.85rem; margin: 0; }
.prj-meta { font-size: 0.75rem; color: #94a3b8; margin: 0; }
.badge-sct { background: rgba(15, 76, 129, 0.05); color: var(--color-blue); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }

.status-token { padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.7rem; font-weight: 700; }
.st-vlt { background: #fdf4ff; color: var(--color-violet); }
.st-blu { background: #eff6ff; color: var(--color-blue); }

/* Msgs */
.msgs-list { display: flex; flex-direction: column; gap: 1rem; }
.msg-item { display: flex; gap: 0.75rem; padding-bottom: 1rem; border-bottom: 1px solid #f8fafc; }
.msg-item:last-child { border: none; }
.msg-avatar { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700; flex-shrink: 0; }
.msg-meta-row { display: flex; justify-content: space-between; }
.msg-author { font-weight: 600; color: #000000; font-size: 0.85rem; margin: 0; }
.msg-time { font-size: 0.7rem; color: #94a3b8; }
.msg-subj { font-size: 0.75rem; font-weight: 700; color: var(--color-violet); margin: 0 0 0.1rem; }
.msg-text { font-size: 0.75rem; color: #64748b; line-height: 1.3; margin: 0; }

@media (max-width: 1100px) {
  .dashboard-main-grid { grid-template-columns: 1fr; }
}
</style>