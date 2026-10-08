<script setup>
defineProps({ product: { type: Object, required: true } });
const emit = defineEmits(["add-to-cart"]);
</script>

<template>
	<article class="product-card">
		<div class="product-image-wrap">
			<img
				:src="product.image"
				:alt="product.name"
				@error="$event.target.style.display = 'none'"
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
