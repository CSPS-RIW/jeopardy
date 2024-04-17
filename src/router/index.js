import { createRouter, createWebHistory } from 'vue-router'
import GameBoard from '../components/GameBoard.vue'
import Question from '../components/Question.vue'
import ScoreDisplay from '../components/ScoreDisplay.vue'

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
  },
  {
    path: '/score',
    name: 'ScoreDisplay',
    component: ScoreDisplay
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router

