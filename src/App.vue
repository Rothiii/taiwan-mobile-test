<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import AppHeader from "./components/AppHeader.vue";
import CartSidebar from "./components/CartSidebar.vue";
import ProductGrid from "./components/ProductGrid.vue";
import { useProducts } from "./composables/useProducts";
import { useCartStore } from "./stores/cart";

const {
	products,
	isLoading,
	errorMessage: productsError,
	loadProducts,
	cancelLoad,
} = useProducts();
const cartStore = useCartStore();
const { items, cartItemCount, cartTotal } = storeToRefs(cartStore);
const { addItem, updateQuantity, removeItem, clearCart } = cartStore;
const searchKeyword = ref("");
const isCartOpen = ref(false);
const isCheckingOut = ref(false);
const checkoutMessage = ref("");
const checkoutError = ref("");
const confirmationDialog = ref(null);
const confirmation = ref({ type: "", item: null });
const toastTimer = ref(null);
const checkoutTimer = ref(null);

const filteredProducts = computed(() => {
	const keyword = searchKeyword.value.trim().toLocaleLowerCase();
	if (!keyword) return products.value;
	return products.value.filter((product) =>
		product.name.toLocaleLowerCase().includes(keyword),
	);
});

const showCart = () => {
	checkoutError.value = "";
	isCartOpen.value = true;
};

const handleAddToCart = (product) => {
	addItem(product);
	checkoutMessage.value = `${product.name} 已加入購物車`;
	window.clearTimeout(toastTimer.value);
	toastTimer.value = window.setTimeout(() => {
		checkoutMessage.value = "";
	}, 2600);
};

const openConfirmation = (type, item = null) => {
	confirmation.value = { type, item };
	confirmationDialog.value?.showModal();
};

const closeConfirmation = () => {
	confirmationDialog.value?.close();
	confirmation.value = { type: "", item: null };
};

const confirmAction = () => {
	if (confirmation.value.type === "remove" && confirmation.value.item) {
		removeItem(confirmation.value.item.id);
		closeConfirmation();
		return;
	}

	closeConfirmation();
	startCheckout();
};

const startCheckout = () => {
	if (!items.value.length) {
		checkoutError.value = "購物車內沒有商品，請先選擇商品。";
		return;
	}

	isCheckingOut.value = true;
	checkoutError.value = "";
	checkoutTimer.value = window.setTimeout(() => {
		checkoutTimer.value = null;
		clearCart();
		isCheckingOut.value = false;
		isCartOpen.value = false;
		checkoutMessage.value = "訂單已送出，謝謝你的選購！";
		window.clearTimeout(toastTimer.value);
		toastTimer.value = window.setTimeout(() => {
			checkoutMessage.value = "";
		}, 4000);
	}, 2000);
};

const checkout = () => {
	if (!items.value.length) {
		checkoutError.value = "購物車內沒有商品，請先選擇商品。";
		return;
	}
	openConfirmation("checkout");
};

const closeOnEscape = (event) => {
	if (event.key === "Escape") isCartOpen.value = false;
};

onMounted(() => {
	loadProducts();
	document.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
	document.removeEventListener("keydown", closeOnEscape);
	window.clearTimeout(toastTimer.value);
	window.clearTimeout(checkoutTimer.value);
	cancelLoad();
});
</script>

<template>
	<div class="app-shell">
		<AppHeader
			:cart-item-count="cartItemCount"
			:cart-open="isCartOpen"
			:search-keyword="searchKeyword"
			@update:search-keyword="searchKeyword = $event"
			@open-cart="showCart"
		/>
		<main class="storefront">
			<section class="catalog-intro">
				<div>
					<p class="section-kicker">CURATED FOR YOUR EVERYDAY</p>
					<h1>把喜歡的科技，<br /><em>帶進日常。</em></h1>
				</div>
				<p class="intro-copy">
					精選實用配件與智慧裝置，<br />讓每一次使用都更簡單。
				</p>
			</section>
			<section class="catalog-toolbar">
				<div>
					<h2>熱門商品</h2>
					<span v-if="!isLoading">{{ filteredProducts.length }} 件商品</span>
				</div>
				<span class="catalog-note">免運門檻 NT$ 1,000</span>
			</section>
			<div v-if="isLoading" class="loading-state" aria-live="polite">
				<span class="spinner" />正在準備商品...
			</div>
			<div v-else-if="productsError" class="empty-results error-state">
				<span class="empty-icon">!</span>
				<h3>商品載入失敗</h3>
				<p>{{ productsError }}</p>
				<button class="continue-button" type="button" @click="loadProducts">
					再試一次
				</button>
			</div>
			<ProductGrid
				v-else
				:products="filteredProducts"
				@add-to-cart="handleAddToCart"
			/>
		</main>
		<Transition name="toast"
			><p v-if="checkoutMessage" class="toast-message" role="status">
				{{ checkoutMessage }} <span>✓</span>
			</p></Transition
		>
		<CartSidebar
			:open="isCartOpen"
			:items="items"
			:total-items="cartItemCount"
			:total-price="cartTotal"
			:is-checking-out="isCheckingOut"
			:error-message="checkoutError"
			@close="isCartOpen = false"
			@update-quantity="updateQuantity"
			@remove-item="openConfirmation('remove', $event)"
			@checkout="checkout"
		/>
		<dialog
			ref="confirmationDialog"
			class="confirmation-dialog"
			@cancel="closeConfirmation"
		>
			<h2>{{ confirmation.type === "checkout" ? "確認結帳" : "移除商品" }}</h2>
			<p>
				{{
					confirmation.type === "checkout"
						? "確定要送出這筆訂單嗎？"
						: `確定要移除「${confirmation.item?.name}」嗎？`
				}}
			</p>
			<div class="confirmation-actions">
				<button
					type="button"
					class="continue-button"
					@click="closeConfirmation"
				>
					取消
				</button>
				<button type="button" class="checkout-button" @click="confirmAction">
					確定
				</button>
			</div>
		</dialog>
	</div>
</template>
