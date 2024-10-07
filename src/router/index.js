// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import regulamento from '../views/regulamento.vue'
import programacao from '../views/programacao.vue'
import pontuacao from '../views/pontuacao.vue'
import gameficacao from '../views/gameficacao.vue'
import cadastro from '@/views/cadastro.vue'
import login from '@/views/login.vue'
import desafio    from '@/views/desafio.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/regulamento',
    name: 'Regulamento',
    component: regulamento
  },
  {
    path: '/programacao',
    name: 'Programação',
    component: programacao
  },
  {
    path: '/pontuacao',
    name: 'Pontuacao',
    component: pontuacao
  },
  {
    path: '/gameficacao',
    name: 'Gameficação',
    component: gameficacao
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: cadastro},
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/desafio/:numero',
    name: 'desafio',
    component: desafio,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
