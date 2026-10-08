import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import App from "./App.vue";

const mountApp = () =>
	mount(App, {
		global: {
			plugins: [createPinia()],
		},
	});

describe("App", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("menampilkan loading lalu daftar produk", async () => {
		const wrapper = mountApp();
		await nextTick();

		expect(wrapper.find(".site-header").exists()).toBe(true);
		expect(wrapper.find('input[type="search"]').exists()).toBe(true);
		expect(wrapper.find('button[aria-label="開啟購物車"]').exists()).toBe(true);
		expect(wrapper.find(".loading-state").exists()).toBe(true);
		expect(wrapper.text()).toContain("正在準備商品...");

		await vi.advanceTimersByTimeAsync(850);
		await wrapper.vm.$nextTick();

		expect(wrapper.find(".loading-state").exists()).toBe(false);
		expect(wrapper.findAll(".product-card").length).toBeGreaterThan(0);
	});

	it("menambahkan produk ke keranjang", async () => {
		const wrapper = mountApp();

		await vi.advanceTimersByTimeAsync(850);
		await wrapper.vm.$nextTick();
		await wrapper.find(".add-button").trigger("click");

		expect(wrapper.find(".cart-badge").text()).toBe("1");
		expect(wrapper.find('[role="status"]').exists()).toBe(true);
	});

	it("menjaga state drawer dan memfilter produk", async () => {
		const wrapper = mountApp();

		await vi.advanceTimersByTimeAsync(850);
		await wrapper.vm.$nextTick();
		const cartButton = wrapper.find('button[aria-label="開啟購物車"]');

		expect(cartButton.attributes("aria-expanded")).toBe("false");
		await wrapper.find('input[type="search"]').setValue("耳機");
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll(".product-card")).toHaveLength(2);

		await cartButton.trigger("click");
		expect(cartButton.attributes("aria-expanded")).toBe("true");
		expect(wrapper.find("#cart-drawer").attributes("inert")).toBeUndefined();
	});
});
