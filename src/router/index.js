import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteMeta } from '../utils/seo'

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
    meta: {
      title: 'Cardápio — Padaria Alô Pará',
      description:
        'Cardápio completo da Padaria Alô Pará: dezenas de opções entre pães, salgados, bolos, tortas e doces feitos frescos todos os dias.',
    },
  },
  {
    path: '/self-service',
    name: 'self-service',
    component: () => import('../pages/SelfService.vue'),
    meta: {
      title: 'Self-Service — Padaria Alô Pará',
      description:
        'Self-service de salgados e bolos da Padaria Alô Pará: monte o seu prato com os itens do dia e pague por peso.',
    },
  },
  {
    path: '/galeria',
    name: 'galeria',
    component: () => import('../pages/Galeria.vue'),
    meta: {
      title: 'Galeria — Padaria Alô Pará',
      description:
        'Veja fotos dos bolos, biscoitos e doces da Padaria Alô Pará e um gostinho do nosso cardápio.',
    },
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../pages/Sobre.vue'),
    meta: {
      title: 'Sobre — Padaria Alô Pará',
      description:
        'Conheça a filosofia da Padaria Alô Pará: fermentação longa, ingredientes honestos e pequenos lotes, do amanhecer até a noite.',
    },
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('../pages/Contato.vue'),
    meta: {
      title: 'Contato — Padaria Alô Pará',
      description:
        'Fale com a Padaria Alô Pará: horário de funcionamento, e-mail e contato para encomendas, dúvidas e sugestões.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFound.vue'),
    meta: { title: 'Página não encontrada — Padaria Alô Pará', noindex: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // mudar só a query (filtros do cardápio) não deve jogar a página para o topo
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  applyRouteMeta(to)
})

export default router
