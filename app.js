// --- Audio Synthesizer (Micro-interactions) ---
let audioCtx = null;
function playSound(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.32);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.32);
    } else if (type === 'gold') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1174.66, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    }
  } catch (e) {}
}

// --- Confetti Particle System ---
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
let confettiParticles = [];
let confettiAnimationId = null;

function resizeConfetti() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function triggerConfetti() {
  if (!ctx) return;
  confettiParticles = [];
  const colors = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
  
  for (let i = 0; i < 90; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2 + (Math.random() * 200 - 100),
      y: window.innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      life: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }

  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  if (!ctx) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.4;
    p.rotation += p.vRot;
    p.life -= p.decay;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();

    if (p.life <= 0 || p.y > window.innerHeight) {
      confettiParticles.splice(index, 1);
    }
  });

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiAnimationId = null;
  }
}

// --- Toast Notifications ---
const toastContainer = document.getElementById('toast-container');
function showToast(message, type = 'info') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'loyalty' ? 'toast-loyalty' : ''}`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 260);
  }, 2400);
}

// ============================================================================
// Catalogue Multi-Rayons Complet (Informatique, Électroménager, Légumes,
// Fruits, Jeux, Meubles, Accessoires, Alimentation)
// ============================================================================
const MULTI_DEPARTMENT_PRODUCTS = [
  // --- 💻 INFORMATIQUE ---
  { 
    id: 101, name: "Clavier Mécanique RGB Switch Bleu", category: "Informatique", 
    price: 125.000, costPrice: 85.000, icon: "⌨️", 
    stock: 2, salesVelocity: 1.8, leadTimeDays: 3, incomingOrders: 0, supplier: "TechWholesale Tunis" 
  },
  { 
    id: 102, name: "Souris Gamer RGB 7200 DPI", category: "Informatique", 
    price: 45.000, costPrice: 28.000, icon: "🖱️", 
    stock: 1, salesVelocity: 2.2, leadTimeDays: 2, incomingOrders: 0, supplier: "TechWholesale Tunis" 
  },
  { 
    id: 103, name: "Carte Graphique RTX 4060 8GB", category: "Informatique", 
    price: 1190.000, costPrice: 950.000, icon: "🎮", 
    stock: 0, salesVelocity: 0.5, leadTimeDays: 5, incomingOrders: 0, supplier: "Hardware Import Sfax" 
  },
  { 
    id: 104, name: "Écran Gamer 24\" 165Hz IPS", category: "Informatique", 
    price: 420.000, costPrice: 310.000, icon: "🖥️", 
    stock: 3, salesVelocity: 1.2, leadTimeDays: 3, incomingOrders: 5, supplier: "DisplayTech Tunis" 
  },
  { 
    id: 105, name: "Disque SSD NVMe M.2 1TB Gen4", category: "Informatique", 
    price: 210.000, costPrice: 155.000, icon: "💾", 
    stock: 8, salesVelocity: 1.5, leadTimeDays: 2, incomingOrders: 0, supplier: "Kingston TN Partner" 
  },
  { 
    id: 106, name: "PC Portable Gamer i7 RTX 4060", category: "Informatique", 
    price: 3200.000, costPrice: 2600.000, icon: "💻", 
    stock: 4, salesVelocity: 0.4, leadTimeDays: 7, incomingOrders: 0, supplier: "Asus Distribution TN" 
  },

  // --- ⚡ ÉLECTROMÉNAGER ---
  { 
    id: 201, name: "Friteuse Sans Huile Air Fryer 5.5L", category: "Électroménager", 
    price: 260.000, costPrice: 185.000, icon: "🍟", 
    stock: 3, salesVelocity: 1.5, leadTimeDays: 3, incomingOrders: 0, supplier: "ElectroHome Sousse" 
  },
  { 
    id: 202, name: "Micro-ondes Grill 20 Litres", category: "Électroménager", 
    price: 320.000, costPrice: 240.000, icon: "📻", 
    stock: 5, salesVelocity: 0.8, leadTimeDays: 4, incomingOrders: 0, supplier: "ElectroHome Sousse" 
  },
  { 
    id: 203, name: "Machine à Café Expresso Broyeur", category: "Électroménager", 
    price: 490.000, costPrice: 380.000, icon: "☕", 
    stock: 1, salesVelocity: 0.9, leadTimeDays: 4, incomingOrders: 0, supplier: "Delonghi TN Import" 
  },
  { 
    id: 204, name: "Mixeur Plongeant Multifonction 800W", category: "Électroménager", 
    price: 95.000, costPrice: 65.000, icon: "🥣", 
    stock: 12, salesVelocity: 1.2, leadTimeDays: 2, incomingOrders: 0, supplier: "ElectroHome Sousse" 
  },
  { 
    id: 205, name: "Aspirateur Sans Sac Silencieux", category: "Électroménager", 
    price: 280.000, costPrice: 205.000, icon: "🧹", 
    stock: 4, salesVelocity: 0.6, leadTimeDays: 3, incomingOrders: 0, supplier: "Moulinex/Tefal Partner" 
  },
  { 
    id: 206, name: "Fer à Repasser Vapeur Céramique", category: "Électroménager", 
    price: 75.000, costPrice: 48.000, icon: "👔", 
    stock: 9, salesVelocity: 1.0, leadTimeDays: 2, incomingOrders: 0, supplier: "Moulinex/Tefal Partner" 
  },

  // --- 🥦 LÉGUMES ---
  { 
    id: 301, name: "Tomates Fraîches Locales (1 Kg)", category: "Légumes", 
    price: 1.800, costPrice: 1.100, icon: "🍅", 
    stock: 65, salesVelocity: 35.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Marché de Gros Bir El Kassa" 
  },
  { 
    id: 302, name: "Pommes de Terre Spéciales (1 Kg)", category: "Légumes", 
    price: 2.200, costPrice: 1.400, icon: "🥔", 
    stock: 80, salesVelocity: 40.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Marché de Gros Bir El Kassa" 
  },
  { 
    id: 303, name: "Oignons Rouges Frais (1 Kg)", category: "Légumes", 
    price: 1.500, costPrice: 0.950, icon: "🧅", 
    stock: 40, salesVelocity: 20.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Marché de Gros Bir El Kassa" 
  },
  { 
    id: 304, name: "Piments Verts Piquants (1 Kg)", category: "Légumes", 
    price: 3.200, costPrice: 2.100, icon: "🌶️", 
    stock: 5, salesVelocity: 18.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Marché de Gros Bir El Kassa" 
  },
  { 
    id: 305, name: "Carottes Fraîches (1 Kg)", category: "Légumes", 
    price: 1.600, costPrice: 0.900, icon: "🥕", 
    stock: 25, salesVelocity: 12.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Marché de Gros Bir El Kassa" 
  },
  { 
    id: 306, name: "Laitue / Salade Verte (Pièce)", category: "Légumes", 
    price: 1.100, costPrice: 0.600, icon: "🥬", 
    stock: 14, salesVelocity: 15.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Marché de Gros Bir El Kassa" 
  },

  // --- 🍎 FRUITS ---
  { 
    id: 401, name: "Pommes Golden / Gala (1 Kg)", category: "Fruits", 
    price: 4.500, costPrice: 2.800, icon: "🍎", 
    stock: 35, salesVelocity: 16.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Vergers de Mornag" 
  },
  { 
    id: 402, name: "Bananes Importées (1 Kg)", category: "Fruits", 
    price: 7.800, costPrice: 5.800, icon: "🍌", 
    stock: 10, salesVelocity: 25.0, leadTimeDays: 2, incomingOrders: 0, supplier: "Import Fruits Tropicaux" 
  },
  { 
    id: 403, name: "Oranges Thomson Fraîches (1 Kg)", category: "Fruits", 
    price: 2.800, costPrice: 1.600, icon: "🍊", 
    stock: 45, salesVelocity: 20.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Vergers Cap Bon" 
  },
  { 
    id: 404, name: "Fraises Fraîches (Barquette 500g)", category: "Fruits", 
    price: 3.500, costPrice: 2.000, icon: "🍓", 
    stock: 3, salesVelocity: 14.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Vergers Cap Bon" 
  },
  { 
    id: 405, name: "Pastèque / Delle3 (Pièce ~6Kg)", category: "Fruits", 
    price: 8.500, costPrice: 4.500, icon: "🍉", 
    stock: 18, salesVelocity: 8.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Producteurs Sidi Bouzid" 
  },
  { 
    id: 406, name: "Dattes Deglet Nour (Boîte 1Kg)", category: "Fruits", 
    price: 12.000, costPrice: 7.500, icon: "🌴", 
    stock: 22, salesVelocity: 5.0, leadTimeDays: 3, incomingOrders: 0, supplier: "Oasis Tozeur Dattes" 
  },

  // --- 🎮 JEUX & GAMING ---
  { 
    id: 501, name: "Manette Sans Fil PS5 DualSense", category: "Jeux", 
    price: 240.000, costPrice: 180.000, icon: "🎮", 
    stock: 4, salesVelocity: 1.2, leadTimeDays: 3, incomingOrders: 0, supplier: "Sony Interactive TN" 
  },
  { 
    id: 502, name: "Jeu EA Sports FC 25 (PS5)", category: "Jeux", 
    price: 260.000, costPrice: 210.000, icon: "⚽", 
    stock: 2, salesVelocity: 1.8, leadTimeDays: 2, incomingOrders: 0, supplier: "Gaming Distribution Tunis" 
  },
  { 
    id: 503, name: "Console Nintendo Switch OLED", category: "Jeux", 
    price: 1180.000, costPrice: 940.000, icon: "🕹️", 
    stock: 3, salesVelocity: 0.5, leadTimeDays: 5, incomingOrders: 0, supplier: "Gaming Distribution Tunis" 
  },
  { 
    id: 504, name: "Jeu de Société Monopoly Classique", category: "Jeux", 
    price: 68.000, costPrice: 42.000, icon: "🎲", 
    stock: 7, salesVelocity: 0.8, leadTimeDays: 3, incomingOrders: 0, supplier: "Jouets & Loisirs TN" 
  },
  { 
    id: 505, name: "Casque Réalité Virtuelle VR", category: "Jeux", 
    price: 380.000, costPrice: 275.000, icon: "🥽", 
    stock: 1, salesVelocity: 0.4, leadTimeDays: 4, incomingOrders: 0, supplier: "Gaming Distribution Tunis" 
  },
  { 
    id: 506, name: "Volant de Course avec Pédalier", category: "Jeux", 
    price: 450.000, costPrice: 340.000, icon: "🏎️", 
    stock: 2, salesVelocity: 0.3, leadTimeDays: 5, incomingOrders: 0, supplier: "Gaming Distribution Tunis" 
  },

  // --- 🪑 MEUBLES ---
  { 
    id: 601, name: "Chaise Gamer Ergonomique Réglable", category: "Meubles", 
    price: 360.000, costPrice: 250.000, icon: "🪑", 
    stock: 4, salesVelocity: 0.9, leadTimeDays: 4, incomingOrders: 0, supplier: "Meubles & Déco Sfax" 
  },
  { 
    id: 602, name: "Bureau Informatique en L avec LED", category: "Meubles", 
    price: 290.000, costPrice: 195.000, icon: "🖥️", 
    stock: 3, salesVelocity: 0.6, leadTimeDays: 4, incomingOrders: 0, supplier: "Meubles & Déco Sfax" 
  },
  { 
    id: 603, name: "Table Basse Salon Moderne Bois & Métal", category: "Meubles", 
    price: 185.000, costPrice: 120.000, icon: "🪵", 
    stock: 5, salesVelocity: 0.7, leadTimeDays: 3, incomingOrders: 0, supplier: "Artisanat Bois Tunis" 
  },
  { 
    id: 604, name: "Étagère Bibliothèque 4 Niveaux", category: "Meubles", 
    price: 140.000, costPrice: 90.000, icon: "📚", 
    stock: 6, salesVelocity: 0.5, leadTimeDays: 3, incomingOrders: 0, supplier: "Meubles & Déco Sfax" 
  },
  { 
    id: 605, name: "Fauteuil Confort Salon Tissu", category: "Meubles", 
    price: 420.000, costPrice: 290.000, icon: "🛋️", 
    stock: 2, salesVelocity: 0.4, leadTimeDays: 5, incomingOrders: 0, supplier: "Artisanat Bois Tunis" 
  },

  // --- 🎧 ACCESSOIRES ---
  { 
    id: 701, name: "Écouteurs Sans Fil Bluetooth ANC", category: "Accessoires", 
    price: 85.000, costPrice: 52.000, icon: "🎧", 
    stock: 14, salesVelocity: 2.5, leadTimeDays: 2, incomingOrders: 0, supplier: "Accessoires Plus Tunis" 
  },
  { 
    id: 702, name: "Power Bank 20000mAh Charge Rapide", category: "Accessoires", 
    price: 65.000, costPrice: 40.000, icon: "🔋", 
    stock: 8, salesVelocity: 1.8, leadTimeDays: 2, incomingOrders: 0, supplier: "Accessoires Plus Tunis" 
  },
  { 
    id: 703, name: "Multiprise 5 Prises avec Ports USB", category: "Accessoires", 
    price: 32.000, costPrice: 18.000, icon: "🔌", 
    stock: 25, salesVelocity: 2.0, leadTimeDays: 2, incomingOrders: 0, supplier: "Accessoires Plus Tunis" 
  },
  { 
    id: 704, name: "Tapis de Souris XXL Antidérapant", category: "Accessoires", 
    price: 28.000, costPrice: 14.000, icon: "⬛", 
    stock: 19, salesVelocity: 1.4, leadTimeDays: 2, incomingOrders: 0, supplier: "Accessoires Plus Tunis" 
  },
  { 
    id: 705, name: "Support Téléphone Réglable Bureau", category: "Accessoires", 
    price: 18.000, costPrice: 9.000, icon: "📱", 
    stock: 30, salesVelocity: 2.2, leadTimeDays: 1, incomingOrders: 0, supplier: "Accessoires Plus Tunis" 
  },

  // --- 🥪 ALIMENTATION & BOISSONS ---
  { 
    id: 801, name: "Café Express Italien", category: "Alimentation", 
    price: 2.200, costPrice: 0.600, icon: "☕", 
    stock: 50, salesVelocity: 18.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Torréfaction Tunisienne" 
  },
  { 
    id: 802, name: "Sandwich Thon & Fromage", category: "Alimentation", 
    price: 5.500, costPrice: 2.800, icon: "🥪", 
    stock: 6, salesVelocity: 15.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Fournisseur Frais Quotidien" 
  },
  { 
    id: 803, name: "Pizza Individuelle 4 Saisons", category: "Alimentation", 
    price: 8.500, costPrice: 4.200, icon: "🍕", 
    stock: 3, salesVelocity: 7.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Fournisseur Frais Quotidien" 
  },
  { 
    id: 804, name: "Bouteille d'Eau Minérale 0.5L", category: "Alimentation", 
    price: 1.000, costPrice: 0.450, icon: "💧", 
    stock: 120, salesVelocity: 30.0, leadTimeDays: 1, incomingOrders: 0, supplier: "Distributeur Safia/Marwa" 
  },
  { 
    id: 805, name: "Canette Boisson Énergisante", category: "Alimentation", 
    price: 5.000, costPrice: 3.200, icon: "⚡", 
    stock: 16, salesVelocity: 5.0, leadTimeDays: 2, incomingOrders: 0, supplier: "Société Boissons Gazeuses" 
  }
];

// --- Clients de Démonstration ---
const DEFAULT_CLIENTS = [
  {
    id: "CL-101",
    name: "Ahmed Ben Salah",
    purchaseCount: 4,
    totalSpent: 185.200,
    products: { "Clavier Mécanique RGB Switch Bleu": 1, "Café Express Italien": 6, "Souris Gamer RGB 7200 DPI": 1 }
  },
  {
    id: "CL-102",
    name: "Karim Trabelsi",
    purchaseCount: 5,
    totalSpent: 340.500,
    products: { "Pizza Individuelle 4 Saisons": 4, "Écran Gamer 24\" 165Hz IPS": 1, "Pommes Golden / Gala (1 Kg)": 3 }
  },
  {
    id: "CL-103",
    name: "Sarra Meddeb",
    purchaseCount: 2,
    totalSpent: 62.000,
    products: { "Sandwich Thon & Fromage": 3, "Oranges Thomson Fraîches": 2, "Tomates Fraîches": 4 }
  }
];

// --- Application State ---
let products = JSON.parse(localStorage.getItem('pos_hyperstore_products_v2')) || MULTI_DEPARTMENT_PRODUCTS;
let cart = [];
let salesHistory = JSON.parse(localStorage.getItem('pos_all_sales_v3')) || [];
let clients = JSON.parse(localStorage.getItem('pos_clients_v2')) || DEFAULT_CLIENTS;

let activeCategory = 'all';
let searchQuery = '';
let isDiscountApplied = false;
const DISCOUNT_PERCENT = 0.10;

// SmartStock Filters
let smartStockTab = 'all';
let smartStockSearch = '';

// --- DOM Elements ---
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const categoriesBar = document.getElementById('categories-bar');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const cartItemCountEl = document.getElementById('cart-item-count');
const btnCheckout = document.getElementById('btn-checkout');
const btnClearCart = document.getElementById('btn-clear-cart');

// Client & Discount Elements
const clientNameInput = document.getElementById('client-name');
const clientsDatalist = document.getElementById('clients-datalist');
const clientLoyaltyStatus = document.getElementById('client-loyalty-status');
const btnLoyaltyDiscount = document.getElementById('btn-loyalty-discount');
const discountBtnText = document.getElementById('discount-btn-text');
const discountSummaryLine = document.getElementById('discount-summary-line');
const cartDiscountAmount = document.getElementById('cart-discount-amount');

// Header Stats
const totalRevenueEl = document.getElementById('total-revenue');
const totalSalesCountEl = document.getElementById('total-sales-count');
const clientsCountBadge = document.getElementById('clients-count-badge');
const aiAlertCountBadge = document.getElementById('ai-alert-count');

// SmartStock Elements
const btnSmartStock = document.getElementById('btn-smartstock');
const smartStockModal = document.getElementById('smartstock-modal');
const btnCloseSmartStockModal = document.getElementById('btn-close-smartstock-modal');
const btnCloseSmartStock = document.getElementById('btn-close-smartstock');
const btnRefreshAI = document.getElementById('btn-refresh-ai');
const smartStockTableBody = document.getElementById('smartstock-table-body');
const smartStockSearchInput = document.getElementById('smartstock-search');
const stockTabs = document.querySelectorAll('.stock-tab-btn');

// SmartStock KPIs
const aiKpiCritical = document.getElementById('ai-kpi-critical');
const aiKpiReorderQty = document.getElementById('ai-kpi-reorder-qty');
const aiKpiBudget = document.getElementById('ai-kpi-budget');
const aiKpiIncoming = document.getElementById('ai-kpi-incoming');
const tabAlertsCount = document.getElementById('tab-alerts-count');
const tabIncomingCount = document.getElementById('tab-incoming-count');

// Modals
const receiptModal = document.getElementById('receipt-modal');
const productModal = document.getElementById('product-modal');
const historyModal = document.getElementById('history-modal');
const clientsModal = document.getElementById('clients-modal');

const btnClients = document.getElementById('btn-clients');
const btnCloseClientsModal = document.getElementById('btn-close-clients-modal');
const btnCloseClients = document.getElementById('btn-close-clients');
const clientsSearchInput = document.getElementById('clients-search-input');
const clientsTableBody = document.getElementById('clients-table-body');
const clientsEmpty = document.getElementById('clients-empty');

const btnAddProduct = document.getElementById('btn-add-product');
const btnCloseProductModal = document.getElementById('btn-close-product-modal');
const btnCancelProduct = document.getElementById('btn-cancel-product');
const newProductForm = document.getElementById('new-product-form');

const btnHistory = document.getElementById('btn-history');
const btnCloseHistoryModal = document.getElementById('btn-close-history-modal');
const btnCloseHistory = document.getElementById('btn-close-history');
const btnResetHistory = document.getElementById('btn-reset-history');
const historyTableBody = document.getElementById('history-table-body');
const historyEmpty = document.getElementById('history-empty');

const btnPrintReceipt = document.getElementById('btn-print-receipt');
const btnCloseReceipt = document.getElementById('btn-close-receipt');

// --- Helper Functions ---
function formatPrice(amount) {
  return (amount || 0).toFixed(3) + ' DT';
}

function saveProducts() {
  localStorage.setItem('pos_hyperstore_products_v2', JSON.stringify(products));
}

function saveSalesHistory() {
  localStorage.setItem('pos_all_sales_v3', JSON.stringify(salesHistory));
}

function saveClients() {
  localStorage.setItem('pos_clients_v2', JSON.stringify(clients));
  updateClientsDatalist();
  clientsCountBadge.textContent = clients.length;
}

function updateClientsDatalist() {
  clientsDatalist.innerHTML = '';
  clients.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.label = `${c.id} (${c.purchaseCount} achats)`;
    clientsDatalist.appendChild(opt);
  });
}

function updateNavbarStats() {
  const totalRevenue = salesHistory.reduce((sum, sale) => sum + sale.total, 0);
  totalRevenueEl.textContent = formatPrice(totalRevenue);
  totalSalesCountEl.textContent = salesHistory.length;
  clientsCountBadge.textContent = clients.length;
  updateAIAlertCount();
}

// ============================================================================
// 🧠 SMARTSTOCK AI — Algorithme Prédictif
// ============================================================================
function runSmartStockAI(p) {
  const velocity = Math.max(0.1, p.salesVelocity || 1);
  const leadTime = p.leadTimeDays || 2;
  const currentStock = p.stock || 0;
  const incoming = p.incomingOrders || 0;

  const daysLeft = currentStock / velocity;
  const safetyStock = Math.ceil(velocity * 2);
  const reorderPoint = Math.ceil(velocity * leadTime) + safetyStock;

  let alertStatus = 'ok';
  let alertLabel = 'Stock Optimal';
  let whenToOrder = `Stock suffisant (~${Math.max(1, Math.round(daysLeft))}j)`;
  let whenClass = 'safe';

  if (currentStock === 0) {
    alertStatus = 'out';
    alertLabel = '🚨 Rupture de Stock';
    whenToOrder = 'Immédiatement (Rupture)';
    whenClass = 'urgent';
  } else if (daysLeft <= leadTime) {
    alertStatus = 'critical';
    alertLabel = `⚠️ Bientôt épuisé (~${Math.max(1, Math.round(daysLeft))}j)`;
    whenToOrder = 'Aujourd\'hui (Urgent !)';
    whenClass = 'urgent';
  } else if (currentStock <= reorderPoint) {
    alertStatus = 'warning';
    const daysBeforeOrder = Math.max(1, Math.floor(daysLeft - leadTime));
    alertLabel = `⚡ Réapprovisionner (~${Math.round(daysLeft)}j)`;
    whenToOrder = `Dans ${daysBeforeOrder} jour${daysBeforeOrder > 1 ? 's' : ''}`;
    whenClass = 'soon';
  }

  const targetBufferDays = 15;
  const idealStock = Math.ceil(velocity * targetBufferDays);
  let recommendedQty = Math.max(0, idealStock - currentStock - incoming);

  if ((alertStatus === 'out' || alertStatus === 'critical') && recommendedQty < 5) {
    recommendedQty = Math.max(5, Math.ceil(velocity * 7));
  }

  const estimatedCost = recommendedQty * (p.costPrice || (p.price * 0.7));

  return {
    daysLeft: Math.round(daysLeft * 10) / 10,
    alertStatus,
    alertLabel,
    whenToOrder,
    whenClass,
    recommendedQty,
    supplier: p.supplier || "Fournisseur Principal",
    leadTimeDays: leadTime,
    estimatedCost
  };
}

function updateAIAlertCount() {
  let criticalCount = 0;
  products.forEach(p => {
    const ai = runSmartStockAI(p);
    if (ai.alertStatus === 'out' || ai.alertStatus === 'critical') {
      criticalCount++;
    }
  });
  aiAlertCountBadge.textContent = criticalCount;
  if (criticalCount > 0) {
    aiAlertCountBadge.style.display = 'inline-block';
  } else {
    aiAlertCountBadge.style.display = 'none';
  }
}

function renderSmartStock() {
  smartStockTableBody.innerHTML = '';

  let totalCritical = 0;
  let totalReorderUnits = 0;
  let totalEstimatedBudget = 0;
  let totalIncomingOrders = 0;

  const analyzedProducts = products.map(p => {
    const ai = runSmartStockAI(p);
    if (ai.alertStatus === 'out' || ai.alertStatus === 'critical') totalCritical++;
    if (ai.alertStatus !== 'ok' && ai.recommendedQty > 0) {
      totalReorderUnits += ai.recommendedQty;
      totalEstimatedBudget += ai.estimatedCost;
    }
    if (p.incomingOrders > 0) totalIncomingOrders += p.incomingOrders;
    return { product: p, ai };
  });

  aiKpiCritical.textContent = `${totalCritical} article${totalCritical > 1 ? 's' : ''}`;
  aiKpiReorderQty.textContent = `${totalReorderUnits} unités`;
  aiKpiBudget.textContent = formatPrice(totalEstimatedBudget);
  aiKpiIncoming.textContent = `${totalIncomingOrders} en transit`;

  tabAlertsCount.textContent = totalCritical;
  tabIncomingCount.textContent = products.filter(p => p.incomingOrders > 0).length;

  const filtered = analyzedProducts.filter(({ product, ai }) => {
    const matchesSearch = product.name.toLowerCase().includes(smartStockSearch.toLowerCase()) ||
                          product.category.toLowerCase().includes(smartStockSearch.toLowerCase()) ||
                          (product.supplier || '').toLowerCase().includes(smartStockSearch.toLowerCase());
    if (!matchesSearch) return false;

    if (smartStockTab === 'alerts') {
      return ai.alertStatus === 'out' || ai.alertStatus === 'critical';
    }
    if (smartStockTab === 'incoming') {
      return product.incomingOrders > 0;
    }
    return true;
  });

  if (filtered.length === 0) {
    smartStockTableBody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 40px; color: #94a3b8;">
          <p style="font-size: 2rem; margin-bottom: 8px;">🧠</p>
          <p style="font-weight: 700; color: #475569;">Aucun article dans cette vue.</p>
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(({ product, ai }) => {
    const tr = document.createElement('tr');

    let stockBadgeClass = 'ok';
    if (product.stock === 0) stockBadgeClass = 'out';
    else if (ai.alertStatus === 'critical') stockBadgeClass = 'critical';
    else if (ai.alertStatus === 'warning') stockBadgeClass = 'warning';

    const incomingBadge = product.incomingOrders > 0
      ? `<span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 0.78rem;">🚚 +${product.incomingOrders} en cours</span>`
      : `<span style="color: #94a3b8; font-size: 0.78rem;">Aucune</span>`;

    let actionBtnHtml = '';
    if (product.incomingOrders > 0) {
      actionBtnHtml = `
        <button class="btn-receive-supplier" onclick="receiveSupplierOrder(${product.id})">
          📥 Réceptionner (+${product.incomingOrders})
        </button>
      `;
    } else if (ai.recommendedQty > 0) {
      actionBtnHtml = `
        <button class="btn-order-supplier" onclick="orderFromSupplier(${product.id}, ${ai.recommendedQty})">
          🚚 Commander (+${ai.recommendedQty})
        </button>
      `;
    } else {
      actionBtnHtml = `<span style="color: #10b981; font-weight: 700; font-size: 0.78rem;">✔ Stock Suffisant</span>`;
    }

    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.4rem;">${product.icon || '📦'}</span>
          <div>
            <strong>${product.name}</strong>
            <div style="font-size: 0.72rem; color: #64748b; font-weight: 600;">${product.category}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="badge-stock ${stockBadgeClass}">
          ${product.stock} unité${product.stock > 1 ? 's' : ''}
        </span>
      </td>
      <td>
        <strong>${product.salesVelocity || 1}</strong> <span style="font-size: 0.75rem; color: #64748b;">/ jour</span>
      </td>
      <td>
        ⏱️ <strong>${ai.leadTimeDays}</strong> jours
      </td>
      <td>
        ${incomingBadge}
      </td>
      <td>
        <span class="badge-stock ${stockBadgeClass}">
          ${ai.alertLabel}
        </span>
      </td>
      <td>
        <span class="recommended-box">+${ai.recommendedQty}</span>
        <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">~${formatPrice(ai.estimatedCost)}</div>
      </td>
      <td>
        <div class="supplier-info-box">
          <span class="supplier-name">${ai.supplier}</span>
          <span class="lead-time">Délai : ${ai.leadTimeDays}j</span>
        </div>
      </td>
      <td>
        <span class="when-to-order-badge ${ai.whenClass}">
          ${ai.whenToOrder}
        </span>
      </td>
      <td>
        ${actionBtnHtml}
      </td>
    `;
    smartStockTableBody.appendChild(tr);
  });
}

window.orderFromSupplier = function(productId, qty) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  prod.incomingOrders = (prod.incomingOrders || 0) + qty;
  saveProducts();
  renderProducts();
  renderSmartStock();
  updateAIAlertCount();

  playSound('click');
  showToast(`🚚 Commande de ${qty}x ${prod.name} envoyée à ${prod.supplier} !`, 'info');
};

window.receiveSupplierOrder = function(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod || !prod.incomingOrders) return;

  const added = prod.incomingOrders;
  prod.stock += added;
  prod.incomingOrders = 0;

  saveProducts();
  renderProducts();
  renderSmartStock();
  updateAIAlertCount();

  playSound('success');
  triggerConfetti();
  showToast(`🎉 Stock réapprovisionné : +${added} ${prod.name} !`, 'success');
};

// --- Rendu du Catalogue dans le Point de Vente ---
function renderProducts() {
  productsGrid.innerHTML = '';

  const filtered = products.filter(product => {
    const matchesCat = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: #94a3b8;">
        <p style="font-size: 2.8rem; margin-bottom: 10px;">🔍</p>
        <p style="font-weight: 700; font-size: 1.1rem; color: #475569;">Aucun produit dans ce rayon</p>
        <span style="font-size: 0.85rem;">Essayez un autre mot-clé ou choisissez une autre catégorie.</span>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const ai = runSmartStockAI(product);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-cat', product.category);

    let stockTagHtml = '';
    if (product.stock === 0) {
      stockTagHtml = `<span class="stock-badge-pos out">Rupture (0)</span>`;
    } else if (ai.alertStatus === 'critical') {
      stockTagHtml = `<span class="stock-badge-pos critical">Stock: ${product.stock} (Bas)</span>`;
    } else {
      stockTagHtml = `<span class="stock-badge-pos ok">Stock: ${product.stock}</span>`;
    }

    card.innerHTML = `
      <span class="product-icon">${product.icon || '📦'}</span>
      <span class="product-name" title="${product.name}">${product.name}</span>
      <div class="product-card-meta">
        <span class="product-cat">${product.category}</span>
        ${stockTagHtml}
      </div>
      <span class="product-price">${formatPrice(product.price)}</span>
    `;

    card.addEventListener('click', () => {
      if (product.stock <= 0) {
        playSound('click');
        showToast(`⚠️ Attention: ${product.name} est en rupture de stock !`, 'info');
      }
      playSound('click');
      addToCart(product);
    });
    productsGrid.appendChild(card);
  });
}

// --- Cart Operations ---
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    if (existingItem.qty >= product.stock && product.stock > 0) {
      showToast(`⚠️ Stock limité (${product.stock} disponibles)`, 'info');
    }
    existingItem.qty += 1;
    showToast(`+1 ${product.name}`, 'info');
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
    showToast(`🛒 Ajouté : ${product.name}`, 'info');
  }
  renderCart();
}

function changeQty(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  playSound('click');
  cart[itemIndex].qty += delta;
  if (cart[itemIndex].qty <= 0) {
    cart.splice(itemIndex, 1);
  }
  renderCart();
}

function clearCart() {
  if (cart.length > 0) {
    playSound('click');
    cart = [];
    isDiscountApplied = false;
    renderCart();
    checkClientLoyalty();
    showToast('Panier vidé', 'info');
  }
}

// --- Loyalty & Discount Check ---
function checkClientLoyalty() {
  const name = clientNameInput.value.trim();
  if (!name) {
    clientLoyaltyStatus.style.display = 'none';
    btnLoyaltyDiscount.disabled = true;
    btnLoyaltyDiscount.className = 'btn-discount';
    discountBtnText.textContent = 'Remise 5ème Achat (-10%)';
    isDiscountApplied = false;
    calculateTotals();
    return;
  }

  const existingClient = clients.find(c => c.name.toLowerCase() === name.toLowerCase());

  if (existingClient) {
    const currentCount = existingClient.purchaseCount;
    const isEligible = (currentCount >= 4);

    clientLoyaltyStatus.style.display = 'flex';

    if (isEligible) {
      clientLoyaltyStatus.className = 'loyalty-status-banner eligible';
      clientLoyaltyStatus.innerHTML = `
        <span>🎉 <strong>${existingClient.id}</strong> : 5ème Achat atteint (${currentCount} achats précédents) !</span>
        <span>Eligible -10% ✨</span>
      `;

      btnLoyaltyDiscount.disabled = false;
      if (isDiscountApplied) {
        btnLoyaltyDiscount.className = 'btn-discount active';
        discountBtnText.textContent = '✔ Remise 10% Appliquée (Annuler)';
      } else {
        btnLoyaltyDiscount.className = 'btn-discount ready';
        discountBtnText.textContent = '🎁 Activer Remise 5ème Achat (-10%)';
      }
    } else {
      clientLoyaltyStatus.className = 'loyalty-status-banner';
      clientLoyaltyStatus.innerHTML = `
        <span>👤 <strong>${existingClient.id}</strong> (${currentCount}/5 achats)</span>
        <span>Encore ${5 - currentCount} achat(s)</span>
      `;
      btnLoyaltyDiscount.disabled = true;
      btnLoyaltyDiscount.className = 'btn-discount';
      discountBtnText.textContent = `Remise 5ème Achat (${currentCount}/5)`;
      isDiscountApplied = false;
    }
  } else {
    clientLoyaltyStatus.style.display = 'flex';
    clientLoyaltyStatus.className = 'loyalty-status-banner';
    clientLoyaltyStatus.innerHTML = `
      <span>✨ Nouveau Client (Sera enregistré au 1er achat)</span>
      <span>1/5 achat</span>
    `;
    btnLoyaltyDiscount.disabled = true;
    btnLoyaltyDiscount.className = 'btn-discount';
    discountBtnText.textContent = 'Remise 5ème Achat (1/5)';
    isDiscountApplied = false;
  }

  calculateTotals();
}

btnLoyaltyDiscount.addEventListener('click', () => {
  if (btnLoyaltyDiscount.disabled) return;
  isDiscountApplied = !isDiscountApplied;
  if (isDiscountApplied) {
    playSound('gold');
    triggerConfetti();
    showToast('🎁 Remise 10% Activée avec succès !', 'loyalty');
  } else {
    playSound('click');
  }
  checkClientLoyalty();
});

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discountAmount = 0;

  if (isDiscountApplied && subtotal > 0) {
    discountAmount = subtotal * DISCOUNT_PERCENT;
    discountSummaryLine.style.display = 'flex';
    cartDiscountAmount.textContent = '-' + formatPrice(discountAmount);
  } else {
    discountSummaryLine.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  cartSubtotalEl.textContent = formatPrice(subtotal);
  cartTotalEl.textContent = formatPrice(finalTotal);

  return { subtotal, discountAmount, finalTotal };
}

function renderCart() {
  cartItemsContainer.innerHTML = '';

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartItemCountEl.textContent = `${totalItems} article${totalItems > 1 ? 's' : ''}`;

  btnCheckout.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p style="font-weight: 700; color: #475569; margin-bottom: 4px;">Votre panier est vide</p>
        <span style="font-size: 0.8rem; color: #94a3b8;">Cliquez sur un article dans le catalogue pour l'ajouter</span>
      </div>
    `;
    calculateTotals();
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name" title="${item.name}">${item.name}</div>
        <div class="cart-item-sub">${formatPrice(item.price)} × ${item.qty}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <div class="cart-item-total">
        ${formatPrice(item.price * item.qty)}
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  calculateTotals();
}

// --- Checkout, Stock Decrement & AI Auto-Update ---
function checkout() {
  if (cart.length === 0) return;

  const { subtotal, discountAmount, finalTotal } = calculateTotals();
  let clientName = clientNameInput.value.trim() || 'Client Comptant';
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  // 1. Décrémenter Stock
  cart.forEach(cartItem => {
    const prod = products.find(p => p.id === cartItem.id);
    if (prod) {
      prod.stock = Math.max(0, (prod.stock || 0) - cartItem.qty);
      prod.salesVelocity = Math.round(((prod.salesVelocity || 1) + 0.1) * 10) / 10;
    }
  });
  saveProducts();

  // 2. Mise à jour Client
  let clientObj = clients.find(c => c.name.toLowerCase() === clientName.toLowerCase());
  let clientId = '';

  if (clientName !== 'Client Comptant') {
    if (clientObj) {
      clientObj.purchaseCount += 1;
      clientObj.totalSpent += finalTotal;
      clientId = clientObj.id;

      if (!clientObj.products) clientObj.products = {};
      cart.forEach(item => {
        clientObj.products[item.name] = (clientObj.products[item.name] || 0) + item.qty;
      });
    } else {
      clientId = `CL-${100 + clients.length + 1}`;
      clientObj = {
        id: clientId,
        name: clientName,
        purchaseCount: 1,
        totalSpent: finalTotal,
        products: {}
      };
      cart.forEach(item => {
        clientObj.products[item.name] = item.qty;
      });
      clients.push(clientObj);
    }
    saveClients();
  }

  // 3. Enregistrement de la vente
  const sale = {
    id: Date.now(),
    date: dateStr,
    client: clientName + (clientId ? ` (${clientId})` : ''),
    items: [...cart],
    subtotal: subtotal,
    discount: discountAmount,
    total: finalTotal
  };

  salesHistory.unshift(sale);
  saveSalesHistory();
  updateNavbarStats();

  // 4. Sons, Confetti, Toast & Impression
  playSound('success');
  triggerConfetti();
  showToast('🎉 Vente validée avec succès ! Stock mis à jour', 'success');

  // Populate Printable Receipt
  document.getElementById('receipt-date').textContent = `Date : ${dateStr}`;
  document.getElementById('receipt-client').textContent = `Client : ${clientName} ${clientId ? '(' + clientId + ')' : ''}`;

  const receiptLoyalty = document.getElementById('receipt-loyalty');
  if (clientObj && clientObj.purchaseCount >= 5) {
    receiptLoyalty.style.display = 'block';
    receiptLoyalty.textContent = `⭐ Client Fidèle : ${clientObj.purchaseCount}ème Achat !`;
  } else {
    receiptLoyalty.style.display = 'none';
  }

  const receiptTable = document.getElementById('receipt-table');
  receiptTable.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'receipt-row';
    row.innerHTML = `
      <span>${item.qty}x ${item.name}</span>
      <span>${formatPrice(item.price * item.qty)}</span>
    `;
    receiptTable.appendChild(row);
  });

  const receiptSubtotalRow = document.getElementById('receipt-subtotal-row');
  const receiptDiscountRow = document.getElementById('receipt-discount-row');

  if (discountAmount > 0) {
    receiptSubtotalRow.style.display = 'flex';
    document.getElementById('receipt-subtotal').textContent = formatPrice(subtotal);
    receiptDiscountRow.style.display = 'flex';
    document.getElementById('receipt-discount').textContent = '-' + formatPrice(discountAmount);
  } else {
    receiptSubtotalRow.style.display = 'none';
    receiptDiscountRow.style.display = 'none';
  }

  document.getElementById('receipt-total').textContent = formatPrice(finalTotal);

  receiptModal.classList.add('active');

  cart = [];
  clientNameInput.value = '';
  isDiscountApplied = false;
  checkClientLoyalty();
  renderCart();
  renderProducts();
  updateAIAlertCount();
}

// --- SmartStock Modal Listeners ---
btnSmartStock.addEventListener('click', () => {
  playSound('click');
  renderSmartStock();
  smartStockModal.classList.add('active');
});

btnCloseSmartStockModal.addEventListener('click', () => smartStockModal.classList.remove('active'));
btnCloseSmartStock.addEventListener('click', () => smartStockModal.classList.remove('active'));

btnRefreshAI.addEventListener('click', () => {
  playSound('click');
  renderSmartStock();
  updateAIAlertCount();
  showToast('🧠 Analyse IA recalculée avec succès !', 'success');
});

smartStockSearchInput.addEventListener('input', (e) => {
  smartStockSearch = e.target.value;
  renderSmartStock();
});

stockTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    playSound('click');
    stockTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    smartStockTab = tab.dataset.tab;
    renderSmartStock();
  });
});

// --- Clients Modal Rendering ---
function renderClients(search = '') {
  clientsTableBody.innerHTML = '';

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) {
    clientsEmpty.style.display = 'block';
  } else {
    clientsEmpty.style.display = 'none';
    filtered.forEach(c => {
      const tr = document.createElement('tr');

      const prodsList = c.products ? Object.entries(c.products).map(([name, qty]) => 
        `<span class="prod-tag">${qty}x ${name}</span>`
      ).join('') : '<em>Aucun</em>';

      const isEligible = c.purchaseCount >= 4;
      const statusBadge = isEligible 
        ? `<span class="remise-badge-eligible">🎁 Remise 10% Prête !</span>`
        : `<span class="remise-badge-progress">${c.purchaseCount}/5 achats</span>`;

      tr.innerHTML = `
        <td><span class="client-id-badge">${c.id}</span></td>
        <td><strong>${c.name}</strong></td>
        <td>
          <span class="purchase-count-badge ${c.purchaseCount >= 5 ? 'five-star' : ''}">
            ${c.purchaseCount} achat${c.purchaseCount > 1 ? 's' : ''} ${c.purchaseCount >= 5 ? '⭐' : ''}
          </span>
        </td>
        <td><div class="client-products-list">${prodsList}</div></td>
        <td><strong>${formatPrice(c.totalSpent)}</strong></td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn-select-client" onclick="selectClientForCart('${c.name.replace(/'/g, "\\'")}')">
            🛒 Choisir
          </button>
        </td>
      `;
      clientsTableBody.appendChild(tr);
    });
  }
}

window.selectClientForCart = function(clientName) {
  playSound('click');
  clientNameInput.value = clientName;
  checkClientLoyalty();
  clientsModal.classList.remove('active');
  showToast(`Client sélectionné : ${clientName}`, 'info');
};

clientsSearchInput.addEventListener('input', (e) => {
  renderClients(e.target.value);
});

btnClients.addEventListener('click', () => {
  playSound('click');
  renderClients();
  clientsModal.classList.add('active');
});
btnCloseClientsModal.addEventListener('click', () => clientsModal.classList.remove('active'));
btnCloseClients.addEventListener('click', () => clientsModal.classList.remove('active'));

clientNameInput.addEventListener('input', checkClientLoyalty);
clientNameInput.addEventListener('change', checkClientLoyalty);

// --- New Product Submission with Category & Stock ---
newProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('prod-name').value.trim();
  const price = parseFloat(document.getElementById('prod-price').value);
  const category = document.getElementById('prod-category').value;
  const stock = parseInt(document.getElementById('prod-stock').value, 10) || 10;
  const supplier = document.getElementById('prod-supplier').value.trim() || 'Grossiste Central';
  const icon = document.getElementById('prod-icon').value.trim() || '📦';

  if (!name || isNaN(price)) return;

  const newProd = {
    id: Date.now(),
    name,
    category,
    price,
    costPrice: price * 0.7,
    stock,
    salesVelocity: 1.0,
    leadTimeDays: 2,
    incomingOrders: 0,
    supplier,
    icon
  };

  products.unshift(newProd);
  saveProducts();
  renderProducts();
  updateAIAlertCount();

  playSound('success');
  showToast(`✨ Produit ajouté : ${name} dans ${category} !`, 'success');

  newProductForm.reset();
  document.getElementById('prod-icon').value = '📦';
  productModal.classList.remove('active');
});

// --- Sales History ---
function renderHistory() {
  historyTableBody.innerHTML = '';
  if (salesHistory.length === 0) {
    historyEmpty.style.display = 'block';
  } else {
    historyEmpty.style.display = 'none';
    salesHistory.forEach((sale, index) => {
      const tr = document.createElement('tr');
      const itemsList = sale.items.map(it => `${it.qty}x ${it.name}`).join(', ');
      const discountText = sale.discount > 0 ? `<span style="color: #059669; font-weight: 700;">-${formatPrice(sale.discount)}</span>` : '<span style="color: #94a3b8;">0 DT</span>';

      tr.innerHTML = `
        <td><strong>#${salesHistory.length - index}</strong></td>
        <td>${sale.date}</td>
        <td>${sale.client}</td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsList}">${itemsList}</td>
        <td>${discountText}</td>
        <td><strong style="color: #2563eb;">${formatPrice(sale.total)}</strong></td>
      `;
      historyTableBody.appendChild(tr);
    });
  }
}

// Search & Filter
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
});

categoriesBar.addEventListener('click', (e) => {
  const pill = e.target.closest('.cat-pill');
  if (pill) {
    playSound('click');
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    pill.classList.add('active');
    activeCategory = pill.dataset.category;
    renderProducts();
  }
});

// Cart Buttons
btnClearCart.addEventListener('click', clearCart);
btnCheckout.addEventListener('click', checkout);

// Add Product Modal
btnAddProduct.addEventListener('click', () => {
  playSound('click');
  productModal.classList.add('active');
});
btnCloseProductModal.addEventListener('click', () => productModal.classList.remove('active'));
btnCancelProduct.addEventListener('click', () => productModal.classList.remove('active'));

// History Modal
btnHistory.addEventListener('click', () => {
  playSound('click');
  renderHistory();
  historyModal.classList.add('active');
});
btnCloseHistoryModal.addEventListener('click', () => historyModal.classList.remove('active'));
btnCloseHistory.addEventListener('click', () => historyModal.classList.remove('active'));

btnResetHistory.addEventListener('click', () => {
  if (confirm("Êtes-vous sûr de vouloir réinitialiser tout l'historique des ventes ?")) {
    salesHistory = [];
    saveSalesHistory();
    updateNavbarStats();
    renderHistory();
    showToast('Historique des ventes réinitialisé', 'info');
  }
});

// Receipt Modal
btnCloseReceipt.addEventListener('click', () => receiptModal.classList.remove('active'));
btnPrintReceipt.addEventListener('click', () => {
  window.print();
});

// --- Initial Setup ---
updateNavbarStats();
updateClientsDatalist();
renderProducts();
renderCart();
