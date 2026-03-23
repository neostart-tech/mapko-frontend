<template>
  <div class="admins-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Administrateurs' }]" />

    <div v-if="adminStore.loading && adminStore.admins.length === 0" class="bg-white rounded-2xl h-96 animate-pulse border border-gray-200"></div>

    <div v-else class="content-wrapper">
      <!-- HEADER CARD -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-black">Gestion des Administrateurs</h2>
            <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
              Comptes administrateurs de la plateforme
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div class="stats-pill bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100 flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-violet-600"></span>
              <span class="text-xs font-semibold">{{ adminStore.admins.length }} Admin{{ adminStore.admins.length > 1 ? 's' : '' }}</span>
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
              placeholder="Rechercher un administrateur..."
              class="pl-10 pr-4 py-2.5 w-full rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
            />
          </div>
        </div>

        <!-- TABLE -->
        <div class="p-6">
          <div v-if="adminStore.admins.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p class="text-gray-400 font-semibold mt-2">Aucun administrateur trouvé</p>
          </div>

          <vue3-datatable
            v-else
            :rows="adminStore.admins"
            :columns="allColumns"
            :search="searchQuery"
            :sortable="true"
            :sortColumn="'prenom'"
            :sortOrder="'asc'"
            :loading="adminStore.loading"
            skin="bh-table-hover bh-table-compact"
            class="custom-datatable"
            :pageSize="10"
            :totalRows="adminStore.admins.length"
            :noDataContent="'Aucun administrateur trouvé'"
            :paginationInfo="'Affichage de {0} à {1} sur {2} entrées'"
          >
            <!-- Avatar + Nom -->
            <template #identite="data">
              <div class="flex items-center gap-3">
                <div class="user-avatar">
                  {{ data.value.prenom.charAt(0) }}{{ data.value.nom.charAt(0) }}
                </div>
                <div>
                  <span class="text-sm font-semibold text-black block">{{ data.value.prenom }} {{ data.value.nom }}</span>
                  <span class="role-badge">Admin</span>
                </div>
              </div>
            </template>

            <!-- Email -->
            <template #email="data">
              <span class="text-sm text-gray-500 font-medium">{{ data.value.email }}</span>
            </template>

            <!-- Téléphone -->
            <template #telephone="data">
              <span class="text-sm text-gray-500 font-medium">{{ data.value.telephone || '—' }}</span>
            </template>

            <!-- Date -->
            <template #created_at="data">
              <span class="text-sm text-gray-400 font-medium">{{ formatDate(data.value.created_at) }}</span>
            </template>

            <!-- Actions -->
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

    <!-- ==================== MODAL AJOUT ==================== -->
    <div v-if="isAddModalOpen" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content is-active">
        <div class="modal-header">
          <h3>Ajouter un Administrateur</h3>
          <button class="btn-close" @click="closeModals" title="Fermer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitAdd" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Prénom</label>
              <input v-model="form.prenom" type="text" placeholder="Prénom" required />
              <span v-if="errors.prenom" class="form-error">{{ errors.prenom }}</span>
            </div>
            <div class="form-group">
              <label>Nom</label>
              <input v-model="form.nom" type="text" placeholder="Nom" required />
              <span v-if="errors.nom" class="form-error">{{ errors.nom }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="Email" required />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label>Téléphone <span class="optional">(optionnel)</span></label>
            <input v-model="form.telephone" type="text" placeholder="Téléphone avec indicatif" />
          </div>

          <div class="info-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="info-icon">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>Un mot de passe temporaire (8 caractères) sera généré automatiquement et envoyé par email à l'administrateur avec ses identifiants de connexion.</p>
          </div>

          <div v-if="globalError" class="global-error">{{ globalError }}</div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModals">Annuler</button>
            <button type="submit" class="btn-submit" :disabled="submitting">
              <span v-if="submitting" class="spinner" />
              {{ submitting ? 'Création...' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ==================== MODAL MODIFICATION ==================== -->
    <div v-if="isEditModalOpen" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content is-active">
        <div class="modal-header">
          <h3>Modifier l'Administrateur</h3>
          <button class="btn-close" @click="closeModals" title="Fermer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitEdit" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Prénom</label>
              <input v-model="form.prenom" type="text" class="focus-blue" placeholder="Jean" required />
              <span v-if="errors.prenom" class="form-error">{{ errors.prenom }}</span>
            </div>
            <div class="form-group">
              <label>Nom</label>
              <input v-model="form.nom" type="text" class="focus-blue" placeholder="Dupont" required />
              <span v-if="errors.nom" class="form-error">{{ errors.nom }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" class="focus-blue" placeholder="jean.dupont@mapko.com" required />
            <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label>Téléphone <span class="optional">(optionnel)</span></label>
            <input v-model="form.telephone" type="text" class="focus-blue" placeholder="+33 6 00 00 00 00" />
          </div>

          <div v-if="globalError" class="global-error">{{ globalError }}</div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModals">Annuler</button>
            <button type="submit" class="btn-submit btn-edit-variant" :disabled="submitting">
              <span v-if="submitting" class="spinner" />
              {{ submitting ? 'Mise à jour...' : 'Mettre à jour' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Swal from 'sweetalert2'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import { useAdminStore } from '~~/stores/admin'

definePageMeta({
  layout: 'admin',
  middleware: ['superadmin'],
})

const adminStore = useAdminStore()
const searchQuery = ref('')
const submitting = ref(false)
const globalError = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)

const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const editingId = ref<string | null>(null)

const allColumns = ref([
  { field: 'identite', title: 'Administrateur', sort: false },
  { field: 'email', title: 'Email', sort: true },
  { field: 'telephone', title: 'Téléphone', sort: false },
  { field: 'created_at', title: 'Créé le', sort: true, width: '140px' },
  { field: 'actions', title: 'Actions', sort: false, width: '120px', headerClass: 'justify-center', cellClass: 'justify-center' },
])

const form = reactive({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  password: '',
  password_confirmation: '',
})

const errors = reactive<Record<string, string>>({
  nom: '', prenom: '', email: '', password: '', password_confirmation: '',
})

const resetForm = () => {
  Object.assign(form, { nom: '', prenom: '', email: '', telephone: '', password: '', password_confirmation: '' })
  Object.keys(errors).forEach(k => (errors[k] = ''))
  globalError.value = ''
  showPassword.value = false
  showConfirm.value = false
}

const openAddModal = () => {
  resetForm()
  isAddModalOpen.value = true
}

const openEditModal = (admin: any) => {
  resetForm()
  editingId.value = admin.id
  form.nom = admin.nom
  form.prenom = admin.prenom
  form.email = admin.email
  form.telephone = admin.telephone || ''
  isEditModalOpen.value = true
}

const closeModals = () => {
  isAddModalOpen.value = false
  isEditModalOpen.value = false
  editingId.value = null
  resetForm()
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

const submitAdd = async () => {
  Object.keys(errors).forEach(k => (errors[k] = ''))
  globalError.value = ''
  submitting.value = true
  try {
    await adminStore.create({ ...form })
    await adminStore.fetch()
    Swal.fire({
      icon: 'success',
      title: 'Administrateur ajouté',
      showConfirmButton: false,
      timer: 1500,
      customClass: { popup: 'swal2-custom-popup' }
    })
    closeModals()
  } catch (err: any) {
    if (err.errors) {
      Object.entries(err.errors).forEach(([key, msgs]) => {
        if (key in errors) errors[key] = (msgs as string[])[0] ?? ''
      })
    } else {
      globalError.value = err.message || 'Une erreur est survenue.'
    }
  } finally {
    submitting.value = false
  }
}

const submitEdit = async () => {
  Object.keys(errors).forEach(k => (errors[k] = ''))
  globalError.value = ''
  submitting.value = true
  try {
    await adminStore.update(editingId.value!, {
      nom: form.nom,
      prenom: form.prenom,
      email: form.email,
      telephone: form.telephone,
    })
    await adminStore.fetch()
    Swal.fire({
      icon: 'success',
      title: 'Administrateur mis à jour',
      showConfirmButton: false,
      timer: 1500,
      customClass: { popup: 'swal2-custom-popup' }
    })
    closeModals()
  } catch (err: any) {
    if (err.errors) {
      Object.entries(err.errors).forEach(([key, msgs]) => {
        if (key in errors) errors[key] = (msgs as string[])[0] ?? ''
      })
    } else {
      globalError.value = err.message || 'Une erreur est survenue.'
    }
  } finally {
    submitting.value = false
  }
}

const confirmDelete = async (admin: any) => {
  const result = await Swal.fire({
    title: 'Supprimer cet administrateur ?',
    text: `Voulez-vous vraiment supprimer "${admin.prenom} ${admin.nom}" ?`,
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
  })

  if (result.isConfirmed) {
    try {
      await adminStore.remove(admin.id)
      Swal.fire({
        icon: 'success',
        title: 'Supprimé !',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: 'swal2-custom-popup' }
      })
    } catch (err: any) {
      Swal.fire('Erreur', 'Impossible de supprimer l\'administrateur.', 'error')
    }
  }
}

onMounted(async () => {
  await adminStore.fetch()
})
</script>

<style scoped>
/* ---- Modal ---- */
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
  max-width: 540px;
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
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-close svg { width: 18px; height: 18px; }
.btn-close:hover { background: #e2e8f0; color: #0f172a; }

/* ---- Form ---- */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.optional {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  color: #94a3b8;
  font-size: 0.75rem;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  padding: 0.9rem 1.1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  font-weight: 500;
  width: 100%;
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

.form-error {
  font-size: 0.75rem;
  color: #f43f5e;
  font-weight: 600;
}

/* ---- Password field with eye icon ---- */
.password-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrap input {
  padding-right: 2.75rem !important;
  width: 100%;
}

.eye-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.2s;
}
.eye-btn:hover { color: var(--color-violet); }

/* ---- Global error ---- */
.global-error {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #f43f5e;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
}

/* ---- Modal actions ---- */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-cancel:hover { background: #f8fafc; border-color: #94a3b8; }

.btn-submit {
  background: var(--color-violet);
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-submit:hover { filter: brightness(1.1); box-shadow: 0 4px 12px rgba(122, 46, 142, 0.2); }
.btn-edit-variant { background: var(--color-blue); }
.btn-edit-variant:hover { box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2); }

.spinner {
  width: 15px; height: 15px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ---- Header buttons ---- */
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
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  box-shadow: 0 4px 12px rgba(122, 46, 142, 0.15);
}
.btn-add:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(122, 46, 142, 0.25); }

/* ---- Table custom ---- */
:deep(.bh-table-hover tbody tr:hover td) { background-color: #f8fafc !important; }
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
:deep(.bh-table tbody td) { padding: 1rem 1rem !important; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
:deep(.bh-pagination .bh-page-item.bh-active) { background-color: var(--color-violet) !important; border-color: var(--color-violet) !important; border-radius: 8px; }
:deep(.bh-pagination .bh-page-item) { border-radius: 8px; margin: 0 2px; font-weight: 700; }

.action-btn { height: 36px; width: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; transition: all 0.2s ease; border: none; cursor: pointer; }
.action-btn.edit { background: rgba(15, 76, 129, 0.05); color: #0F4C81; }
.action-btn.edit:hover { background: #0F4C81; color: #fff; }
.action-btn.delete { background: #fef2f2; color: #ef4444; }
.action-btn.delete:hover { background: #ef4444; color: #fff; }

/* ---- User avatar ---- */
.user-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: var(--color-violet);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.role-badge {
  display: inline-block;
  background: rgba(122, 46, 142, 0.08);
  color: var(--color-violet);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  margin-top: 0.1rem;
}

/* ---- Empty state ---- */
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 4rem 2rem; color: #94a3b8; text-align: center;
}

/* ---- Info banner ---- */
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 1rem 1.1rem;
}

.info-icon {
  color: var(--color-blue);
  flex-shrink: 0;
  margin-top: 1px;
}

.info-banner p {
  font-size: 0.85rem;
  color: #1e40af;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
}

/* ---- Responsive ---- */
@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .modal-content { padding: 1.5rem; }
}
</style>
