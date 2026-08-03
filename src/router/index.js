import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
    meta: { title: 'Padaria Alô Pará — Feito Hoje' },
  },
  {
    path: '/cardapio',
    name: 'cardapio',
    component: () => import('../pages/Cardapio.vue'),
    meta: { title: 'Cardápio — Padaria Alô Pará' },
  },
  {
    path: '/self-service',
    name: 'self-service',
    component: () => import('../pages/SelfService.vue'),
    meta: { title: 'Self-Service — Padaria Alô Pará' },
  },
  {
    path: '/galeria',
    name: 'galeria',
    component: () => import('../pages/Galeria.vue'),
    meta: { title: 'Galeria — Padaria Alô Pará' },
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../pages/Sobre.vue'),
    meta: { title: 'Sobre — Padaria Alô Pará' },
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('../pages/Contato.vue'),
    meta: { title: 'Contato — Padaria Alô Pará' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFound.vue'),
    meta: { title: 'Página não encontrada — Padaria Alô Pará' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Padaria Alô Pará'
})

export default router
