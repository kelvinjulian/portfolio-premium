import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import emailjs from '@emailjs/browser';

// Firebase Configuration Object
const firebaseConfig = {
  apiKey: "AIzaSyA4w7pgDrFzS5fk02PwOwzzUexV9H00XNY",
  authDomain: "portfolio-kelvin-4ed0c.firebaseapp.com",
  projectId: "portfolio-kelvin-4ed0c",
  storageBucket: "portfolio-kelvin-4ed0c.firebasestorage.app",
  messagingSenderId: "532418775855",
  appId: "1:532418775855:web:71291b6f6832823ca36fda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize EmailJS
emailjs.init("5qHCo4qiitgue61s-");

// Run this early to prevent dark mode layout flash
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

// Global project filtering function so it can be called from HTML onclick attributes
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.project-tab-btn');
    
    // Update active state of buttons
    buttons.forEach(btn => {
        btn.classList.remove('bg-white', 'text-brand-600', 'shadow-sm', 'dark:bg-slate-800', 'dark:text-white');
        btn.classList.add('text-slate-600', 'hover:text-slate-900', 'dark:text-slate-400', 'dark:hover:text-white');
    });
    
    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-white', 'text-brand-600', 'shadow-sm', 'dark:bg-slate-800', 'dark:text-white');
        activeBtn.classList.remove('text-slate-600', 'hover:text-slate-900', 'dark:text-slate-400', 'dark:hover:text-white');
    }

    // Filter items with fade animation
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.transition = 'all 0.3s ease-in-out';
        
        if (category === 'all' || cardCategory === category) {
            card.style.opacity = '0';
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Expose filterProjects to the global window object
window.filterProjects = filterProjects;

// Expose closeModal to the global window object for the success modal close button
window.closeModal = function() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('hidden');
    }
}

// Global form submit handler
window.handleFormSubmit = async function(e) {
    e.preventDefault();
    
    // Ambil input form dan bersihkan spasi di awal/akhir
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // 1. Validasi input kosong (Nama, Email, Pesan)
    if (!name) {
        alert("Nama tidak boleh kosong.");
        return;
    }
    if (!email) {
        alert("Email tidak boleh kosong.");
        return;
    }
    if (!message) {
        alert("Pesan tidak boleh kosong.");
        return;
    }

    // 2. Validasi format email menggunakan Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Format email tidak valid.");
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
    
    // Disable submit button and show loading state (Double-Submit Protection)
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Mengirim...</span>
        `;
    }

    try {
        // Menggunakan koleksi "contacts" sesuai dengan aturan firestore.rules baru
        await addDoc(collection(db, "contacts"), {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: serverTimestamp()
        });

        // ✉️ Integrasi EmailJS untuk Notifikasi Email Instan ke Admin
        try {
            await emailjs.send("service_14g81vi", "template_1x6ck0y", {
                name: name,
                email: email,
                title: subject,
                message: message
            });
            console.log("EmailJS: Notifikasi email berhasil dikirim!");
        } catch (emailError) {
            // Menggunakan try-catch bersarang agar kegagalan notifikasi email tidak memicu dialog error
            // pada pengguna akhir, karena data formulir sudah sukses masuk ke Firestore database.
            console.error("EmailJS: Gagal mengirim notifikasi email:", emailError);
        }
        
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.remove('hidden');
        }
        
        document.getElementById('contact-form').reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    }
}

// Initialization function
async function init() {
    
    // 2. Initialize Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nowDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', nowDark ? 'dark' : 'light');
        });
    }
    
    // 3. Initialize Lucide Icons
    lucide.createIcons();
    
    // 4. Initialize navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-md', 'shadow-slate-100/50', 'dark:shadow-none', 'border-b', 'border-slate-200/40', 'dark:border-slate-800/40', 'py-3');
                navbar.classList.remove('py-5');
            } else {
                navbar.classList.remove('bg-white/80', 'dark:bg-slate-900/80', 'backdrop-blur-md', 'shadow-md', 'shadow-slate-100/50', 'dark:shadow-none', 'border-b', 'border-slate-200/40', 'dark:border-slate-800/40', 'py-3');
                navbar.classList.add('py-5');
            }
        });
    }
    
    // 5. Initialize mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const line1 = document.getElementById('hamburger-line-1');
        const line2 = document.getElementById('hamburger-line-2');
        const line3 = document.getElementById('hamburger-line-3');
        let isMenuOpen = false;
        
        function toggleMenu(forceState) {
            isMenuOpen = typeof forceState === 'boolean' ? forceState : !isMenuOpen;
            
            if (isMenuOpen) {
                // Open menu dropdown
                mobileMenu.classList.add('is-active');
                
                // Animate lines
                if (line1) line1.classList.add('rotate-45', 'translate-x-1');
                if (line2) line2.classList.add('opacity-0');
                if (line3) line3.classList.add('-rotate-45', 'translate-x-1');
            } else {
                // Close menu dropdown
                mobileMenu.classList.remove('is-active');
                
                // Reset lines
                if (line1) line1.classList.remove('rotate-45', 'translate-x-1');
                if (line2) line2.classList.remove('opacity-0');
                if (line3) line3.classList.remove('-rotate-45', 'translate-x-1');
            }
        }

        menuBtn.addEventListener('click', () => toggleMenu());
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Let the browser's native anchor navigation handle the scrolling.
                // The 'scroll-smooth' class on the <html> tag ensures it will be animated smoothly.
                // We just need to close the mobile menu.
                toggleMenu(false);
            });
        });
    }
}

// Run initialization on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
