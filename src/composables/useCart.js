import { computed, ref } from "vue";

export function useCart() {
	const items = ref([]);
	const cartItemCount = computed(() =>
		items.value.reduce((sum, item) => sum + item.quantity, 0),
	);
	const cartTotal = computed(() =>
		items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
	);

	const addItem = (product) => {
		const existingItem = items.value.find((item) => item.id === product.id);
		if (existingItem) {
			existingItem.quantity += 1;
			return;
		}
		items.value.push({ ...product, quantity: 1 });
	};

	const updateQuantity = (productId, change) => {
		items.value = items.value.map((item) => {
			if (item.id !== productId) return item;
			return { ...item, quantity: Math.max(1, item.quantity + change) };
		});
	};

	const removeItem = (productId) => {
		items.value = items.value.filter((item) => item.id !== productId);
	};

	const clearCart = () => {
		items.value = [];
	};

	return {
		items,
		cartItemCount,
		cartTotal,
		addItem,
		updateQuantity,
		removeItem,
		clearCart,
	};
}
