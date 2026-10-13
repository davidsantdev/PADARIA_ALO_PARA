<script setup>
// Rabiscos de traço único (trigo, pão, cookie...) — desenhados à mão em SVG.
// A cor vem de `currentColor`, então basta usar text-* no elemento.
defineProps({
  name: {
    type: String,
    required: true,
    validator: (v) =>
      ['wheat', 'baguette', 'cookie', 'croissant', 'steam', 'squiggle', 'sparkle', 'donut', 'toast'].includes(v),
  },
})
</script>

<template>
  <svg
    :viewBox="name === 'squiggle' ? '0 0 76 24' : '0 0 64 64'"
    fill="none"
    stroke="currentColor"
    stroke-width="2.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'wheat'">
      <path d="M32 61V16" />
      <path d="M32 14C29 10 29 5 32 2c3 3 3 8 0 12Z" />
      <path d="M32 24c-6 0-10-4-10-10 6 0 10 4 10 10Z" />
      <path d="M32 24c6 0 10-4 10-10-6 0-10 4-10 10Z" />
      <path d="M32 35c-7 0-12-5-12-11 7 0 12 5 12 11Z" />
      <path d="M32 35c7 0 12-5 12-11-7 0-12 5-12 11Z" />
      <path d="M32 46c-7 0-12-5-12-11 7 0 12 5 12 11Z" />
      <path d="M32 46c7 0 12-5 12-11-7 0-12 5-12 11Z" />
    </template>

    <template v-else-if="name === 'baguette'">
      <g transform="rotate(-35 32 32)">
        <rect x="4" y="21" width="56" height="22" rx="11" />
        <path d="M17 24l5 16M30 24l5 16M43 24l5 16" />
      </g>
    </template>

    <template v-else-if="name === 'cookie'">
      <path d="M32 8c3 0 5 2 8 3 3 1 6 0 9 2 3 2 3 5 4 8 1 3 4 5 4 8s-3 5-4 8c-1 3-1 6-4 8-3 2-6 1-9 2-3 1-5 3-8 3s-5-2-8-3c-3-1-6 0-9-2-3-2-3-5-4-8-1-3-4-5-4-8s3-5 4-8c1-3 1-6 4-8 3-2 6-1 9-2 3-1 5-3 8-3Z" />
      <circle cx="24" cy="23" r="1.6" fill="currentColor" />
      <circle cx="40" cy="26" r="1.6" fill="currentColor" />
      <circle cx="30" cy="35" r="1.6" fill="currentColor" />
      <circle cx="43" cy="40" r="1.6" fill="currentColor" />
      <circle cx="22" cy="42" r="1.6" fill="currentColor" />
    </template>

    <template v-else-if="name === 'croissant'">
      <path d="M6 42C8 26 20 14 32 14s24 12 26 28c-6-4-10-4-14 0-4-6-20-6-24 0-4-4-8-4-14 0Z" />
      <path d="M32 14v19M22 17l4 18M42 17l-4 18" />
    </template>

    <template v-else-if="name === 'steam'">
      <path d="M20 58c-6-8 6-12 0-20s6-12 0-20" />
      <path d="M32 58c-6-8 6-12 0-20s6-12 0-20" />
      <path d="M44 58c-6-8 6-12 0-20s6-12 0-20" />
    </template>

    <template v-else-if="name === 'squiggle'">
      <path d="M2 12C8 2 14 2 20 12s12 10 18 0 12-10 18 0 12 10 18 0" />
    </template>

    <template v-else-if="name === 'sparkle'">
      <path d="M32 4c2 16 12 26 28 28-16 2-26 12-28 28-2-16-12-26-28-28C20 30 30 20 32 4Z" />
    </template>

    <template v-else-if="name === 'donut'">
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="8" />
      <path d="M18 20l4 3M44 17l-3 4M50 34l-5 1M42 48l-2-5M20 46l4-3M14 32l5 0" />
    </template>

    <template v-else-if="name === 'toast'">
      <path d="M12 28C5 22 10 8 22 9c5-5 15-5 20 0 12-1 17 13 10 19v26c0 2-2 4-4 4H16c-2 0-4-2-4-4V28Z" />
      <path d="M24 30h16" />
    </template>
  </svg>
</template>
