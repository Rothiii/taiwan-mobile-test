# Product Brief: Taiwan Mobile

## 1. Ringkasan Produk

Taiwan Mobile adalah halaman storefront untuk membantu pengguna menemukan produk teknologi, memasukkannya ke keranjang, mengatur kuantitas, lalu melakukan checkout simulasi dengan cepat.

Bahasa antarmuka utama adalah Traditional Chinese (`zh-TW`) dengan harga dalam NT$.

## 2. Target Pengguna

- Pengguna yang ingin menemukan aksesori dan perangkat teknologi sehari-hari.
- Pengguna mobile yang membutuhkan pengalaman belanja sederhana dan mudah disentuh.
- Pengelola katalog yang membutuhkan halaman produk ringan tanpa backend pada tahap awal.

## 3. Tujuan Produk

- Membuat katalog produk mudah dipindai.
- Memudahkan pengguna menemukan produk melalui search.
- Menyediakan cart flow yang jelas dan aman dari penghapusan atau checkout tidak sengaja.
- Menampilkan jumlah item dan total harga secara akurat.
- Menyediakan fondasi sederhana yang mudah dikembangkan.

## 4. Fitur Utama

### Katalog

- Menampilkan 8 produk dengan nama, kategori, harga, dan gambar.
- Menampilkan loading state sebelum produk tersedia.
- Menampilkan empty state ketika pencarian tidak menghasilkan produk.

### Search

- Search box selalu tersedia, termasuk pada viewport mobile.
- Pencarian dilakukan berdasarkan nama produk.
- Spasi awal dan akhir keyword diabaikan.
- Pencarian tidak membedakan huruf besar dan kecil.

### Shopping Cart

- Menambahkan produk dari product card.
- Produk yang sama menambah kuantitas pada item yang sudah ada.
- Badge cart menampilkan total kuantitas seluruh item, bukan jumlah jenis produk.
- Tombol `+` dan `-` mengubah kuantitas berulang kali.
- Pengurangan item terakhir meminta konfirmasi sebelum menghapus.
- Total harga diperbarui otomatis.

### Checkout

- Checkout dari cart drawer.
- Checkout kosong tidak dapat diproses.
- Pengguna harus mengonfirmasi checkout.
- Proses checkout menampilkan status loading.
- Checkout berhasil mengosongkan cart dan menampilkan notifikasi.

### Feedback Pengguna

- Notifikasi ditampilkan saat produk masuk ke keranjang.
- Notifikasi tidak dihapus oleh timer lama ketika pengguna menambahkan produk berulang kali.
- Error atau status penting menggunakan area teks yang dapat dibaca assistive technology.

## 5. User Flow

### Menambahkan Produk

1. Pengguna membuka halaman.
2. Sistem memuat katalog.
3. Pengguna mencari produk jika diperlukan.
4. Pengguna menekan tombol tambah ke keranjang.
5. Sistem menaikkan badge kuantitas dan menampilkan notifikasi.

### Mengubah Kuantitas

1. Pengguna membuka cart drawer.
2. Pengguna menekan `+` atau `-` sebanyak yang dibutuhkan.
3. Sistem memperbarui kuantitas, badge, dan total harga secara reactive.
4. Jika kuantitas satu dikurangi, sistem meminta konfirmasi penghapusan.

### Checkout

1. Pengguna membuka cart drawer.
2. Pengguna menekan tombol checkout.
3. Sistem menampilkan dialog konfirmasi.
4. Jika dibatalkan, cart tetap tidak berubah.
5. Jika dikonfirmasi, sistem menjalankan simulasi checkout.
6. Setelah berhasil, cart dikosongkan dan notifikasi sukses ditampilkan.

## 6. Non-Functional Requirements

- Layout tidak boleh menyebabkan horizontal overflow pada mobile.
- Tombol utama dapat digunakan dengan keyboard dan touch.
- Dialog dapat ditutup dengan tombol batal atau Escape.
- Tidak menggunakan inline event handler atau manipulasi DOM manual untuk state aplikasi.
- Build produksi harus berhasil.
- Logic cart harus tetap sederhana dan mudah diuji.

## 7. Scope Saat Ini

Termasuk:

- Katalog lokal.
- Search lokal.
- Cart state lokal melalui composable `useCart()`.
- Simulasi loading dan checkout.
- Responsive layout.
- Smoke test untuk loading, katalog, dan add-to-cart.

Belum termasuk:

- Backend API.
- Login dan akun pengguna.
- Database.
- Payment gateway nyata.
- Pengiriman dan perhitungan ongkir nyata.
- Persistence cart ke localStorage.
- Admin dashboard.
- Pinia atau state management global.

## 8. Acceptance Criteria

- [ ] Delapan produk muncul setelah loading selesai.
- [ ] Search dapat menemukan produk berdasarkan nama.
- [ ] Produk yang sama menambah kuantitas, bukan baris baru.
- [ ] Badge menampilkan total kuantitas seluruh item.
- [ ] Quantity plus/minus dapat digunakan berkali-kali.
- [ ] Penghapusan item meminta konfirmasi.
- [ ] Checkout meminta konfirmasi.
- [ ] Pembatalan dialog tidak mengubah cart.
- [ ] Checkout berhasil mengosongkan cart.
- [ ] Notifikasi add-to-cart dan checkout terlihat.
- [ ] Test dan production build berhasil.
