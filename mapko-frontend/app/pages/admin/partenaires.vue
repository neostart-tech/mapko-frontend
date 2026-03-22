<template>
  <div class="partenaires-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Partenaires' }]" />

    <div v-if="pageLoading" class="bg-white rounded-2xl h-96 animate-pulse border border-gray-200"></div>

    <div v-else class="content-wrapper">
      <!-- HEADER CARD -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-black font-['Outfit']">Gestion des Partenaires</h2>
            <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
              Clients, institutions et collaborateurs
            </p>
          </div>
          <div class="flex items-center gap-3">
             <div class="stats-pill bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100 flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-violet-600"></span>
                <span class="text-xs font-bold">{{ partenaires.length }} Partenaires</span>
             </div>
             <button @click="openAddModal" class="btn-add">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
               </svg>
               Ajouter
             </button>
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
              placeholder="Rechercher un partenaire..." 
              class="pl-10 pr-4 py-2.5 w-full rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
            />
          </div>
        </div>

        <!-- TABLE -->
        <div class="p-6">
          <vue3-datatable
            :rows="partenaires"
            :columns="allColumns"
            :search="searchQuery"
            :sortable="true"
            :loading="loading"
            skin="bh-table-hover bh-table-compact"
            class="custom-datatable"
            :pageSize="10"
            :totalRows="partenaires.length"
            :noDataContent="'Aucun partenaire trouvé'"
            :paginationInfo="'Affichage de {0} à {1} sur {2} entrées'"
          >
            <!-- Logo Column -->
            <template #logo="data">
              <div class="h-16 w-16 min-w-[64px] rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 p-2">
                <img v-if="data.value.logo" :src="data.value.logo" class="max-h-full max-w-full object-contain" alt="Logo" />
                <span v-else class="text-[10px] text-gray-400 font-bold uppercase">Logo</span>
              </div>
            </template>

            <!-- Nom Column -->
            <template #nom="data">
               <span class="text-sm font-bold text-black">{{ data.value.nom }}</span>
            </template>

            <!-- Actions Row Slot -->
            <template #actions="data">
              <div class="flex items-center justify-center gap-2">
                <button @click="openEditModal(data.value)" class="action-btn edit" title="Modifier">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
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

    <!-- MODALS -->
    <!-- Modal d'Ajout -->
    <div v-if="isAddModalOpen" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content animate-reveal is-active">
        <div class="modal-header">
          <h3>Ajouter un Partenaire</h3>
          <button class="btn-close" @click="closeModals" title="Fermer">
            <component :is="IconClose" />
          </button>
        </div>
        
        <form @submit.prevent="submitAdd" class="modal-form">
          <div class="form-group">
            <label>Nom du partenaire</label>
            <input type="text" v-model="form.nom" placeholder="Saisissez le nom..." required />
          </div>

          <div class="form-group">
            <label>Logo</label>
            <div class="image-upload-box" :class="{ 'has-image': form.logo }">
              <div v-if="!form.logo" class="upload-placeholder">
                <component :is="IconImage" class="upload-icon" />
                <p>Cliquez ou glissez le logo ici</p>
                <span class="upload-hint">Formats: PNG, JPG (SVG recommandé)</span>
              </div>
              <div v-else class="preview-container">
                <img :src="form.logo" class="image-preview" alt="Logo Aperçu" />
                <button type="button" class="btn-remove-img" @click.stop="form.logo = ''" title="Retirer">
                  <component :is="IconClose" />
                </button>
              </div>
              <input type="file" @change="handleFileUpload" accept="image/*" class="file-input" />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModals">Annuler</button>
            <button type="submit" class="btn-submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Modification -->
    <div v-if="isEditModalOpen" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content animate-reveal is-active">
        <div class="modal-header">
          <h3>Modifier le Partenaire</h3>
          <button class="btn-close" @click="closeModals" title="Fermer">
            <component :is="IconClose" />
          </button>
        </div>
        
        <form @submit.prevent="submitEdit" class="modal-form">
          <div class="form-group">
            <label>Nom du partenaire</label>
            <!-- focus-blue pour marquer le mode édition -->
            <input type="text" v-model="form.nom" class="focus-blue" placeholder="Saisissez le nom..." required />
          </div>

          <div class="form-group">
            <label>Logo</label>
            <div class="image-upload-box edit-mode" :class="{ 'has-image': form.logo }">
              <div v-if="!form.logo" class="upload-placeholder">
                <component :is="IconImage" class="upload-icon" />
                <p>Cliquez ou glissez le logo ici</p>
              </div>
              <div v-else class="preview-container">
                <img :src="form.logo" class="image-preview" alt="Logo Aperçu" />
                <button type="button" class="btn-remove-img" @click.stop="form.logo = ''" title="Retirer">
                  <component :is="IconClose" />
                </button>
              </div>
              <input type="file" @change="handleFileUpload" accept="image/*" class="file-input" />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModals">Annuler</button>
            <button type="submit" class="btn-submit btn-edit-variant">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';

definePageMeta({ layout: 'admin' });

// Icons
const IconClose = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }), h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })])
const IconImage = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }), h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }), h('polyline', { points: '21 15 16 10 5 21' })])

const searchQuery = ref('');
const loading = ref(false);
const pageLoading = ref(true);

const allColumns = ref([
  { field: 'logo', title: 'Logo', sort: false, width: '150px', headerClass: 'justify-center', cellClass: 'justify-center' },
  { field: 'nom', title: 'Nom du partenaire', sort: true },
  { field: 'actions', title: 'Actions', sort: false, width: '120px', headerClass: 'justify-center', cellClass: 'justify-center' },
]);

// Dummy Data
const partenaires = ref([
  { id: 1, nom: 'Banque Mondiale', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/1024px-The_World_Bank_logo.svg.png' },
  { id: 2, nom: 'Orabank', logo: 'https://upload.wikimedia.org/wikipedia/fr/0/07/Logo_Orabank.png' },
  { id: 3, nom: 'BOAD', logo: 'https://upload.wikimedia.org/wikipedia/fr/0/0c/Logo_de_la_Banque_Ouest_Africaine_de_D%C3%A9veloppement.jpg' },
]);

// Modal & Form State
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const form = ref({
  id: null as number | null,
  nom: '',
  logo: ''
});

const resetForm = () => {
  form.value = { id: null, nom: '', logo: '' };
};

const openAddModal = () => {
  resetForm();
  isAddModalOpen.value = true;
};

const openEditModal = (partenaire: any) => {
  form.value = { ...partenaire };
  isEditModalOpen.value = true;
};

const closeModals = () => {
  isAddModalOpen.value = false;
  isEditModalOpen.value = false;
};

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    form.value.logo = URL.createObjectURL(file);
  }
};

const submitAdd = () => {
  console.log('Ajout:', form.value);
  partenaires.value.push({
    id: Date.now(),
    nom: form.value.nom,
    logo: form.value.logo
  });
  closeModals();
};

const submitEdit = () => {
  console.log('Modification:', form.value);
  const index = partenaires.value.findIndex(p => p.id === form.value.id);
  if (index !== -1) {
    partenaires.value[index] = { ...form.value } as any;
  }
  closeModals();
};

const confirmDelete = (partenaire: any) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le partenaire "${partenaire.nom}" ?`)) {
    partenaires.value = partenaires.value.filter(p => p.id !== partenaire.id);
  }
};

onMounted(() => {
  setTimeout(() => {
    pageLoading.value = false;
  }, 400);
});
</script>

<style scoped>
/* Transiciones y Animaciones Modals */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  opacity: 1; transform: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.btn-close {
  background: #f1f5f9;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #e2e8f0;
  color: #0f172a;
}

/* Modals Form */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.form-group input[type="text"],
.form-group input[type="url"] {
  padding: 0.9rem 1.1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  font-weight: 500;
}

.form-group input:focus {
  background: #ffffff;
  border-color: var(--color-violet);
  box-shadow: 0 0 0 4px rgba(122, 46, 142, 0.1);
}

.form-group input.focus-blue:focus {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1);
}

/* Upload Box Modal Variants */
.image-upload-box {
  position: relative;
  width: 100%;
  height: 180px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-upload-box:not(.has-image):hover {
  background: #f1f5f9;
  border-color: var(--color-violet);
  cursor: pointer;
}

.image-upload-box.edit-mode:not(.has-image):hover {
  border-color: var(--color-blue);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  pointer-events: none;
}

.upload-icon {
  width: 40px; height: 40px;
  color: #94a3b8;
  margin-bottom: 0.8rem;
}

.upload-placeholder p { font-weight: 700; color: #475569; margin: 0; font-size: 0.9rem; }
.upload-hint { font-size: 0.70rem; color: #94a3b8; margin-top: 0.4rem; }

.file-input {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;
}

.preview-container { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; background: #ffffff; padding: 1rem;}
.image-preview { max-width: 100%; max-height: 100%; object-fit: contain; }

.btn-remove-img {
  position: absolute; top: 10px; right: 10px;
  background: rgba(0, 0, 0, 0.6); border: none; color: #fff;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; backdrop-filter: blur(4px); z-index: 10; transition: all 0.2s ease;
}
.btn-remove-img:hover { background: #ef4444; }
.btn-remove-img svg { width: 16px; height: 16px; }

/* Modal Footer & Buttons */
.or-divider {
  display: flex; align-items: center; text-align: center; margin: 0.5rem 0;
}
.or-divider::before, .or-divider::after { content: ''; flex: 1; border-bottom: 1px solid #e2e8f0; }
.or-divider span { padding: 0 1rem; font-size: 0.70rem; font-weight: 800; color: #94a3b8; }

.modal-actions {
  display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem;
}

.btn-cancel {
  background: transparent; border: 1px solid #cbd5e1; color: #475569;
  padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: all 0.2s ease;
}
.btn-cancel:hover { background: #f8fafc; border-color: #94a3b8; }

.btn-submit {
  background: var(--color-violet); color: #ffffff; border: none;
  padding: 0.8rem 1.8rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: all 0.2s ease;
}
.btn-submit:hover { filter: brightness(1.1); box-shadow: 0 4px 12px rgba(122, 46, 142, 0.2); }

.btn-edit-variant { background: var(--color-blue); }
.btn-edit-variant:hover { box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2); }

/* Table Elements (Global Buttons & Styles) */
.btn-add {
  display: flex; align-items: center; gap: 0.5rem;
  background: var(--color-violet); color: #ffffff;
  padding: 0.5rem 1.25rem; border-radius: 12px; font-weight: 700; font-size: 0.9rem;
  cursor: pointer; transition: all 0.2s ease; border: none;
  box-shadow: 0 4px 12px rgba(122, 46, 142, 0.15);
}
.btn-add:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(122, 46, 142, 0.25); }

:deep(.bh-table-hover tbody tr:hover td) { background-color: #f8fafc !important; }
:deep(.bh-table thead th) {
  background: #fcfcfc !important; color: #94a3b8 !important; font-size: 0.75rem !important;
  font-weight: 800 !important; text-transform: uppercase; letter-spacing: 0.05em;
  padding: 1.25rem 1rem !important; border-bottom: 1px solid #f1f5f9 !important;
}
:deep(.bh-table tbody td) { padding: 1rem 1rem !important; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
:deep(.bh-pagination .bh-page-item.bh-active) { background-color: var(--color-violet) !important; border-color: var(--color-violet) !important; border-radius: 8px; }
:deep(.bh-pagination .bh-page-item) { border-radius: 8px; margin: 0 2px; font-weight: 700; }

.action-btn { height: 36px; width: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; transition: all 0.2s ease; border: none; cursor: pointer; }
.action-btn.edit { background: rgba(15, 76, 129, 0.05); color: #0F4C81; }
.action-btn.edit:hover { background: #0F4C81; color: #fff; }
.action-btn.delete { background: #fef2f2; color: #ef4444; }
.action-btn.delete:hover { background: #ef4444; color: #fff; }
</style>
