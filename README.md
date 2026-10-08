# Taiwan Mobile

Taiwan Mobile adalah storefront sederhana berbasis Vue 3 untuk menampilkan produk teknologi dan mengelola keranjang belanja.

## Fitur

- Menampilkan katalog 8 produk.
- Loading state saat katalog dimuat.
- Pencarian produk berdasarkan nama.
- Menambahkan produk ke keranjang.
- Menggabungkan produk yang sama dan menghitung total kuantitas.
- Menambah dan mengurangi kuantitas produk.
- Konfirmasi sebelum menghapus item.
- Konfirmasi sebelum checkout.
- Simulasi proses checkout.
- Notifikasi setelah produk ditambahkan atau checkout selesai.
- Cart drawer responsif dengan dukungan overlay dan tombol Escape.
- Layout responsif untuk desktop, tablet, dan mobile.

## Teknologi

- Vue 3.
- Vite.
- JavaScript.
- Vitest dan Vue Test Utils untuk smoke test.
- CSS biasa tanpa UI framework.

State keranjang dikelola oleh composable `src/composables/useCart.js` menggunakan `ref()` dan `computed()`. Untuk aplikasi satu halaman ini, Pinia atau Vuex belum diperlukan.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan oleh Vite di browser.

## Perintah Project

```bash
npm run dev       # Menjalankan development server
npm test          # Menjalankan test
npm run build     # Membuat production build
npm run preview   # Menjalankan hasil production build
```

## Struktur Utama

```text
src/
  App.vue                 # State halaman dan koordinasi antar komponen
  components/
    AppHeader.vue         # Brand, search, dan tombol keranjang
    CartSidebar.vue       # Daftar item, quantity control, dan checkout
    ProductCard.vue       # Tampilan satu produk
    ProductGrid.vue       # Daftar produk dan empty state
  composables/
    useCart.js            # State dan operasi keranjang
    useProducts.js        # Loading katalog produk
  data/
    products.js           # Data produk lokal
  styles.css              # Style global dan responsive layout
```

## Flow Singkat

1. `App.vue` memanggil `loadProducts()` saat component mounted.
2. `useProducts()` menampilkan loading selama simulasi pemuatan katalog.
3. Katalog ditampilkan melalui `ProductGrid` dan `ProductCard`.
4. Search keyword memfilter produk secara reactive dengan `computed()`.
5. Saat produk ditambahkan, `useCart()` memperbarui item dan total kuantitas.
6. Cart drawer menampilkan item, harga, dan tombol quantity.
7. Checkout atau penghapusan item meminta konfirmasi melalui native HTML `<dialog>`.
8. Checkout yang dikonfirmasi menjalankan simulasi dua detik, lalu mengosongkan keranjang.

## Catatan Pengembangan

- Data produk saat ini bersifat lokal di `src/data/products.js`.
- Checkout masih simulasi dan belum terhubung ke backend atau payment gateway.
- Gambar produk menggunakan URL eksternal.
- Persistence keranjang, autentikasi, routing, dan state management global belum diperlukan untuk scope saat ini.
