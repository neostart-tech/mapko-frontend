<template>
  <div class="messages-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Messages' }]" />

    <!-- Loader circulaire autour du logo -->
    <AdminLoader v-if="messageStore.loading && messageStore.messages.length === 0" :visible="true" inline />

    <div v-if="!messageStore.loading || messageStore.messages.length > 0" class="content-wrapper">
      <!-- HEADER CARD -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl text-black">Gestion des Messages</h2>
            <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Flux des demandes de contact
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="stats-pill bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100 flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-violet-600"></span>
              <span class="text-xs font-semibold">{{ rows.length }} Messages globaux</span>
            </div>
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
            <input v-model="search" type="text" placeholder="Nom, email, objet..."
              class="pl-10 pr-4 py-2.5 w-full rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium" />
          </div>

          <select v-model="filterStatus"
            class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all cursor-pointer">
            <option value="all">Tous les messages</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
          </select>

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
          <vue3-datatable :rows="filteredRows" :columns="visibleColumns" :search="search" :sortable="true"
            :loading="messageStore.loading" skin="bh-table-hover bh-table-compact" class="custom-datatable"
            :pageSize="10" :totalRows="messages.length" :noDataContent="noDataMessage" :paginationInfo="'Affichage de {0} à {1} sur {2} entrées'">
            <!-- Nom Column with Unread Indicator -->
            <template #expediteur="data">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs"
                  :style="{ background: data.value.statut ? '#f1f5f9' : 'rgba(122, 46, 142, 0.1)', color: data.value.statut ? '#64748b' : '#7A2E8E' }">
                  {{ data.value.expediteur.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-bold" :class="data.value.statut ? 'text-gray-600' : 'text-black'">{{
                    data.value.expediteur }}</span>
                  <span v-if="!data.value.statut"
                    class="text-[10px] text-violet-600 font-extrabold uppercase tracking-tighter">Nouveau</span>
                </div>
              </div>
            </template>

            <!-- Truncated Columns -->
            <template #objet="data">
              <span class="text-sm text-gray-600 truncate max-w-[150px] inline-block" :title="data.value.objet">{{
                data.value.objet }}</span>
            </template>

            <template #contenu="data">
              <span class="text-sm text-gray-500 truncate max-w-[200px] inline-block italic"
                :title="data.value.contenu">{{ data.value.contenu }}</span>
            </template>

            <!-- Actions Slot -->
            <template #actions="data">
              <div class="flex items-center gap-2">
                <button @click="openMessage(data.value)" class="action-btn view" title="Voir les détails">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button @click="sendEmail(data.value)" class="action-btn email" title="Répondre par email">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
                <button @click="deleteMessage(data.value)" class="action-btn delete" title="Supprimer">
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

    <!-- DETAIL MODAL -->
    <transition name="modal">
      <div v-if="selectedMessage" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="selectedMessage = null"></div>
        <div
          class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scale">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-8 py-6 border-b border-gray-50">
            <div class="flex items-center gap-4">
              <div
                class="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-black">Détails du Message</h3>
                <p class="text-xs text-gray-400 font-semibold uppercase tracking-widest">Contact Client</p>
              </div>
            </div>
            <button @click="selectedMessage = null"
              class="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-2xl p-4">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Expéditeur</p>
                <p class="text-sm font-bold text-black">{{ selectedMessage.expediteur }}</p>
              </div>
              <div class="bg-gray-50 rounded-2xl p-4 text-right">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                <p class="text-sm font-bold text-black">{{ selectedMessage.telephone || '—' }}</p>
              </div>
              <div class="col-span-2 bg-violet-50/50 rounded-2xl p-4 border border-violet-100">
                <p class="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1">Email</p>
                <p class="text-sm font-bold text-violet-700">{{ selectedMessage.email }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Objet de la demande</p>
              <div class="bg-gray-50 rounded-2xl p-4">
                <p class="text-sm font-bold text-violet-700 leading-relaxed">{{ selectedMessage.objet }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contenu du message</p>
              <div class="bg-gray-50 rounded-2xl p-6 min-h-[120px]">
                <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{{ selectedMessage.contenu }}</p>
              </div>
            </div>

            <!-- ZONE DE RÉPONSE -->
            <div class="space-y-3 pt-2 border-t border-gray-100">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rédiger une réponse</p>
              <div class="reply-editor-wrapper rounded-2xl overflow-hidden border border-gray-200">
                <div ref="quillReplyRef" class="reply-quill-editor"></div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-8 py-5 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-3">
            <button @click="sendReply(selectedMessage)" :disabled="isSendingReply"
              class="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95">
              <svg v-if="!isSendingReply" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ isSendingReply ? 'Envoi...' : 'Envoyer la réponse' }}
            </button>
            <button @click="selectedMessage = null"
              class="px-6 py-3 text-sm font-bold text-gray-400 hover:text-black hover:bg-white rounded-xl transition-all">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useMessageStore } from '~~/stores/message';
import { useNuxtApp } from '#app';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin'
});

const messageStore = useMessageStore();
const { $api } = useNuxtApp();

const search = ref('');
const filterStatus = ref('all');
const selectedMessage = ref<any>(null);
const quillReplyRef = ref<HTMLElement | null>(null);
const quillInstance = ref<any>(null);
const isSendingReply = ref(false);

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const allColumns = ref([
  { field: 'expediteur', title: 'Expéditeur', visible: true, sort: true, width: '220px' },
  { field: 'email', title: 'Email', visible: true, sort: true },
  { field: 'telephone', title: 'Téléphone', visible: true, sort: true, width: '130px' },
  { field: 'objet', title: 'Objet', visible: true, sort: true },
  { field: 'contenu', title: 'Message', visible: true, sort: true },
  { field: 'actions', title: 'Détails', visible: true, sort: false, width: '140px', headerClass: 'justify-center', cellClass: 'justify-center' },
]);

const visibleColumns = computed(() =>
  allColumns.value.filter((c) => c.visible).map((c) => ({ ...c }))
);

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
  }
};

const messages = computed(() => messageStore.messages);

const noDataMessage = computed(() => {
  if (search.value) return `Aucun message trouvé pour "${search.value}"`;
  return "Aucun message trouvé";
});

const filteredRows = computed(() => {
  let data = [...messages.value];

  if (filterStatus.value === 'unread') {
    data = data.filter(r => !r.statut);
  } else if (filterStatus.value === 'read') {
    data = data.filter(r => r.statut);
  }

  return data;
});

const resetFilters = () => {
  search.value = '';
  filterStatus.value = 'all';
};

const openMessage = async (msg: any) => {
  selectedMessage.value = { ...msg };
  await messageStore.show(msg.id);
  // Init Quill après le rendu du modal
  await nextTick()
  await nextTick()
  if (quillReplyRef.value && !quillInstance.value) {
    const Quill = (await import('quill')).default
    await import('quill/dist/quill.snow.css')
    quillInstance.value = new Quill(quillReplyRef.value, {
      theme: 'snow',
      placeholder: `Bonjour ${msg.expediteur},\n\nSuite à votre message...`,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link'],
          ['clean']
        ]
      }
    })
  } else if (quillInstance.value) {
    // Réinitialise le contenu pour le nouveau message
    quillInstance.value.setContents([])
  }
};

const sendReply = async (msg: any) => {
  if (!quillInstance.value) return;
  const html = quillInstance.value.root.innerHTML;
  const text = quillInstance.value.getText().trim();
  if (!text) {
    Swal.fire({ title: 'Message vide', text: 'Veuillez rédiger votre réponse avant d\'envoyer.', icon: 'warning', timer: 2000, showConfirmButton: false });
    return;
  }
  isSendingReply.value = true;
  try {
    await $api('/messages/reply', {
      method: 'POST',
      body: {
        to: msg.email,
        subject: `RE: ${msg.objet}`,
        content: html,
        message_id: msg.id
      }
    });
    quillInstance.value.setContents([]);
    selectedMessage.value = null;
    Swal.fire({ title: 'Réponse envoyée !', icon: 'success', timer: 2000, showConfirmButton: false, customClass: { popup: 'swal2-custom-popup' } });
  } catch (e) {
    Swal.fire('Erreur', 'L\'envoi de la réponse a échoué. Vérifiez la configuration du serveur mail.', 'error');
  } finally {
    isSendingReply.value = false;
  }
};

// Destroy Quill quand on ferme le modal
watch(selectedMessage, (val) => {
  if (!val && quillInstance.value) {
    quillInstance.value = null;
  }
});

const sendEmail = (msg: any) => {
  const subject = encodeURIComponent(`RE: ${msg.objet}`);
  const body = encodeURIComponent(`Bonjour ${msg.expediteur},\n\nSuite à votre message concernant "${msg.objet}"...\n\nCordialement,\nL'équipe Mapko`);
  window.location.href = `mailto:${msg.email}?subject=${subject}&body=${body}`;
};

const deleteMessage = async (msg: any) => {
  const result = await Swal.fire({
    title: 'Supprimer ce message ?',
    text: `Voulez-vous vraiment supprimer le message de ${msg.expediteur} ? Cette action est irréversible.`,
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
      await messageStore.destroy(msg.id);
      Swal.fire({
        title: 'Supprimé !',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'swal2-custom-popup' }
      });
    } catch (error) {
      Swal.fire('Erreur', 'Impossible de supprimer le message.', 'error');
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  messageStore.startPolling();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  // On ne coupe pas forcément le polling ici si on veut que le badge sidebar reste à jour
  // Mais par précaution pour la performance, on peut le laisser ou le mettre dans un plugin global.
  // Ici on le laisse tourner globalement car il est lancé dans startPolling qui vérifie si l'intervalle existe.
});
</script>

<style scoped>
/* Transiciones y Animaciones */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-scale {
  animation: scaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleUp {
  from {
    transform: scale(0.9) translateY(10px);
    opacity: 0;
  }

  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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
  padding: 1.25rem 1rem !important;
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
}

.action-btn.view {
  background: #f8fafc;
  color: #1e293b;
}

.action-btn.view:hover {
  background: #e2e8f0;
  color: #000;
}

.action-btn.email {
  background: rgba(122, 46, 142, 0.05);
  color: #7A2E8E;
}

.action-btn.email:hover {
  background: #7A2E8E;
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

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
