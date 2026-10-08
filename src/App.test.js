import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import App from "./App.vue";

describe("App", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("menampilkan loading lalu daftar produk", async () => {
		const wrapper = mount(App);
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
		const wrapper = mount(App);

		await vi.advanceTimersByTimeAsync(850);
		await wrapper.vm.$nextTick();
		await wrapper.find(".add-button").trigger("click");

		expect(wrapper.find(".cart-badge").text()).toBe("1");
		expect(wrapper.find('[role="status"]').exists()).toBe(true);
	});
});
