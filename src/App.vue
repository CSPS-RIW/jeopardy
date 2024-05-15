<template>
	<header>
		<h1>Jeopardy Game</h1>
	</header>
  <main>
	<div id="app">
	  <router-view></router-view>
	</div>
  </main>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useProgressStore } from './stores/progressStore';
import { useRouter } from 'vue-router'
import { useScoreStore } from '@/stores/scoreStore.js'
const router = useRouter()

const scoreStore = useScoreStore()

onBeforeMount(()=> {
	const progressStore = useProgressStore()

	let savedProgress = localStorage.getItem("progress")
	
	if(savedProgress) {
		const useSavedProgress = JSON.parse(savedProgress)
		progressStore.gameData = useSavedProgress
	} else {
		progressStore.fetchGameData()
	}

	if(localStorage.getItem("score")) {
		scoreStore.loadScore()
	} else {
    scoreStore.score = 0
  }
	
})

</script>

<style>

</style>
