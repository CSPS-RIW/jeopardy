import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    //path: '/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/',
    path: '/',
    name: 'Configuration',
    component: () => import('@/views/Configuration.vue')
  },
  {
    //path: '/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/question/:id',
    path: '/question/:id',
    name: 'Question',
    component: () => import('@/components/Question.vue')
  },
  {
    //path: '/content/enforced/12481-SB-Noam_Stulberg/_projects/jeopardy/gameboard',
    path: '/gameboard',
    name: 'Gameboard',
    component: () => import('@/views/GameBoard.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router