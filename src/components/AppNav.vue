<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
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
  { label: 'Contato', to: '/contato' },
]

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function closeMobile() {
  mobileOpen.value = false
}

function onKeydown(e) {
  if (e.key === 'Escape') closeMobile()
}

function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

watch(
  () => route.path,
  () => {
    closeMobile()
    onScroll()
  }
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <!-- sticky: fica no fluxo (abaixo da barra de aviso) e gruda no topo ao rolar -->
  <header
    class="sticky top-0 z-50 transition-[background-color,box-shadow] duration-300"
    :class="mobileOpen ? 'bg-cream shadow-sm' : scrolled ? 'bg-cream/90 backdrop-blur-lg shadow-sm' : 'bg-cream/0'"
  >
    <div class="h-20 px-6 flex items-center justify-between max-w-6xl mx-auto">
      <router-link to="/" class="flex items-center gap-2" aria-label="Padaria Alô Pará — início" @click="closeMobile">
        <img
          src="../public/logo.webp"
          class="h-10 md:h-12 w-auto"
          alt="Padaria Alô Pará"
          width="720"
          height="250"
          fetchpriority="high"
        />
      </router-link>

      <nav class="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          :aria-current="isActive(l.to) ? 'page' : undefined"
          class="nav-link"
        >
          {{ l.label }}
        </router-link>
      </nav>

      <div class="hidden lg:block">
        <router-link to="/cardapio" class="btn-pill">Ver Cardápio</router-link>
      </div>

      <button
        class="lg:hidden w-11 h-11 -mr-2 grid place-items-center rounded-full border-2 border-ink bg-sun"
        :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
        :aria-expanded="mobileOpen"
        aria-controls="menu-mobile"
        @click="mobileOpen = !mobileOpen"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
          <path v-if="!mobileOpen" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <transition name="mobile-menu">
      <nav
        v-if="mobileOpen"
        id="menu-mobile"
        aria-label="Menu"
        class="lg:hidden bg-cream border-t-2 border-ink/10 px-6 py-5 flex flex-col gap-1"
      >
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          :aria-current="isActive(l.to) ? 'page' : undefined"
          class="h-display text-3xl py-2"
          :class="isActive(l.to) ? 'text-brand' : 'text-ink'"
          @click="closeMobile"
        >
          {{ l.label }}
        </router-link>
        <router-link to="/cardapio" class="btn-pill mt-3 w-fit" @click="closeMobile">Ver Cardápio</router-link>
      </nav>
    </transition>
  </header>
</template>
