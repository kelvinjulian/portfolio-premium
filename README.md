# 🌌 Modern Web Portfolio - Full-Stack Serverless

Portofolio web interaktif premium yang dirancang untuk menampilkan karya di bidang Web/Mobile Development dan UI/UX Design, terintegrasi langsung secara real-time dengan database Google Firebase.

## 🚀 Live Demo
Akses website portofolio secara langsung melalui tautan berikut: 
👉 **[MASUKKAN_LINK_VERCEL_ANDA_DI_SINI]**

## 🛠️ Tech Stack & Fitur Utama
- **Frontend Framework:** Tailwind CSS (Modern Grid Layout, Custom Fluid Typography, & Glassmorphism design)
- **Database Backend:** Google Firebase Cloud Firestore (v9/v10 Modular SDK via Inline Script Modules)
- **Icons Architecture:** Handcrafted inline SVG injection untuk optimasi rendering asinkronus (Light/Dark Mode friendly)
- **Interactive UI:** Sistem Filter Kategori Proyek berbasis Tab Filter Dinamis (JavaScript DOM Manipulation)
- **Theme Engine:** Mode Gelap (Dark Mode) otomatis tersimpan via JavaScript LocalStorage

## 📂 Struktur Proyek
Berikut adalah visualisasi struktur direktori proyek ini:

```text
Belajar-Antigravity/
├── docs/
│   ├── implementation_plan_2026_05_24.md
│   └── implementation_plan_2026_05_25.md
├── public/
│   └── assets/
│       ├── foodapp.png
│       ├── goldenbites.png
│       ├── luarsekolah.png
│       ├── nike.png
│       └── websewamobil.png
├── src/
│   ├── components/
│   │   ├── Footer.html
│   │   ├── Hero.html
│   │   └── Navbar.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── index.html
└── README.md
```

## 📦 Karya yang Dipamerkan
1. **Luar Sekolah LMS** - Mobile App (Flutter, Dart, Cloud Firestore)
2. **WebSewaMobil** - Full-Stack Web (Laravel 11, Filament, Next.js)
3. **Golden Bites Snap CRUD** - E-Commerce Web (PHP/Laravel, Midtrans Snap API)
4. **Nike Website Concept** - UI/UX Design (Figma, Typography, Visual Grid)
5. **Food Delivery App** - Mobile UI/UX Case Study (Figma Prototype & UX Flow)

## ⚙️ Cara Menjalankan Secara Lokal
1. Clone repositori ini ke komputer Anda.
2. Buka terminal di dalam direktori `portfolio` lalu jalankan perintah `npm install` untuk menginstal seluruh dependensi.
3. Pastikan Anda telah mengonfigurasi objek `firebaseConfig` asli Anda di dalam file `src/js/script.js`.
4. Jalankan perintah `npm run dev` untuk menyalakan Vite Dev Server secara lokal.
5. Untuk mem-build bundel produksi statis (yang akan dideploy di hosting seperti Vercel), jalankan perintah `npm run build`.
