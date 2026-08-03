<script setup>
import { ref, computed } from 'vue'
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import { contact, whatsappLink } from '../data/contact'

const message = ref('')

const sendHref = computed(() => {
  const base = whatsappLink(message.value || undefined)
  return base
})

const cards = computed(() => [
  {
    label: 'WhatsApp',
    value: contact.whatsappDisplay,
    icon: 'M12 3a9 9 0 0 0-7.79 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z',
  },
  {
    label: 'Endereço',
    value: contact.address,
    icon: 'M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  },
  {
    label: 'E-mail',
    value: contact.email,
    icon: 'M3 6h18v12H3V6Zm0 0 9 7 9-7',
  },
])
</script>

<template>
  <PageHero kicker="Fale com a gente" subtitle="Dúvidas, encomendas ou sugestões — estamos por aqui.">
    <span class="italic text-orange">Contato</span>
  </PageHero>

  <section class="py-16 px-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
      <div v-reveal="'left'">
        <div class="grid sm:grid-cols-2 gap-5">
          <div v-for="c in cards" :key="c.label" class="card-lift bg-white rounded-2xl p-6 border border-ink/5 shadow-sm">
            <div class="w-10 h-10 rounded-full icon-badge flex items-center justify-center mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C97A2B" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" :d="c.icon" />
              </svg>
            </div>
            <p class="text-xs uppercase tracking-widest text-inkSoft">{{ c.label }}</p>
            <p class="font-semibold mt-1">{{ c.value }}</p>
          </div>

          <div class="card-lift bg-white rounded-2xl p-6 border border-ink/5 shadow-sm sm:col-span-2">
            <div class="w-10 h-10 rounded-full icon-badge flex items-center justify-center mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C97A2B" stroke-width="1.8">
                <circle cx="12" cy="12" r="9" />
                <path stroke-linecap="round" d="M12 7v5l3 3" />
              </svg>
            </div>
            <p class="text-xs uppercase tracking-widest text-inkSoft mb-2">Horário de funcionamento</p>
            <div class="flex flex-col gap-1 text-sm">
              <div v-for="h in contact.hours" :key="h.day" class="flex justify-between max-w-xs">
                <span class="text-inkSoft">{{ h.day }}</span>
                <span class="font-medium">{{ h.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-reveal="'right'" class="bg-plum text-cream rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-orange/10 float-slower"></div>
        <h2 class="font-display text-2xl font-semibold">Mande uma mensagem</h2>
        <p class="mt-2 text-cream/70 text-sm max-w-sm">
          Escreva sua mensagem e envie direto pelo WhatsApp — respondemos rapidinho.
        </p>

        <textarea
          v-model="message"
          rows="5"
          placeholder="Olá! Gostaria de saber sobre..."
          class="mt-6 w-full rounded-2xl bg-cream/10 border border-cream/20 px-4 py-3 text-sm placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-orange/60 resize-none"
        ></textarea>

        <a
          v-if="sendHref"
          :href="sendHref"
          target="_blank"
          rel="noopener"
          class="btn-shine mt-5 inline-flex w-fit items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
        >
          Enviar pelo WhatsApp
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
        <p v-else class="mt-5 text-sm text-cream/50">
          WhatsApp ainda não configurado — adicione o número em
          <code class="text-orange">src/data/contact.js</code>.
        </p>
      </div>
    </div>
  </section>
</template>
