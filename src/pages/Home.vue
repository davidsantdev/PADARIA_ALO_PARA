<script setup>
import { ref } from 'vue'
import { vReveal } from '../directives/reveal'
import ProductCard from '../components/ProductCard.vue'
import PageHeading from '../components/PageHeading.vue'
import Doodle from '../components/Doodle.vue'
import boloImg from '../public/bolo.webp'
import boloImg2 from '../public/bolo2.webp'
import { products } from '../data/products'
import { cardapioItems, cardapioItemById, categories, cardapioCountLabel } from '../data/cardapio'
import { selfServiceItems, selfServicePrice } from '../data/selfService'
import { contact, hours, hasWhatsapp, whatsappLink, phoneDisplay } from '../data/contact'
import { useOpenStatus } from '../composables/useOpenStatus'

const status = useOpenStatus()
const whatsapp = whatsappLink()

const features = [
  {
    title: 'Sempre quentinho',
    desc: 'Fornadas frescas do amanhecer até a noite.',
    doodle: 'steam',
    tint: 'bg-peach',
  },
  {
    title: 'Ingredientes honestos',
    desc: 'Manteiga, ovos e farinha do melhor supermercado da região.',
    doodle: 'wheat',
    tint: 'bg-sky',
  },
  {
    title: 'Feito em pequenos lotes',
    desc: 'Técnica, paciência e sabor que você sente.',
    doodle: 'croissant',
    tint: 'bg-blush',
  },
]

// chips de categoria com a contagem real de itens (leva para o cardápio já filtrado)
const chips = categories.map((c) => ({
  ...c,
  count: cardapioItems.filter((item) => item.category === c.id).length,
}))

// seleção variada do cardápio para o carrossel (id = número da foto)
const carouselIds = [13, 15, 54, 60, 63, 65, 72, 80, 81, 84, 16, 66]
const tints = ['bg-sun', 'bg-sky', 'bg-peach', 'bg-lilac', 'bg-blush']
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
const carousel = carouselIds
  .map((id) => cardapioItemById(id))
  .filter(Boolean)
  .map((item, i) => ({ ...item, tint: tints[i % tints.length], tilt: tilts[i % tilts.length] }))

const row = ref(null)
function scrollRow(direction) {
  const el = row.value
  if (!el) return
  el.scrollBy({ left: direction * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' })
}

// colagem do self-service
const selfPreview = selfServiceItems.slice(0, 3)
const selfTilts = ['-rotate-6', 'rotate-3', '-rotate-2']
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="px-4 md:px-6 pt-2">
      <div class="relative max-w-6xl mx-auto bg-white squircle-lg shadow-card px-6 md:px-12 pt-12 md:pt-16 pb-10 md:pb-14 overflow-hidden">
        <Doodle name="wheat" class="absolute -left-3 top-24 w-24 h-24 text-ink/10 -rotate-12 hidden md:block" />
        <Doodle name="sparkle" class="absolute right-10 top-8 w-7 h-7 text-coral float-slow" />
        <Doodle name="sparkle" class="absolute left-[44%] top-10 w-4 h-4 text-sky" />

        <!-- mobile: adesivos numa linha própria (sobre o título eles cobririam as letras) -->
        <div class="flex flex-wrap items-center gap-3 mb-4 md:hidden">
          <span class="sticker bg-leaf text-sm" style="--r: -5deg">Feito hoje</span>
          <span class="sticker bg-coral text-ink text-sm" style="--r: 4deg">Quentinho</span>
        </div>

        <h1 v-reveal class="h-display text-[clamp(2.9rem,8.4vw,7.2rem)] relative">
          <span class="relative inline-block">
            Delícias
            <span
              class="sticker bg-leaf text-lg absolute -top-6 -right-8 wiggle hidden md:inline-flex"
              style="--r: -8deg"
            >Feito hoje</span>
            <Doodle name="steam" class="absolute -top-12 left-0 w-11 h-11 text-coral hidden md:block" />
          </span>
          para
          <span class="relative inline-block whitespace-nowrap">
            o <span class="hl">seu dia</span>
            <span
              class="sticker bg-coral text-ink text-lg absolute -top-6 -right-12 wiggle hidden md:inline-flex"
              style="--r: 7deg; animation-delay: 0.6s"
            >Quentinho</span>
          </span>
        </h1>

        <div class="mt-10 md:mt-12 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div v-reveal>
            <p class="h-display text-3xl md:text-4xl max-w-sm">
              Pães, salgados e bolos premium feitos do zero
            </p>
            <p class="mt-4 text-inkSoft max-w-md leading-relaxed">
              Os ingredientes do melhor supermercado da região, todos os dias na sua mesa.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <router-link to="/cardapio" class="btn-pill">Ver cardápio</router-link>
              <a
                v-if="whatsapp"
                :href="whatsapp"
                target="_blank"
                rel="noopener"
                class="btn-pill btn-pill--ghost"
              >Pedir pelo WhatsApp</a>
              <router-link
                v-else
                to="/self-service"
                class="h-display text-xl inline-flex items-center gap-1 hover:text-coral transition-colors"
              >
                Self-service
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </router-link>
            </div>
          </div>

          <div v-reveal="'right'" class="relative pt-10">
            <div class="relative bg-sun squircle h-72 md:h-[22rem]">
              <Doodle name="baguette" class="absolute right-3 top-3 w-20 h-20 md:w-24 md:h-24 text-ink/70" />
              <Doodle name="cookie" class="absolute left-4 bottom-4 w-12 h-12 text-ink/40" />
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[128%]">
                <img
                  :src="boloImg"
                  alt="Bolo de chocolate com morangos da Padaria Alô Pará"
                  width="900"
                  height="1125"
                  fetchpriority="high"
                  decoding="async"
                  class="float-slow h-full w-auto max-w-none object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <!-- selo girando -->
            <div
              class="absolute -left-2 md:-left-10 top-2 w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-2 border-ink grid place-items-center shadow-pop"
              aria-hidden="true"
            >
              <svg viewBox="0 0 120 120" class="absolute inset-0 w-full h-full spin-slow">
                <defs>
                  <path id="badge-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
                </defs>
                <text
                  font-family="'Londrina Solid', sans-serif"
                  font-weight="900"
                  font-size="15"
                  letter-spacing="2"
                  fill="#2B1713"
                >
                  <textPath href="#badge-circle">100% NATURAL • FEITO HOJE • 100% NATURAL •</textPath>
                </text>
              </svg>
              <span class="w-12 h-12 rounded-full bg-sun border-2 border-ink grid place-items-center">
                <Doodle name="cookie" class="w-8 h-8" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="px-4 md:px-6 pt-8">
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
        <div
          v-for="(f, i) in features"
          :key="i"
          v-reveal
          class="card-lift squircle p-7 md:p-8"
          :class="f.tint"
        >
          <Doodle :name="f.doodle" class="w-14 h-14 text-ink" />
          <h3 class="h-display text-3xl mt-5">{{ f.title }}</h3>
          <p class="mt-2 text-ink/75 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- PRODUTOS FEITOS NA HORA -->
    <section class="py-20 md:py-28 px-6">
      <div class="max-w-6xl mx-auto">
        <PageHeading kicker="Cardápio do dia">
          Produtos feitos <span class="hl">na hora</span>
        </PageHeading>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-12">
          <ProductCard v-for="(p, i) in products" :key="i" :product="p" :reveal="i % 2 ? 'right' : 'left'" />
        </div>
      </div>
    </section>

    <!-- CATEGORIAS + CARROSSEL -->
    <section class="pb-20 md:pb-28 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-center">
          <div v-reveal>
            <h2 class="h-display text-4xl md:text-6xl">
              Tudo o que assamos <span class="hl">todo dia</span>
            </h2>
            <p class="mt-4 text-inkSoft max-w-md leading-relaxed">
              {{ cardapioCountLabel }} opções entre pães, salgados, bolos, tortas e doces. Escolha uma
              categoria e veja o cardápio filtrado.
            </p>
          </div>

          <ul v-reveal="'right'" class="flex flex-wrap gap-3">
            <li v-for="c in chips" :key="c.id">
              <router-link :to="{ path: '/cardapio', query: { categoria: c.id } }" class="chip" :class="c.tint">
                {{ c.label }}
                <span class="count">{{ c.count }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="relative mt-10">
          <div ref="row" class="snap-row no-scrollbar -mx-6 px-6 scroll-pl-6" tabindex="0" aria-label="Destaques do cardápio">
            <router-link
              v-for="item in carousel"
              :key="item.id"
              :to="{ path: '/cardapio', query: { busca: item.name } }"
              class="card-lift block w-60 md:w-64 squircle p-3 pb-5 text-center"
              :class="[item.tint, item.tilt]"
            >
              <div class="squircle-sm overflow-hidden aspect-[480/424] bg-white">
                <img
                  :src="item.img"
                  :alt="item.name"
                  width="480"
                  height="424"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover"
                />
              </div>
              <p class="h-display text-2xl mt-4 px-2">{{ item.name }}</p>
            </router-link>
          </div>

          <div class="flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              class="w-12 h-12 grid place-items-center rounded-full bg-white border-2 border-ink hover:bg-sun transition-colors"
              aria-label="Ver itens anteriores"
              @click="scrollRow(-1)"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 8H3M7 4 3 8l4 4" />
              </svg>
            </button>
            <button
              type="button"
              class="w-12 h-12 grid place-items-center rounded-full bg-white border-2 border-ink hover:bg-sun transition-colors"
              aria-label="Ver próximos itens"
              @click="scrollRow(1)"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FILOSOFIA (painel escuro) -->
    <section class="px-4 md:px-6">
      <div
        v-reveal
        class="on-dark relative max-w-6xl mx-auto bg-plum text-cream squircle-lg overflow-hidden p-6 md:p-12 grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 items-center"
      >
        <Doodle name="wheat" class="absolute -right-6 -bottom-6 w-56 h-56 text-cream/10 rotate-12" />
        <div class="relative squircle overflow-hidden aspect-[4/3]">
          <img
            :src="boloImg2"
            alt="Bolo de chocolate com morangos da Padaria Alô Pará"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="relative">
          <Doodle name="squiggle" class="w-16 h-6 text-sky mb-4" />
          <h2 class="h-display text-4xl md:text-6xl">
            Paciência, sabor e <span class="hl">nutrição</span>
          </h2>
          <p class="mt-5 text-cream/75 leading-relaxed max-w-md">
            Fermentação longa, fermento mínimo e ingredientes honestos. Técnica e carinho em cada
            fornada — conheça a nossa filosofia.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <router-link to="/sobre" class="btn-pill">Nossa história</router-link>
            <router-link to="/cardapio" class="btn-pill btn-pill--ghost">Ver cardápio</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- SELF-SERVICE -->
    <section class="px-4 md:px-6 pt-8">
      <div
        v-reveal
        class="relative max-w-6xl mx-auto bg-sun squircle-lg overflow-hidden p-6 md:p-12 grid md:grid-cols-2 gap-10 items-center"
      >
        <Doodle name="sparkle" class="absolute right-8 top-6 w-8 h-8 text-ink/60 float-slow" />
        <div class="min-w-0">
          <p class="text-xs tracking-widest uppercase font-bold text-ink/70 mb-3">Self-service</p>
          <h2 class="h-display text-4xl md:text-6xl">
            Monte o seu prato do <span class="underline decoration-4 underline-offset-4 decoration-ink">seu jeito</span>
          </h2>
          <p class="mt-4 text-ink/75 leading-relaxed max-w-md">
            Salgados e bolos fresquinhos, pesados na hora — você escolhe a combinação.
          </p>
          <p class="mt-6 inline-block h-display text-3xl bg-white border-2 border-ink rounded-full px-5 pt-1.5 pb-2 shadow-pop">
            {{ selfServicePrice }}
          </p>
          <div class="mt-8">
            <router-link to="/self-service" class="btn-pill btn-pill--dark">Ver itens do dia</router-link>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 md:gap-4 px-1 md:px-4 min-w-0">
          <div
            v-for="(item, i) in selfPreview"
            :key="item.name"
            class="squircle-sm overflow-hidden aspect-[3/4] border-2 border-ink shadow-pop"
            :class="selfTilts[i]"
            :style="{ background: item.bg }"
          >
            <img
              :src="item.icon"
              :alt="item.name"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-contain p-2"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- VISITE / HORÁRIO -->
    <section class="px-4 md:px-6 py-8 pb-4">
      <div
        v-reveal
        class="relative max-w-6xl mx-auto bg-sky text-skyInk squircle-lg overflow-hidden p-6 md:p-12 grid md:grid-cols-2 gap-10"
      >
        <Doodle name="baguette" class="absolute right-6 top-6 w-20 h-20 text-skyInk/25" />
        <div>
          <p class="text-xs tracking-widest uppercase font-bold mb-3">Venha nos visitar</p>
          <h2 class="h-display text-4xl md:text-6xl">
            Pão quentinho esperando por você
          </h2>
          <p class="mt-4 leading-relaxed max-w-md">
            Passe por aqui para montar o seu prato no self-service ou levar um bolo para casa.
          </p>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li v-for="c in chips.slice(0, 5)" :key="c.id">
              <router-link
                :to="{ path: '/cardapio', query: { categoria: c.id } }"
                class="inline-block border-2 border-skyInk rounded-full px-4 pt-1 pb-1.5 font-display font-black uppercase text-lg leading-none hover:bg-skyInk hover:text-sky transition-colors"
              >{{ c.label }}</router-link>
            </li>
          </ul>
        </div>

        <div class="bg-white/70 squircle-sm p-6 md:p-8">
          <p class="inline-flex items-center gap-2 font-semibold">
            <span
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :class="status.open ? 'bg-[#22A05A] status-open' : 'bg-ink/30'"
              aria-hidden="true"
            ></span>
            {{ status.text }}
          </p>

          <ul class="mt-4 divide-y divide-skyInk/15">
            <li v-for="h in hours" :key="h.day" class="flex justify-between gap-4 py-3">
              <span>{{ h.day }}</span>
              <span class="font-semibold tabular-nums">{{ h.time }}</span>
            </li>
          </ul>

          <div v-if="contact.address || hasWhatsapp()" class="mt-4 space-y-1 text-sm">
            <p v-if="contact.address">{{ contact.address }}</p>
            <p v-if="hasWhatsapp()" class="font-semibold">{{ phoneDisplay() }}</p>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <a v-if="contact.mapsUrl" :href="contact.mapsUrl" target="_blank" rel="noopener" class="btn-pill">
              Como chegar
            </a>
            <a v-if="whatsapp" :href="whatsapp" target="_blank" rel="noopener" class="btn-pill btn-pill--ghost">
              Chamar no WhatsApp
            </a>
            <router-link v-if="!contact.mapsUrl && !whatsapp" to="/contato" class="btn-pill">
              Fale com a gente
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
