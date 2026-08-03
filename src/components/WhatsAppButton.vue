<script setup>
import { computed } from 'vue'
import { whatsappLink } from '../data/contact'

const href = computed(() => whatsappLink())
</script>

<template>
  <component
    :is="href ? 'a' : 'router-link'"
    :href="href || undefined"
    :to="href ? undefined : '/contato'"
    :target="href ? '_blank' : undefined"
    rel="noopener"
    aria-label="Falar no WhatsApp"
    class="fixed z-40 bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-transform"
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.24 8.24 0 0 1-1.26-4.4c0-4.55 3.71-8.25 8.27-8.25 2.21 0 4.28.86 5.84 2.42a8.19 8.19 0 0 1 2.42 5.84c0 4.56-3.71 8.28-8.27 8.28Zm4.53-6.2c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z"
      />
    </svg>
  </component>
</template>
