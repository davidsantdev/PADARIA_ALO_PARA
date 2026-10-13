<script setup>
import { vReveal } from '../directives/reveal'
import { isSvgMarkup } from '../utils/media'

defineProps({
  product: { type: Object, required: true },
  reveal: { type: String, default: '' },
})
</script>

<template>
  <article v-reveal="reveal" class="card-lift">
    <!-- foto: o fundo colorido já vem na própria imagem -->
    <div class="h-60 relative overflow-hidden squircle" :style="{ background: product.bg }">
      <img
        v-if="!isSvgMarkup(product.icon)"
        :src="product.icon"
        :alt="product.name"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div v-else class="h-full flex items-center justify-center" v-html="product.icon"></div>
    </div>
    <div class="px-2 pt-4">
      <h3 class="h-display text-2xl">{{ product.name }}</h3>
      <p class="text-sm text-inkSoft mt-2 leading-relaxed">{{ product.desc }}</p>
      <p v-if="product.price" class="text-bronze font-semibold mt-3">{{ product.price }}</p>
    </div>
  </article>
</template>
