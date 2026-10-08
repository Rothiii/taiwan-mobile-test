<script setup>
import { ref } from "vue";

const message = ref("Vue.js sudah siap digunakan.");
</script>

<template>
	<main class="app-shell">
		<section class="welcome-panel">
			<p class="eyebrow">Taiwan Mobile</p>
			<h1>商品展示頁面</h1>
			<p>{{ message }}</p>
		</section>
	</main>
</template>
