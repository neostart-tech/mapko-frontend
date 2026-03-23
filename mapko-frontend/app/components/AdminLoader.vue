<template>
  <Transition name="fade">
    <div v-if="visible" :class="[inline ? 'admin-loader-inline' : 'admin-loader-overlay']">
      <div class="loader-container" :class="{ 'is-inline': inline }">
        <!-- Cercle rotatif extérieur -->
        <div class="loader-circle"></div>
        <!-- Logo au centre -->
        <div class="loader-logo">
          <img src="/images/logo_noir.png" alt="Mapko" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
  inline?: boolean;
}>();
</script>

<style scoped>
.admin-loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.admin-loader-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  width: 100%;
}

.loader-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: var(--color-violet);
  border-right-color: var(--color-blue);
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.loader-logo {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  animation: pulse 2s ease-in-out infinite;
}

.loader-logo img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
