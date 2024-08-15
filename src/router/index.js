import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/',
    name: 'Configuration',
    component: () => import('@/views/Configuration.vue')
  },
  {
    path: '/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/question/:id',
    name: 'Question',
    component: () => import('@/components/Question.vue')
  },
  {
    path: '/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/gameboard',
    name: 'Gameboard',
    component: () => import('@/views/GameBoard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router

