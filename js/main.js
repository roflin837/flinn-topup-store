// 1. STATE & DATA
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

// 2. LOGIKA SEARCH & FILTER
function searchProduct() {
  const query = document.getElementById("search-input").value.toLowerCase();
  renderItems(query, "Semua");
}

function selectNominal(element, name, price) {
  document.querySelectorAll(".nominal-btn").forEach((btn) => {
    btn.classList.remove(
      "border-primary",
      "bg-indigo-50",
      "dark:bg-indigo-900/20",
      "ring-2",
      "ring-primary",
    );
    btn.classList.add("border-gray-200", "dark:border-gray-700");
  });
  element.classList.add(
    "border-primary",
    "bg-indigo-50",
    "dark:bg-indigo-900/20",
    "ring-2",
    "ring-primary",
  );
  selectedProduct = name;
  selectedPrice = price;
}

// 3. RENDER HALAMAN UTAMA
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

        <section class="container mx-auto px-4 mb-4 flex justify-between items-center mt-8">
            <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                ${["Semua", "Game", "App", "Pulsa"]
                  .map(
                    (c) => `
                    <button onclick="renderHome('${c}')" class="${filter === c ? "bg-primary text-white" : "bg-white dark:bg-darkCard text-gray-500"} px-6 py-2.5 rounded-2xl font-bold shadow-md transition whitespace-nowrap">${c}</button>
                `,
                  )
                  .join("")}
            </div>
        </section>

        <section class="container mx-auto px-4 py-4 mb-20">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" id="game-container"></div>
        </section>`;

  renderItems("", filter);
}

function renderItems(query = "", filter = "Semua") {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query);
    const matchesFilter = filter === "Semua" || p.cat === filter;
    return matchesSearch && matchesFilter;
  });

  filtered.forEach((item) => {
    container.innerHTML += `
            <div onclick="showOrder('${item.name}', '${item.icon}', '${item.color}')" class="group bg-white dark:bg-darkCard rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border dark:border-gray-800">
                <div class="relative rounded-[2rem] aspect-square mb-4 bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg">
                    <i class="fas ${item.icon} text-5xl text-white opacity-90 group-hover:scale-125 transition-transform duration-500"></i>
                </div>
                <div class="px-2 text-center">
                    <h4 class="font-black text-sm dark:text-white uppercase truncate">${item.name}</h4>
                    <span class="text-[9px] bg-green-100 text-green-600 px-2 py-1 rounded-md font-bold uppercase tracking-widest">Online</span>
                </div>
            </div>`;
  });
}

// 4. HALAMAN ORDER
function showOrder(gameName, icon, color) {
  const mainContent = document.getElementById("main-content");
  window.scrollTo(0, 0);
  let labelInput =
    gameName.includes("Pulsa") ||
    gameName.includes("Indosat") ||
    gameName.includes("Axiata")
      ? "Nomor HP"
      : "User ID";

  mainContent.innerHTML = `
    <section class="container mx-auto px-4 py-8">
        <button onclick="renderHome()" class="mb-6 text-primary font-bold flex items-center gap-2"><i class="fas fa-arrow-left"></i> Kembali</button>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-darkCard rounded-[2.5rem] p-8 shadow-xl border dark:border-gray-800 text-center">
                    <div class="w-full aspect-square bg-gradient-to-br ${color} rounded-[2rem] mb-6 flex items-center justify-center shadow-lg">
                         <i class="fas ${icon} text-7xl text-white"></i>
                    </div>
                    <h2 class="text-2xl font-black dark:text-white uppercase tracking-tighter">${gameName}</h2>
                </div>
            </div>
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white dark:bg-darkCard rounded-[2.5rem] p-8 shadow-xl border dark:border-gray-800">
                    <h3 class="font-bold text-lg dark:text-white mb-4 italic text-primary">1. Masukkan Data</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" id="user-id" placeholder="${labelInput}" class="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border dark:border-gray-700 outline-none focus:ring-2 ring-primary dark:text-white">
                        <input type="text" id="zone-id" placeholder="Server ID (Optional)" class="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border dark:border-gray-700 outline-none focus:ring-2 ring-primary dark:text-white">
                    </div>
                </div>
                <div class="bg-white dark:bg-darkCard rounded-[2.5rem] p-8 shadow-xl border dark:border-gray-800">
                    <h3 class="font-bold text-lg dark:text-white mb-4 italic text-primary">2. Pilih Nominal</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${renderNominals(gameName)}</div>
                </div>
                <button onclick="processCheckout()" class="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:scale-[1.02] transition active:scale-95 uppercase">
                    Beli Sekarang
                </button>
            </div>
        </div>
    </section>`;
}

function renderNominals(productName) {
  const list =
    productName.includes("Pulsa") ||
    productName.includes("Indosat") ||
    productName.includes("Axiata")
      ? [
          { n: "5rb", p: 7000 },
          { n: "10rb", p: 12000 },
          { n: "20rb", p: 22000 },
        ]
      : [
          { n: "86 Diamonds", p: 20000 },
          { n: "172 Diamonds", p: 40000 },
          { n: "257 Diamonds", p: 60000 },
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

// 5. PROSES CHECKOUT
function processCheckout() {
  const userId = document.getElementById("user-id").value;
  const zoneId = document.getElementById("zone-id").value || "";

  if (!userId || selectedPrice === 0) {
    alert("Flinn, data belum lengkap!");
    return;
  }

  const kodeUnik = Math.floor(Math.random() * 888) + 111;
  const totalBayar = selectedPrice + kodeUnik;
  showPaymentModal(totalBayar, userId, zoneId);
}

// 6. MODAL PEMBAYARAN (TANPA WA)
function showPaymentModal(total, uid, zid) {
  const modalHtml = `
        <div id="payment-modal" class="fixed inset-0 bg-black/90 flex items-center justify-center z-[110] px-4 backdrop-blur-md">
            <div class="bg-white p-6 rounded-[3rem] max-w-sm w-full shadow-2xl scale-in-center text-center">
                <div class="flex justify-between items-center mb-4 text-gray-400 font-bold text-[10px]">
                    <span>METODE PEMBAYARAN QRIS</span>
                    <button onclick="document.getElementById('payment-modal').remove()" class="text-xl"><i class="fas fa-times-circle"></i></button>
                </div>
                <div class="bg-white border-2 border-primary rounded-3xl p-3 mb-4">
                    <img src="assets/images/qris.jpg" class="w-full aspect-square object-contain rounded-xl">
                </div>
                <div class="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100">
                    <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Total yang harus dibayar</p>
                    <p class="text-3xl font-black text-primary">Rp ${total.toLocaleString("id-ID")}</p>
                    <button onclick="copyPrice('${total}')" class="mt-2 bg-primary text-white text-[10px] px-4 py-1.5 rounded-full font-bold shadow-md">SALIN NOMINAL</button>
                </div>
                <p class="text-[9px] text-red-500 font-bold mb-4 italic">PENTING: Transfer harus pas agar terverifikasi!</p>
                <button onclick="handleFinish('${total}', '${uid}', '${zid}')" class="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg uppercase">
                    Saya Sudah Bayar
                </button>
            </div>
        </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function copyPrice(val) {
  navigator.clipboard.writeText(val);
  alert(
    "Nominal Rp " +
      val +
      " Berhasil disalin! Masukkan angka ini di aplikasi e-wallet lo.",
  );
}

// 7. HANDLE FINISH (SIMPAN KE RIWAYAT)
function handleFinish(total, uid, zid) {
  const orderId = "FLN-" + Math.floor(Math.random() * 89999 + 10000);
  const newOrder = {
    id: orderId,
    product: selectedProduct,
    price: total,
    status: "PENDING",
    target: `${uid} ${zid ? "(" + zid + ")" : ""}`,
    time: new Date().toLocaleString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  cartHistory.unshift(newOrder);
  localStorage.setItem("flinn_history", JSON.stringify(cartHistory));

  document.getElementById("payment-modal").remove();
  alert(
    "Berhasil! Pesanan lo sudah masuk ke sistem. Silakan tunggu admin cek mutasi.",
  );
  showHistory();
}

// 8. HALAMAN RIWAYAT
function showHistory() {
  const mainContent = document.getElementById("main-content");
  let rows = cartHistory
    .map(
      (item) => `
        <tr class="dark:text-white border-b dark:border-gray-800">
            <td class="p-4 text-[10px] font-mono font-bold text-primary">#${item.id}</td>
            <td class="p-4">
                <p class="text-[10px] font-black uppercase">${item.product}</p>
                <p class="text-[9px] text-gray-400">${item.target}</p>
            </td>
            <td class="p-4 text-[11px] font-black">Rp ${parseInt(item.price).toLocaleString()}</td>
            <td class="p-4">
                <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-[8px] font-black uppercase">
                    ${item.status}
                </span>
            </td>
        </tr>`,
    )
    .join("");

  mainContent.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-black dark:text-white uppercase italic">Riwayat</h2>
                <button onclick="renderHome()" class="bg-gray-100 dark:bg-gray-800 px-5 py-2 rounded-xl font-bold text-xs">Kembali</button>
            </div>
            <div class="bg-white dark:bg-darkCard rounded-[2rem] shadow-xl overflow-hidden border dark:border-gray-800">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 dark:bg-gray-800 text-[10px] font-black uppercase text-gray-400">
                        <tr><th class="p-4">ID</th><th class="p-4">Produk</th><th class="p-4">Total</th><th class="p-4">Status</th></tr>
                    </thead>
                    <tbody class="divide-y dark:divide-gray-800">
                        ${rows || '<tr><td colspan="4" class="p-20 text-center text-gray-400 font-bold uppercase">Belum ada transaksi</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>`;
}

window.onload = renderHome;
