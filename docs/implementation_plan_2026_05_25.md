# Integrasi Formulir Kontak dengan Firebase Cloud Firestore

Rencana ini merinci langkah-langkah untuk menghubungkan formulir kontak di website portofolio ke Google Firebase Cloud Firestore secara real-time dengan menggunakan SDK Firebase Modular v10 via CDN.

## User Review Required

> [!IMPORTANT]
> **Perubahan script.js Menjadi Modul ES6 (`type="module"`):**
>
> - Untuk mengimpor SDK Firebase Modular terbaru secara langsung di browser tanpa build step (seperti Webpack/Vite), kita perlu mengubah cara pemuatan `script.js` di index.html dengan menambahkan atribut `type="module"`.
> - Modul ES6 memiliki cakupan terisolasi. Oleh karena itu, fungsi-fungsi yang dipanggil langsung dari atribut HTML (seperti `onsubmit="handleFormSubmit(event)"` dan `onclick="filterProjects(...)"`) harus secara eksplisit tetap diikat ke objek `window`. Hal ini sudah didukung dengan baik pada kode `script.js` saat ini.

> [!TIP]
> **Efek Loading Premium pada Tombol Submit:**
>
> - Saat pengiriman data berlangsung, tombol kirim akan dinonaktifkan (disabled) dan teksnya akan berganti menjadi animasi spinner loading dengan teks "Mengirim..." untuk meningkatkan pengalaman pengguna (user experience) standar industri.

## Open Questions

_Tidak ada pertanyaan terbuka saat ini._

---

## Proposed Changes

### Integrasi Firebase SDK & Pemrosesan Kontak

#### [MODIFY] index.html (d:/Code/Belajar-Antigravity/index.html)

- Mengubah baris pemuatan `script.js` di bagian bawah dari `<script src="src/js/script.js" defer></script>` menjadi `<script src="src/js/script.js" type="module"></script>`.

#### [MODIFY] script.js (d:/Code/Belajar-Antigravity/src/js/script.js)

- Menambahkan impor fungsi modular Firebase App dan Firestore dari Google CDN di bagian paling atas file.
- Menginisialisasi Firebase menggunakan objek konfigurasi yang diberikan oleh pengguna.
- Memperbarui handler `window.handleFormSubmit` menjadi fungsi `async` yang mengirim data (nama, email, subjek, pesan, dan timestamp dari server) ke Firestore koleksi `messages`.
- Menambahkan status loading (spinner & penonaktifan tombol) saat data sedang dikirim.
- Menampilkan modal sukses setelah Firestore berhasil menyimpan data, lalu melakukan reset pada formulir.

---

## Verification Plan

### Manual Verification

1. Isi formulir kontak di halaman web dengan data uji coba, lalu klik tombol **Kirim Pesan Sekarang**.
2. Pastikan tombol berubah menjadi status loading "Mengirim..." dan tidak dapat diklik kembali selama pengiriman.
3. Pastikan modal sukses muncul setelah pengiriman selesai dan isi input formulir kembali kosong.
4. Periksa Firebase Console Firestore Database proyek Anda untuk memastikan dokumen baru telah masuk ke dalam koleksi `messages` dengan atribut `name`, `email`, `subject`, `message`, dan `timestamp` yang tepat.

---

## Progres & Pembaruan - 25 Mei 2026

### 1. Perombakan Visual Komponen Proyek (Card Layout Overhaul)

- **Implementasi:** Mengintegrasikan 5 aset gambar proyek riil (Luar Sekolah LMS, WebSewaMobil, Golden Bites, Nike Website Concept, dan Food Delivery App) menggunakan aspek rasio modern 'aspect-[4/3]'/'aspect-video' dan properti 'object-cover' agar responsif.
- **Catatan Desain:** Menggunakan visual mockup bawaan dari gambar asli dan meniadakan bingkai tiruan CSS untuk menghindari distorsi visual (gambar gepeng/terpotong).
- **Fitur Tambahan:** Mengaktifkan sistem filter kategori dinamis ("Semua", "Web & Mobile Dev", "UI/UX Design") menggunakan JavaScript dan Tailwind CSS, serta menambahkan micro-interactions (efek hover scale dan shadow premium).

### 2. Integrasi Ikon Media Sosial (SVG Inline Migration)

- **Masalah Sebelumnya:** Terjadi race condition (balapan load kode) pada CDN JavaScript Lucide Icons akibat sistem pemuatan komponen dinamis, sehingga ikon tidak muncul (hanya kotak warna).
- **Solusi Industri:** Melakukan migrasi penuh dari tag `<i data-lucide="...">` ke kode SVG Inline murni untuk ikon GitHub, LinkedIn, dan Figma.
- **Hasil:** Ikon 100% aman, terkunci, langsung dirender oleh browser, dan kompatibel penuh baik di mode terang maupun gelap tanpa bergantung pada eksekusi JavaScript eksternal. Tautan href juga telah diarahkan ke akun profil asli (GitHub, LinkedIn) dan spesifik draf proyek (Figma Nike).

### 3. Integrasi Backend Serverless (Google Firebase Cloud Firestore)

Mengeksplorasi fitur canggih dengan mengubah formulir kontak statis menjadi dinamis dan terhubung ke database cloud secara real-time.

- **Langkah Setup Firebase Console:**
  1. Membuat proyek baru bernama `portfolio-kelvin-4ed0c`.
  2. Mengaktifkan 'Firestore Database' dalam _Test Mode_ (akses baca-tulis terbuka untuk testing lokal) dengan lokasi server terdekat (`asia-southeast1` Singapura).
  3. Mendaftarkan aplikasi baru berbasis "Web App (</>)" untuk mendapatkan Firebase Configuration Object dengan domain penyimpanan terbaru (`.firebasestorage.app`).
- **Implementasi Kode:**
  - Menghubungkan SDK Firebase v9/v10 Modular via CDN dengan konfigurasi atribut `type="module"` pada tag script di `index.html` untuk menghindari eror _SyntaxError: Cannot use import statement outside a module_.
  - Menggunakan metode `addDoc` dan `serverTimestamp()` pada `script.js` untuk mengirim data (nama, email, subjek, pesan) ke koleksi bernama `"messages"`.
- **Analisis Alur Data & Email:**
  - Perbedaan antara email akun admin Firebase (julianputrakelvin@gmail.com), email statis di teks web (klvinjulianputra@gmail.com), dan email testing pengirim (kelvinjulian@upi.edu) tidak memengaruhi validitas data. Jalur pengiriman murni menggunakan token enkripsi `firebaseConfig`.
  - Data yang dikirim pengunjung tidak masuk ke Gmail, melainkan masuk dan dipantau langsung melalui dasbor _Firebase Console -> Firestore Database -> Koleksi 'messages' -> Documents_.
