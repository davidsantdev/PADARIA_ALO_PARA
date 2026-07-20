<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { vReveal } from './directives/reveal'
import { isSvgMarkup } from './utils/media'
import AppNav from './components/AppNav.vue'
import ProductCard from './components/ProductCard.vue'
import crepiocaImg from './public/crepioca.png'
import salgados from './public/salgados.png'
import Psalgado from './public/Psalgado.png'
import Pdoce from './public/Pdoce.png'
import biscoito from './public/bisc.png'
import boloImg from './public/bolo.png'
import biscoito2 from './public/retang.png'
import boloImg2 from './public/bolo2.png'

import tortaFrango from './public/torta-frango.png'
import miniPizza from './public/mini-pizza.png'
import esfihaCalabresa from './public/esfiha-calabresa.png'
import esfihaQueijo from './public/esfiha-queijo.png'
import esfihaCarne from './public/carne.png'

import coxinhaFrango from './public/coxinha-frango.png'
import pastel from './public/pastel.png'
import boloCenoura from './public/bolo-cenoura.png'
import boloChocolate from './public/bolo-chocolate.png'
import sonho from './public/sonho.png'

const products = [
  {
    name: 'Misto c/ Pão francês',
    desc: 'Queijo, presunto, ovos ',

    bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)',
    icon: Psalgado,
  },
  {
    name: 'Misto c/ pão de forma ',
    desc: 'Queijo, presunto, ovos',

    bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)',
    icon: Pdoce,
  },
  {
    name: 'Salgados',
    desc: 'Compras acima de 10UN.',

    bg: 'linear-gradient(160deg,#F3C349,#E9A93B)',
    icon: salgados,
  },
  {
    name: 'Crepioca de frango e catupiry / Crepioca de presunto e queijo',
    desc: 'Uma delicia para seu dia e ótimo para sua dieta',

    bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)',
    icon: crepiocaImg,
  },
]

const gallery = [
  {
    title: 'Cesta de Croissants',
    bg: 'linear-gradient(160deg,#EFAF56,#E08A3B)',
    icon: biscoito,
  },
  {
    title: 'Moldando a Massa',
    bg: 'linear-gradient(160deg,#E7A15E,#CD8340)',
    icon: boloImg2,
  },
  {
    title: 'Farinha, Manteiga e Ovos',
    bg: 'linear-gradient(160deg,#E9CFA0,#D9B27A)',
    icon: biscoito2,
  },
]

const philosophy = [
  'Sempre quentinho',
  'Manteiga e ovos locais',
  'Produtos do mercado',
]

const selfServicePrice = 'R$ 6,20 a cada 100g'

const selfServiceItems = [
  { name: 'Torta de Frango', icon: tortaFrango, bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)' },
  { name: 'Mini Pizza', icon: miniPizza, bg: 'linear-gradient(160deg,#F3C349,#E9A93B)' },

  { name: 'Esfiha de Carne', icon: esfihaCarne, bg: 'linear-gradient(160deg,#EFAF56,#E08A3B)' },


  { name: 'Esfiha de Calabresa', icon: esfihaCalabresa, bg: 'linear-gradient(160deg,#EFAF56,#E08A3B)' },
  { name: 'Esfiha de Queijo', icon: esfihaQueijo, bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)' },
  { name: 'Coxinha de Frango', icon: coxinhaFrango, bg: 'linear-gradient(160deg,#EFAF56,#E08A3B)' },
  { name: 'Pastel', icon: pastel, bg: 'linear-gradient(160deg,#E7A15E,#CD8340)' },
  { name: 'Bolo de Cenoura c/ Calda de Chocolate', icon: boloCenoura, bg: 'linear-gradient(160deg,#E9CFA0,#D9B27A)' },
  { name: 'Bolo de Chocolate', icon: boloChocolate, bg: 'linear-gradient(160deg,#CD8340,#8C4A22)' },
  { name: 'Sonho', icon: sonho, bg: 'linear-gradient(160deg,#F7D57A,#F0BE4C)' },
]

/* ===================== CARDÁPIO ===================== */
// Carrega automaticamente todas as imagens de src/public/cardapio/ (1.png, 2.png, ... 85.png)
const cardapioImages = import.meta.glob('./public/cardapio/*.png', { eager: true, import: 'default' })

function getCardapioImg(n) {
  return cardapioImages[`./public/cardapio/${n}.png`] || ''
}

// nome + código de cada item, na mesma ordem numérica das imagens (1.png a 85.png)
const cardapioRaw = [
  'Bisc. Cebola|545',
  'Bisc. Cookies|28',
  'Bisc. Cupcakes|63035',
  'Bisc. da Vovó|526',
  'Bisc. Cocada|554',
  'Bisc. Maizena|553',
  'Bisc. Nhoque|553',
  'Bisc. Olho de Boi|520',
  'Bisc. Polvinho Trad.|82441',
  'Bisc. Quebrador|123',
  'Bolo de Milho|650',
  'Bolo de Tapioca c/ Coco|638',
  'Bolo Fatia|7058',
  'Bolo Gelado|651',
  'Bolo Gelado Red Velvet|7720',
  'Bolo no Pote G|55776',
  'Bolo no Pote P|102347',
  'Bolo Pudim|76',
  'Bolo Seco de Abacaxi|1517',
  'Bolo Seco de Coco|578',
  'Bolo Seco de Laranja|569',
  'Bolo Seco de Macaxeira|1530',
  'Bolo Seco de Milho|579',
  'Bolo Seco Formigueiro|596',
  'Bolo Seco Mesclado|600',
  'Buffet|496',
  'Café c/ Leite|5426',
  'Café Simples|40102',
  'Doce Sírio Mantecal|56',
  'Farinha de Rosca|1230',
  'Bisc. Donuts|42',
  'Pudim Fatia|59336',
  'Pão Sovado|5926',
  'Suco Natural Abacaxi e Morango|25521',
  'Suco Natural Laranja ou Maracujá|60686',
  'Copo da Felicidade|65993',
  'Mono Poção|56151',
  'Bala Banana|59090',
  'Combo|21010 + 64729',
  'Bisc. Cueca Virada|520',
  'Cápsulas 3 Corações|32649',
  'Sonho|56151',
  'Bix Mini Bolo|28670',
  'Centro Salgado|51436',
  'Pavê|102387',
  'Fatia Húngara|704',
  'Leite Líquido|12229',
  'Massas de Queijo|498',
  'Massas Doces Especiais|4039',
  'Mousse c/ Biscoito|96164',
  'Mousse Diversos|2499',
  'Pão de Batata|879',
  'Pão de Milho|701',
  'Pão de Queijo|508',
  'Pão Francês Gratinado|871',
  'Pão Francês Trad.|500',
  'Pão de Hambúrguer|506',
  'Pão Hot-Dog|715',
  'Pão Massa Fina|504',
  'Pizza Tradicional|9144',
  'Pudim Inteiro|721',
  'Pudim P|55778',
  'Quindim|722',
  'Rocambole Doce|723',
  'Rosca Doce|519',
  'Salada de Frutas|3894',
  'Sanduíche Natural|743',
  'Suco de Laranja|60686',
  'Suspiro Caseiro|753',
  'Taça da Felicidade|72221',
  'Torrada Trad.|755',
  'Torta Conf. Abacaxi|119',
  'Torta Conf. Bombom|605',
  'Torta Conf. Chocolate Amargo/Branco|624',
  'Torta Conf. Doce de Leite|633',
  'Torta Conf. Lacta Cremosa|632',
  'Torta Conf. Marta Rocha|619',
  'Torta Conf. Morango|612',
  'Torta Conf. Ninho|603',
  'Torta Conf. Nutella|625',
  'Torta Conf. Prestígio|78',
  'Torta Conf. Sonho de Valsa|611',
  'Amanhecido|275',
  'Bisc. Brownie|611',
  'Bisc. Casadinho|523',
]

const cardapioItems = cardapioRaw.map((entry, i) => {
  const [name, code] = entry.split('|')
  const n = i + 1
  return {
    id: n,
    name,
    code,
    img: getCardapioImg(n),
  }
})

// paginação
const itemsPerPage = 10
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(cardapioItems.length / itemsPerPage))

const paginatedCardapio = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return cardapioItems.slice(start, start + itemsPerPage)
})

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

function scrollToCardapio() {
  document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
/* =================================================== */
</script>

<template>
  <AppNav />

  <!-- HERO -->
  <section id="home" class="relative pt-32 pb-20 px-6 overflow-hidden grain">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p v-reveal class="text-xs tracking-widest uppercase text-inkSoft mb-4">Feito Hoje</p>
        <h1 v-reveal class="font-display text-5xl md:text-6xl font-semibold leading-[1.05]">
          Delicias para <br />
          <span class="italic text-orange">o seu dia</span>
        </h1>
        <p v-reveal class="mt-6 text-inkSoft max-w-md leading-relaxed">
          Pães, salgados e bolos premium feitos do zero. Os Ingredientes do melhor supermercado da região.
        </p>
        <div v-reveal class="mt-8 flex items-center gap-4">
          <a
            href="#cardapio"
            @click.prevent="scrollToCardapio"
            class="btn-shine glow-pulse inline-flex items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
          >
            Ver Cardápio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      <div v-reveal="'right'" class="relative">
        <div
          class="rounded-3xl h-80 md:h-96 relative overflow-hidden flex items-center justify-center "
          style="background: linear-gradient(160deg, #F2A65A 0%, #C2703A 50%, #9C4F26 100%);
box-shadow: 0 4px 12px rgba(156, 79, 38, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);"
        >
          <div class="crumb absolute w-2 h-2 rounded-full bg-yolk" style="left: 20%; animation-delay: 0s"></div>
          <div class="crumb absolute w-1.5 h-1.5 rounded-full bg-cream" style="left: 55%; animation-delay: 1.4s"></div>
          <div class="crumb absolute w-2 h-2 rounded-full bg-yolk" style="left: 75%; animation-delay: 2.6s"></div>

          <img
            :src="boloImg"
            alt="Bolo"
            class="float-slow relative z-10 w-[300px] md:w-74 md:h-74 object-contain drop-shadow-2xl"
          />
        </div>
        <div
          class="absolute -top-6 -left-6 bg-cream rounded-full w-20 h-20 flex flex-col items-center justify-center text-[10px] font-semibold text-center shadow-lg spin-slow border border-ink/10"
        >
          100%<br />NATURAL
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUCTS -->
  <section id="sobre" class="py-24 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <h2 v-reveal class="font-display text-3xl md:text-4xl font-semibold mb-12">
        Produtos feitos <span class="italic text-orange">na hora</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <ProductCard v-for="(p, i) in products" :key="i" :product="p" :reveal="i % 2 ? 'right' : 'left'" />
      </div>
    </div>
  </section>

  <!-- CARDÁPIO -->
  <section id="cardapio" class="py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 v-reveal class="font-display text-3xl md:text-4xl font-semibold mb-2 text-center">
        Nosso <span class="italic text-orange">Cardápio</span>
      </h2>
      <p v-reveal class="text-inkSoft text-center mb-12">
        {{ cardapioItems.length }} produtos disponíveis
      </p>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-5">
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
              class="w-[150px]  object-contain drop-shadow-sm"
            />
            <span v-else class="text-xs text-inkSoft">sem imagem</span>
          </div>
          <div class="p-3 text-center">
            <p class="text-sm font-semibold text-ink leading-tight">{{ item.name }}</p>
            <p class="text-[11px] text-inkSoft mt-1">Cód. {{ item.code }}</p>
          </div>
        </div>
      </div>

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

  <!-- SELF-SERVICE -->
  <section id="self-service" class="py-24 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <div v-reveal class="flex flex-col items-center text-center mb-4">
        <h2 class="font-display text-3xl md:text-4xl font-semibold">
          <span class="italic text-orange">Self-Service</span>
        </h2>
        <p class="mt-3 text-lg font-semibold text-orangeD">
          {{ selfServicePrice }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div
          v-for="(item, i) in selfServiceItems"
          :key="i"
          v-reveal
          class="card-lift rounded-2xl overflow-hidden bg-white shadow-md"
        >
          <div
            class="h-32 relative flex items-center justify-center"
            :style="{ background: item.bg }"
          >
            <img
              :src="item.icon"
              :alt="item.name"
              class="w-[200px] h-25 object-contain drop-shadow-md"
            />
          </div>
          <div class="p-3 text-center">
            <p class="text-sm font-semibold text-ink leading-tight">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERY + ART FORM -->
  <section id="galeria" class="py-24 px-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(g, i) in gallery.slice(0, 2)"
          :key="i"
          v-reveal="'left'"
          class="card-lift rounded-2xl h-48 relative overflow-hidden"
          :style="{ background: g.bg }"
        >
          <img
            v-if="!isSvgMarkup(g.icon)"
            :src="g.icon"
            :alt="g.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div v-else class="h-full flex items-center justify-center" v-html="g.icon"></div>
        </div>

        <div
          v-reveal="'left'"
          class="card-lift col-span-2 rounded-2xl h-56 relative overflow-hidden"
          :style="{ background: gallery[2].bg }"
        >
          <img
            v-if="!isSvgMarkup(gallery[2].icon)"
            :src="gallery[2].icon"
            :alt="gallery[2].title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div v-else class="h-full flex items-center justify-center" v-html="gallery[2].icon"></div>
        </div>
      </div>

      <div v-reveal="'right'" class="pt-4">
        <h2 class="font-display text-3xl md:text-4xl font-semibold leading-tight">
          Por que a <span class="italic text-orange">panificação</span> é considerada uma forma de arte?
        </h2>
        <p class="mt-5 text-inkSoft leading-relaxed max-w-md">
          Técnica, paciência e ingredientes honestos. Laminamos a manteiga à mão, fermentamos a massa
          lentamente e assamos em pequenos lotes para um sabor que você sente.
        </p>
        <button class="mt-6 border border-ink/20 px-6 py-3 rounded-full hover:bg-ink hover:text-cream transition-colors">
          Saiba mais
        </button>
      </div>
    </div>
  </section>

  <!-- PHILOSOPHY + CARDÁPIO CTA -->
  <section id="contato" class="py-24 px-6 bg-white">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
      <div v-reveal="'left'">
        <h2 class="font-display text-3xl font-semibold">Filosofia da Massa</h2>
        <p class="mt-4 text-inkSoft leading-relaxed max-w-md">
          Paciência, sabor e nutrição. Fermentação longa, fermento mínimo, ingredientes honestos.
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="(item, i) in philosophy" :key="i" v-reveal class="flex items-center gap-3 text-ink/90">
            <svg class="draw-check" width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="9" fill="#F5C84C" opacity=".5" />
              <path d="M6 10.5l2.5 2.5L14 7" stroke="#C97A2B" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-reveal="'right'" class="bg-plum text-cream rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-center">
        <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-orange/10 float-slower"></div>
        <h3 class="font-display text-2xl font-semibold">Explore o cardápio completo</h3>
        <p class="mt-3 text-cream/70 text-sm max-w-sm">
          Mais de 80 opções entre pães, salgados, bolos e doces feitos frescos todos os dias.
        </p>
        <a
          href="#cardapio"
          @click.prevent="scrollToCardapio"
          class="btn-shine mt-6 inline-flex w-fit items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
        >
          Ver Cardápio
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <footer class="py-10 px-6 text-center text-sm text-inkSoft border-t border-ink/10">
    © 2026 Alô Pará . Feito com farinha, tempo e carinho.
  </footer>
</template>
<style scoped>
@media (max-width: 767px) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
</style>