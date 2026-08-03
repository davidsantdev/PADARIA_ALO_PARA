<script setup>
import { contact } from '../data/contact'

const year = new Date().getFullYear()

const links = [
  { label: 'Início', to: '/' },
  { label: 'Cardápio', to: '/cardapio' },
  { label: 'Self-Service', to: '/self-service' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]
</script>

<template>
  <footer class="bg-plum text-cream/80 pt-16 pb-8 px-6">
    <div class="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
      <div class="md:col-span-2">
        <p class="font-display text-2xl text-cream font-semibold">
          Alô <span class="italic text-orange">Pará</span>
        </p>
        <p class="mt-3 text-sm leading-relaxed max-w-xs text-cream/60">
          Pães, salgados e bolos feitos do zero, todos os dias. Ingredientes honestos e o carinho
          de sempre.
        </p>
      </div>

      <div>
        <p class="text-xs tracking-widest uppercase text-cream/40 mb-4">Navegação</p>
        <ul class="space-y-2 text-sm">
          <li v-for="l in links" :key="l.to">
            <router-link :to="l.to" class="hover:text-orange transition-colors">
              {{ l.label }}
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-xs tracking-widest uppercase text-cream/40 mb-4">Horário</p>
        <ul class="space-y-2 text-sm">
          <li v-for="h in contact.hours" :key="h.day" class="flex justify-between gap-4">
            <span class="text-cream/60">{{ h.day }}</span>
            <span>{{ h.time }}</span>
          </li>
        </ul>
        <p class="mt-4 text-sm text-cream/60">{{ contact.address }}</p>
      </div>
    </div>

    <div
      class="max-w-6xl mx-auto mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40"
    >
      <p>© {{ year }} Alô Pará. Feito com farinha, tempo e carinho.</p>
      <p>Todos os direitos reservados.</p>
    </div>
  </footer>
</template>
