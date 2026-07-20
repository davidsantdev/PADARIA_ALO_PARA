<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('home')

const links = [
  { label: 'Inicio', id: 'home' },
  { label: 'Feitos na hora', id: 'sobre' },
  { label: 'Cardápio', id: 'cardapio' },
  { label: 'Galeria', id: 'galeria' },

]

let observer = null

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMobile() {
  mobileOpen.value = false
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  closeMobile()
}

// Observa as seções da página e atualiza o link ativo no menu
// conforme o usuário rola a tela (scrollspy).
function setupObserver() {
  const sections = links
    .map((l) => document.getElementById(l.id))
    .filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      // considera "ativa" a seção que ocupa a faixa central da viewport
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  )

  sections.forEach((section) => observer.observe(section))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setupObserver()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'bg-cream/80 backdrop-blur-lg shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="h-20 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img src="../public/Design sem nome.png" class="w-[200px] pt-1" alt="Padaria Alô Pará" />

      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm">
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          @click.prevent="scrollToSection(l.id)"
          :class="[
            'underline-grow transition-colors',
            activeSection === l.id ? 'text-orange font-medium' : 'text-ink/80 hover:text-ink',
          ]"
        >
          {{ l.label }}
        </a>
      </nav>

      <div class="hidden md:block">
        <a
          href="#cardapio"
          @click.prevent="scrollToSection('cardapio')"
          class="btn-shine bg-orange text-ink text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
        >
          Ver Cardápio
        </a>
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
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          @click.prevent="scrollToSection(l.id)"
          :class="activeSection === l.id ? 'text-orange font-medium' : 'text-ink/80'"
        >
          {{ l.label }}
        </a>
        <a
          href="#cardapio"
          @click.prevent="scrollToSection('cardapio')"
          class="bg-orange text-ink text-sm font-semibold px-5 py-2.5 rounded-full w-fit"
        >
          Ver Cardápio
        </a>
      </div>
    </transition>
  </header>
</template>