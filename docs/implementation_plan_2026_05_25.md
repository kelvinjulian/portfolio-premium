# Rencana Implementasi: Migrasi Proyek ke Vite Dev Server

Rencana ini merinci langkah-langkah untuk memigrasikan website portofolio statis Anda ke proyek berbasis Vite Dev Server & Build System dengan menggunakan plugin `vite-plugin-html-inject` untuk mengelola pemisahan komponen HTML secara statis saat build-time.

## User Review Required

> [!IMPORTANT]
> **Modifikasi Komponen HTML Statis (Vite Injection):**
>
> - Kita akan menggunakan tag `<load src="src/components/[Component].html" />` menggantikan penampung `<div data-include="..."></div>`. Hal ini diproses oleh Vite pada saat build-time, sehingga browser menerima kode HTML lengkap yang siap pakai tanpa dependensi loading dinamis (fetch client-side).
>
> **Penyederhanaan JavaScript:**
>
> - Karena pemuatan komponen sudah ditangani oleh Vite secara statis, kita akan menghapus fungsi `loadComponents()` dan pemanggilannya dari `src/js/script.js`. Hal ini akan membuat pemuatan halaman jauh lebih cepat dan terhindar dari masalah CORS/race condition.

> [!TIP]
> **Konfigurasi Server & Build Script:**
>
> - Kita akan menambahkan script dev dan build standar pada `package.json` agar Anda cukup menjalankan `npm run dev` untuk pengembangan lokal, dan `npm run build` untuk menghasilkan bundel produksi yang siap dideploy ke Vercel.

## Open Questions

*Tidak ada pertanyaan terbuka saat ini.*

---

## Proposed Changes

### 1. Inisialisasi Proyek & Depedensi Vite

#### [NEW] package.json (d:/Code/Belajar-Antigravity/portfolio/package.json)
- Membuat file `package.json` baru dengan definisi script (`dev`, `build`, `preview`) dan dependensi pembangunan (`vite` dan `vite-plugin-html-inject`).

#### [NEW] vite.config.js (d:/Code/Belajar-Antigravity/portfolio/vite.config.js)
- Menambahkan file konfigurasi Vite untuk memuat plugin `vite-plugin-html-inject`.

---

### 2. Komponen & Penyesuaian HTML

#### [MODIFY] index.html (d:/Code/Belajar-Antigravity/portfolio/index.html)
- Mengubah tag pemuatan komponen dinamis:
  - `<div data-include="src/components/Navbar.html"></div>` menjadi `<load src="src/components/Navbar.html" />`
  - `<div data-include="src/components/Hero.html"></div>` menjadi `<load src="src/components/Hero.html" />`
  - `<div data-include="src/components/Footer.html"></div>` menjadi `<load src="src/components/Footer.html" />`

#### [MODIFY] script.js (d:/Code/Belajar-Antigravity/portfolio/src/js/script.js)
- Menghapus definisi fungsi `loadComponents()` dari kode JavaScript.
- Menghapus panggilan `await loadComponents()` dari fungsi `init()`.

---

### 3. Dokumentasi Repositori

#### [MODIFY] README.md (d:/Code/Belajar-Antigravity/portfolio/README.md)
- Memperbarui panduan lokal untuk menjelaskan penggunaan Vite (`npm install` dan `npm run dev`).

---

## Verification Plan

### Manual Verification
1. Buka terminal di dalam direktori `portfolio` lalu jalankan perintah `npm install` diikuti dengan `npm run dev` untuk menyalakan Vite dev server.
2. Akses alamat localhost yang diberikan oleh Vite (biasanya `http://localhost:5173`) di browser.
3. Pastikan komponen Navbar, Hero, dan Footer ter-inject dengan sempurna dan fungsionalitas interaktif web (filter proyek, tombol dark mode) tetap berjalan normal tanpa eror di konsol.
4. Jalankan perintah `npm run build` untuk memverifikasi proses build produksi berhasil tanpa eror dan menghasilkan folder `dist` yang berisi hasil kompilasi bersih.
