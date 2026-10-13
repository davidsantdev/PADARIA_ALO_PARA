<script setup>
import { ref } from 'vue'
import AnnouncementBar from './components/AnnouncementBar.vue'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

const main = ref(null)

// Link "pular para o conteúdo": foca o <main> sem mexer na URL (nada de #hash).
function skipToContent() {
  main.value?.focus()
  main.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <a href="#conteudo" class="skip-link" @click.prevent="skipToContent">Pular para o conteúdo</a>

  <AnnouncementBar />
  <AppNav />

  <main id="conteudo" ref="main" tabindex="-1" class="outline-none">
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>

  <AppFooter />
  <WhatsAppButton />
</template>
