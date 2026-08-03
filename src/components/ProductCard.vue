<script setup>
import { vReveal } from '../directives/reveal'
import { isSvgMarkup } from '../utils/media'

defineProps({
  product: { type: Object, required: true },
  reveal: { type: String, default: '' },
})
</script>

<template>
  <div v-reveal="reveal" class="card-lift bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(36,28,23,.2)]">
    <div class="h-56 relative overflow-hidden" :style="{ background: product.bg }">
      <!-- real photo -->
      <img
        v-if="!isSvgMarkup(product.icon)"
        :src="product.icon"
        :alt="product.name"
        loading="lazy"
        decoding="async"
        class="icon-pop absolute inset-0 w-full h-full object-cover"
      />
      <!-- inline svg fallback -->
      <div v-else class="icon-pop h-full flex items-center justify-center" v-html="product.icon"></div>
    </div>
    <div class="p-5">
      <h3 class="font-display font-semibold text-lg">{{ product.name }}</h3>
      <p class="text-sm text-inkSoft mt-1 leading-relaxed">{{ product.desc }}</p>
      <p v-if="product.price" class="text-orangeD font-semibold mt-3">{{ product.price }}</p>
    </div>
  </div>
</template>