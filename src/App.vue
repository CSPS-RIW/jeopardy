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



onBeforeMount(()=> {
	// defining our stores & progress from localStorage
	const progressStore = useProgressStore()
	const scoreStore = useScoreStore()
	let savedProgress = localStorage.getItem("progress")
	// if there is saved progress, we assign it to gameData in our store. If not, fetch the original gameData
	if(savedProgress) {
		const useSavedProgress = JSON.parse(savedProgress)
		progressStore.gameData = useSavedProgress
	} else {
		progressStore.fetchGameData()
	}
	// getting saved score from localstorage, otherwise set score to 0
	if(localStorage.getItem("score")) {
		scoreStore.loadScore()
	} else {
    scoreStore.score = 0
  }
	
})

</script>

<style>

</style>
