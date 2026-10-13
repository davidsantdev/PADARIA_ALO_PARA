<script setup>
import { ref, computed } from 'vue'
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import Doodle from '../components/Doodle.vue'
import { contact, hours, hasWhatsapp, whatsappLink, phoneDisplay } from '../data/contact'
import { useOpenStatus } from '../composables/useOpenStatus'

const message = ref('')
const status = useOpenStatus()

// Com WhatsApp configurado a mensagem vai por lá; sem ele, cai para o e-mail.
const sendHref = computed(() => {
  if (hasWhatsapp()) return whatsappLink(message.value.trim() || undefined)
  const body = encodeURIComponent(message.value.trim())
  return `mailto:${contact.email}?subject=${encodeURIComponent('Contato pelo site')}&body=${body}`
})
const sendsByWhatsapp = hasWhatsapp()

const tintByLabel = {
  WhatsApp: 'bg-mint',
  Endereço: 'bg-peach',
  Instagram: 'bg-lilac',
  'E-mail': 'bg-sky',
}

// só entram os canais que estão preenchidos em src/data/contact.js
const cards = computed(() => {
  const list = []
  if (hasWhatsapp()) {
    list.push({
      label: 'WhatsApp',
      value: phoneDisplay(),
      link: whatsappLink(),
      icon: 'M12 3a9 9 0 0 0-7.79 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z',
    })
  }
  if (contact.address) {
    list.push({
      label: 'Endereço',
      value: contact.address,
      link: contact.mapsUrl || null,
      icon: 'M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    })
  }
  if (contact.instagram) {
    list.push({
      label: 'Instagram',
      value: '@' + contact.instagram.replace(/\/+$/, '').split('/').pop(),
      link: contact.instagram,
      icon: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
    })
  }
  // número ímpar de cards curtos: o último ocupa a linha inteira (sem buraco no grid)
  const shorts = list.map((c, i) => ({ ...c, wide: list.length % 2 === 1 && i === list.length - 1 }))
  // o e-mail é comprido demais para meia largura: sempre ocupa a linha inteira
  return [
    ...shorts,
    {
      label: 'E-mail',
      value: contact.email,
      link: `mailto:${contact.email}`,
      icon: 'M3 6h18v12H3V6Zm0 0 9 7 9-7',
      wide: true,
    },
  ]
})
</script>

<template>
  <div>
    <PageHero kicker="Fale com a gente" subtitle="Dúvidas, encomendas ou sugestões — estamos por aqui.">
      <span class="hl">Contato</span>
    </PageHero>

    <section class="py-12 md:py-16 px-6">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10">
        <div v-reveal="'left'">
          <div class="grid sm:grid-cols-2 gap-5">
            <component
              :is="c.link ? 'a' : 'div'"
              v-for="c in cards"
              :key="c.label"
              :href="c.link || undefined"
              :target="c.link && c.link.startsWith('http') ? '_blank' : undefined"
              :rel="c.link && c.link.startsWith('http') ? 'noopener' : undefined"
              class="card-lift squircle-sm p-6 min-w-0"
              :class="[tintByLabel[c.label] || 'bg-sand', c.link ? 'block' : '', c.wide ? 'sm:col-span-2' : '']"
            >
              <div class="w-11 h-11 rounded-full bg-white border-2 border-ink flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1713" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="c.icon" />
                </svg>
              </div>
              <p class="text-xs uppercase tracking-widest font-bold text-ink/60">{{ c.label }}</p>
              <p class="font-bold text-lg md:text-xl mt-1 break-words">{{ c.value }}</p>
            </component>

            <div class="squircle-sm p-6 bg-sun sm:col-span-2">
              <div class="w-11 h-11 rounded-full bg-white border-2 border-ink flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1713" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" d="M12 7v5l3 3" />
                </svg>
              </div>
              <p class="text-xs uppercase tracking-widest font-bold text-ink/60 mb-2">Horário de funcionamento</p>
              <div class="flex flex-col gap-1">
                <div v-for="h in hours" :key="h.day" class="flex justify-between max-w-xs">
                  <span>{{ h.day }}</span>
                  <span class="font-bold tabular-nums">{{ h.time }}</span>
                </div>
              </div>
              <p class="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0"
                  :class="status.open ? 'bg-[#22A05A] status-open' : 'bg-ink/30'"
                  aria-hidden="true"
                ></span>
                {{ status.text }}
              </p>
            </div>
          </div>
        </div>

        <div v-reveal="'right'" class="on-dark bg-plum text-cream squircle p-8 md:p-10 relative overflow-hidden self-start">
          <Doodle name="wheat" class="absolute -right-3 -top-3 w-32 h-32 text-cream/10 rotate-12" />
          <h2 class="h-display text-4xl relative">Mande uma <span class="hl">mensagem</span></h2>
          <p class="mt-3 text-cream/75 max-w-sm relative">
            <template v-if="sendsByWhatsapp">
              Escreva sua mensagem e envie direto pelo WhatsApp — respondemos rapidinho.
            </template>
            <template v-else>
              Escreva sua mensagem e envie por e-mail — respondemos assim que possível.
            </template>
          </p>

          <label for="mensagem" class="sr-only">Sua mensagem</label>
          <textarea
            id="mensagem"
            v-model="message"
            rows="5"
            placeholder="Olá! Gostaria de saber sobre..."
            class="relative mt-6 w-full rounded-3xl bg-cream/10 border-2 border-cream/30 px-5 py-4 placeholder:text-cream/50 focus:outline-none focus:border-sun resize-none"
          ></textarea>

          <a
            :href="sendHref"
            :target="sendsByWhatsapp ? '_blank' : undefined"
            :rel="sendsByWhatsapp ? 'noopener' : undefined"
            class="btn-pill relative mt-5"
          >
            {{ sendsByWhatsapp ? 'Enviar pelo WhatsApp' : 'Enviar por e-mail' }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
