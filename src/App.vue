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
/* Add your global styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

:root {
	--school-purple: #3f2a56;
	--school-purple-drk: #18032f;
	--slate-blue: #4e5b73;
	--true-blue: #1c578a;
	--true-light: #226aa8;
	--system-gray: #f1f5fb;
	--body-grey: #333;
	--white-heat: #ffffff;
	--horizontal-rule: #ddd;
	--off-white: #f6f7f8;
	--hyperlink-blue: #2b4380;
	--hyperlink-hover: #0535d2;
	--hyperlink-visited: #7834bc;
	--hyperlink-menu: #337ab7;
	--disabled: #6c6c6c;
	--input-gradient: linear-gradient(to bottom, #e6e5e5, #fff 50%);
	--input-box-shadow: 0px 0px 8px 4px #3b99fc, 2px 5px 16px 0px #0b325e,
		0px 0px 21px 5px rgba(125, 195, 255, 0.3);
	--border-feedback-colour: var(--white-heat);
	--border-feedback-bg-colour: #369;
	--feedback-bg-colour: var(--white-heat);
	--feedback-colour: #333;
}
</style>
