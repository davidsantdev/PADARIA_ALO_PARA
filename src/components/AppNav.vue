<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const scrolled = ref(false)
const mobileOpen = ref(false)
const route = useRoute()

const links = [
  { label: 'Início', to: '/' },
  { label: 'Cardápio', to: '/cardapio' },
  { label: 'Self-Service', to: '/self-service' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Sobre', to: '/sobre' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMobile() {
  mobileOpen.value = false
}

function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled || mobileOpen ? 'bg-cream/80 backdrop-blur-lg shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="h-20 px-6 py-4 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2" @click="closeMobile">
        <img
          src="../public/logo.webp"
          class="h-9 sm:h-10 md:h-12 w-auto"
          alt="Padaria Alô Pará"
          width="720"
          height="250"
          fetchpriority="high"
        />
      </router-link>

      <nav class="hidden md:flex items-center gap-8 text-sm">
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          :class="[
            'underline-grow transition-colors',
            isActive(l.to) ? 'text-orange font-medium' : 'text-ink/80 hover:text-ink',
          ]"
        >
          {{ l.label }}
        </router-link>
      </nav>

      <div class="hidden md:block">
        <router-link
          to="/cardapio"
          class="btn-shine bg-orange text-ink text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
        >
          Ver Cardápio
        </router-link>
      </div>

      <button class="md:hidden" @click="mobileOpen = !mobileOpen" aria-label="Abrir menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="!mobileOpen" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <transition name="mobile-menu">
      <div v-if="mobileOpen" class="md:hidden bg-cream border-t border-ink/10 px-6 py-4 flex flex-col gap-4">
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          @click="closeMobile"
          :class="isActive(l.to) ? 'text-orange font-medium' : 'text-ink/80'"
        >
          {{ l.label }}
        </router-link>
        <router-link
          to="/contato"
          @click="closeMobile"
          :class="isActive('/contato') ? 'text-orange font-medium' : 'text-ink/80'"
        >
          Contato
        </router-link>
        <router-link
          to="/cardapio"
          @click="closeMobile"
          class="bg-orange text-ink text-sm font-semibold px-5 py-2.5 rounded-full w-fit"
        >
          Ver Cardápio
        </router-link>
      </div>
    </transition>
  </header>
</template>
