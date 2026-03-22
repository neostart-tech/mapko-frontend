<template>
  <div class="secteurs-modifier-page">
    <AdminBreadcrumb :items="[{ label: 'Secteurs', to: '/admin/secteurs' }, { label: 'Modifier un secteur' }]" class="animate-reveal" />

    <div class="page-header animate-reveal reveal-delay-1">
      <div class="header-text">
        <h1>Modifier le Secteur</h1>
        <p>Mettez à jour les informations de ce domaine d'expertise.</p>
      </div>
    </div>

    <div class="content-card animate-reveal reveal-delay-2">
      <form @submit.prevent="updateSecteur" class="admin-form">
        <div class="form-grid">
          <!-- Colonne Principale -->
          <div class="form-main">
            <div class="form-group">
              <label>Titre du secteur</label>
              <input type="text" v-model="form.titre" placeholder="Ex: Bâtiment et Travaux Publics..." required />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea v-model="form.description" rows="6" placeholder="Spécifiez les activités, l'approche et la valeur ajoutée de ce secteur..." required></textarea>
            </div>
          </div>

          <!-- Colonne Latérale -->
          <div class="form-sidebar">
            <div class="form-group">
              <label>Image d'illustration principale</label>
              
              <div class="image-upload-box" :class="{ 'has-image': form.image }">
                <div v-if="!form.image" class="upload-placeholder">
                  <component :is="IconImage" class="upload-icon" />
                  <p>Cliquez ou glissez une image ici</p>
                  <span class="upload-hint">Formats : JPG, PNG, WEBP (Max 5MB)</span>
                </div>
                <div v-else class="preview-container">
                  <img :src="form.image" class="image-preview" alt="Aperçu" />
                  <button type="button" class="btn-remove-img" @click.stop="form.image = ''" title="Retirer l'image">
                    <component :is="IconClose" />
                  </button>
                </div>
                <!-- Input caché -->
                <input type="file" @change="handleFileUpload" accept="image/*" class="file-input" title="" />
              </div>

            </div>
          </div>
        </div>

        <div class="form-actions border-top">
          <NuxtLink to="/admin/secteurs" class="btn-cancel">Annuler</NuxtLink>
          <button type="submit" class="btn-save btn-save-edit">
             <component :is="IconSave" class="icon-sm" />
             Mettre à jour le secteur
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const sectorId = route.params.id

// Icons
const IconSave = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }), h('polyline', { points: '17 21 17 13 7 13 7 21' }), h('polyline', { points: '7 3 7 8 15 8' })])
const IconImage = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }), h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }), h('polyline', { points: '21 15 16 10 5 21' })])
const IconClose = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }), h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })])

const form = ref({
  titre: '',
  description: '',
  image: ''
})

onMounted(() => {
  // Mock récupération des données depuis une API
  console.log('Chargement du secteur N°', sectorId)
  form.value = {
    titre: 'Bâtiment et Travaux Publics',
    description: 'Expertise dans la construction d\'infrastructures complexes, ponts, et routes.',
    image: 'https://images.unsplash.com/photo-1541888081622-3a27a36cb3a1?auto=format&fit=crop&q=80&w=800'
  }
})

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    form.value.image = URL.createObjectURL(file)
  }
}

const updateSecteur = () => {
  console.log('Secteur mis à jour', form.value)
  alert('Les modifications ont été enregistrées avec succès !')
}
</script>

<style scoped>
.secteurs-modifier-page {
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
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input[type="text"],
.form-group input[type="url"],
.form-group textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  font-family: inherit;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  background: #ffffff;
  border-color: var(--color-blue); /* Pour l'édition, on utilise la couleur secondaire (Bleu) */
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1);
}

/* Upload Box */
.image-upload-box {
  position: relative;
  width: 100%;
  height: 240px;
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
  border-color: var(--color-blue);
  cursor: pointer;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  pointer-events: none;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.upload-placeholder p {
  font-weight: 600;
  color: #475569;
  margin: 0;
  font-size: 0.95rem;
}

.upload-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.5rem;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.btn-remove-img {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  z-index: 10;
  transition: all 0.2s ease;
}

.btn-remove-img:hover {
  background: #ef4444;
}
.btn-remove-img svg {
  width: 16px;
  height: 16px;
}

/* Layout Utilities */
.or-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
}

.or-divider::before,
.or-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.or-divider span {
  padding: 0 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
}

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
  font-weight: 600;
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
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* On utilise le bleu pour différencier l'édition de la création */
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
}
</style>
