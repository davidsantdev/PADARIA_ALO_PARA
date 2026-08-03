<script setup>
import { vReveal } from '../directives/reveal'
import { isSvgMarkup } from '../utils/media'
import PageHero from '../components/PageHero.vue'
import PageHeading from '../components/PageHeading.vue'
import { featured, mosaic } from '../data/gallery'
</script>

<template>
  <PageHero kicker="Bastidores" subtitle="Um pouco do processo — e do resultado — por trás de cada fornada.">
    Nossa <span class="italic text-orange">Galeria</span>
  </PageHero>

  <section class="py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(g, i) in featured.slice(0, 2)"
            :key="i"
            v-reveal="'left'"
            class="card-lift rounded-2xl h-48 relative overflow-hidden"
            :style="{ background: g.bg }"
          >
            <img
              v-if="!isSvgMarkup(g.icon)"
              :src="g.icon"
              :alt="g.title"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div v-else class="h-full flex items-center justify-center" v-html="g.icon"></div>
          </div>

          <div
            v-reveal="'left'"
            class="card-lift col-span-2 rounded-2xl h-56 relative overflow-hidden"
            :style="{ background: featured[2].bg }"
          >
            <img
              v-if="!isSvgMarkup(featured[2].icon)"
              :src="featured[2].icon"
              :alt="featured[2].title"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div v-else class="h-full flex items-center justify-center" v-html="featured[2].icon"></div>
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
          <router-link
            to="/sobre"
            class="mt-6 inline-block border border-ink/20 px-6 py-3 rounded-full hover:bg-ink hover:text-cream transition-colors"
          >
            Saiba mais
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <PageHeading kicker="Um gostinho do cardápio" center>
        Direto do <span class="italic text-orange">forno</span>
      </PageHeading>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-12">
        <div
          v-for="item in mosaic"
          :key="item.id"
          v-reveal
          class="card-lift rounded-2xl overflow-hidden bg-cream/60 shadow-md border border-ink/5"
        >
          <div class="h-32 flex items-center justify-center">
            <img
              :src="item.img"
              :alt="item.name"
              loading="lazy"
              decoding="async"
              class="w-[140px] object-contain drop-shadow-sm"
            />
          </div>
          <div class="p-3 text-center">
            <p class="text-sm font-semibold text-ink leading-tight">{{ item.name }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <router-link
          to="/cardapio"
          class="btn-shine inline-flex items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
        >
          Ver cardápio completo
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>
