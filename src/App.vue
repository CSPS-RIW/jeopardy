<template>
	<header>
		<h1>{{ t("title") }}</h1>
	</header>
	<main>
		<div id="app">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useProgressStore } from './stores/progressStore';
import { useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
import { useScoreStore } from '@/stores/scoreStore.js'
import { usePlayerStore } from './stores/playerStore';
const router = useRouter()

const { t, locale } = useI18n();

// Set html lang based on current locale
let lang = document.querySelector("html");
let currLang = lang?.getAttribute("lang");


onBeforeMount(() => {
	const progressStore = useProgressStore()

	const scoreStore = useScoreStore()

	const playerStore = usePlayerStore()

	let tables = document.querySelector('.get-content')
	
	// before the app mounts, we check if there is progress in localstorage. If there is, we load that progress, otherwise we reset to default.

	let savedProgress = localStorage.getItem("progress")

	if (savedProgress) {
		const useSavedProgress = JSON.parse(savedProgress)
		progressStore.gameData = useSavedProgress
		tables.remove()
	} else {
		progressStore.getGameData()
		tables.remove()
	}
	// getting saved score from localstorage, otherwise set score to 0
	if (localStorage.getItem("score")) {
		scoreStore.loadScore()
	} else {
		scoreStore.score = 0
	}

	// setting the language
	if (currLang) {
    locale.value = currLang
    lang?.setAttribute('lang', locale.value)
  }

})

</script>

<style scoped>

</style>
