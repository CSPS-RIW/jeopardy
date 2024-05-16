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
import { onBeforeMount, ref } from 'vue';
import { useProgressStore } from './stores/progressStore';
import { useRouter } from 'vue-router'
import { useScoreStore } from '@/stores/scoreStore.js'
const router = useRouter()

const scoreStore = useScoreStore()

onBeforeMount(() => {
	const progressStore = useProgressStore()

	let tables = document.querySelector('.get-content')

	let savedProgress = localStorage.getItem("progress")

	if (savedProgress) {
		const useSavedProgress = JSON.parse(savedProgress)
		progressStore.gameData = useSavedProgress
		tables.remove()
	} else {
		// progressStore.fetchGameData()
		progressStore.getGameData()
		tables.remove()
	}

	if (localStorage.getItem("score")) {
		scoreStore.loadScore()
	} else {
		scoreStore.score = 0
	}

})

</script>

<style></style>
