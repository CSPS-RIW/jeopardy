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
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style>

</style>
