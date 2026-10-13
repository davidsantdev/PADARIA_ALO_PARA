<script setup>
import { useOpenStatus } from '../composables/useOpenStatus'
import { selfServicePrice } from '../data/selfService'
import Doodle from './Doodle.vue'

const status = useOpenStatus()
</script>

<template>
  <div class="bg-brand text-white text-xs sm:text-sm font-medium">
    <div class="max-w-6xl mx-auto px-6 py-2 flex items-center justify-center md:justify-between gap-6">
      <p class="hidden md:flex items-center gap-2">
        <Doodle name="sparkle" class="w-4 h-4 text-sun" />
        Pães, salgados e bolos feitos do zero, todos os dias
      </p>

      <p class="flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full shrink-0"
          :class="status.open ? 'bg-[#4ade80] status-open' : 'bg-white/50'"
          aria-hidden="true"
        ></span>
        {{ status.text }}
      </p>

      <p class="hidden lg:flex items-center gap-2">
        <Doodle name="sparkle" class="w-4 h-4 text-sun" />
        Self-service: {{ selfServicePrice }}
      </p>
    </div>
  </div>
</template>
