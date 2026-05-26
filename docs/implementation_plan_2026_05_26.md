# Rencana Implementasi Hardening Backend, Optimasi Layout, dan Integrasi Notifikasi Real-Time (26 Mei 2026)

## Deskripsi Umum

Dokumen ini memberikan ringkasan komprehensif mengenai peningkatan teknis, perbaikan bug, implementasi keamanan, serta integrasi API yang diterapkan pada proyek portofolio Kelvin Julian pada **26 Mei 2026**.

Tujuan utama dari implementasi hari ini adalah mengamankan database aplikasi (hardening backend), memvalidasi data kontak yang dikirim oleh pengguna, menyelesaikan bug tata letak responsif (horizontal overflow dan posisi navbar sticky), serta mengintegrasikan notifikasi email instan secara real-time menggunakan EmailJS ketika formulir kontak dikirimkan.

---

## Bab 1: Hardening Backend & Keamanan Firebase

### 1.1 Konfigurasi Aturan Keamanan Firestore (`firestore.rules`)

Aturan keamanan di root proyek pada berkas [firestore.rules](file:///d:/Code/Belajar-Antigravity/portfolio/firestore.rules) dikonfigurasi dengan model izin akses "terkunci secara default":

- **Penguncian Default:** Seluruh koleksi dikunci dari akses baca/tulis publik menggunakan aturan wildcard catch-all:
  ```javascript
  match /{document=**} {
    allow read, write: if false;
  }
  ```
- **Izin Khusus Pengiriman Formulir:** Koleksi `contacts` dan `messages` dilindungi dari akses baca (_read_), perbarui (_update_), dan hapus (_delete_) oleh publik. Hanya operasi pembuatan data (_create_) yang diizinkan:
  ```javascript
  match /contacts/{document} {
    allow create: if true;
    allow read, update, delete: if false;
  }
  ```
  Langkah ini memastikan pihak luar tidak dapat membaca pesan dari pengguna lain, memodifikasi data yang ada, atau menghapus seluruh isi database.

### 1.2 Validasi Formulir & Enkapsulasi Input

Di dalam berkas [src/js/script.js](file:///d:/Code/Belajar-Antigravity/portfolio/src/js/script.js), pembersihan input dan validasi struktural telah diimplementasikan di dalam handler event `window.handleFormSubmit`:

- **Validasi Input Kosong:** Setiap field (Nama, Email, Pesan) diproses menggunakan `.trim()` untuk menghapus spasi kosong di awal/akhir. Jika ada kolom yang kosong, proses akan dihentikan dan memunculkan peringatan browser (`alert`).
- **Validasi Format Email (Regex):** Memanfaatkan ekspresi reguler (Regex) standar RFC untuk memverifikasi validitas format alamat email sebelum mengirimkan permintaan ke Firebase:
  ```javascript
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  ```

### 1.3 Siklus Hidup Proteksi Double-Submit

Untuk mencegah duplikasi data akibat penekanan tombol submit berulang kali oleh pengguna selama proses asinkronus berjalan:

1. Input formulir diverifikasi terlebih dahulu.
2. Jika valid, tombol submit akan dinonaktifkan (`disabled = true`) dan teks tombol diubah menjadi status loading `"Mengirim..."` disertai dengan animasi spinner SVG.
3. Proses penyimpanan ke database (Firebase) dan pengiriman notifikasi email berjalan secara asinkronus.
4. Di dalam blok `finally`, tombol submit diaktifkan kembali (`disabled = false`) dan memulihkan label teks aslinya (_"Kirim Pesan Sekarang"_).

---

## Bab 2: UI/UX & Optimasi Layout

### 2.1 Perbaikan Horizontal Overflow

Tiga elemen dekoratif lingkaran blur latar belakang (_glowing blobs_) yang diposisikan secara absolut pada [index.html](file:///d:/Code/Belajar-Antigravity/portfolio/index.html) melebar melebihi lebar layar, sehingga memicu scroll horizontal (_horizontal overflow_) pada tampilan perangkat mobile.

- **Resolusi:** Elemen induk `<main class="flex-grow w-full relative">` diperbarui dengan menambahkan kelas utilitas Tailwind CSS `overflow-hidden`. Hal ini membuat lingkaran dekoratif yang melebar otomatis terpotong (_clipped_) pada batas layar dan menjaga layout tetap rapi.

### 2.2 Restorasi Navbar Sticky

Pemberian properti `overflow-x: hidden` pada elemen root `<html>` atau `<body>` sempat memutus fungsionalitas `position: sticky` pada komponen `<nav>` karena merusak konteks viewport scroll container.

- **Resolusi:** Menghapus aturan `html, body { overflow-x: hidden; }` global dari [style.css](file:///d:/Code/Belajar-Antigravity/portfolio/src/css/style.css) dan tag `<html>` di `index.html`. Karena dekorasi blur latar belakang sudah dipotong dengan aman di tingkat `<main>`, layout mobile tetap aman dari horizontal overflow, dan Navbar kembali melayang (_sticky_) dengan lancar saat halaman di-scroll.

---

## Bab 3: Notifikasi Admin Secara Real-Time

### 3.1 Arsitektur Integrasi SDK EmailJS

Untuk menerima notifikasi instan langsung ke email pribadi tanpa perlu terus memantau Firebase Console, SDK resmi `@emailjs/browser` diintegrasikan ke proyek:

- **Inisialisasi:** SDK diimpor dan diinisialisasi menggunakan Public Key pengguna di bagian atas berkas [src/js/script.js](file:///d:/Code/Belajar-Antigravity/portfolio/src/js/script.js):
  ```javascript
  import emailjs from "@emailjs/browser";
  emailjs.init("5qHCo4qiitgue61s-");
  ```
- **Operasi Asinkronus Berurutan:** Pengiriman data ke Firebase Firestore (`addDoc`) dijalankan terlebih dahulu. Setelah berhasil, metode `emailjs.send` dipanggil untuk mengirimkan email.
- **Isolasi Error (Error Isolation):** Panggilan EmailJS dibungkus dalam blok `try-catch` bersarang (_nested_). Jika terjadi kegagalan jaringan pada pengiriman email, sistem hanya akan memunculkan log error di console developer dan **tidak akan membatalkan status sukses formulir pengguna** karena pesan telah berhasil masuk ke Firestore database.

### 3.2 Pemetaan Objek Parameter Dinamis

Objek parameter data yang dikirimkan ke EmailJS template `template_1x6ck0y` dipetakan sebagai berikut agar sinkron dengan template email:

- `name`: Mengambil nilai input Nama Lengkap.
- `email`: Mengambil nilai input Alamat Email.
- `title`: Mengambil nilai input Subjek Pesan.
- `message`: Mengambil nilai input Detail Pesan.

### 3.3 Konsistensi Visual Brand & Sinkronisasi Logo

- **Pembaruan Favicon:** File favicon di-set ke file PNG transparan bulat (`/favicon.png`) di dalam folder `/public` agar tab browser menampilkan logo bulat 'K' biru dengan rapi di semua tema browser.
- **Sinkronisasi Logo Navbar:** Komponen logo berbasis CSS di [src/components/Navbar.html](file:///d:/Code/Belajar-Antigravity/portfolio/src/components/Navbar.html) diganti dengan tag `<img>` dinamis yang merujuk ke file `/favicon.png` yang sama, membuat branding identitas visual selaras.

---

## Bab 4: Alur Kerja Repositori & Rencana Verifikasi

### 4.1 Checklist Pengujian End-to-End di Localhost

- [x] **Validasi Formulir:** Menguji pengosongan kolom input dan format email salah di localhost. Muncul peringatan browser dengan tepat.
- [x] **Proteksi Double-Submit:** Memastikan tombol terkunci dengan teks `"Mengirim..."` saat proses asinkronus berlangsung dan aktif kembali setelah selesai.
- [x] **Keamanan Aturan Firestore:** Menguji pembacaan/penghapusan data secara paksa dari Console browser DevTools, dan memastikan Firebase menolak akses tersebut dengan pesan error _"Missing or insufficient permissions"_.
- [x] **Verifikasi Build Produksi:** Menjalankan perintah `npm run build` dan memastikan proses bundling selesai dengan sukses tanpa error.

### 4.2 Strategi Branching dan Deployment CI/CD

- **Branch Aktif:** `feature/firebase-hardening-seo`
- **Strategi Merge:** Perubahan di-commit, di-push ke repositori GitHub, lalu digabungkan (_merge_) ke branch `main` melalui Pull Request.
- **Deployment Otomatis:** Proses penggabungan ke branch `main` akan secara otomatis memicu alur CI/CD di platform Vercel untuk membangun dan menyebarkan versi produksi terbaru dari portofolio Anda.
