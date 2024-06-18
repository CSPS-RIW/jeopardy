import { createRouter, createWebHistory } from 'vue-router'
import GameBoard from '../views/GameBoard.vue'
import Question from '../components/Question.vue'
import Configuration from '../views/Configuration.vue'

const routes = [
  {
    path: '/',
    name: 'Configuration',
    component: Configuration
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: Question
  },
  {
    path: '/gameboard',
    name: 'Gameboard',
    component: GameBoard
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router

