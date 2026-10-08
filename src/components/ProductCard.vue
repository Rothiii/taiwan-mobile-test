<script setup>
import { ref } from "vue";

defineProps({ product: { type: Object, required: true } });
const emit = defineEmits(["add-to-cart"]);
const imageFailed = ref(false);
</script>

<template>
	<article class="product-card">
		<div class="product-image-wrap">
			<div v-if="imageFailed" class="image-fallback" aria-hidden="true">
				圖片暫時無法載入
			</div>
			<img
				v-else
				:src="product.image"
				:alt="product.name"
				@error="imageFailed = true"
			/><span class="product-category">{{ product.category }}</span>
		</div>
		<div class="product-info">
			<h3>{{ product.name }}</h3>
			<div class="product-footer">
				<strong
					>{{ product.price.toLocaleString("zh-TW") }}
					<small>NT$</small></strong
				><button
					type="button"
					class="add-button"
					:aria-label="`加入${product.name}至購物車`"
					@click="emit('add-to-cart', product)"
				>
					<span aria-hidden="true">+</span> 加入購物車
				</button>
			</div>
		</div>
	</article>
</template>
