const products = [
    { id: 1, name: "Kablosuz Kulaklık", price: 1250, category: "Ses", image: "img/kulaklik.jpg" },
    { id: 2, name: "Akıllı Saat", price: 3400, category: "Giyilebilir", image: "img/saat.jpg" },
    { id: 3, name: "Mekanik Klavye", price: 2100, category: "Aksesuar", image: "img/klavye.jpg" },
    { id: 4, name: "Oyuncu Mouse", price: 950, category: "Aksesuar", image: "img/mouse.jpg" },
    { id: 5, name: "Bluetooth Hoparlör", price: 1800, category: "Ses", image: "img/hoparlor.jpg" },
    { id: 6, name: "USB-C Hub", price: 650, category: "Aksesuar", image: "img/hub.jpg" },
    { id: 7, name: "Laptop Standı", price: 1100, category: "Ofis", image: "img/stand.jpg" },
    { id: 8, name: "Kablosuz Şarj Cihazı", price: 850, category: "Aksesuar", image: "img/sarj.jpg" }
];

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

const productList = document.getElementById("product-list");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalAmount = document.getElementById("total-amount");
const cartModal = document.getElementById("cart-modal");

function displayProducts(data = products) {
    productList.innerHTML = data.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <span class="category-tag">${product.category}</span>
            <p class="price">${product.price} TL</p>
            <button onclick="addToCart(${product.id})">Sepete Ekle</button>
        </div>
    `).join("");
}

function filterProducts(category) {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
}

function searchProducts() {
    const term = document.getElementById("search-input").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    displayProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, cartId: Date.now() });
    showNotification(`${product.name} sepete eklendi!`);
    updateUI();
}

function showNotification(message) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

function updateUI() {
    localStorage.setItem("myCart", JSON.stringify(cart));
    cartCount.innerText = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.innerText = total.toLocaleString('tr-TR');
    cartItemsList.innerHTML = cart.map((item, index) => `
        <li>
            <span>${item.name}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Sil</button>
        </li>
    `).join("");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateUI();
}

document.getElementById("cart-button").addEventListener("click", () => cartModal.classList.add("active"));
document.getElementById("close-cart").addEventListener("click", () => cartModal.classList.remove("active"));
document.getElementById("clear-cart").addEventListener("click", () => {
    if(confirm("Sepet boşaltılsın mı?")) { cart = []; updateUI(); }
});

displayProducts();
updateUI();