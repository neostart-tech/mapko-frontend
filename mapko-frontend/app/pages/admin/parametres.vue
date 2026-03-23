<template>
  <div class="settings-page">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Paramètres' }]" class="animate-reveal" />

    <!-- Header -->
    <div class="settings-header animate-reveal reveal-delay-1">
      <div class="header-text">
        <h1>Paramètres du Compte</h1>
        <p>Gérez vos informations personnelles et vos préférences de sécurité.</p>
      </div>
    </div>

    <div class="settings-content">
      <!-- Info Perso -->
      <div class="settings-card animate-reveal reveal-delay-2">
        <div class="card-header">
          <div class="card-title-group">
            <component :is="IconUser" class="card-icon" />
            <h2>Informations Personnelles</h2>
          </div>
          <button class="btn-edit" @click="openPersonalInfoModal()">
            <component :is="IconEdit" class="icon-sm" />
            Modifier
          </button>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Nom</span>
            <span class="info-value">{{ userInfo.lastName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Prénom</span>
            <span class="info-value">{{ userInfo.firstName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email</span>
            <span class="info-value">{{ userInfo.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Téléphone</span>
            <span class="info-value">{{ userInfo.phone }}</span>
          </div>
        </div>
      </div>

      <!-- Securite -->
      <div class="settings-card animate-reveal reveal-delay-3">
        <div class="card-header">
          <div class="card-title-group">
            <component :is="IconLock" class="card-icon blue-icon" />
            <h2>Sécurité</h2>
          </div>
          <button class="btn-edit btn-edit-blue" @click="openPasswordModal()">
            <component :is="IconEdit" class="icon-sm" />
            Modifier mon mot de passe
          </button>
        </div>

        <div class="info-grid">
          <div class="info-item security-item">
            <div class="security-desc">
              <span class="info-label">Mot de passe</span>
              <span class="info-value">••••••••••••</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Modal Personal Info -->
    <div v-if="isPersonalInfoModalOpen" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content animate-reveal is-active">
        <div class="modal-header">
          <h3>Modifier les informations</h3>
          <button class="btn-close" @click="closeModals">
            <component :is="IconClose" />
          </button>
        </div>
        <form @submit.prevent="savePersonalInfo" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nom</label>
              <input type="text" v-model="formUserInfo.lastName" required />
            </div>
            <div class="form-group">
              <label>Prénom</label>
              <input type="text" v-model="formUserInfo.firstName" required />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="formUserInfo.email" required />
          </div>
          <div class="form-group">
            <label>Téléphone</label>
            <input type="tel" v-model="formUserInfo.phone" required />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModals">Annuler</button>
            <button type="submit" class="btn-save" :disabled="userStore.loading">
              {{ userStore.loading ? 'Mise à jour en cours...' : 'Mettre à jour' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Password -->
    <div v-if="isPasswordModalOpen" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content animate-reveal is-active">
        <div class="modal-header">
          <h3>Modifier le mot de passe</h3>
          <button class="btn-close" @click="closeModals">
            <component :is="IconClose" />
          </button>
        </div>
        <form @submit.prevent="savePassword" class="modal-form">
          <div class="form-group">
            <label>Ancien mot de passe</label>
            <div class="input-password-wrapper">
              <input :type="showPasswords.old ? 'text' : 'password'" v-model="passwordForm.old_password" required />
              <button type="button" class="btn-toggle-eye" @click="showPasswords.old = !showPasswords.old">
                <component :is="showPasswords.old ? IconEyeOff : IconEye" />
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>Nouveau mot de passe</label>
            <div class="input-password-wrapper">
              <input :type="showPasswords.new ? 'text' : 'password'" v-model="passwordForm.new_password" required />
              <button type="button" class="btn-toggle-eye" @click="showPasswords.new = !showPasswords.new">
                <component :is="showPasswords.new ? IconEyeOff : IconEye" />
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>Confirmer le nouveau mot de passe</label>
            <div class="input-password-wrapper">
              <input :type="showPasswords.confirm ? 'text' : 'password'"
                v-model="passwordForm.new_password_confirmation" required />
              <button type="button" class="btn-toggle-eye" @click="showPasswords.confirm = !showPasswords.confirm">
                <component :is="showPasswords.confirm ? IconEyeOff : IconEye" />
              </button>
            </div>
          </div>
          <p v-if="passwordError" class="error-msg">{{ passwordError }}</p>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModals">Annuler</button>
            <button type="submit" class="btn-save btn-save-blue" :disabled="userStore.loading">
              {{ userStore.loading ? 'Mise à jour en cours...' : 'Mettre à jour' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { useUserStore } from '~~/stores/user'
import { useAuthStore } from '~~/stores/auth'
import Swal from 'sweetalert2'

definePageMeta({
  layout: 'admin'
})

const userStore = useUserStore()
const authStore = useAuthStore()

// Custom SVG Icons
const IconUser = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }), h('circle', { cx: '12', cy: '7', r: '4' })])
const IconLock = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }), h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })])
const IconEdit = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }), h('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })])
const IconClose = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }), h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })])
const IconEye = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }), h('circle', { cx: '12', cy: '12', r: '3' })])
const IconEyeOff = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' }), h('line', { x1: '1', y1: '1', x2: '23', y2: '23' })])

const userInfo = ref({
  lastName: '',
  firstName: '',
  email: '',
  phone: ''
})

const initializeUserInfo = () => {
  if (authStore.user) {
    userInfo.value = {
      lastName: authStore.user.nom || '',
      firstName: authStore.user.prenom || '',
      email: authStore.user.email || '',
      phone: authStore.user.telephone || ''
    }
  }
}

onMounted(() => {
  initializeUserInfo()
})

const formUserInfo = ref({ ...userInfo.value })

const passwordForm = ref({
  old_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const isPersonalInfoModalOpen = ref(false)
const isPasswordModalOpen = ref(false)
const passwordError = ref('')

const showPasswords = ref({
  old: false,
  new: false,
  confirm: false
})

const openPersonalInfoModal = () => {
  formUserInfo.value = { ...userInfo.value }
  isPersonalInfoModalOpen.value = true
}

const openPasswordModal = () => {
  passwordForm.value = { old_password: '', new_password: '', new_password_confirmation: '' }
  passwordError.value = ''
  isPasswordModalOpen.value = true
}

const closeModals = () => {
  isPersonalInfoModalOpen.value = false
  isPasswordModalOpen.value = false
}

const savePersonalInfo = async () => {
  try {
    await userStore.updateProfile({
      nom: formUserInfo.value.lastName,
      prenom: formUserInfo.value.firstName,
      email: formUserInfo.value.email,
      telephone: formUserInfo.value.phone
    })

    initializeUserInfo()
    closeModals()

    Swal.fire({
      title: 'Profil mis à jour',
      icon: 'success',
      confirmButtonColor: '#7A2E8E',
      timer: 2000,
      customClass: {
        popup: 'swal2-custom-popup',
        confirmButton: 'swal2-custom-confirm'
      }
    })
  } catch (error: any) {
    Swal.fire({
      title: 'Erreur',
      text: error.message || 'Impossible de mettre à jour le profil.',
      icon: 'error',
      confirmButtonColor: '#7A2E8E'
    })
  }
}

const savePassword = async () => {
  if (passwordForm.value.new_password !== passwordForm.value.new_password_confirmation) {
    passwordError.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    await userStore.updatePassword(passwordForm.value)

    closeModals()
    Swal.fire({
      title: 'Mot de passe modifié',
      text: 'Votre sécurité a été mise à jour.',
      icon: 'success',
      confirmButtonColor: '#0F4C81',
      timer: 2000,
      customClass: {
        popup: 'swal2-custom-popup',
        confirmButton: 'swal2-custom-confirm'
      }
    })
  } catch (error: any) {
    passwordError.value = error.message || 'Erreur lors du changement de mot de passe.'
  }
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
}

.settings-header {
  margin-bottom: 2.5rem;
  margin-top: 1rem;
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

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #eef2f6;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  width: 44px;
  height: 44px;
  padding: 10px;
  background: rgba(122, 46, 142, 0.1);
  color: var(--color-violet);
  border-radius: 12px;
}

.card-icon.blue-icon {
  background: rgba(15, 76, 129, 0.1);
  color: var(--color-blue);
}

.card-title-group h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.btn-edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--color-violet);
  border: 1px solid rgba(122, 46, 142, 0.2);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background: rgba(122, 46, 142, 0.05);
  border-color: var(--color-violet);
}

.btn-edit-blue {
  color: var(--color-blue);
  border-color: rgba(15, 76, 129, 0.2);
}

.btn-edit-blue:hover {
  background: rgba(15, 76, 129, 0.05);
  border-color: var(--color-blue);
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.security-item {
  grid-column: 1 / -1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.security-desc {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
}

.security-hint {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  /* Basic animation reset for modals */
  opacity: 1;
  transform: none;
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

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

.form-group input {
  padding: 0.9rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  background: #f8fafc;
  /* Fond "plein" comme sur le login */
}

.form-group input:focus {
  background: #ffffff;
  border-color: var(--color-violet);
  box-shadow: 0 0 0 4px rgba(122, 46, 142, 0.1);
}

.input-password-wrapper {
  position: relative;
  width: 100%;
}

.input-password-wrapper input {
  width: 100%;
  padding-right: 3.25rem;
}

.btn-toggle-eye {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s ease;
  z-index: 5;
}

.btn-toggle-eye:hover {
  color: var(--color-violet);
}

.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.btn-save {
  background: var(--color-violet);
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 12px rgba(122, 46, 142, 0.2);
}

.btn-save-blue {
  background: var(--color-blue);
}

.btn-save-blue:hover {
  box-shadow: 0 4px 12px rgba(15, 76, 129, 0.2);
}

@media (max-width: 600px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .security-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
