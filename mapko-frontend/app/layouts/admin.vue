<template>
    <div class="admin-layout-wrapper">
        <AdminLoader :visible="isLoading" />
        
        <div class="admin-layout" :class="{ 'is-collapsed': isCollapsed }">
            <AdminSidebar :is-open="isSidebarOpen" :is-collapsed="isCollapsed" @close="isSidebarOpen = false" />

            <div class="admin-main">
                <AdminTopbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
                    @toggle-collapse="isCollapsed = !isCollapsed" />

                <main class="admin-content">
                    <slot />
                </main>
            </div>

            <!-- Mobile Overlay -->
            <div v-if="isSidebarOpen" class="sidebar-overlay" @click="isSidebarOpen = false"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useMessageStore } from '~~/stores/message'

const isSidebarOpen = ref(false)
const isCollapsed = ref(false)
const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const messageStore = useMessageStore()

onMounted(() => {
  // Lancer le polling des messages pour le badge dynamique
  messageStore.startPolling()

  // Navigation hooks pour le loader
  router.beforeEach((to, from, next) => {
    // On ne montre pas le loader si on reste sur la même page (query change etc)
    if (to.path !== from.path) {
      isLoading.value = true
    }
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 400) // Petit délai pour que l'animation soit visible
  })
})

onUnmounted(() => {
  messageStore.stopPolling()
})

watch(() => route.path, () => {
    isSidebarOpen.value = false
})
</script>

<style scoped>
.admin-layout {
    min-height: 100vh;
    background: #f8fafc;
    display: flex;
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
}

.admin-main {
    flex: 1;
    margin-left: 280px;
    /* Sidebar width expanded */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-collapsed .admin-main {
    margin-left: 80px;
}

.admin-content {
    flex: 1;
    padding: 2rem;
    margin-top: 70px;
}

.sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 998;
}

@media (max-width: 1024px) {

    .admin-main,
    .is-collapsed .admin-main {
        margin-left: 0;
    }
}
</style>
