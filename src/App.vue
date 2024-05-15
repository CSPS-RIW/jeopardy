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

	let tableQuestions = document.querySelector('.get-content [data-table-name="questions"]')
	let qsTbody = tableQuestions.querySelector('tbody')
	let qsTr = Array.from(qsTbody.querySelectorAll('tr'))
	let tableCategories = document.querySelector('.get-content [data-table-name="categories"]')
	let catTbody = tableCategories.querySelector('tbody')
	let catTr = Array.from(catTbody.querySelectorAll('tr'))
	let questions = ref([{}])
	let gameData = ref({})

	/*
	{
		"categories": ["Personal Protective Equipment (PPE)", "Emergency Procedures", "Hazard Identification", "Safety Signs and Labels", "Workplace Ergonomics"],
		"questions": [
			{
				"id": 1,
				"categoryId": 0,
				"value": 200,
				"question": "What type of PPE is commonly used to protect against head injuries?",
				"options": ["Hard hat", "Safety glasses", "Ear plugs", "Gloves"],
				"answer": "Hard hat",
				"attempted": false,
				"feedback": {
					"correct": "Correct! Good job.",
					"incorrect": "That's incorrect. Head back to the game board when you're ready",
					"generic": "The thing about this is that..."
				}
			},
		]
	}
	*/
	let categories = []
	catTr.forEach((item, index) => {
		let category = item.querySelector('td').innerText
		categories.push(category)
	})
	gameData.value.categories = categories

	qsTr.forEach((item, index) => {
		let headers = item.children
		let id = index
		let categoryId = categories.includes(headers[0].innerText) && categories[categories.indexOf(headers[0].innerText)]
		let value = headers[1].innerText
		let question = headers[2].innerText
		let options;
		let answer = headers[4].innerText
		let correctFeedback = headers[5].innerText
		let incorrectFeedback = headers[6].innerText
		let genericFeedback = headers[7].innerText

		let obj = {}
		obj.id = id
		obj.categoryId = categoryId
		obj.value = value
		obj.question = question
		obj.options = options
		obj.answer = answer
		obj.feedback = {}
		obj.feedback.correct = correctFeedback
		obj.feedback.incorrect = incorrectFeedback
		obj.feedback.generic = genericFeedback

		questions.value = obj
	});
	gameData.value.questions = questions.value
	console.log(gameData.value);
	// console.log(questions);

	let savedProgress = localStorage.getItem("progress")

	if (savedProgress) {
		const useSavedProgress = JSON.parse(savedProgress)
		progressStore.gameData = useSavedProgress
	} else {
		progressStore.fetchGameData()
	}

	if (localStorage.getItem("score")) {
		scoreStore.loadScore()
	} else {
		scoreStore.score = 0
	}

})

</script>

<style></style>
