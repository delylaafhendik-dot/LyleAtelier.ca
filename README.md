# 🎀 Lylé Atelier — High-End Coquette Boutique Website

Website e-commerce butik eksklusif berpemberitahuan langsung ke perangkat Anda (via Telegram Bot API), dirancang khusus untuk di-host di **GitHub Pages** dengan tema **Aesthetic Coquette & Soft Pastel**.

---

## 📁 Isi File ZIP

1. `index.html` — Struktur utama website butik Lylé Atelier.
2. `style.css` — Desain visual bernuansa Coquette (Pastel Pink, Ribbon, Cream, Vintage Luxury Fonts).
3. `script.js` — Logika interaktif e-commerce (katalog, filter kategori, keranjang belanja) & Notifikasi Login ke Device.
4. `CNAME` — File domain kustom untuk GitHub Pages (`lyleatelier.com`).
5. `README.md` — Panduan lengkap ini.

---

## 📲 Cara Mengaktifkan Notifikasi Login ke HP / Device Anda (Gratis & Real-Time)

Website ini menggunakan **Telegram Bot API** untuk mengirim notifikasi login secara instant ke HP Anda tanpa perlu server backend mahal.

### Langkah-langkah (Hanya 2 Menit):
1. **Buka Aplikasi Telegram** di HP Anda.
2. Cari bot bernama `@BotFather`, lalu kirim pesan `/newbot`.
3. Ikuti petunjuk untuk membuat bot, lalu Anda akan mendapatkan **BOT TOKEN** (Contoh: `7123456789:ABCdefGHIjklMNOpqrsTUVwxyz`).
4. Cari bot bernama `@userinfobot` di Telegram, kirim pesan apa saja untuk melihat **ID Chat Telegram Anda** (Contoh: `123456789`).
5. Buka file `script.js`, cari kode berikut di bagian paling atas:

```javascript
const TELEGRAM_CONFIG = {
    botToken: "MASUKKAN_BOT_TOKEN_DISINI",
    chatId: "MASUKKAN_CHAT_ID_DISINI"
};
```
6. Simpan file! Sekarang setiap kali ada orang yang login di website Lylé Atelier Anda, HP Anda akan bergetar dan menerima pesan notifikasi Telegram secara real-time! 🎀

---

## 🚀 Cara Upload ke GitHub Pages

1. Buat repository baru di GitHub (misal: `lyle-atelier`).
2. Extract file ZIP ini, lalu Upload semua file (`index.html`, `style.css`, `script.js`, `CNAME`) ke repository GitHub tersebut.
3. Masuk ke **Settings** repository > **Pages**.
4. Di bagian **Source**, pilih branch `main` (atau `master`) dan folder `/root`, lalu klik **Save**.
5. Jika menggunakan Custom Domain, domain yang tertulis di file `CNAME` (`lyleatelier.com`) akan otomatis terhubung!

---
✨ *Crafted with love for Lylé Atelier*
