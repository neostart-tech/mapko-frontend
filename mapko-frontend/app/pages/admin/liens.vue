<template>
  <div class="liens-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Nos Liens' }]" class="animate-reveal" />

    <div class="page-header animate-reveal reveal-delay-1">
      <div class="header-text">
        <h1>Réseaux Sociaux</h1>
        <p>Gérez les liens redirigeant vers vos pages Mapko & Partners.</p>
      </div>
    </div>

    <!-- Conteneur Formulaire -->
    <div class="content-card max-w-3xl animate-reveal reveal-delay-2">
      <form @submit.prevent="updateLiens" class="admin-form">
        <div class="form-grid">
          
          <!-- Ligne LinkedIn -->
          <div class="form-group">
            <label class="flex items-center gap-2">
              <component :is="IconLinkedin" class="icon-brand linkedin" />
              LinkedIn
            </label>
            <input 
              type="url" 
              v-model="form.linkedin" 
              placeholder="https://linkedin.com/company/mapko-partners" 
            />
          </div>

          <!-- Ligne Facebook -->
          <div class="form-group mt-2">
            <label class="flex items-center gap-2">
              <component :is="IconFacebook" class="icon-brand facebook" />
              Facebook
            </label>
            <input 
              type="url" 
              v-model="form.facebook" 
              placeholder="https://facebook.com/mapkopartners" 
            />
          </div>

          <!-- Ligne X (Twitter) -->
          <div class="form-group mt-2">
            <label class="flex items-center gap-2">
              <component :is="IconX" class="icon-brand x-twitter" />
              X (Anciennement Twitter)
            </label>
            <input 
              type="url" 
              v-model="form.x" 
              placeholder="https://x.com/mapko_partners" 
            />
          </div>

        </div>

        <div class="form-actions border-top">
          <button type="submit" class="btn-save">
             <component :is="IconSave" class="icon-sm" />
             Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'

definePageMeta({ layout: 'admin' })

// Icons
const IconSave = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }), h('polyline', { points: '17 21 17 13 7 13 7 21' }), h('polyline', { points: '7 3 7 8 15 8' })])

const IconLinkedin = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }), h('rect', { x: '2', y: '9', width: '4', height: '12' }), h('circle', { cx: '4', cy: '4', r: '2' })])

const IconFacebook = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' })])

const IconX = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M4 4l11.733 16h4.267l-11.733-16z' }), h('path', { d: 'M4 20l6.768-6.768m2.46-2.46L20 4' })])

const form = ref({
  linkedin: '',
  facebook: '',
  x: ''
})

onMounted(() => {
  // Mock Data
  form.value = {
    linkedin: 'https://www.linkedin.com/company/mapko',
    facebook: 'https://www.facebook.com/mapko',
    x: 'https://x.com/MapkoPartners'
  }
})

const updateLiens = () => {
  console.log('Liens mis à jour :', form.value)
  alert('Vos liens ont été mis à jour avec succès !')
}
</script>

<style scoped>
.liens-page { display: flex; flex-direction: column; }

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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.icon-brand { width: 18px; height: 18px; }
.icon-brand.linkedin { color: #0077b5; }
.icon-brand.facebook { color: #1877f2; }
.icon-brand.x-twitter { color: #000000; }

.form-group input[type="url"] {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  font-weight: 500;
}

.form-group input[type="url"]:focus {
  background: #ffffff;
  border-color: var(--color-violet);
  box-shadow: 0 0 0 4px rgba(122, 46, 142, 0.1);
}

/* Utilities */
.border-top { margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end;}

.btn-save {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--color-violet); color: #ffffff; border: none;
  padding: 0.8rem 1.8rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem;
  cursor: pointer; transition: all 0.2s ease;
}

.btn-save:hover { filter: brightness(1.1); box-shadow: 0 4px 12px rgba(122, 46, 142, 0.2); transform: translateY(-1px); }

.icon-sm { width: 18px; height: 18px; }
</style>
