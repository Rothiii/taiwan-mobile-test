import { ref } from "vue";
import { products as catalog } from "../data/products";

export function useProducts() {
	const products = ref([]);
	const isLoading = ref(false);
	const errorMessage = ref("");

	const loadProducts = () => {
		isLoading.value = true;
		errorMessage.value = "";
		return new Promise((resolve) => {
			window.setTimeout(() => {
				products.value = catalog;
				isLoading.value = false;
				resolve(products.value);
			}, 850);
		});
	};

	return { products, isLoading, errorMessage, loadProducts };
}
