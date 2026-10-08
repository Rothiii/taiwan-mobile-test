<script setup>
import ProductCard from "./ProductCard.vue";
defineProps({ products: { type: Array, required: true } });
const emit = defineEmits(["add-to-cart"]);
</script>

<template>
	<div v-if="products.length" class="product-grid">
		<ProductCard
			v-for="product in products"
			:key="product.id"
			:product="product"
			@add-to-cart="emit('add-to-cart', $event)"
		/>
	</div>
	<div v-else class="empty-results">
		<span class="empty-icon">⌕</span>
		<h3>找不到符合的商品</h3>
		<p>換個關鍵字試試看，或瀏覽全部商品。</p>
	</div>
</template>
