<template>
  <header class="admin-topbar">
    <div class="topbar-left">
      <!-- Burger pour Mobile -->
      <button class="btn-action mobile-only burger-btn" @click="$emit('toggle-sidebar')">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>

      <!-- Toggle Collapse pour Desktop -->
      <button class="btn-action desktop-only hide-sidebar-btn" @click="$emit('toggle-collapse')">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
      </button>

    </div>

    <div class="topbar-right">
      

      <div class="user-profile">
        <div class="user-info">
          <p class="user-name">{{ fullName }}</p>
          <p class="user-role">{{ roleName }}</p>
        </div>
        <div class="user-avatar initials-avatar">
          <span>{{ initials }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~~/stores/auth'

const auth = useAuthStore()

const fullName = computed(() => {
  if (!auth.user) return 'Invité'
  return `${auth.user.prenom} ${auth.user.nom}`
})

const roleName = computed(() => {
  if (!auth.user) return 'N/A'
  
  // Formatage du rôle (ex: super_admin -> Super Admin)
  const role = auth.user.role || 'Admin'
  return role.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
})

const initials = computed(() => {
  if (!auth.user) return '?'
  const p = auth.user.prenom?.charAt(0) || ''
  const n = auth.user.nom?.charAt(0) || ''
  return (p + n).toUpperCase()
})
</script>

<style scoped>
.admin-topbar {
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #eef2f6;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0; /* On gère le décalage via la transition */
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* On décale la topbar uniquement sur desktop */
@media (min-width: 1025px) {
  .admin-topbar {
    left: 280px;
  }
  .is-collapsed .admin-topbar {
    left: 80px;
  }
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.btn-action {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-action:hover {
  background: #f1f5f9;
  color: var(--color-violet);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid #eef2f6;
  width: 100%;
  max-width: 320px;
  color: #94a3b8;
}

.search-bar input {
  background: none;
  border: none;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  color: #1a202c;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ecfdf5;
  color: #059669;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;
  text-transform: uppercase;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.dot-alert {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #f43f5e;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 1.5rem;
  border-left: 1px solid #eef2f6;
  cursor: pointer;
}

.user-info {
  text-align: right;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  margin: 0;
}

.user-role {
  font-size: 0.7rem;
  color: #94a3b8;
  margin: 0;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #eef2f6;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials-avatar {
  background: var(--color-violet, #7A2E8E);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.desktop-only { display: block; }
.mobile-only { display: none; }

@media (max-width: 1024px) {
  .desktop-only { display: none; }
  .mobile-only { display: block; }
  .admin-topbar { padding: 0 1.25rem; }
  .user-info { display: none; }
}

@media (max-width: 640px) {
  .search-bar, .status-badge {
    display: none;
  }
}
</style>
