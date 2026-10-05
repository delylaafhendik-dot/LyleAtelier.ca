// ==========================================================================
// Lylé Atelier — E-Commerce & Login Telegram Notification Logic
// ==========================================================================

// Configuration Telegram Bot untuk Notifikasi ke Device
// (Opsional: Masukkan BOT TOKEN & CHAT ID Telegram Anda untuk menerima notifikasi)
const TELEGRAM_CONFIG = {
    botToken: "YOUR_TELEGRAM_BOT_TOKEN", // Contoh: "7123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
    chatId: "YOUR_TELEGRAM_CHAT_ID"     // Contoh: "123456789"
};

// Data Produk Lylé Atelier (High-End & Coquette Fashion)
const products = [
    {
        id: 1,
        name: "Lylé Silk Coquette Corset Dress",
        category: "baju",
        price: 4850000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
        badge: "Haute Couture"
    },
    {
        id: 2,
        name: "Atelier Pearl Tweed Skirt",
        category: "rok",
        price: 2750000,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80",
        badge: "New Arrival"
    },
    {
        id: 3,
        name: "Vintage Pastel Lace Blouse",
        category: "baju",
        price: 1950000,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80",
        badge: "Bestseller"
    },
    {
        id: 4,
        name: "Rose Gold Satin Wide Trousers",
        category: "rok",
        price: 2400000,
        image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80",
        badge: "Limited"
    },
    {
        id: 5,
        name: "Ribbon Bow Stiletto Heels",
        category: "sepatu",
        price: 3600000,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        badge: "Exclusive"
    },
    {
        id: 6,
        name: "Oval Pearl Pastel Sunglasses",
        category: "kacamata",
        price: 1850000,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        badge: "Accessories"
    },
    {
        id: 7,
        name: "Velvet Soft Blush & Glow Palette",
        category: "makeup",
        price: 920000,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        badge: "Beauty"
    },
    {
        id: 8,
        name: "Petal Glow Lip Silk Hydrator",
        category: "makeup",
        price: 650000,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
        badge: "Beauty"
    }
];

// Cart State
let cart = [];

// Initialize DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    setupEventListeners();
    checkUserSession();
});

// Render Product Cards
function renderProducts(items) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">Produk tidak ditemukan 🎀</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image-wrap">
                <span class="badge-tag">${product.badge}</span>
                <button class="wishlist-btn" title="Simpan ke Favorit"><i class="fa-regular fa-heart"></i></button>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">Rp ${product.price.toLocaleString("id-ID")}</div>
                <button class="add-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Event Listeners Setup
function setupEventListeners() {
    // Category Filters
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");
            if (category === "all") {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });

    // Search Input
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    // Login Modal Toggles
    const userBtn = document.getElementById("userBtn");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");

    userBtn.addEventListener("click", () => {
        const currentUser = localStorage.getItem("lyle_vip_user");
        if (currentUser) {
            if (confirm(`Anda login sebagai ${currentUser}. Ingin keluar (Logout)?`)) {
                localStorage.removeItem("lyle_vip_user");
                checkUserSession();
                showToast("Berhasil logout dari Lylé Atelier.");
            }
        } else {
            loginModal.classList.add("active");
        }
    });

    closeLogin.addEventListener("click", () => loginModal.classList.remove("active"));

    // Cart Modal Toggles
    const cartBtn = document.getElementById("cartBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    cartBtn.addEventListener("click", () => cartOverlay.classList.add("active"));
    closeCart.addEventListener("click", () => cartOverlay.classList.remove("active"));

    // Login Form Submit
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleLoginSubmit);

    // Checkout Button
    document.getElementById("checkoutBtn").addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Keranjang Anda masih kosong 🛍️");
            return;
        }
        showToast("Pesanan VIP diproses! Butik Lylé Atelier akan menghubungi Anda. 🎀");
        cart = [];
        updateCartUI();
        cartOverlay.classList.remove("active");
    });
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`"${product.name}" ditambahkan ke keranjang ✨`);
}

// Update Cart Display
function updateCartUI() {
    const cartBody = document.getElementById("cartBody");
    const cartCount = document.getElementById("cartCount");
    const cartTotalAmount = document.getElementById("cartTotalAmount");

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartCount.textContent = totalQty;
    cartTotalAmount.textContent = `Rp ${totalPrice.toLocaleString("id-ID")}`;

    if (cart.length === 0) {
        cartBody.innerHTML = `<p style="text-align: center; color: #888; margin-top: 30px;">Keranjang belanja Anda kosong 🎀</p>`;
        return;
    }

    cartBody.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.qty} x Rp ${item.price.toLocaleString("id-ID")}</div>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartBody.appendChild(cartItem);
    });
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Handle Login Submit & Send Push Notification to Device via Telegram Bot API
function handleLoginSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const loginModal = document.getElementById("loginModal");

    // Save session locally
    localStorage.setItem("lyle_vip_user", email);
    checkUserSession();
    loginModal.classList.remove("active");

    const loginTime = new Date().toLocaleString("id-ID");
    const userAgent = navigator.userAgent;

    // Toast message
    showToast(`Selamat datang VIP, ${email}! ✨`);

    // Send Notification to Device via Telegram Bot API
    sendTelegramNotification(email, loginTime, userAgent);
}

// Telegram Bot API Notification Function
function sendTelegramNotification(email, time, device) {
    if (TELEGRAM_CONFIG.botToken === "YOUR_TELEGRAM_BOT_TOKEN") {
        console.log("ℹ️ [Lylé Atelier] Notifikasi Telegram siap dikonfigurasi. Silakan isi BOT_TOKEN di script.js.");
        showToast("Notifikasi Login Tercatat (Simulasi Device Notification) 🎀");
        return;
    }

    const message = `🎀 *NOTIFIKASI LOGIN VIP — LYLÉ ATELIER* 🎀

` +
                    `👤 *User Email*: ${email}
` +
                    `⏰ *Waktu*: ${time}
` +
                    `📱 *Perangkat*: ${device.slice(0, 100)}...

` +
                    `✨ _Pengunjung baru saja masuk ke butik GitHub Pages Anda!_`;

    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.chatId,
            text: message,
            parse_mode: "Markdown"
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            console.log("✅ Notifikasi berhasil dikirim ke perangkat HP!");
            showToast("Notifikasi login berhasil dikirim ke HP Anda! 📲");
        } else {
            console.error("❌ Gagal mengirim notifikasi Telegram:", data);
        }
    })
    .catch(err => {
        console.error("❌ Error mengirim notifikasi:", err);
    });
}

// Check Local User Session
function checkUserSession() {
    const currentUser = localStorage.getItem("lyle_vip_user");
    const userStatusText = document.getElementById("userStatusText");

    if (currentUser) {
        userStatusText.textContent = currentUser.split("@")[0];
    } else {
        userStatusText.textContent = "Login";
    }
}

// Show Toast Message
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}
