import { ref } from "vue";
import { products as catalog } from "../data/products";

export function useProducts() {
	const products = ref([]);
	const isLoading = ref(false);
	const errorMessage = ref("");
	let loadTimer = null;

	const loadProducts = () => {
		if (loadTimer !== null) window.clearTimeout(loadTimer);
		isLoading.value = true;
		errorMessage.value = "";
		return new Promise((resolve) => {
			loadTimer = window.setTimeout(() => {
				loadTimer = null;
				try {
					products.value = catalog;
					resolve(products.value);
				} catch {
					products.value = [];
					errorMessage.value = "商品載入失敗，請稍後再試。";
					resolve(products.value);
				} finally {
					isLoading.value = false;
				}
			}, 850);
		});
	};

	const cancelLoad = () => {
		if (loadTimer !== null) {
			window.clearTimeout(loadTimer);
			loadTimer = null;
		}
		isLoading.value = false;
	};

	return { products, isLoading, errorMessage, loadProducts, cancelLoad };
}
