<template>
  <nav class="admin-breadcrumb" aria-label="Breadcrumb">
    <ul class="breadcrumb-list">
      <li class="breadcrumb-item">
        <NuxtLink to="/admin" class="breadcrumb-link home-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </NuxtLink>
      </li>
      
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <svg class="separator" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        
        <NuxtLink 
          v-if="item.link" 
          :to="item.link" 
          class="breadcrumb-link"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="breadcrumb-text">{{ item.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  link?: string;
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<style scoped>
.admin-breadcrumb {
  margin-bottom: 2rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-violet);
}

.home-link {
  display: flex;
  color: var(--color-blue);
}

.breadcrumb-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000;
}

.separator {
  margin: 0 0.75rem;
  color: #cbd5e1;
}

.breadcrumb-item:last-child .breadcrumb-text {
  color: var(--color-violet);
}
</style>
