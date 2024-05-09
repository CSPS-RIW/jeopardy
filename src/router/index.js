import { createRouter, createWebHistory } from 'vue-router'
import GameBoard from '../views/GameBoard.vue'
import Question from '../components/Question.vue'

const routes = [
  {
    path: '/',
    name: 'GameBoard',
    component: GameBoard
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: Question
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router

