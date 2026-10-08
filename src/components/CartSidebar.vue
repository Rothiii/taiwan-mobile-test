<script setup>
defineProps({
	open: Boolean,
	items: { type: Array, required: true },
	totalItems: { type: Number, required: true },
	totalPrice: { type: Number, required: true },
	isCheckingOut: Boolean,
	errorMessage: { type: String, default: "" },
});
const emit = defineEmits([
	"close",
	"update-quantity",
	"remove-item",
	"checkout",
]);
</script>

<template>
	<Transition name="fade"
		><div
			v-if="open"
			class="drawer-overlay"
			aria-hidden="true"
			@click="emit('close')"
	/></Transition>
	<aside
		id="cart-drawer"
		class="cart-drawer"
		:class="{ 'is-open': open }"
		aria-label="購物車"
		:aria-hidden="!open"
		:inert="open ? undefined : ''"
	>
		<div class="drawer-header">
			<div>
				<p class="section-kicker">YOUR SELECTION</p>
				<h2>
					購物車 <span>{{ totalItems }}</span>
				</h2>
			</div>
			<button
				class="icon-button"
				type="button"
				aria-label="關閉購物車"
				@click="emit('close')"
			>
				×
			</button>
		</div>
		<div v-if="items.length" class="drawer-content">
			<ul class="cart-list">
				<li v-for="item in items" :key="item.id" class="cart-item">
					<img
						:src="item.image"
						:alt="item.name"
						@error="$event.target.style.display = 'none'"
					/>
					<div class="cart-item-details">
						<h3>{{ item.name }}</h3>
						<p>{{ item.price.toLocaleString("zh-TW") }} NT$</p>
						<div class="quantity-controls">
							<button
								type="button"
								:aria-label="`減少${item.name}數量`"
								@click="
									item.quantity === 1
										? emit('remove-item', item)
										: emit('update-quantity', item.id, -1)
								"
							>
								−</button
							><span>{{ item.quantity }}</span
							><button
								type="button"
								:aria-label="`增加${item.name}數量`"
								@click="emit('update-quantity', item.id, 1)"
							>
								+
							</button>
						</div>
					</div>
				</li>
			</ul>
			<div class="drawer-summary">
				<div>
					<span>商品小計</span
					><strong>{{ totalPrice.toLocaleString("zh-TW") }} NT$</strong>
				</div>
				<p>配送費用將於結帳時確認</p>
				<button
					class="checkout-button"
					type="button"
					:disabled="isCheckingOut"
					@click="emit('checkout')"
				>
					{{ isCheckingOut ? "處理中..." : "前往結帳" }} <span>→</span>
				</button>
				<p v-if="errorMessage" class="status-message error" role="alert">
					{{ errorMessage }}
				</p>
			</div>
		</div>
		<div v-else class="drawer-empty">
			<span class="empty-bag">○</span>
			<h3>購物車目前是空的</h3>
			<p>把喜歡的商品放進來，稍後再一起結帳。</p>
			<button type="button" class="continue-button" @click="emit('close')">
				繼續逛逛
			</button>
		</div>
	</aside>
</template>
