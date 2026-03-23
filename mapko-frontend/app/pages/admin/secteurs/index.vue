<template>
  <div class="secteurs-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Secteurs' }]" />

    <!-- Loader circulaire autour du logo -->
    <AdminLoader v-if="secteurs.length === 0" :visible="true" inline />

    <div v-else class="content-wrapper">
      <!-- HEADER CARD -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-black">Gestion des Secteurs d'Activité</h2>
            <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
              Consultez, ajoutez ou modifiez les secteurs d'expertise
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="stats-pill bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100 flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-violet-600"></span>
              <span class="text-xs font-semibold">{{ secteurs.length }} Secteurs enregistrés</span>
            </div>
            <NuxtLink to="/admin/secteurs/ajouter" class="btn-add">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </NuxtLink>
          </div>
        </div>

        <!-- FILTERS -->
        <div class="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-gray-50 bg-[#fafafa]/50">
          <div class="relative w-full sm:w-64">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Rechercher par titre, description..."
              class="pl-10 pr-4 py-2.5 w-full rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium" />
          </div>

          <!-- COLUMNS TOGGLE -->
          <div class="relative" ref="dropdownRef">
            <button @click="isDropdownOpen = !isDropdownOpen"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Colonnes
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform"
                :class="isDropdownOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="dropdown">
              <div v-if="isDropdownOpen"
                class="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-20 border border-gray-100 overflow-hidden">
                <div class="py-1">
                  <label v-for="col in allColumns" :key="col.field"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="checkbox" v-model="col.visible" class="rounded accent-violet-600" />
                    <span class="font-medium">{{ col.title }}</span>
                  </label>
                </div>
              </div>
            </transition>
          </div>

          <button @click="resetFilters"
            class="text-xs font-bold text-gray-400 hover:text-violet-600 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Réinitialiser
          </button>
        </div>

        <!-- TABLE -->
        <div class="p-6">
          <vue3-datatable :rows="secteurs" :columns="visibleColumns" :search="searchQuery" :sortable="true"
            :sortColumn="'titre'" :sortOrder="'asc'" :loading="secteurStore.loading"
            skin="bh-table-hover bh-table-compact" class="custom-datatable" :pageSize="10" :totalRows="secteurs.length"
            :noDataContent="'Aucun secteur trouvé'" :paginationInfo="'Affichage de {0} à {1} sur {2} entrées'">
            <!-- Image Column -->
            <template #image="data">
              <div
                class="h-12 w-16 min-w-[64px] rounded-lg bg-gray-100 bg-cover bg-center flex items-center justify-center overflow-hidden border border-gray-200"
                :style="data.value.image ? { backgroundImage: `url(${data.value.image})` } : {}">
                <span v-if="!data.value.image" class="text-[10px] text-gray-400 font-bold uppercase">Image</span>
              </div>
            </template>

            <!-- Titre Column -->
            <template #titre="data">
              <span class="text-sm font-bold text-black">{{ data.value.titre }}</span>
            </template>

            <!-- Description Column -->
            <template #description="data">
              <span class="text-sm text-gray-500 truncate max-w-[250px] inline-block" :title="data.value.description">{{
                data.value.description }}</span>
            </template>

            <!-- Actions Row Slot -->
            <template #actions="data">
              <div class="flex items-center justify-center gap-2">
                <NuxtLink :to="'/admin/secteurs/' + data.value.id" class="action-btn edit" title="Modifier">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </NuxtLink>
                <button @click="confirmDelete(data.value)" class="action-btn delete" title="Supprimer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
import { useSecteurStore } from '~~/stores/secteur';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import Swal from 'sweetalert2';

definePageMeta({ layout: 'admin' });

const config = useRuntimeConfig();
const secteurStore = useSecteurStore();

const searchQuery = ref('');

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const allColumns = ref([
  { field: 'image', title: 'Image', visible: true, sort: false, width: '100px', headerClass: 'justify-center', cellClass: 'justify-center' },
  { field: 'titre', title: 'Titre', visible: true, sort: true, width: '250px' },
  { field: 'description', title: 'Description', visible: true, sort: true },
  { field: 'actions', title: 'Actions', visible: true, sort: false, width: '120px', headerClass: 'justify-center', cellClass: 'justify-center' },
]);

const visibleColumns = computed(() =>
  allColumns.value.filter((c) => c.visible).map((c) => ({ ...c }))
);

const getImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.public.storageBase}/${path}`;
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
  }
}

const secteurs = computed(() => secteurStore.secteurs);

const resetFilters = () => {
  searchQuery.value = '';
};

const confirmDelete = async (secteur: any) => {
  const result = await Swal.fire({
    title: 'Supprimer ce secteur ?',
    text: `Cela supprimera également toutes les références liées à "${secteur.titre}".`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f43f5e',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    customClass: {
      popup: 'swal2-custom-popup',
      confirmButton: 'swal2-custom-confirm',
      cancelButton: 'swal2-custom-cancel'
    }
  });

  if (result.isConfirmed) {
    try {
      await secteurStore.destroy(secteur.id);
      Swal.fire({
        icon: 'success',
        title: 'Supprimé !',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal2-custom-popup' }
      });
    } catch (error) {
      Swal.fire('Erreur', 'Impossible de supprimer le secteur.', 'error');
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  secteurStore.fetch();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Transiciones y Animaciones */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

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

/* Action Buttons */
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

.action-btn.edit {
  background: rgba(15, 76, 129, 0.05);
  color: #0F4C81;
}

.action-btn.edit:hover {
  background: #0F4C81;
  color: #fff;
}

.action-btn.delete {
  background: #fef2f2;
  color: #ef4444;
}

.action-btn.delete:hover {
  background: #ef4444;
  color: #fff;
}
</style>
