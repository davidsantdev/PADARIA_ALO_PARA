<script setup>
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
</script>

<template>
  <AppNav />

  <main>
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>

  <AppFooter />
  <WhatsAppButton />
</template>

<style scoped>
@media (max-width: 767px) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
</style>
