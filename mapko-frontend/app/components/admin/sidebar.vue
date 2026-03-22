<template>
  <aside class="admin-sidebar" :class="{ 'is-mobile-open': isOpen, 'is-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div v-if="!isCollapsed" class="logo-area">
        <img src="/images/logo_mixte.png" alt="Mapko" class="sidebar-logo" />
      </div>
      <div v-else class="logo-area-collapsed">M</div>
      
      <button class="btn-close-mobile" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <p v-if="!isCollapsed" class="nav-section-title">Principal</p>
        
        <NuxtLink to="/admin" class="nav-link" active-class="is-active" title="Dashboard">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <span v-if="!isCollapsed" class="nav-label">Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/admin/messages" class="nav-link" active-class="is-active" title="Messages">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span v-if="isCollapsed" class="dot-count"></span>
          </div>
          <span v-if="!isCollapsed" class="nav-label">Messages</span>
          <span v-if="!isCollapsed" class="badge-count">3</span>
        </NuxtLink>

        <NuxtLink to="/admin/parametres" class="nav-link" active-class="is-active" title="Paramètres">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </div>
          <span v-if="!isCollapsed" class="nav-label">Paramètres</span>
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p v-if="!isCollapsed" class="nav-section-title">Contenu</p>
        
        <!-- Secteurs -->
        <div class="nav-dropdown" :class="{ 'is-open': activeDropdown === 'secteurs' }">
          <button class="nav-link dropdown-toggle" @click="toggleDropdown('secteurs')" title="Secteurs">
             <div class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>
             </div>
             <span v-if="!isCollapsed" class="nav-label">Secteurs</span>
             <svg v-if="!isCollapsed" class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div v-show="activeDropdown === 'secteurs' && !isCollapsed" class="dropdown-content">
            <NuxtLink to="/admin/secteurs" class="dropdown-link" active-class="is-sub-active">Liste des secteurs</NuxtLink>
            <NuxtLink to="/admin/secteurs/ajouter" class="dropdown-link" active-class="is-sub-active">Ajouter un secteur</NuxtLink>
          </div>
        </div>

        <!-- Références -->
        <div class="nav-dropdown" :class="{ 'is-open': activeDropdown === 'references' }">
          <button class="nav-link dropdown-toggle" @click="toggleDropdown('references')" title="Références">
             <div class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
             </div>
             <span v-if="!isCollapsed" class="nav-label">Références</span>
             <svg v-if="!isCollapsed" class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div v-show="activeDropdown === 'references' && !isCollapsed" class="dropdown-content">
            <NuxtLink to="/admin/references" class="dropdown-link" active-class="is-sub-active">Liste des projets</NuxtLink>
            <NuxtLink to="/admin/references/ajouter" class="dropdown-link" active-class="is-sub-active">Ajouter un projet</NuxtLink>
          </div>
        </div>

        <!-- Blogs -->
        <div class="nav-dropdown" :class="{ 'is-open': activeDropdown === 'blogs' }">
          <button class="nav-link dropdown-toggle" @click="toggleDropdown('blogs')" title="Blogs">
             <div class="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
             </div>
             <span v-if="!isCollapsed" class="nav-label">Blogs</span>
             <svg v-if="!isCollapsed" class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div v-show="activeDropdown === 'blogs' && !isCollapsed" class="dropdown-content">
            <NuxtLink to="/admin/blogs" class="dropdown-link" active-class="is-sub-active">Liste des blogs</NuxtLink>
            <NuxtLink to="/admin/blogs/ajouter" class="dropdown-link" active-class="is-sub-active">Ajouter un blog</NuxtLink>
          </div>
        </div>

        <NuxtLink to="/admin/partenaires" class="nav-link" active-class="is-active" title="Partenaires">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <span v-if="!isCollapsed" class="nav-label">Partenaires</span>
        </NuxtLink>

        <!-- Liens -->
        <NuxtLink to="/admin/liens" class="nav-link" active-class="is-active" title="Nos liens">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          <span v-if="!isCollapsed" class="nav-label">Nos liens</span>
        </NuxtLink>
      </div>
    </nav>

    <div class="sidebar-footer">
       <button class="btn-logout" @click="logout" :title="isCollapsed ? 'Déconnexion' : ''">
         <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
         </div>
         <span v-if="!isCollapsed">Déconnexion</span>
       </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean,
  isCollapsed: boolean
}>()

const activeDropdown = ref<string | null>(null)

const toggleDropdown = (name: string) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

const logout = () => {
  navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #ffffff;
  color: #1a202c;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid #eef2f6;
}

.admin-sidebar.is-collapsed {
  width: 80px;
}

.sidebar-header {
  height: 70px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef2f6;
  flex-shrink: 0;
}

.is-collapsed .sidebar-header {
  padding: 0;
  justify-content: center;
}

.logo-area-collapsed {
  width: 40px;
  height: 40px;
  background: var(--color-violet-light);
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
}

.sidebar-logo {
  height: 30px;
}

.btn-close-mobile {
  display: none;
  background: none;
  border: none;
  color: #1a202c;
  cursor: pointer;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.is-collapsed .sidebar-nav {
  padding: 1.5rem 0.5rem;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
  font-weight: 700;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
}

.is-collapsed .nav-link {
  justify-content: center;
  padding: 0.8rem 0;
}

.nav-link:hover {
  background: #f1f5f9;
  color: var(--color-blue);
}

.nav-link.is-active {
  background: rgba(122, 46, 142, 0.08);
  color: var(--color-violet);
}

.nav-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 24px;
}

.dot-count {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 6px;
  background: #f87171;
  border-radius: 50%;
}

.badge-count {
  margin-left: auto;
  background: #f87171;
  color: #ffffff;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 6px;
  font-weight: 800;
}

/* Dropdown */
.dropdown-toggle .chevron {
  margin-left: auto;
  transition: transform 0.3s ease;
  width: 14px;
}

.is-open .chevron {
  transform: rotate(180deg);
}

.dropdown-content {
  padding-left: 3rem;
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: hidden;
}

.dropdown-link {
  padding: 0.6rem 0.75rem;
  font-size: 0.85rem;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.dropdown-link:hover {
  color: var(--color-blue);
  background: #f8fafc;
}

.dropdown-link.is-sub-active {
  color: var(--color-violet);
  background: #fdf4ff;
  font-weight: 700;
}

.sidebar-footer {
  padding: 1.25rem 0.75rem;
  border-top: 1px solid #eef2f6;
}

.is-collapsed .sidebar-footer {
  padding: 1.25rem 0.5rem;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #fff1f2;
  color: #f43f5e;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.is-collapsed .btn-logout {
  padding: 0.75rem 0;
  justify-content: center;
}

.btn-logout:hover {
  background: #f43f5e;
  color: #ffffff;
}

@media (max-width: 1024px) {
  .admin-sidebar {
    transform: translateX(-100%);
    width: 280px !important;
  }
  
  .admin-sidebar.is-mobile-open {
    transform: translateX(0);
  }
  
  .btn-close-mobile {
    display: block;
  }
}
</style>
