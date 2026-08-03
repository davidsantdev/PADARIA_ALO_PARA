<script setup>
import { ref, computed, watch } from 'vue'
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import { cardapioItems } from '../data/cardapio'

const search = ref('')
const itemsPerPage = 15
const currentPage = ref(1)

const filteredItems = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return cardapioItems
  return cardapioItems.filter((item) => item.name.toLowerCase().includes(q))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage)))

const paginatedCardapio = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

watch(search, () => {
  currentPage.value = 1
})

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  document.getElementById('lista')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  const range = []
  const delta = 1
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= cur - delta && i <= cur + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }
  return range
})
</script>

<template>
  <div>
  <PageHero kicker="Cardápio completo" subtitle="Mais de 80 opções entre pães, salgados, bolos e doces feitos frescos todos os dias.">
    Nosso <span class="italic text-orange">Cardápio</span>
  </PageHero>

  <section id="lista" class="py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <p class="text-inkSoft text-sm">
          {{ filteredItems.length }} de {{ cardapioItems.length }} produtos
        </p>
        <div class="relative w-full sm:w-72">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 text-inkSoft"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path stroke-linecap="round" d="m20 20-3-3" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar no cardápio..."
            class="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange/50"
          />
        </div>
      </div>

      <div v-if="paginatedCardapio.length" class="grid grid-cols-2 md:grid-cols-5 gap-5">
        <div
          v-for="item in paginatedCardapio"
          :key="item.id"
          v-reveal
          class="card-lift rounded-2xl overflow-hidden bg-white shadow-md border border-ink/5"
        >
          <div class="h-28 bg-cream/60 flex items-center justify-center">
            <img
              v-if="item.img"
              :src="item.img"
              :alt="item.name"
              loading="lazy"
              decoding="async"
              width="150"
              height="112"
              class="w-[150px] object-contain drop-shadow-sm"
            />
            <span v-else class="text-xs text-inkSoft">sem imagem</span>
          </div>
          <div class="p-3 text-center">
            <p class="text-sm font-semibold text-ink leading-tight">{{ item.name }}</p>
            <p class="text-[11px] text-inkSoft mt-1">Cód. {{ item.code }}</p>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-inkSoft py-16">
        Nenhum produto encontrado para "{{ search }}".
      </p>

      <!-- PAGINAÇÃO -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-12 flex-wrap">
        <button
          class="px-4 py-2 rounded-full border border-ink/20 text-sm font-semibold disabled:opacity-30 hover:bg-ink hover:text-cream transition-colors"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          ‹ Anterior
        </button>

        <template v-for="(p, i) in visiblePages" :key="i">
          <span v-if="p === '...'" class="px-2 text-inkSoft">…</span>
          <button
            v-else
            class="w-9 h-9 rounded-full text-sm font-semibold transition-colors"
            :class="p === currentPage
              ? 'bg-orange text-ink'
              : 'border border-ink/20 hover:bg-ink hover:text-cream'"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
        </template>

        <button
          class="px-4 py-2 rounded-full border border-ink/20 text-sm font-semibold disabled:opacity-30 hover:bg-ink hover:text-cream transition-colors"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Próxima ›
        </button>
      </div>
    </div>
  </section>
  </div>
</template>
