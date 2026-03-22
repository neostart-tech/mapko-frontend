<template>
  <div class="blogs-modifier-page">
    <AdminBreadcrumb :items="[{ label: 'Blogs', to: '/admin/blogs' }, { label: 'Modifier un blog' }]" class="animate-reveal" />

    <div class="page-header animate-reveal reveal-delay-1">
      <div class="header-text">
        <h1>Mettre à jour l'Article</h1>
        <p>Ajustez le contenu et les médias de cet article de blog.</p>
      </div>
    </div>

    <div class="content-card animate-reveal reveal-delay-2">
      <form @submit.prevent="updateBlog" class="admin-form">
        <div class="form-grid">
          <!-- Colonne Principale -->
          <div class="form-main">
            <div class="form-group">
              <label>Titre de l'article</label>
              <input type="text" v-model="form.titre" class="focus-blue" placeholder="Saisissez un titre accrocheur..." required />
            </div>

            <div class="form-group flex-1 quill-wrapper">
              <label>Contenu principal</label>
              <div ref="editorContainer" class="quill-editor"></div>
            </div>
          </div>

          <!-- Colonne Latérale -->
          <div class="form-sidebar bg-gray-50/50 p-6 rounded-2xl border border-gray-100 h-fit">
            <h3 class="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3 border-b-blue-100">Détails & Médias</h3>
            
            <div class="form-group mb-4">
              <label>Catégorie</label>
              <select v-model="form.categorie" required class="custom-select focus-blue">
                <option value="" disabled>Sélectionner une catégorie</option>
                <option value="Actualités">Actualités</option>
                <option value="Événements">Événements</option>
                <option value="Étude de cas">Étude de cas</option>
                <option value="Infrastructures">Infrastructures</option>
                <option value="Énergies Renouvelables">Énergies Renouvelables</option>
              </select>
            </div>

            <div class="form-group">
              <label>Date de publication</label>
              <input type="date" class="focus-blue" v-model="form.date" required />
            </div>

            <!-- Image de Couverture -->
            <div class="form-group mt-4">
              <label class="flex justify-between items-center">
                Image de Couverture
                <span class="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Requis</span>
              </label>
              
              <div class="image-upload-box cover edit-mode" :class="{ 'has-image': form.couverture }">
                <div v-if="!form.couverture" class="upload-placeholder">
                  <component :is="IconImage" class="upload-icon" />
                  <p>Glissez l'image de couverture</p>
                  <span class="upload-hint">1200 x 630px recommandé</span>
                </div>
                <div v-else class="preview-container">
                  <img :src="form.couverture" class="image-preview" alt="Couverture" />
                  <button type="button" class="btn-remove-img" @click.stop="form.couverture = ''" title="Retirer">
                    <component :is="IconClose" />
                  </button>
                </div>
                <input type="file" @change="handleCoverUpload" accept="image/*" class="file-input" />
              </div>
            </div>

            <!-- Galerie d'images additionnelles -->
            <div class="form-group mt-4 border-t border-gray-200 pt-5">
              <label>Galerie de l'article (Optionnel)</label>
              <span class="text-[10px] text-gray-500 mb-2 block font-medium">Ajoutez des images supplémentaires qui illustreront le corps de votre article.</span>
              
              <div class="gallery-grid">
                <!-- Previews -->
                <div v-for="(img, idx) in form.galerie" :key="idx" class="gallery-thumb">
                  <img :src="img.preview" alt="Gallery preview" />
                  <button type="button" class="btn-remove-thumb" @click="removeGalleryImg(idx)"><component :is="IconClose" /></button>
                </div>
                
                <!-- Add Button -->
                <div class="gallery-add-btn edit-mode">
                  <component :is="IconPlus" class="h-6 w-6 text-gray-400" />
                  <input type="file" multiple @change="handleGalleryUpload" accept="image/*" class="file-input" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="form-actions border-top">
          <NuxtLink to="/admin/blogs" class="btn-cancel">Annuler</NuxtLink>
          <button type="submit" class="btn-save btn-save-edit">
             <component :is="IconSave" class="icon-sm" />
             Sauvegarder les modifications
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'
import 'quill/dist/quill.snow.css';

definePageMeta({ layout: 'admin' })

const route = useRoute()
const blogId = route.params.id

// Icons
const IconSave = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }), h('polyline', { points: '17 21 17 13 7 13 7 21' }), h('polyline', { points: '7 3 7 8 15 8' })])
const IconImage = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }), h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }), h('polyline', { points: '21 15 16 10 5 21' })])
const IconClose = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }), h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })])
const IconPlus = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('line', { x1: '12', y1: '5', x2: '12', y2: '19' }), h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })])

const form = ref({
  titre: '',
  categorie: '',
  contenu: '',
  date: '',
  couverture: '', 
  galerie: [] as { file?: File, preview: string }[]
})

const editorContainer = ref<HTMLElement | null>(null);
let quillInstance: any = null;

onMounted(async () => {
  console.log('Chargement de l\'article N°', blogId)
  // Mock Data
  form.value = {
    titre: 'Renforcement infrastructurel et innovations écologiques',
    categorie: 'Énergies Renouvelables',
    contenu: 'Dans notre quête de développement durable, le renforcement...',
    date: '2026-03-20',
    couverture: 'https://images.unsplash.com/photo-1541888081622-3a27a36cb3a1?auto=format&fit=crop&q=80&w=800',
    galerie: [
      { preview: 'https://images.unsplash.com/photo-1509391366360-12009cb9f3ac?auto=format&fit=crop&q=80&w=800' }
    ]
  }

  if (import.meta.client && editorContainer.value) {
    const Quill = (await import('quill')).default;
    quillInstance = new Quill(editorContainer.value, {
      theme: 'snow',
      placeholder: 'Rédigez le contenu complet de l\'article ici...',
      modules: {
        toolbar: [
           [{ 'header': [1, 2, 3, false] }],
           ['bold', 'italic', 'underline', 'strike'],
           [{ 'list': 'ordered'}, { 'list': 'bullet' }],
           ['link', 'clean']
        ]
      }
    });

    quillInstance.root.innerHTML = form.value.contenu;

    quillInstance.on('text-change', () => {
       form.value.contenu = quillInstance.root.innerHTML;
    });
  }
})

const handleCoverUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    form.value.couverture = URL.createObjectURL(file)
  }
}

const handleGalleryUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach(file => {
      form.value.galerie.push({
        file: file,
        preview: URL.createObjectURL(file)
      })
    })
  }
}

const removeGalleryImg = (index: number) => {
  form.value.galerie.splice(index, 1);
}

const updateBlog = () => {
  console.log('Article modifié :', form.value)
  alert('Les modifications ont été enregistrées avec succès !')
  // Ici logiquement => navigateTo('/admin/blogs')
}
</script>

<style scoped>
.blogs-modifier-page { display: flex; flex-direction: column; }

.page-header { margin-top: 1rem; margin-bottom: 2.5rem; }
.header-text h1 { font-size: 1.75rem; font-weight: 700; color: #000000; margin: 0; }
.header-text p { color: #64748b; font-size: 0.95rem; margin-top: 0.25rem; }

.content-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #eef2f6;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1FR;
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

.form-group label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input[type="text"],
.form-group input[type="date"],
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

.custom-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25em 1.25em;
  padding-right: 3rem;
  cursor: pointer;
}

.form-group textarea {
  resize: vertical;
  flex: 1; 
  line-height: 1.6;
}

.focus-blue:focus,
.custom-select.focus-blue:focus {
  background: #ffffff !important;
  border-color: var(--color-blue) !important;
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1) !important;
}

/* Quill Styling */
.quill-wrapper {
  display: flex;
  flex-direction: column;
}

.quill-editor {
  min-height: 400px;
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
  min-height: 400px;
  line-height: 1.6;
}

/* Upload Box for Cover */
.image-upload-box.cover {
  position: relative;
  width: 100%;
  height: 160px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-upload-box.cover.edit-mode:not(.has-image):hover {
  background: #f1f5f9;
  border-color: var(--color-blue);
  cursor: pointer;
}

.upload-placeholder { display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none; }
.upload-icon { width: 32px; height: 32px; color: #94a3b8; margin-bottom: 0.5rem; }
.upload-placeholder p { font-weight: 700; color: #475569; margin: 0; font-size: 0.85rem; }
.upload-hint { font-size: 0.7rem; color: #94a3b8; margin-top: 0.4rem; }

.file-input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

.preview-container { width: 100%; height: 100%; position: relative; }
.image-preview { width: 100%; height: 100%; object-fit: cover; display: block; }
.btn-remove-img {
  position: absolute; top: 10px; right: 10px;
  background: rgba(0, 0, 0, 0.6); border: none; color: #fff;
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; backdrop-filter: blur(4px); z-index: 10; transition: all 0.2s ease;
}
.btn-remove-img:hover { background: #ef4444; }
.btn-remove-img svg { width: 14px; height: 14px; }

/* Gallery System */
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gallery-thumb {
  width: 65px; height: 65px;
  border-radius: 8px; overflow: hidden; position: relative;
  border: 1px solid #e2e8f0;
}

.gallery-thumb img {
  width: 100%; height: 100%; object-fit: cover;
}

.btn-remove-thumb {
  position: absolute;
  top: 4px; right: 4px;
  background: rgba(0,0,0,0.7);
  color: white; border: none;
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; padding: 0;
}
.btn-remove-thumb svg { width: 10px; height: 10px; }
.btn-remove-thumb:hover { background: #ef4444; }

.gallery-add-btn {
  width: 65px; height: 65px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  position: relative; cursor: pointer; background: #f8fafc;
  transition: all 0.2s ease;
}

.gallery-add-btn.edit-mode:hover { border-color: var(--color-blue); background: #eff6ff;}


/* Utilities */
.border-top { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #f1f5f9; }

.form-actions { display: flex; justify-content: flex-end; gap: 1rem; }

.btn-cancel {
  background: transparent; border: 1px solid #cbd5e1; color: #475569;
  padding: 0.8rem 1.8rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem;
  text-decoration: none; transition: all 0.2s ease; display: inline-flex; align-items: center;
}
.btn-cancel:hover { background: #f8fafc; border-color: #94a3b8; }

.btn-save {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: #ffffff; border: none;
  padding: 0.8rem 1.8rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: all 0.2s ease;
}

.btn-save-edit { background: var(--color-blue); }

.btn-save-edit:hover { filter: brightness(1.1); box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2); transform: translateY(-1px); }

.icon-sm { width: 18px; height: 18px; }

@media (max-width: 900px) {
  .form-grid { grid-template-columns: 1fr; gap: 2rem; }
  .form-sidebar { height: auto; }
}
</style>
