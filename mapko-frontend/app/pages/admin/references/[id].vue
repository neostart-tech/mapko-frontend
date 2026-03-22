<template>
  <div class="references-modifier-page">
    <AdminBreadcrumb
      :items="[{ label: 'Références', link: '/admin/references' }, { label: 'Modifier une référence' }]" />

    <div class="page-header">
      <div class="header-text">
        <h1>Mettre à jour la Référence</h1>
        <p>Modifiez les détails de cette mission ou de ce projet.</p>
      </div>
    </div>

    <div v-if="loadingRef" class="bg-white rounded-2xl h-96 animate-pulse border border-gray-200"></div>

    <div v-else class="content-card">
      <form @submit.prevent="updateReference" class="admin-form">
        <div class="form-grid">
          <!-- Colonne Principale -->
          <div class="form-main">
            <div class="form-group">
              <label>Titre de la référence</label>
              <input type="text" v-model="form.titre" placeholder="Nom du projet ou de la mission..." required />
            </div>

            <div class="form-group flex-1 quill-wrapper">
              <label>Description détaillée</label>
              <div ref="editorContainer" class="quill-editor"></div>
            </div>

            <div class="form-group mt-2">
              <label>Montant</label>
              <input type="text" v-model="form.montant" placeholder="Ex: 5M €, Confidentiel..." />
            </div>
          </div>

          <!-- Colonne Latérale -->
          <div class="form-sidebar bg-gray-50/50 p-6 rounded-2xl border border-gray-100 h-fit">
            <h3
              class="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3 border-b-blue-100">
              Métadonnées du projet</h3>

            <div class="form-group">
              <label>Secteur d'activité</label>
              <select v-model="form.secteur_id" required class="custom-select focus-blue">
                <option value="" disabled>Sélectionner un secteur</option>
                <option v-for="secteur in sortedSecteurs" :key="secteur.id" :value="secteur.id">
                  {{ secteur.titre }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Pays de l'intervention</label>
              <select v-model="form.pays" required class="custom-select focus-blue">
                <option value="" disabled>Sélectionner un pays</option>
                <option v-for="country in countries" :key="country" :value="country">
                  {{ country }}
                </option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group w-1/2">
                <label>Année de début</label>
                <input type="number" v-model="form.annee_debut" class="focus-blue" placeholder="Année de début" required
                  min="1990" max="2100" />
              </div>
              <div class="form-group w-1/2">
                <label>Année de fin</label>
                <input type="number" v-model="form.annee_fin" class="focus-blue" placeholder="Année de fin" min="1990"
                  max="2100" />
                <span class="text-[10px] text-gray-400 mt-1 block">Vide si en cours</span>
              </div>
            </div>

            <div class="form-group mt-2">
              <label>Statut</label>
              <div class="status-toggle">
                <label class="status-option">
                  <input type="radio" v-model="form.statut" value="en_cours" />
                  <span class="status-badge en-cours">En cours</span>
                </label>
                <label class="status-option">
                  <input type="radio" v-model="form.statut" value="termine" />
                  <span class="status-badge termine">Terminé</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions border-top">
          <NuxtLink to="/admin/references" class="btn-cancel">Annuler</NuxtLink>
          <button type="submit" class="btn-save btn-save-edit" :disabled="referenceStore.loading">
            <component :is="IconSave" class="icon-sm" />
            {{ referenceStore.loading ? 'Enregistrement...' : 'Sauvegarder les modifications' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReferenceStore } from '~~/stores/reference'
import { useSecteurStore } from '~~/stores/secteur'
import Swal from 'sweetalert2'
import 'quill/dist/quill.snow.css';

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const referenceStore = useReferenceStore()
const secteurStore = useSecteurStore()
const referenceId = route.params.id as string

const sortedSecteurs = computed(() => {
  return [...secteurStore.secteurs].sort((a, b) => a.titre.localeCompare(b.titre))
})

const loadingRef = ref(true)

// Icon
const IconSave = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }), h('polyline', { points: '17 21 17 13 7 13 7 21' }), h('polyline', { points: '7 3 7 8 15 8' })])

const form = ref({
  titre: '',
  description: '',
  secteur_id: '',
  pays: '',
  annee_debut: 2020,
  annee_fin: null as number | null,
  montant: '',
  statut: 'en_cours'
})

const editorContainer = ref<HTMLElement | null>(null);
let quillInstance: any = null;

const { countries, fetchCountries } = useCountries()

onMounted(async () => {
  secteurStore.fetch();
  fetchCountries();

  try {
    const data = await referenceStore.show(referenceId)
    form.value = {
      titre: data.titre || '',
      description: data.description || '',
      secteur_id: data.secteur_id || '',
      pays: data.pays || '',
      annee_debut: data.annee_debut || 2020,
      annee_fin: data.annee_fin || null,
      montant: data.montant || '',
      statut: data.statut === 'termine' ? 'termine' : 'en_cours'
    }

    // On désactive le chargement pour afficher le DOM
    loadingRef.value = false

    // On attend le prochain cycle pour que editorContainer soit disponible
    await nextTick()

    if (import.meta.client && editorContainer.value) {
      const Quill = (await import('quill')).default;
      quillInstance = new Quill(editorContainer.value, {
        theme: 'snow',
        placeholder: 'Brève description du projet...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'clean']
          ]
        }
      });

      quillInstance.root.innerHTML = form.value.description;

      quillInstance.on('text-change', () => {
        form.value.description = quillInstance.root.innerHTML;
      });
    }
  } catch (error) {
    Swal.fire('Erreur', 'Impossible de charger les données de la référence.', 'error')
    router.push('/admin/references')
    loadingRef.value = false
  }
})

const updateReference = async () => {
  // Validations
  if (form.value.statut === 'termine' && !form.value.annee_fin) {
    Swal.fire({
      icon: 'error',
      title: 'Donnée manquante',
      text: 'Veuillez renseigner une année de fin pour un projet terminé.',
      customClass: { popup: 'swal2-custom-popup' }
    });
    return;
  }

  if (form.value.annee_fin && form.value.annee_fin < form.value.annee_debut) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur de date',
      text: 'L\'année de fin ne peut pas être inférieure à l\'année de début.',
      customClass: { popup: 'swal2-custom-popup' }
    });
    return;
  }

  try {
    const payload = { ...form.value };
    if (!payload.annee_fin) payload.annee_fin = null;

    await referenceStore.update(referenceId, payload);

    Swal.fire({
      icon: 'success',
      title: 'Référence mise à jour',
      showConfirmButton: false,
      timer: 1500,
      customClass: { popup: 'swal2-custom-popup' }
    });
    router.push('/admin/references');
  } catch (error) {
    Swal.fire('Erreur', 'Impossible de modifier la référence.', 'error');
  }
}
</script>

<style scoped>
.references-modifier-page {
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-top: 1rem;
  margin-bottom: 2.5rem;
}

.header-text h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.header-text p {
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.content-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #eef2f6;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 3rem;
}

.form-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.custom-select {
  width: 100%;
  padding: 0.9rem 1.15rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  font-family: inherit;
  font-weight: 500;
}

.form-group textarea {
  resize: vertical;
  flex: 1;
}

.form-group input:focus,
.form-group textarea:focus,
.custom-select:focus {
  background: #ffffff;
  border-color: var(--color-blue);
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1);
}

.focus-blue:focus {
  border-color: var(--color-blue) !important;
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1) !important;
}

/* Quill Styling */
.quill-wrapper {
  display: flex;
  flex-direction: column;
}

.quill-editor {
  min-height: 250px;
  background: #f8fafc;
  font-family: inherit;
  font-size: 0.95rem;
}

:deep(.ql-toolbar.ql-snow) {
  border-radius: 12px 12px 0 0;
  border-color: #e2e8f0;
  background: #ffffff;
  font-family: inherit;
  padding: 12px;
}

:deep(.ql-container.ql-snow) {
  border-radius: 0 0 12px 12px;
  border-color: #e2e8f0;
  transition: all 0.2s ease;
}

:deep(.ql-container.ql-snow.ql-focus) {
  background: #ffffff;
  border-color: var(--color-blue);
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1);
}

:deep(.ql-editor) {
  min-height: 250px;
  line-height: 1.6;
}

.custom-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25em 1.25em;
  padding-right: 3rem;
  cursor: pointer;
}

/* Status toggles */
.status-toggle {
  display: flex;
  gap: 1rem;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.status-option {
  flex: 1;
  position: relative;
  cursor: pointer;
  display: flex;
}

.status-option input {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

.status-badge {
  flex: 1;
  text-align: center;
  padding: 0.6rem 0;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s ease;
  background: transparent;
  color: #94a3b8;
}

.status-option input:checked+.status-badge.en-cours {
  background: var(--color-violet);
  /* Différenciation en mode édition annulée pour la consistance */
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(122, 46, 142, 0.3);
}

.status-option input:checked+.status-badge.termine {
  background: var(--color-blue);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(15, 76, 129, 0.3);
}

/* Utilities */
.border-top {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.btn-cancel:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* On utilise le bleu pour l'édition */
.btn-save-edit {
  background: var(--color-blue);
}

.btn-save-edit:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2);
  transform: translateY(-1px);
}

.icon-sm {
  width: 18px;
  height: 18px;
}

@media (max-width: 900px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-sidebar {
    height: auto;
  }
}
</style>
