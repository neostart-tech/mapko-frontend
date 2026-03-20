<template>
  <section class="prefooter">
    <div class="prefooter__inner">
      <!-- LE CONTENEUR AVEC LA COULEUR -->
      <div class="prefooter__card">

        <!-- TEXTE -->
        <div class="prefooter__content">
          <p class="prefooter__eyebrow">Travaillons ensemble</p>
          <h2 class="prefooter__title">
            Votre prochain défi,<br />
            notre prochaine mission.
          </h2>
          <p class="prefooter__subtitle">
            Contactez nos équipes à
            <strong>Lomé</strong>, <strong>Cotonou</strong> ou <strong>Abidjan</strong>.
          </p>
        </div>

        <!-- CTA -->
        <div class="prefooter__action">
          <NuxtLink to="/contact" class="prefooter__cta">
            Prendre contact
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* =============================================
   PREFOOTER — MAPKO (MODÉLE BOXÉ SUR FOND BLANC)
   ============================================= */

.prefooter {
  background: #ffffff;
  padding: 4rem 1.5rem 6rem; /* Un peu plus d'espace en bas */
}

.prefooter__inner {
  max-width: 1216px;
  margin: 0 auto;
}

/* Le conteneur qui prend la couleur de la marque */
.prefooter__card {
  background: var(--color-blue);
  border-radius: 16px;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  box-shadow: 0 10px 40px rgba(15, 76, 129, 0.15);
  position: relative;
  overflow: hidden;
}

/* Motif subtil en arrière-plan du conteneur */
.prefooter__card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
  pointer-events: none;
}

/* ── Texte ── */
.prefooter__content {
  flex: 1;
  min-width: 0;
}

.prefooter__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.85rem;
}

.prefooter__title {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  line-height: 1.25;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.prefooter__subtitle {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.prefooter__subtitle strong {
  color: #ffffff;
  font-weight: 700;
}

/* ── CTA ── */
.prefooter__action {
  flex-shrink: 0;
}

.prefooter__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 2.25rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-blue);
  background: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  white-space: nowrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.prefooter__cta svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.prefooter__cta:hover {
  background: #f9fafb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: var(--color-violet);
}

.prefooter__cta:hover svg {
  transform: translateX(4px);
}

/* ── Responsive ── */
@media (max-width: 960px) {
  .prefooter__card {
    padding: 3rem;
  }
}

@media (max-width: 768px) {
  .prefooter {
    padding: 3rem 1.25rem;
  }

  .prefooter__card {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 2.5rem;
    text-align: left;
  }

  .prefooter__title {
    font-size: 1.8rem;
  }

  .prefooter__action {
    width: 100%;
  }

  .prefooter__cta {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
}
</style>
