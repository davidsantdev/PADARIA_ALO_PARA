<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import { cardapioItems, categories, normalizeText, cardapioCountLabel } from '../data/cardapio'

const route = useRoute()
const router = useRouter()

// 20 é divisível por 2, 4 e 5 colunas — a última linha de cada página nunca fica "quebrada"
const itemsPerPage = 20

const categoryIds = new Set(categories.map((c) => c.id))

// O estado vive na URL (?categoria=bolos&busca=pao&pagina=2): dá para compartilhar
// um link do cardápio já filtrado e o botão "voltar" não perde o filtro.
const search = ref(typeof route.query.busca === 'string' ? route.query.busca : '')
const category = ref(categoryIds.has(route.query.categoria) ? route.query.categoria : 'todos')
const currentPage = ref(Math.max(1, parseInt(route.query.pagina, 10) || 1))

// cada palavra digitada precisa aparecer (sem acento, sem diferenciar maiúscula)
const searchTerms = computed(() => normalizeText(search.value).split(/\s+/).filter(Boolean))

const matchesSearch = (item) => searchTerms.value.every((t) => item.haystack.includes(t))

const filteredItems = computed(() =>
  cardapioItems.filter(
    (item) => (category.value === 'todos' || item.category === category.value) && matchesSearch(item)
  )
)

// contagem por categoria respeitando a busca atual (mostrada nos botões de filtro)
const chips = computed(() => {
  const counts = {}
  let total = 0
  for (const item of cardapioItems) {
    if (!matchesSearch(item)) continue
    total++
    counts[item.category] = (counts[item.category] || 0) + 1
  }
  return [
    { id: 'todos', label: 'Todos', count: total, tint: 'bg-white' },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: counts[c.id] || 0, tint: c.tint })),
  ]
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage)))
const page = computed(() => Math.min(currentPage.value, totalPages.value))

const paginatedCardapio = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

const tintByCategory = Object.fromEntries(categories.map((c) => [c.id, c.tint]))

const hasFilters = computed(() => search.value.trim() !== '' || category.value !== 'todos')

const resultLabel = computed(() => {
  const n = filteredItems.value.length
  if (!hasFilters.value) return `${n} produtos`
  return `${n} ${n === 1 ? 'produto encontrado' : 'produtos encontrados'}`
})

watch([search, category], () => {
  currentPage.value = 1
})

// espelha o estado na URL (com debounce, para não gravar a cada tecla)
let syncTimer
function syncQuery() {
  const query = {}
  if (search.value.trim()) query.busca = search.value.trim()
  if (category.value !== 'todos') query.categoria = category.value
  if (page.value > 1) query.pagina = String(page.value)
  router.replace({ query })
}
watch([search, category, page], () => {
  clearTimeout(syncTimer)
  syncTimer = setTimeout(syncQuery, 250)
})
onBeforeUnmount(() => clearTimeout(syncTimer))

function clearFilters() {
  search.value = ''
  category.value = 'todos'
}

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  document.getElementById('lista')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = page.value
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
    <PageHero
      kicker="Cardápio completo"
      :subtitle="`${cardapioCountLabel} opções entre pães, salgados, bolos e doces feitos frescos todos os dias.`"
    >
      Nosso <span class="hl">Cardápio</span>
    </PageHero>

    <section id="lista" class="py-10 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col gap-5 mb-8">
          <div class="relative w-full md:max-w-sm">
            <label for="busca-cardapio" class="sr-only">Buscar no cardápio</label>
            <svg
              class="absolute left-5 top-1/2 -translate-y-1/2 text-ink pointer-events-none"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path stroke-linecap="round" d="m20 20-3-3" />
            </svg>
            <input
              id="busca-cardapio"
              v-model="search"
              type="search"
              autocomplete="off"
              placeholder="Buscar pão, bolo, torta..."
              class="w-full pl-12 pr-5 py-3 rounded-full border-2 border-ink bg-white text-sm font-medium placeholder:text-inkSoft focus:outline-none focus:shadow-pop transition-shadow"
            />
          </div>

          <div
            role="group"
            aria-label="Filtrar por categoria"
            class="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 py-2 md:flex-wrap md:overflow-visible md:mx-0 md:px-0"
          >
            <button
              v-for="chip in chips"
              :key="chip.id"
              type="button"
              class="chip shrink-0"
              :class="chip.tint"
              :aria-pressed="category === chip.id"
              :disabled="chip.count === 0 && category !== chip.id"
              @click="category = chip.id"
            >
              {{ chip.label }}
              <span class="count">{{ chip.count }}</span>
            </button>
          </div>

          <p class="text-sm text-inkSoft font-medium" role="status" aria-live="polite">
            {{ resultLabel }}
            <template v-if="totalPages > 1"> · página {{ page }} de {{ totalPages }}</template>
          </p>
        </div>

        <div v-if="paginatedCardapio.length" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          <article
            v-for="item in paginatedCardapio"
            :key="item.id"
            v-reveal
            class="card-lift squircle-sm p-2.5 pb-4"
            :class="tintByCategory[item.category] || 'bg-white'"
          >
            <div class="squircle-sm overflow-hidden aspect-[480/424] bg-white">
              <img
                v-if="item.img"
                :src="item.img"
                :alt="item.name"
                width="480"
                height="424"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-xs text-inkSoft">
                sem imagem
              </div>
            </div>
            <div class="px-1.5 pt-3 text-center">
              <h3 class="h-display text-xl leading-[0.95]">{{ item.name }}</h3>
              <p class="text-[11px] font-medium text-ink/70 mt-1.5">Cód. {{ item.code }}</p>
            </div>
          </article>
        </div>

        <div v-else class="text-center py-16">
          <p class="h-display text-4xl">Nada encontrado por aqui</p>
          <p class="mt-2 text-inkSoft">
            Não achamos nenhum produto<template v-if="search.trim()"> para "{{ search.trim() }}"</template>
            nesse filtro.
          </p>
          <button
            type="button"
            class="btn-pill mt-6"
            @click="clearFilters"
          >
            Limpar filtros
          </button>
        </div>

        <!-- PAGINAÇÃO -->
        <nav
          v-if="totalPages > 1"
          aria-label="Paginação do cardápio"
          class="flex items-center justify-center gap-2 mt-12 flex-wrap"
        >
          <button
            type="button"
            class="px-5 pt-2 pb-2.5 rounded-full border-2 border-ink font-display font-black uppercase text-lg leading-none disabled:opacity-30 enabled:hover:bg-sun transition-colors"
            :disabled="page === 1"
            @click="goToPage(page - 1)"
          >
            ‹ Anterior
          </button>

          <template v-for="(p, i) in visiblePages" :key="i">
            <span v-if="p === '...'" class="px-2 text-inkSoft" aria-hidden="true">…</span>
            <button
              v-else
              type="button"
              class="w-11 h-11 rounded-full border-2 border-ink font-display font-black text-xl leading-none transition-colors"
              :class="p === page ? 'bg-sun shadow-pop' : 'bg-white hover:bg-sun'"
              :aria-label="`Página ${p}`"
              :aria-current="p === page ? 'page' : undefined"
              @click="goToPage(p)"
            >
              {{ p }}
            </button>
          </template>

          <button
            type="button"
            class="px-5 pt-2 pb-2.5 rounded-full border-2 border-ink font-display font-black uppercase text-lg leading-none disabled:opacity-30 enabled:hover:bg-sun transition-colors"
            :disabled="page === totalPages"
            @click="goToPage(page + 1)"
          >
            Próxima ›
          </button>
        </nav>
      </div>
    </section>
  </div>
</template>
