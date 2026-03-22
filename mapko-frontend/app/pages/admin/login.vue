<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="login-bg__overlay"></div>
    </div>

    <div class="login-container">
      <div class="login-card">
        <div class="login-card__header">
          <img src="/images/logo_mixte.png" alt="Logo Mapko" class="login-logo" />
          <h1 class="login-title">Administration</h1>
          <p class="login-subtitle">Veuillez vous authentifier pour accéder au dashboard</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Adresse email</label>
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                v-model="credentials.email" 
                placeholder="votre mail" 
                required 
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="credentials.password" 
                placeholder="••••••••" 
                required 
              />
              <button type="button" class="btn-toggle-pass" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </button>
            </div>
          </div>

          <div class="form-footer">
            <NuxtLink to="/" class="forgot-link">Retour au site</NuxtLink>
          </div>

          <button type="submit" class="btn-login" :disabled="isLoading">
            {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </form>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>
      </div>

      <p class="login-footer-copy">© 2026 Mapko & Partners Administration Dashboard</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from "~~/stores/auth";

definePageMeta({
  layout: false
})

const auth = useAuthStore()
const credentials = ref({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

onMounted(() => {
    auth.init();
    if (auth.isLogged) {
        navigateTo("/admin");
    }
});

const handleLogin = async () => {
  errorMsg.value = ''
  
  let valid = true;
  if (!credentials.value.email.trim()) {
      errorMsg.value = "L'adresse email est requise.";
      valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.value.email)) {
      errorMsg.value = "Adresse email invalide.";
      valid = false;
  } else if (!credentials.value.password) {
      errorMsg.value = "Le mot de passe est requis.";
      valid = false;
  }
  
  if (!valid) return;

  isLoading.value = true
  
  try {
      await auth.login(credentials.value.email, credentials.value.password);

      const toast = useToast();
      toast.success({ message: "Heureux de vous revoir !" });
      await navigateTo("/admin");
  } catch (e: any) {
      errorMsg.value = e?.message ?? "Identifiants invalides. Veuillez réessayer.";
  } finally {
      isLoading.value = false;
  }
}

useHead({
  title: 'Connexion Admin - Mapko'
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #1a202c;
  background: #0d121f;
}

.login-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(circle at top right, #3b1845 0%, #0d121f 50%);
}

.login-bg__overlay {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.login-container {
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 10;
}

.login-card {
  background: #ffffff;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-card__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-logo {
  height: 40px;
  margin: 0 auto 1.5rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 0.875rem;
  color: #718096;
}

.login-form {
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
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.75rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

input#password {
  padding-right: 3rem;
}

input:focus {
  outline: none;
  background: #ffffff;
  border-color: #7A2E8E;
  box-shadow: 0 0 0 3px rgba(122, 46, 142, 0.1);
}

.btn-toggle-pass {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
  cursor: pointer;
}

.forgot-link {
  font-size: 0.875rem;
  color: #7A2E8E;
  font-weight: 600;
  text-decoration: none;
}

.btn-login {
  padding: 1rem;
  background: #7A2E8E;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-login:hover:not(:disabled) {
  background: #5A1E6E;
  transform: translateY(-1px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-text {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background: #fff5f5;
  color: #c53030;
  border-left: 4px solid #c53030;
  border-radius: 4px;
  font-size: 0.875rem;
  text-align: center;
}

.login-footer-copy {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
}
</style>
