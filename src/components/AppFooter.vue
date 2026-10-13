<script setup>
import { contact, hours, hasWhatsapp, whatsappLink, phoneDisplay } from '../data/contact'
import Doodle from './Doodle.vue'

const year = new Date().getFullYear()

const links = [
  { label: 'Início', to: '/' },
  { label: 'Cardápio', to: '/cardapio' },
  { label: 'Self-Service', to: '/self-service' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

const socialClass =
  'w-10 h-10 rounded-full border-2 border-cream/40 grid place-items-center hover:bg-sun hover:border-sun hover:text-ink transition-colors'
</script>

<template>
  <!-- pb: folga para o botão flutuante do WhatsApp não cobrir o texto legal -->
  <footer class="px-4 md:px-6 pt-10 pb-24">
    <div class="on-dark relative max-w-6xl mx-auto bg-plum text-cream/80 squircle-lg overflow-hidden px-6 md:px-12 pt-14 pb-8">
      <Doodle name="wheat" class="absolute left-[40%] top-6 w-32 h-32 text-cream/10 rotate-6 hidden md:block" />

      <div class="relative grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <p class="h-display text-5xl text-cream">
            Alô <span class="text-sun">Pará</span>
          </p>
          <p class="mt-4 text-sm leading-relaxed max-w-xs text-cream/70">
            Pães, salgados e bolos feitos do zero, todos os dias. Ingredientes honestos e o carinho
            de sempre.
          </p>

          <div class="mt-6 flex items-center gap-3">
            <a
              v-if="hasWhatsapp()"
              :href="whatsappLink()"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              :class="socialClass"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
                <path d="M12 3a9 9 0 0 0-7.79 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" stroke-linejoin="round" />
              </svg>
            </a>
            <a
              v-if="contact.instagram"
              :href="contact.instagram"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              :class="socialClass"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a :href="`mailto:${contact.email}`" aria-label="E-mail" :class="socialClass">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 6h18v12H3V6Zm0 0 9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <p class="h-display text-2xl text-sun mb-4">Navegação</p>
          <ul class="space-y-2 text-sm">
            <li v-for="l in links" :key="l.to">
              <router-link :to="l.to" class="hover:text-sun transition-colors">
                {{ l.label }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div>
          <p class="h-display text-2xl text-sun mb-4">Horário</p>
          <ul class="space-y-2 text-sm">
            <li v-for="h in hours" :key="h.day" class="flex justify-between gap-4">
              <span class="text-cream/70">{{ h.day }}</span>
              <span class="tabular-nums">{{ h.time }}</span>
            </li>
          </ul>

          <div v-if="hasWhatsapp() || contact.address" class="mt-5 space-y-2 text-sm">
            <a
              v-if="hasWhatsapp()"
              :href="whatsappLink()"
              target="_blank"
              rel="noopener"
              class="block hover:text-sun transition-colors"
            >
              {{ phoneDisplay() }}
            </a>
            <template v-if="contact.address">
              <a
                v-if="contact.mapsUrl"
                :href="contact.mapsUrl"
                target="_blank"
                rel="noopener"
                class="block text-cream/70 hover:text-sun transition-colors"
              >
                {{ contact.address }}
              </a>
              <p v-else class="text-cream/70">{{ contact.address }}</p>
            </template>
          </div>
        </div>
      </div>

      <div
        class="relative mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60"
      >
        <p>© {{ year }} Alô Pará. Feito com farinha, tempo e carinho.</p>
        <p>Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>
