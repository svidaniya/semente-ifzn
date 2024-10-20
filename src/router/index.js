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
import controle    from '@/views/controle.vue'
import cadastro_suap from '@/views/cadastro_suap.vue'
import storytelling from '@/views/storytelling.vue'
import capitulo from '@/views/capitulo.vue'
import evento_codigo_mostrar from '@/views/evento_codigo_mostrar.vue'
import evento_codigo from '@/views/evento_codigo.vue'
import evento from '@/views/evento.vue'
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
    path: '/gamificacao',
    name: 'Gamificação',
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
  },
  {
    path: '/controle',
    name: 'controle',
    component: controle
  },
  {
    path: '/cadastro/suap',
    name: 'cadastro_suap',
    component: cadastro_suap
  },
  {
    path: '/storytelling',
    name: 'storytelling',
    component: storytelling
  },
  {
    path: '/storytelling/capitulo/:numero',
    name: 'capitulo',
    component: capitulo,
    props: true
  },
  {
    path: '/evento/mostrar/:codigo',
    name: 'evento_codigo_mostrar',
    component: evento_codigo_mostrar,
    props: true
  },
  {
    path: '/evento',
    name: 'evento_codigo',
    component: evento_codigo
  },
  {
    path: '/evento/:codigo',
    name: 'evento',
    component: evento,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
