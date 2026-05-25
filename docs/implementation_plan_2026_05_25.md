# Rencana Implementasi & Catatan Progres - 25 Mei 2026

## 1. Pembaruan Komponen & Aset Visual (Frontend Refactoring)

- **Transformasi Gambar Proyek Nyata**: Mengganti seluruh placeholder gambar proyek mockup lama di folder `public/assets/` dengan aset visual proyek riil (termasuk Luarsekolah LMS, Golden Bites, Nike E-Commerce, dan Web Sewa Mobil).
- **Sinkronisasi Jalur Aset (Pathing)**: Memastikan seluruh tag `<img>` di dalam komponen menggunakan jalur relatif bersih (`public/assets/nama_gambar.png`) dan menghapus sisa-sisa prefiks folder lokal agar tidak merusak tautan saat online.
- **Modernisasi Ikon & Tautan Profil**: Memperbarui seluruh ikon media sosial (GitHub, LinkedIn) menggunakan arsitektur SVG inline serta menyematkan URL akun profesional yang valid pada elemen jangkar (anchor tags).

## 2. Integrasi Backend Serverless (Google Firebase)

- **Firebase SDK Modular**: Memastikan inisialisasi Firebase Auth dan Cloud Firestore berjalan menggunakan SDK modular (v9/v10) demi optimasi performa paket (_bundle size_).
- **Manajemen Kontak Dinamis**: Mengonfigurasi logika JavaScript pada form kontak agar dapat melakukan operasi penulisan data (_write operation_) secara asinkronus ke koleksi database Google Firebase Cloud Firestore secara real-time.

## 3. Migrasi Arsitektur Modern (Vite Build Tool)

- **Justifikasi Teoretis**: Migrasi dari struktur web statis murni (Plain HTML) ke ekosistem Vite Dev Server. Langkah ini wajib diambil untuk mendukung manajemen komponen HTML terpisah (Navbar.html, Hero.html, Footer.html) tanpa menggunakan fungsi JavaScript Fetch lokal yang rawan memicu eror routing.
- **Konfigurasi Dependensi**: Pembuatan berkas `package.json` dan pemasangan paket `vite` serta `vite-plugin-html-inject` sebagai pembungkus komponen produksi.
- **Refaktorisasi Tag Komponen**: Mengubah seluruh pemanggilan parsial HTML menggunakan sintaks injeksi Vite standar industri: `<load src="./src/components/[NamaKomponen].html" />`.

## 4. Manajemen Version Control & Strategi Deployment (GitHub & Vercel)

- **Pembersihan Cache Repositori**: Menyelesaikan kendala "Permission Denied (Exit Code 126)" pada Vercel dengan menghapus cache pelacakan folder `node_modules` bawaan sistem operasi Windows dari Git menggunakan perintah `git rm -r --cached node_modules`.
- **Konfigurasi Proteksi Repositori**: Pembuatan berkas `.gitignore` untuk mengecualikan folder generator lokal (`node_modules/` dan `dist/`) agar tidak mengotori repositori online GitHub.
- **Otomatisasi CI/CD Vercel**: Mengatur ulang proyek baru pada Vercel dengan deteksi otomatis Framework Preset berbasis Vite dan Root Directory default (`./`), sehingga setiap operasi `git push` pada branch `main` akan langsung memicu proses kompilasi otomatis (_auto-build production_).

## 5. Alur Kerja Pengujian Baru (Local Development Workflow)

- Pengujian dan pratinjau perubahan kode lokal kini dialihkan dari ekstensi Live Server biasa ke perintah kompilasi runtime Vite melalui terminal: `npm run dev` (Hot Module Replacement aktif pada alamat `http://localhost:5173/`).
