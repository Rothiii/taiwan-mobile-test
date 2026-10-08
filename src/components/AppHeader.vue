<script setup>
defineProps({
	cartItemCount: { type: Number, required: true },
	cartOpen: { type: Boolean, default: false },
	searchKeyword: { type: String, required: true },
});
const emit = defineEmits(["update:searchKeyword", "open-cart"]);
</script>

<template>
	<header class="site-header">
		<div class="brand-lockup">
			<span class="brand-mark">台</span>
			<div>
				<p class="brand-name">Taiwan Mobile</p>
				<p class="brand-caption">讓科技更靠近生活</p>
			</div>
		</div>
		<div class="header-actions">
			<label class="search-field"
				><span class="sr-only">搜尋商品</span
				><svg aria-hidden="true" viewBox="0 0 24 24">
					<circle cx="11" cy="11" r="6.5" />
					<path d="m16 16 4.5 4.5" /></svg
				><input
					:value="searchKeyword"
					type="search"
					placeholder="搜尋商品"
					@input="emit('update:searchKeyword', $event.target.value)"
			/></label>
			<button
				class="cart-button"
				type="button"
				aria-label="開啟購物車"
				aria-controls="cart-drawer"
				:aria-expanded="cartOpen"
				@click="emit('open-cart')"
			>
				<svg aria-hidden="true" viewBox="0 0 24 24">
					<path
						d="M3.5 5h2l1.8 10.1a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 1.9-1.4L21 8H7"
					/>
					<circle cx="10" cy="20" r="1" />
					<circle cx="18" cy="20" r="1" /></svg
				><span>購物車</span
				><b v-if="cartItemCount" class="cart-badge">{{ cartItemCount }}</b>
			</button>
		</div>
	</header>
</template>
