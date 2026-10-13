<script setup>
import { vReveal } from '../directives/reveal'
import { isSvgMarkup } from '../utils/media'
import PageHero from '../components/PageHero.vue'
import PageHeading from '../components/PageHeading.vue'
import Doodle from '../components/Doodle.vue'
import { featured, mosaic } from '../data/gallery'
import { categories } from '../data/cardapio'

const tintByCategory = Object.fromEntries(categories.map((c) => [c.id, c.tint]))
const tilts = ['-rotate-3', 'rotate-2', 'rotate-3']
</script>

<template>
  <div>
    <PageHero kicker="Nossas criações" subtitle="Um pouco do resultado de cada fornada — bolos, biscoitos, doces e muito mais.">
      Nossa <span class="hl">Galeria</span>
    </PageHero>

    <section class="py-14 md:py-20 px-6">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-12 items-center">
        <!-- colagem de fotos em destaque -->
        <div class="grid grid-cols-2 gap-4 md:gap-5 px-1">
          <figure
            v-for="(g, i) in featured"
            :key="g.title"
            v-reveal="'left'"
            class="card-lift squircle relative overflow-hidden border-2 border-ink shadow-pop"
            :class="[i === 2 ? 'col-span-2 h-56' : 'h-52', tilts[i]]"
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
            <figcaption class="absolute left-3 bottom-3">
              <span class="sticker bg-white text-ink text-sm" style="--r: -3deg">{{ g.title }}</span>
            </figcaption>
          </figure>
        </div>

        <div v-reveal="'right'">
          <Doodle name="squiggle" class="w-16 h-6 text-sky mb-4" />
          <h2 class="h-display text-4xl md:text-6xl">
            Por que a <span class="hl">panificação</span> é considerada uma forma de arte?
          </h2>
          <p class="mt-5 text-inkSoft leading-relaxed max-w-md">
            Técnica, paciência e ingredientes honestos. Laminamos a manteiga à mão, fermentamos a massa
            lentamente e assamos em pequenos lotes para um sabor que você sente.
          </p>
          <router-link to="/sobre" class="btn-pill btn-pill--ghost mt-7">Saiba mais</router-link>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-6 pb-10">
      <div class="max-w-6xl mx-auto bg-white squircle-lg shadow-card px-6 md:px-12 py-12 md:py-16">
        <PageHeading kicker="Um gostinho do cardápio" center>
          Direto do <span class="hl">forno</span>
        </PageHeading>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 mt-12">
          <div
            v-for="item in mosaic"
            :key="item.id"
            v-reveal
            class="card-lift squircle-sm p-2.5 pb-4 text-center"
            :class="tintByCategory[item.category] || 'bg-sand'"
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
            <p class="h-display text-xl leading-[0.95] mt-3 px-1">{{ item.name }}</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/cardapio" class="btn-pill">Ver cardápio completo</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
