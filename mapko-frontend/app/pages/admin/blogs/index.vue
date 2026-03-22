<template>
  <div class="blogs-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Blogs' }]" />

    <div v-if="pageLoading" class="bg-white rounded-2xl h-96 animate-pulse border border-gray-200"></div>

    <div v-else class="content-wrapper">
      <!-- HEADER CARD -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-black font-['Outfit']">Gestion des Articles de Blog</h2>
            <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
              Actualités, articles et publications
            </p>
          </div>
          <div class="flex items-center gap-3">
             <div class="stats-pill bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100 flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-violet-600"></span>
                <span class="text-xs font-bold">{{ blogs.length }} Articles</span>
             </div>
             <NuxtLink to="/admin/blogs/ajouter" class="btn-add">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
               </svg>
               Ajouter
             </NuxtLink>
          </div>
        </div>

        <!-- FILTERS -->
        <div class="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-gray-50 bg-[#fafafa]/50">
          <div class="relative w-full sm:w-64">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Rechercher par titre, contenu..." 
              class="pl-10 pr-4 py-2.5 w-full rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
            />
          </div>

          <!-- COLUMNS TOGGLE -->
          <div class="relative" ref="dropdownRef">
            <button @click="isDropdownOpen = !isDropdownOpen" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Colonnes
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform" :class="isDropdownOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="isDropdownOpen" class="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-20 border border-gray-100 overflow-hidden">
                <div class="py-1">
                  <label v-for="col in allColumns" :key="col.field" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="checkbox" v-model="col.visible" class="rounded accent-violet-600" />
                    <span class="font-medium">{{ col.title }}</span>
                  </label>
                </div>
              </div>
            </transition>
          </div>

          <button @click="resetFilters" class="text-xs font-bold text-gray-400 hover:text-violet-600 transition-colors flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
             </svg>
             Réinitialiser
          </button>
        </div>

        <!-- TABLE -->
        <div class="p-6">
          <vue3-datatable
            :rows="blogs"
            :columns="visibleColumns"
            :search="searchQuery"
            :sortable="true"
            :loading="loading"
            skin="bh-table-hover bh-table-compact"
            class="custom-datatable"
            :pageSize="10"
            :totalRows="blogs.length"
            :noDataContent="'Aucun article trouvé'"
            :paginationInfo="'Affichage de {0} à {1} sur {2} entrées'"
          >
            <!-- Image Couverture Column -->
            <template #couverture="data">
              <div 
                class="h-12 w-20 min-w-[80px] rounded-lg bg-gray-100 bg-cover bg-center flex items-center justify-center overflow-hidden border border-gray-200"
                :style="data.value.couverture ? { backgroundImage: `url(${data.value.couverture})` } : {}"
              >
                <span v-if="!data.value.couverture" class="text-[10px] text-gray-400 font-bold uppercase">Image</span>
              </div>
            </template>

            <!-- Catégorie Column -->
            <template #categorie="data">
               <span class="px-3 py-1 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-md border border-gray-200 uppercase tracking-wide">
                 {{ data.value.categorie }}
               </span>
            </template>

            <!-- Titre Column -->
            <template #titre="data">
               <span class="text-sm font-bold text-black">{{ data.value.titre }}</span>
               <div class="text-[10px] text-gray-400 mt-1 font-semibold uppercase">{{ formatDate(data.value.date) }}</div>
            </template>

            <!-- Contenu court -->
            <template #contenu="data">
               <span class="text-sm text-gray-500 truncate max-w-[300px] inline-block" :title="data.value.contenu">{{ data.value.contenu }}</span>
            </template>

            <!-- Actions Row Slot -->
            <template #actions="data">
              <div class="flex items-center justify-center gap-2">
                <NuxtLink :to="'/admin/blogs/' + data.value.id" class="action-btn edit" title="Modifier">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </NuxtLink>
                <button @click="confirmDelete(data.value)" class="action-btn delete" title="Supprimer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </template>

          </vue3-datatable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';

definePageMeta({ layout: 'admin' });

const searchQuery = ref('');
const loading = ref(false);
const pageLoading = ref(true);

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const allColumns = ref([
  { field: 'couverture', title: 'Couverture', visible: true, sort: false, width: '120px', headerClass: 'justify-center', cellClass: 'justify-center' },
  { field: 'titre', title: 'Titre & Date', visible: true, sort: true, width: '280px' },
  { field: 'categorie', title: 'Catégorie', visible: true, sort: true, width: '150px' },
  { field: 'contenu', title: 'Extrait du contenu', visible: true, sort: true },
  { field: 'actions', title: 'Actions', visible: true, sort: false, width: '120px', headerClass: 'justify-center', cellClass: 'justify-center' },
]);

// Helper for date formatting
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const visibleColumns = computed(() =>
  allColumns.value.filter((c) => c.visible).map((c) => ({ ...c }))
);

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
  }
}

// Dummy Data (Mock API result mapping BLOGS and IMAGES)
const blogs = ref([
  { 
    id: 1, 
    titre: 'Les nouvelles initiatives en énergie solaire', 
    categorie: 'Énergies Renouvelables',
    contenu: 'Face au réchauffement climatique, notre nouvelle approche pour le développement énergétique permet de réduire les empreintes carbone drastiquement de façon efficace et responsable...', 
    date: '2026-03-20',
    couverture: 'https://images.unsplash.com/photo-1509391366360-12009cb9f3ac?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    titre: 'Modernisation des infrastructures routières en 2026', 
    categorie: 'Infrastructures',
    contenu: 'Découvrez comment les infrastructures routières transforment les échanges locaux et propulsent l\'économie de marché vers une perspective d\'interconnectivité sans précédent en Afrique de l\'Ouest.', 
    date: '2026-03-10',
    couverture: 'https://images.unsplash.com/photo-1541888081622-3a27a36cb3a1?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    titre: 'Conférence annuelle de logistique : Retours', 
    categorie: 'Événements',
    contenu: 'Nous étions présents à la dernière grande convention sur la logistique transport au mois de février. L\'occasion d\'aborder les enjeux de l\'import/export sécurisé...', 
    date: '2026-02-28',
    couverture: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1524f?auto=format&fit=crop&q=80&w=800'
  }
]);

const resetFilters = () => {
  searchQuery.value = '';
};

const confirmDelete = (blog: any) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'article "${blog.titre}" ?`)) {
    blogs.value = blogs.value.filter(s => s.id !== blog.id);
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  setTimeout(() => {
    pageLoading.value = false;
  }, 400);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Transiciones */
.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }

/* Buttons */
.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-violet);
  color: #ffffff;
  padding: 0.5rem 1.25rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  box-shadow: 0 4px 12px rgba(122, 46, 142, 0.15);
}

.btn-add:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(122, 46, 142, 0.25);
}

/* Datatable Deep Styles */
:deep(.bh-table-hover tbody tr:hover td) {
  background-color: #f8fafc !important;
}

:deep(.bh-table thead th) {
  background: #fcfcfc !important;
  color: #94a3b8 !important;
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1.25rem 1rem !important;
  border-bottom: 1px solid #f1f5f9 !important;
}

:deep(.bh-table tbody td) {
  padding: 1rem 1rem !important;
  border-bottom: 1px solid #f8fafc;
  vertical-align: middle;
}

/* Pagination */
:deep(.bh-pagination .bh-page-item.bh-active) {
  background-color: var(--color-violet) !important;
  border-color: var(--color-violet) !important;
  border-radius: 8px;
}

:deep(.bh-pagination .bh-page-item) {
  border-radius: 8px;
  margin: 0 2px;
  font-weight: 700;
}

/* Actions Buttons */
.action-btn {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.action-btn.edit { background: rgba(15, 76, 129, 0.05); color: #0F4C81; }
.action-btn.edit:hover { background: #0F4C81; color: #fff; }

.action-btn.delete { background: #fef2f2; color: #ef4444; }
.action-btn.delete:hover { background: #ef4444; color: #fff; }
</style>
