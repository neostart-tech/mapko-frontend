<template>
  <div class="empty-state-container p-12 flex flex-col items-center justify-center text-center space-y-4">
    <div class="icon-wrapper w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 4-8-4m8 4v6" />
      </svg>
    </div>
    <div class="text-content">
      <h3 class="text-lg font-medium text-gray-900">{{ title || 'Aucun élément trouvé' }}</h3>
      <p class="text-sm text-gray-500 max-w-xs mx-auto mt-1">
        {{ message || 'Il n\'y a actuellement aucune donnée à afficher dans cette section.' }}
      </p>
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  message?: string;
}>();
</script>

<style scoped>
.empty-state-container {
  min-height: 300px;
  animation: fadeIn 0.5s ease;
}

.icon-wrapper {
  transition: transform 0.3s ease;
}

.empty-state-container:hover .icon-wrapper {
  transform: scale(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
