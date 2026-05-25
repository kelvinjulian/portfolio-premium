# Rencana Implementasi: Fitur Dark Mode Portofolio

Rencana ini merinci langkah-langkah untuk mengintegrasikan fitur **Dark Mode** secara halus dan responsif pada seluruh halaman website portofolio Kelvin Julian.

## User Review Required

> [!IMPORTANT]
> **Skema Warna & Transisi Gelap:**
>
> - **Warna Latar Belakang Gelap:** Kami merekomendasikan warna dasar **Slate Gelap (`bg-slate-950` / `#0b0f19`)** daripada hitam pekat agar gradasi _mesh background_ tetap terlihat elegan, modern, dan tidak terlalu kontras bagi mata.
> - **Transisi Halus:** Kami menambahkan properti CSS transition (`transition-colors duration-300`) pada seluruh elemen penting (`body`, `nav`, `footer`, dan kartu-kartu) untuk memberikan efek transisi perubahan tema yang halus.
> - **Sakelar Ikon Bulan/Matahari:** Ikon akan berubah secara dinamis menggunakan Lucide Icons (`moon` untuk mode terang/siang, `sun` untuk mode malam).

## Open Questions

> [!NOTE]
>
> 1. **Default Tema:** Apakah Anda setuju jika tema default mengikuti preferensi sistem operasi pengguna (menggunakan `window.matchMedia('(prefers-color-scheme: dark)')`) tetapi tetap dapat ditimpa (override) melalui tombol sakelar dan disimpan di `localStorage`?
> 2. **Warna Aksen:** Kami akan mempertahankan gradasi warna brand biru-ke-ungu (`from-brand-600 via-indigo-600 to-purple-600`) baik pada mode terang maupun gelap untuk konsistensi branding. Apakah ada preferensi warna aksen khusus lainnya?

---

## Proposed Changes

Kami akan melakukan modifikasi pada file-file berikut untuk menerapkan kelas Tailwind `dark:` dan mengontrol logikanya:

### Konfigurasi & Kerangka Utama

#### [MODIFY] [index.html](file:///d:/Code/Belajar-Antigravity/index.html)

- Menambahkan `darkMode: 'class'` pada konfigurasi Play CDN Tailwind CSS di bagian `<head>`.
- Menambahkan kelas Tailwind `dark:` untuk seluruh elemen utama di dalam halaman (bagian _About Me_, _Projects_, _Contact_, formulir kontak, dan modal sukses).
- Menambahkan transisi warna pada tag `<body>`.

### Gaya Kustom & Animasi

#### [MODIFY] [style.css](file:///d:/Code/Belajar-Antigravity/src/css/style.css)

- Mendefinisikan warna latar belakang default dark mode pada `.dark body`.
- Menyesuaikan efek gradasi _radial mesh background_ (`.mesh-bg-1` dan `.mesh-bg-2`) versi gelap saat kelas `.dark` aktif di elemen induk agar warna berpendar secara redup dan estetis.
- Menambahkan aturan transisi global untuk properti background-color dan border-color.

### Komponen & Logika

#### [MODIFY] [Navbar.html](file:///d:/Code/Belajar-Antigravity/src/components/Navbar.html)

- Menyisipkan tombol sakelar tema (`button#theme-toggle`) dengan ikon dinamis Lucide di sisi kanan menu desktop (sebelum tombol CTA "Mulai Proyek").
- Menambahkan kelas Tailwind `dark:` pada teks tautan navigasi, menu mobile responsif, dan border agar selaras dengan tema gelap.

#### [MODIFY] [Hero.html](file:///d:/Code/Belajar-Antigravity/src/components/Hero.html)

- Menambahkan kelas `dark:` pada teks heading, deskripsi, tombol outline, kartu simulasi kode, dan kartu desain agar visualisasinya serasi saat berada di mode malam.

#### [MODIFY] [Footer.html](file:///d:/Code/Belajar-Antigravity/src/components/Footer.html)

- Menambahkan kelas `dark:` pada teks hak cipta, pembungkus footer, dan tombol "Kembali ke Atas".

#### [MODIFY] [script.js](file:///d:/Code/Belajar-Antigravity/src/js/script.js)

- Menulis fungsi inisialisasi tema (`initTheme()`) untuk membaca preferensi `localStorage` atau preferensi sistem pengguna saat pertama kali dimuat.
- Menambahkan event listener pada tombol `#theme-toggle` untuk mengubah kelas `.dark` pada elemen `<html>` serta memperbarui ikon Lucide (`moon`/`sun`).
- Memastikan inisialisasi tema dilakukan tepat setelah komponen Navbar dimuat secara asinkron.
- Menyesuaikan fungsi penyaringan proyek (`filterProjects`) agar penggantian kelas warna tombol filter dinamis tetap terlihat kontras baik pada mode terang maupun gelap.

---

## Verification Plan

### Manual Verification

1.  Buka website portofolio di browser.
2.  Klik tombol sakelar tema (ikon bulan/matahari) di Navbar dan pastikan tema berganti dari terang ke gelap secara mulus.
3.  Pastikan preferensi tema disimpan di `localStorage` dengan memuat ulang (refresh) halaman untuk melihat apakah tema terakhir tetap bertahan.
4.  Uji fungsionalitas filter proyek pada kedua mode tema untuk memastikan warna tombol aktif dan tidak aktif tetap kontras.
5.  Gunakan inspect tool browser untuk memvalidasi responsivitas menu mobile dan sakelar tema pada resolusi mobile.
