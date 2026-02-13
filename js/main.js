// 1. DATA MERCHANT & STATE
const MERCHANT_CODE = "DS28118"; //
const API_KEY = "a5ac61c681a88e6774084fa4a5a7b4dd"; //
const DUITKU_URL = "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry";

let selectedProduct = null;
let selectedPrice = 0;
let cartHistory = JSON.parse(localStorage.getItem("flinn_history")) || [];

const products = [
  {
    id: 1,
    name: "Mobile Legends",
    icon: "fa-gamepad",
    color: "from-blue-500 to-indigo-600",
    cat: "Game",
  },
  {
    id: 2,
    name: "Free Fire",
    icon: "fa-fire",
    color: "from-orange-500 to-red-600",
    cat: "Game",
  },
  {
    id: 3,
    name: "PUBG Mobile",
    icon: "fa-gun",
    color: "from-yellow-600 to-yellow-800",
    cat: "Game",
  },
  {
    id: 4,
    name: "Genshin Impact",
    icon: "fa-star",
    color: "from-teal-400 to-emerald-600",
    cat: "Game",
  },
  {
    id: 5,
    name: "Netflix Premium",
    icon: "fa-play-circle",
    color: "from-red-600 to-black",
    cat: "App",
  },
  {
    id: 6,
    name: "Spotify Family",
    icon: "fa-music",
    color: "from-green-500 to-emerald-700",
    cat: "App",
  },
  {
    id: 7,
    name: "YouTube Premium",
    icon: "fa-video",
    color: "from-red-500 to-red-700",
    cat: "App",
  },
  {
    id: 8,
    name: "Telkomsel",
    icon: "fa-signal",
    color: "from-red-600 to-red-500",
    cat: "Pulsa",
  },
  {
    id: 9,
    name: "Indosat",
    icon: "fa-signal",
    color: "from-yellow-400 to-orange-500",
    cat: "Pulsa",
  },
  {
    id: 10,
    name: "XL Axiata",
    icon: "fa-wifi",
    color: "from-blue-600 to-blue-800",
    cat: "Pulsa",
  },
];

// 2. LOGIKA RENDER & SEARCH
function renderHome(filter = "Semua") {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
        <section class="container mx-auto px-4 mt-8">
            <div class="relative">
                <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="text" id="search-input" onkeyup="searchProduct()" placeholder="Cari game atau pulsa..." 
                class="w-full bg-white dark:bg-darkCard p-5 pl-14 rounded-3xl shadow-lg border-none outline-none focus:ring-2 ring-primary dark:text-white transition-all text-sm">
            </div>
        </section>
        <section class="container mx-auto px-4 mb-4 flex gap-3 overflow-x-auto no-scrollbar mt-8">
            ${["Semua", "Game", "App", "Pulsa"]
              .map(
                (c) => `
                <button onclick="renderHome('${c}')" class="${filter === c ? "bg-primary text-white" : "bg-white dark:bg-darkCard text-gray-500"} px-6 py-2.5 rounded-2xl font-bold shadow-md transition whitespace-nowrap">${c}</button>
            `,
              )
              .join("")}
        </section>
        <section class="container mx-auto px-4 py-4 mb-20">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" id="game-container"></div>
        </section>`;
  renderItems("", filter);
}

function renderItems(query = "", filter = "Semua") {
  const container = document.getElementById("game-container");
  container.innerHTML = "";
  products
    .filter(
      (p) =>
        (filter === "Semua" || p.cat === filter) &&
        p.name.toLowerCase().includes(query),
    )
    .forEach((item) => {
      container.innerHTML += `
            <div onclick="showOrder('${item.name}', '${item.icon}', '${item.color}')" class="group bg-white dark:bg-darkCard rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer border dark:border-gray-800">
                <div class="relative rounded-[2rem] aspect-square mb-4 bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg">
                    <i class="fas ${item.icon} text-5xl text-white opacity-90 group-hover:scale-110 transition-transform"></i>
                </div>
                <div class="text-center"><h4 class="font-black text-sm dark:text-white uppercase truncate">${item.name}</h4></div>
            </div>`;
    });
}

function searchProduct() {
  const query = document.getElementById("search-input").value.toLowerCase();
  renderItems(query);
}

// 3. LOGIKA ORDER & NOMINAL
function showOrder(gameName, icon, color) {
  selectedProduct = gameName;
  const mainContent = document.getElementById("main-content");
  window.scrollTo(0, 0);
  mainContent.innerHTML = `
    <section class="container mx-auto px-4 py-8">
        <button onclick="renderHome()" class="mb-6 text-primary font-bold"><i class="fas fa-arrow-left"></i> Kembali</button>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-darkCard rounded-[2.5rem] p-8 shadow-xl text-center">
                <div class="aspect-square bg-gradient-to-br ${color} rounded-[2rem] mb-6 flex items-center justify-center">
                    <i class="fas ${icon} text-7xl text-white"></i>
                </div>
                <h2 class="text-2xl font-black dark:text-white uppercase">${gameName}</h2>
            </div>
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white dark:bg-darkCard rounded-[2.5rem] p-8 shadow-xl">
                    <h3 class="font-bold text-primary mb-4 italic">1. Masukkan Data</h3>
                    <input type="text" id="user-id" placeholder="User ID / Nomor HP" class="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border dark:border-gray-700 dark:text-white outline-none">
                </div>
                <div class="bg-white dark:bg-darkCard rounded-[2.5rem] p-8 shadow-xl">
                    <h3 class="font-bold text-primary mb-4 italic">2. Pilih Nominal</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${renderNominals(gameName)}</div>
                </div>
                <button onclick="processCheckout()" class="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:scale-[1.02] transition uppercase">Beli Sekarang</button>
            </div>
        </div>
    </section>`;
}

function renderNominals(productName) {
  const list = productName.includes("Pulsa")
    ? [
        { n: "5rb", p: 7000 },
        { n: "10rb", p: 12000 },
      ]
    : [
        { n: "86 Diamonds", p: 20000 },
        { n: "172 Diamonds", p: 40000 },
      ];
  return list
    .map(
      (item) => `
        <button onclick="selectNominal(this, '${item.n}', ${item.p})" class="nominal-btn p-4 border dark:border-gray-700 rounded-2xl text-left transition">
            <b class="dark:text-white text-sm">${item.n}</b><br><span class="text-primary font-bold">Rp ${item.p.toLocaleString()}</span>
        </button>
    `,
    )
    .join("");
}

function selectNominal(el, name, price) {
  document
    .querySelectorAll(".nominal-btn")
    .forEach((btn) =>
      btn.classList.remove("ring-2", "ring-primary", "bg-indigo-50"),
    );
  el.classList.add("ring-2", "ring-primary", "bg-indigo-50");
  selectedPrice = price;
}

// 4. INTEGRASI DUITKU (INTI NYA DI SINI)
async function processCheckout() {
  const userId = document.getElementById("user-id").value;
  if (!userId || selectedPrice === 0) return alert("Lengkapi data dulu!");

  const merchantOrderId = "FLN-" + Date.now();

  // Bikin Signature MD5
  const signature = CryptoJS.MD5(
    MERCHANT_CODE + merchantOrderId + selectedPrice + API_KEY,
  ).toString();

  const paymentData = {
    merchantCode: MERCHANT_CODE,
    paymentAmount: selectedPrice,
    merchantOrderId: merchantOrderId,
    productDetails: `Topup ${selectedProduct} - ${userId}`,
    email: "flinnstore@gmail.com",
    paymentMethod: "SP", // SP = QRIS/ShopeePay
    callbackUrl: window.location.href,
    returnUrl: window.location.href,
    signature: signature,
  };

  try {
    const response = await fetch(DUITKU_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (result.statusCode === "00") {
      // Simpan ke riwayat lokal dulu
      saveToHistory(merchantOrderId, userId, selectedPrice);
      // Pindah ke halaman bayar Duitku
      window.location.href = result.paymentUrl;
    } else {
      alert("Duitku Error: " + result.statusMessage);
    }
  } catch (e) {
    alert("Koneksi gagal!");
  }
}

function saveToHistory(oid, uid, price) {
  cartHistory.unshift({
    id: oid,
    product: selectedProduct,
    price: price,
    status: "PENDING",
    target: uid,
    time: new Date().toLocaleTimeString(),
  });
  localStorage.setItem("flinn_history", JSON.stringify(cartHistory));
}

window.onload = renderHome;
