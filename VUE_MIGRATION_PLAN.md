# Rencana Migrasi Halaman Toko ke Vue.js

## 1. Tujuan

Mengonversi `index.html` menjadi aplikasi Vue.js yang mempertahankan fungsi toko saat ini, sekaligus memperbaiki struktur kode, pengelolaan state, responsivitas, performa rendering, dan penanganan error.

## 2. Scope Fitur

Fitur yang harus tetap tersedia:

- Menampilkan daftar 8 produk.
- Menampilkan status loading saat produk dimuat.
- Mencari produk berdasarkan nama.
- Membuka dan menutup sidebar keranjang.
- Menambahkan produk ke keranjang.
- Menambah atau mengurangi jumlah produk.
- Menghapus produk dari keranjang ketika jumlah menjadi nol.
- Menampilkan jumlah seluruh item di badge keranjang.
- Menghitung total harga secara otomatis.
- Menjalankan proses checkout simulasi.
- Mengosongkan keranjang setelah checkout berhasil.
- Menutup keranjang saat pengguna mengklik area di luar sidebar.
- Mendukung tampilan desktop dan mobile.

## 3. Stack yang Disarankan

- Vue 3.
- Vite.
- Composition API dengan `<script setup>`.
- JavaScript terlebih dahulu agar migrasi tetap sederhana.
- CSS modular per komponen atau satu stylesheet global yang terorganisasi.
- Tidak perlu state management eksternal pada tahap awal karena state hanya digunakan oleh satu halaman.

## 4. Struktur File Target

```text
index.html
package.json
src/
  main.js
  App.vue
  data/
    products.js
  components/
    AppHeader.vue
    ProductGrid.vue
    ProductCard.vue
    CartSidebar.vue
    CartItem.vue
    LoadingState.vue
    ErrorState.vue
  composables/
    useCart.js
    useProducts.js
  assets/
    images/
  styles/
    global.css
```

Catatan: jika ingin migrasi paling kecil, komponen dapat dimulai dari `App.vue`, lalu dipecah setelah fungsi utama tervalidasi.

## 5. Pemetaan HTML Lama ke Vue

| Bagian lama | Implementasi Vue |
| --- | --- |
| `.container` | Layout utama di `App.vue` |
| `.header` dan cart icon | `AppHeader.vue` |
| `.products-grid` | `ProductGrid.vue` dengan `v-for` |
| `.product-card` | `ProductCard.vue` |
| `.loading` | `LoadingState.vue` dengan `v-if` |
| Cart sidebar | `CartSidebar.vue` |
| Item keranjang | `CartItem.vue` dengan `v-for` |
| `products` | `ref()` atau state dari `useProducts()` |
| `cart` | state terpusat dari `useCart()` |
| `renderProducts()` | rendering deklaratif Vue |
| `updateCartDisplay()` | `computed()` dan binding template |
| `toggleCart()` | event handler `@click` |
| `addToCart()` | method composable `addItem()` |
| `updateQuantity()` | method composable `updateQuantity()` |
| `checkout()` | method composable atau handler `App.vue` |
| `window.load` | `onMounted()` |
| event click global | `onMounted()` dan `onBeforeUnmount()` |

## 6. Desain State

State utama di `App.vue` atau composable:

```js
const products = ref([])
const cart = ref([])
const searchKeyword = ref('')
const isCartOpen = ref(false)
const isLoading = ref(false)
const isCheckingOut = ref(false)
const errorMessage = ref('')
```

Computed yang diperlukan:

- `filteredProducts`: produk yang cocok dengan kata kunci pencarian.
- `cartItemCount`: total kuantitas semua item.
- `cartTotal`: total harga seluruh item.
- `isCartEmpty`: status keranjang kosong.

Data produk tetap menggunakan bentuk:

```js
{
  id: 1,
  name: '無線藍牙耳機',
  price: 2999,
  image: 'earphones.jpg'
}
```

## 7. Tahapan Implementasi

### Tahap 1: Membuat fondasi proyek

1. Inisialisasi proyek Vue 3 dengan Vite.
2. Memindahkan metadata dasar halaman ke `index.html`.
3. Membuat `src/main.js` dan `src/App.vue`.
4. Memindahkan reset CSS dan variabel visual ke `global.css`.
5. Memastikan aplikasi dapat dijalankan dengan `npm run dev`.

### Tahap 2: Memindahkan data dan katalog

1. Membuat `src/data/products.js` untuk data produk lokal.
2. Membuat `useProducts()` untuk proses loading simulasi.
3. Menambahkan `isLoading` dan `errorMessage`.
4. Menggunakan `onMounted()` untuk memuat data.
5. Mengganti pembuatan DOM manual dengan `v-for`.
6. Menambahkan `:key="product.id"` pada daftar produk.
7. Menambahkan fallback gambar jika asset gambar tidak tersedia.

### Tahap 3: Membuat komponen produk

1. Membuat `ProductGrid.vue` sebagai wrapper grid.
2. Membuat `ProductCard.vue` untuk satu produk.
3. Menggunakan props untuk data produk.
4. Menggunakan event emit `add-to-cart` untuk komunikasi ke parent.
5. Menambahkan tampilan empty state ketika hasil pencarian tidak ditemukan.

### Tahap 4: Memindahkan logika keranjang

1. Membuat `useCart.js`.
2. Mengimplementasikan `addItem(product)`.
3. Mengimplementasikan `removeItem(productId)` bila diperlukan.
4. Mengimplementasikan `updateQuantity(productId, change)`.
5. Membuat computed `cartItemCount` dan `cartTotal`.
6. Menghapus seluruh manipulasi `innerHTML`, `getElementById`, dan inline `onclick`.
7. Menggunakan `Intl.NumberFormat('id-ID')` atau format mata uang yang disepakati untuk harga.

### Tahap 5: Membuat sidebar keranjang

1. Membuat `CartSidebar.vue`.
2. Mengirim state keranjang melalui props atau composable.
3. Mengirim event `close`, `increase`, `decrease`, dan `checkout`.
4. Menampilkan empty state dengan `v-if`.
5. Menambahkan tombol aksesibel dengan label yang jelas.
6. Menambahkan overlay pada layar mobile.
7. Menutup sidebar melalui tombol close, overlay, dan tombol Escape.
8. Mengunci scroll halaman saat sidebar terbuka jika diperlukan.

### Tahap 6: Search dan interaksi pengguna

1. Menambahkan input pencarian di header atau area katalog.
2. Mengikat input dengan `v-model="searchKeyword"`.
3. Menggunakan `filteredProducts` sebagai sumber `ProductGrid`.
4. Menghindari render manual dan debounce JavaScript yang tidak diperlukan untuk data lokal kecil.
5. Menampilkan feedback singkat setelah produk berhasil ditambahkan.
6. Menonaktifkan tombol checkout saat proses checkout berlangsung.

### Tahap 7: Checkout dan error handling

1. Memvalidasi bahwa keranjang tidak kosong sebelum checkout.
2. Menampilkan status loading checkout selama simulasi dua detik.
3. Menangani kegagalan proses dengan pesan error yang terlihat di UI.
4. Mengosongkan keranjang hanya setelah checkout berhasil.
5. Menutup sidebar setelah checkout berhasil.
6. Menghindari ketergantungan pada `alert()` untuk alur normal; gunakan notifikasi atau status inline.

### Tahap 8: Responsivitas dan aksesibilitas

1. Mengganti lebar tetap `1200px` dengan `width: min(100%, ...)` dan padding responsif.
2. Menggunakan grid responsif, misalnya satu kolom pada layar kecil, dua kolom pada tablet, dan empat kolom pada desktop.
3. Membatasi lebar sidebar menjadi `min(400px, 100vw)`.
4. Menggunakan layout flex pada header agar cart button tidak rusak di mobile.
5. Menambahkan `aria-label`, `aria-expanded`, dan `aria-live` untuk status penting.
6. Memastikan fokus keyboard dapat mencapai tombol dan input.
7. Memastikan kontras warna dan ukuran target tombol cukup untuk layar sentuh.

### Tahap 9: Pembersihan dan optimasi

1. Menghapus variabel global dan fungsi global dari script lama.
2. Menghapus event listener resize yang hanya mencetak log.
3. Menggunakan `onBeforeUnmount()` untuk membersihkan listener dokumen jika listener global tetap digunakan.
4. Menghindari duplikasi template kartu produk dan item keranjang.
5. Menambahkan fallback/error state pada loading produk dan gambar.
6. Meninjau CSS agar selector tidak terlalu spesifik.

## 8. Kontrak Komponen

### `AppHeader.vue`

Props:

- `cartItemCount`
- `searchKeyword`

Events:

- `update:searchKeyword`
- `open-cart`

### `ProductCard.vue`

Props:

- `product`

Events:

- `add-to-cart(product)`

### `CartSidebar.vue`

Props:

- `open`
- `items`
- `totalItems`
- `totalPrice`
- `isCheckingOut`
- `errorMessage`

Events:

- `close`
- `update-quantity(productId, change)`
- `checkout`

## 9. Checklist Validasi

### Fungsional

- [ ] Produk tampil setelah loading selesai.
- [ ] Error loading dapat ditampilkan dan pengguna dapat mencoba lagi.
- [ ] Pencarian memfilter nama produk dengan benar.
- [ ] Tambah produk menaikkan badge dan total harga.
- [ ] Menambah produk yang sama menaikkan kuantitas, bukan membuat baris duplikat.
- [ ] Tombol plus dan minus bekerja dengan benar.
- [ ] Kuantitas nol menghapus item dari keranjang.
- [ ] Keranjang kosong menampilkan empty state.
- [ ] Checkout kosong ditolak.
- [ ] Checkout berhasil mengosongkan keranjang dan menutup sidebar.
- [ ] Sidebar dapat ditutup dengan tombol, overlay, dan Escape.

### Responsif

- [ ] Tidak ada horizontal overflow pada layar mobile.
- [ ] Header tetap rapi pada lebar kecil.
- [ ] Grid produk menyesuaikan ukuran layar.
- [ ] Sidebar tidak melebihi lebar viewport.
- [ ] Semua tombol dapat digunakan melalui sentuhan dan keyboard.

### Teknis

- [ ] Tidak ada manipulasi DOM manual untuk state aplikasi.
- [ ] Tidak ada `onclick` inline.
- [ ] Tidak ada variabel global untuk produk atau keranjang.
- [ ] Tidak ada error di console browser.
- [ ] Build produksi berhasil dengan `npm run build`.

## 10. Urutan Validasi Setelah Implementasi

1. Jalankan `npm install`.
2. Jalankan `npm run dev` dan uji alur katalog serta keranjang secara manual.
3. Uji viewport desktop, tablet, dan mobile.
4. Jalankan `npm run build`.
5. Periksa console browser untuk error Vue, asset, dan event listener.
6. Tambahkan unit test untuk `useCart()` jika logika keranjang mulai berkembang.

## 11. Hasil Akhir yang Diharapkan

Aplikasi memiliki struktur Vue yang modular dan mudah dirawat, dengan UI yang tetap setara atau lebih baik dari halaman HTML awal. State keranjang, loading, pencarian, dan checkout dikelola secara reaktif oleh Vue, sementara layout dapat digunakan dengan baik pada desktop maupun perangkat mobile.
