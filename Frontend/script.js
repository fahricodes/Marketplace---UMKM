// Mengambil elemen dari HTML
const formPencarian = document.getElementById("formpencarian");
const kolomPencarian = document.getElementById("kolompencarian");
const keranjang = document.getElementById("keranjang");
const daftarProduk = document.getElementById("daftarproduk");
const isiKeranjang = document.getElementById("isikeranjang");
const wishlist = document.getElementById("wishlist");

// Data toko
const toko = [
    {
        id: 1,
        nama: "Kenzio Kriuk Makmur",
        alamat: "Bogor, Jawa Barat",
        deskripsi: "Toko camilan unik dengan rasa yang bikin susah berhenti ngemil.",
        latitude: -6.595,
        longitude: 106.816
    },
    {
        id: 2,
        nama: "Budi Batik Berisik",
        alamat: "Bogor, Jawa Barat",
        deskripsi: "Batik lokal dengan desain unik dan penuh karakter.",
        latitude: -6.602,
        longitude: 106.797
    },
    {
        id: 3,
        nama: "Kenzio & Budi Craft",
        alamat: "Bogor, Jawa Barat",
        deskripsi: "Kerajinan tangan lokal yang dibuat dengan kreativitas dan sedikit kegilaan.",
        latitude: -6.590,
        longitude: 106.810
    },
    {
        id: 4,
        nama: "BudiKenz Mart",
        alamat: "Bogor, Jawa Barat",
        deskripsi: "Toko serba ada untuk kebutuhan rumah dan gaya hidup sehari-hari.",
        latitude: -6.588,
        longitude: 106.820
    }
];

// Data produk
const produk = [
    {
        id: 1,
        nama: "pissang buzzing",
        harga: 25000,
        stok: 100,
        kategori: "Makanan & Minuman",
        tokoId: 1,
        tanggalDitambahkan: "2024-08-15",
        paketHemat: true,
        hargaPromo: 20000
    },
    {
        id: 2,
        nama: "Brownies Cokelat",
        harga: 50000,
        stok: 15,
        kategori: "Makanan & Minuman",
        tokoId: 1,
        tanggalDitambahkan: "2025-08-10",
        paketHemat: false,
        hargaPromo: null
    },
    {
        id: 3,
        nama: "Batik ciheuleut",
        harga: 150000,
        stok: 10,
        kategori: "Fashion Lokal",
        tokoId: 2,
        tanggalDitambahkan: "2026-08-05",
        paketHemat: true,
        hargaPromo: 125000
    },
    {
        id: 4,
        nama: "Tas Anyaman",
        harga: 85000,
        stok: 8,
        kategori: "Kerajinan Tangan",
        tokoId: 3,
        tanggalDitambahkan: "2026-08-01",
        paketHemat: false,
        hargaPromo: null
    }
];

// Data keranjang dan wishlist
let keranjangBelanja = JSON.parse(localStorage.getItem("keranjang")) || [];
let daftarWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Mencari toko
function cariToko(idToko) {
    const tokoDitemukan = toko.find(function(item) {
        return item.id === idToko;
    });
    return tokoDitemukan;
}

// Mencari produk berdasarkan ID
function cariProdukById(idProduk) {
    return produk.find(function(item) {
        return item.id === idProduk;
    });
}

// Menyimpan keranjang
function simpanKeranjang() {
    localStorage.setItem("keranjang", JSON.stringify(keranjangBelanja));
}

// Menyimpan wishlist
function simpanWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(daftarWishlist));
}

// Cek stok
function cekStok(idProduk, jumlah) {
    const produkDitemukan = cariProdukById(idProduk);

    if (!produkDitemukan) {
        return false;
    }

    if (jumlah <= produkDitemukan.stok) {
        return true;
    }

    return false;
}

// Tambah ke keranjang
function tambahKeKeranjang(idProduk) {
    const produkDitemukan = cariProdukById(idProduk);

    if (!produkDitemukan) {
        return;
    }

    const produkDiKeranjang = keranjangBelanja.find(function(item) {
        return item.id === idProduk;
    });

    if (produkDiKeranjang) {
        if (cekStok(idProduk, produkDiKeranjang.jumlah + 1)) {
            produkDiKeranjang.jumlah++;
        }
    } else {
        if (cekStok(idProduk, 1)) {
            keranjangBelanja.push({
                id: produkDitemukan.id,
                nama: produkDitemukan.nama,
                harga: produkDitemukan.harga,
                tokoId: produkDitemukan.tokoId,
                jumlah: 1
            });
        }
    }

    simpanKeranjang();
    tampilkanJumlahKeranjang();
    tampilkanKeranjang();
}

// Kurangi dari keranjang
function kurangiDariKeranjang(idProduk) {
    const produkDiKeranjang = keranjangBelanja.find(function(item) {
        return item.id === idProduk;
    });

    if (!produkDiKeranjang) {
        return;
    }

    if (produkDiKeranjang.jumlah > 1) {
        produkDiKeranjang.jumlah--;
    }

    simpanKeranjang();
    tampilkanJumlahKeranjang();
    tampilkanKeranjang();
}

// Hapus dari keranjang
function hapusDariKeranjang(idProduk) {
    for (let i = 0; i < keranjangBelanja.length; i++) {
        if (keranjangBelanja[i].id === idProduk) {
            keranjangBelanja.splice(i, 1);
            break;
        }
    }

    simpanKeranjang();
    tampilkanJumlahKeranjang();
    tampilkanKeranjang();
}

// Hitung total harga
function hitungTotalKeranjang() {
    let total = 0;

    for (let i = 0; i < keranjangBelanja.length; i++) {
        total = total + (keranjangBelanja[i].harga * keranjangBelanja[i].jumlah);
    }

    return total;
}

// Hitung jumlah barang
function hitungJumlahBarang() {
    let jumlah = 0;

    for (let i = 0; i < keranjangBelanja.length; i++) {
        jumlah = jumlah + keranjangBelanja[i].jumlah;
    }

    return jumlah;
}

// Menampilkan jumlah keranjang
function tampilkanJumlahKeranjang() {
    if (!keranjang) {
        return;
    }

    keranjang.textContent = "🛒 Keranjang [" + hitungJumlahBarang() + "]";
}

// Menampilkan keranjang
// Menampilkan keranjang di halaman keranjang
function tampilkanKeranjangHalaman() {
    const daftarKeranjangHTML = document.getElementById("daftar-keranjang");

    if (!daftarKeranjangHTML) {
        return;
    }

    daftarKeranjangHTML.innerHTML = "";

    if (keranjangBelanja.length === 0) {
        daftarKeranjangHTML.innerHTML = "<p>Keranjang masih kosong.</p>";
        tampilkanRingkasanKeranjang();
        return;
    }

    for (let i = 0; i < keranjangBelanja.length; i++) {
        const item = keranjangBelanja[i];

        const produkHTML = document.createElement("div");
        produkHTML.className = "item-keranjang";

        const nama = document.createElement("h3");
        nama.textContent = item.nama;

        const harga = document.createElement("p");
        harga.textContent = "Harga: Rp " + item.harga.toLocaleString("id-ID");

        const jumlahLabel = document.createElement("label");
        jumlahLabel.textContent = "Jumlah: ";

        const jumlah = document.createElement("input");
        jumlah.type = "number";
        jumlah.min = "1";
        jumlah.max = String(cariProdukById(item.id)?.stok || 1);
        jumlah.value = item.jumlah;

        jumlah.addEventListener("change", function() {
            let jumlahBaru = Number(this.value);

            if (jumlahBaru < 1) {
                jumlahBaru = 1;
            }

            const produkDitemukan = cariProdukById(item.id);

            if (produkDitemukan && jumlahBaru > produkDitemukan.stok) {
                jumlahBaru = produkDitemukan.stok;
            }

            item.jumlah = jumlahBaru;

            simpanKeranjang();
            tampilkanJumlahKeranjang();
            tampilkanKeranjangHalaman();
        });

        const subtotal = document.createElement("p");
        subtotal.textContent = "Subtotal: Rp " + (item.harga * item.jumlah).toLocaleString("id-ID");

        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.textContent = "Hapus";

        tombolHapus.addEventListener("click", function() {
            keranjangBelanja = keranjangBelanja.filter(function(barang) {
                return barang.id !== item.id;
            });
            simpanKeranjang();
            tampilkanJumlahKeranjang();
            tampilkanKeranjangHalaman();    
        });
        jumlahLabel.appendChild(jumlah);

        produkHTML.appendChild(nama);
        produkHTML.appendChild(harga);
        produkHTML.appendChild(jumlahLabel);
        produkHTML.appendChild(subtotal);
        produkHTML.appendChild(tombolHapus);

        daftarKeranjangHTML.appendChild(produkHTML);
    }

    tampilkanRingkasanKeranjang();
}
// Menampilkan ringkasan biaya keranjang
function tampilkanRingkasanKeranjang() {
    const subtotalHTML = document.getElementById("subtotal");
    const grandTotalHTML = document.getElementById("grand-total");

    if (!subtotalHTML || !grandTotalHTML) {
        return;
    }

    const subtotal = hitungTotalKeranjang();
    const biayaLayanan = keranjangBelanja.length > 0 ? 2000 : 0;
    const biayaPengiriman = keranjangBelanja.length > 0 ? 10000 : 0;
    const grandTotal = subtotal + biayaLayanan + biayaPengiriman;

    subtotalHTML.textContent = subtotal.toLocaleString("id-ID");

    const biayaLayananHTML = document.getElementById("biaya-layanan");

    if (biayaLayananHTML) {
        biayaLayananHTML.textContent = biayaLayanan.toLocaleString("id-ID");
    }

    const biayaPengirimanHTML = document.getElementById("biaya-pengiriman");

    if (biayaPengirimanHTML) {
        biayaPengirimanHTML.textContent = biayaPengiriman.toLocaleString("id-ID");
    }

    grandTotalHTML.textContent = grandTotal.toLocaleString("id-ID");
}

// Wishlist
function ubahWishlist(idProduk) {
    const produkDitemukan = cariProdukById(idProduk);

    if (!produkDitemukan) {
        return;
    }

    const produkSudahAda = daftarWishlist.find(function(item) {
        return item.id === idProduk;
    });

    if (produkSudahAda) {
        batalWishlist(idProduk);
    } else {
        daftarWishlist.push(produkDitemukan);
        simpanWishlist();
        tampilkanJumlahWishlist();
        tampilkanWishlist();
    }
}

// Batal wishlist
function batalWishlist(idProduk) {
    for (let i = 0; i < daftarWishlist.length; i++) {
        if (daftarWishlist[i].id === idProduk) {
            daftarWishlist.splice(i, 1);
            break;
        }
    }

    simpanWishlist();
    tampilkanJumlahWishlist();
    tampilkanWishlist();
}

// Menampilkan jumlah wishlist
function tampilkanJumlahWishlist() {
    if (!wishlist) {
        return;
    }

    wishlist.textContent = "❤️ Wishlist (" + daftarWishlist.length + ")";
}

// Membuka detail produk
function bukaDetailProduk(idProduk) {
    const produkDitemukan = cariProdukById(idProduk);

    if (!produkDitemukan) {
        return;
    }

    window.location.href = "detailproduk.html?id=" + encodeURIComponent(idProduk);
}

// Menampilkan detail produk
function tampilkanDetailProduk() {
    const namaDetail = document.getElementById("detail-nama");
    const hargaDetail = document.getElementById("detail-harga");
    const stokDetail = document.getElementById("detail-stok");
    const kategoriDetail = document.getElementById("detail-kategori");
    const tokoDetail = document.getElementById("detail-toko");
    const deskripsiDetail = document.getElementById("detail-deskripsi");
    const gambarDetail = document.getElementById("detail-gambar");
    const tombolKeranjangDetail = document.getElementById("detail-tombol-keranjang");
    const tombolWishlistDetail = document.getElementById("detail-tombol-wishlist");

    if (!namaDetail) {
        return;
    }

    const parameter = new URLSearchParams(window.location.search);
    const idProduk = Number(parameter.get("id"));
    const produkDitemukan = cariProdukById(idProduk);

    if (!produkDitemukan) {
        namaDetail.textContent = "Produk tidak ditemukan.";
        return;
    }

    namaDetail.textContent = produkDitemukan.nama;
    hargaDetail.textContent = "Rp " + produkDitemukan.harga.toLocaleString("id-ID");
    stokDetail.textContent = "Stok: " + produkDitemukan.stok;
    kategoriDetail.textContent = "Kategori: " + produkDitemukan.kategori;

    const tokoProduk = cariToko(produkDitemukan.tokoId);

    if (tokoProduk) {
        tokoDetail.textContent = "Toko: " + tokoProduk.nama;
        deskripsiDetail.textContent = tokoProduk.deskripsi;
    }

    if (gambarDetail) {
        if (produkDitemukan.gambar) {
            gambarDetail.src = produkDitemukan.gambar;
            gambarDetail.alt = produkDitemukan.nama;
        } else {
            gambarDetail.style.display = "none";
        }
    }

    if (tombolKeranjangDetail) {
        tombolKeranjangDetail.addEventListener("click", function() {
            tambahKeKeranjang(produkDitemukan.id);
        });
    }

    if (tombolWishlistDetail) {
        tombolWishlistDetail.textContent = daftarWishlist.some(function(item) {
            return item.id === produkDitemukan.id;
        }) ? "♥ Hapus dari Wishlist" : "♡ Tambah ke Wishlist";

        tombolWishlistDetail.addEventListener("click", function() {
            ubahWishlist(produkDitemukan.id);
            tombolWishlistDetail.textContent = daftarWishlist.some(function(item) {
                return item.id === produkDitemukan.id;
            }) ? "♥ Hapus dari Wishlist" : "♡ Tambah ke Wishlist";
        });
    }
}

// Membuat kartu produk
function buatKartuProduk(item) {
    const kartu = document.createElement("article");
    kartu.className = "product-card";
    kartu.dataset.id = item.id;

    if (item.gambar) {
        const gambar = document.createElement("img");
        gambar.src = item.gambar;
        gambar.alt = item.nama;
        kartu.appendChild(gambar);
    }

    const nama = document.createElement("h3");
    nama.textContent = item.nama;

    const harga = document.createElement("p");
    harga.className = "price";
    harga.textContent = "Harga: Rp " + item.harga.toLocaleString("id-ID");

    const tanggal = document.createElement("p");
    tanggal.className = "tanggal-produk";

    if (item.tanggalDitambahkan) {
        const tanggalProduk = new Date(item.tanggalDitambahkan);
        tanggal.textContent = "Ditambahkan: " + tanggalProduk.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }   

    const tokoProduk = cariToko(item.tokoId);
    const namaToko = document.createElement("p");

    if (tokoProduk) {
        namaToko.textContent = tokoProduk.nama;
    }

    const tombolDetail = document.createElement("button");
    tombolDetail.type = "button";
    tombolDetail.className = "tomboldetail";
    tombolDetail.textContent = "Lihat Detail";

    tombolDetail.addEventListener("click", function() {
        bukaDetailProduk(item.id);
    });

    const tombolKeranjang = document.createElement("button");
    tombolKeranjang.type = "button";
    tombolKeranjang.className = "tombolkeranjang";
    tombolKeranjang.textContent = "Masukkan Keranjang";

    tombolKeranjang.addEventListener("click", function() {
        tambahKeKeranjang(item.id);
    });

    const tombolWishlist = document.createElement("button");

    tombolWishlist.type = "button";
    tombolWishlist.className = "tombolwishlist";

    function updateTampilanWishlist() {
        const sudahWishlist = daftarWishlist.some(function(wishlistItem) {
            return wishlistItem.id === item.id;
        });

        tombolWishlist.textContent = sudahWishlist
            ? "♥ Hapus dari Wishlist"
            : "♡ Tambah ke Wishlist";
    }

    updateTampilanWishlist();

    tombolWishlist.addEventListener("click", function() {
        ubahWishlist(item.id);
        updateTampilanWishlist();
    });

    kartu.appendChild(nama);
    kartu.appendChild(harga);
    kartu.appendChild(namaToko);
    kartu.appendChild(tanggal);
    kartu.appendChild(tombolDetail);
    kartu.appendChild(tombolKeranjang);
    kartu.appendChild(tombolWishlist);

    return kartu;
}

// Menampilkan daftar produk
function tampilkanDaftarProduk(daftar) {
    if (!daftarProduk) {
        return;
    }

    daftarProduk.innerHTML = "";

    if (daftar.length === 0) {
        daftarProduk.innerHTML = "<p>Produk tidak ditemukan.</p>";
        return;
    }

    for (let i = 0; i < daftar.length; i++) {
        daftarProduk.appendChild(buatKartuProduk(daftar[i]));
    }
}

// Menampilkan produk wishlist
function tampilkanWishlist() {
    const daftarWishlistHTML = document.getElementById("daftar-wishlist");

    if (!daftarWishlistHTML) {
        return;
    }

    daftarWishlistHTML.innerHTML = "";

    if (daftarWishlist.length === 0) {
        daftarWishlistHTML.innerHTML = "<p>Wishlist masih kosong.</p>";
        return;
    }

    for (let i = 0; i < daftarWishlist.length; i++) {
        const item = daftarWishlist[i];
        const kartu = document.createElement("article");
        kartu.className = "product-card";
        kartu.dataset.id = item.id;

        if (item.gambar) {
            const gambar = document.createElement("img");
            gambar.src = item.gambar;
            gambar.alt = item.nama;
            kartu.appendChild(gambar);
        }

        const nama = document.createElement("h3");
        nama.textContent = item.nama;

        const harga = document.createElement("p");
        harga.className = "price";
        harga.textContent = "Harga: Rp " + item.harga.toLocaleString("id-ID");

        const tokoProduk = cariToko(item.tokoId);
        const namaToko = document.createElement("p");

        if (tokoProduk) {
            namaToko.textContent = tokoProduk.nama;
        }

        const tombolDetail = document.createElement("button");
        tombolDetail.type = "button";
        tombolDetail.className = "tomboldetail";
        tombolDetail.textContent = "Lihat Detail";

        tombolDetail.addEventListener("click", function() {
            bukaDetailProduk(item.id);
        });

        const tombolKeranjang = document.createElement("button");
        tombolKeranjang.type = "button";
        tombolKeranjang.className = "tombolkeranjang";
        tombolKeranjang.textContent = "Masukkan Keranjang";

        tombolKeranjang.addEventListener("click", function() {
            tambahKeKeranjang(item.id);
        });

        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "tombolhapus";
        tombolHapus.textContent = "Hapus dari Wishlist";

        tombolHapus.addEventListener("click", function() {
            batalWishlist(item.id);
        });

        kartu.appendChild(nama);
        kartu.appendChild(harga);
        kartu.appendChild(namaToko);
        kartu.appendChild(tombolDetail);
        kartu.appendChild(tombolKeranjang);
        kartu.appendChild(tombolHapus);

        daftarWishlistHTML.appendChild(kartu);
    }
}

// Mencari produk
function cariProduk(kataKunci) {
    let hasilPencarian = [];

    for (let i = 0; i < produk.length; i++) {
        let namaProduk = produk[i].nama.toLowerCase();
        let kata = kataKunci.toLowerCase();

        if (namaProduk.includes(kata)) {
            hasilPencarian.push(produk[i]);
        }
    }

    return hasilPencarian;
}

// Filter kategori
function cariKategori(namaKategori) {
    let hasilKategori = [];

    for (let i = 0; i < produk.length; i++) {
        if (produk[i].kategori === namaKategori) {
            hasilKategori.push(produk[i]);
        }
    }

    return hasilKategori;
}

// Mencari produk terbaru
// Mencari produk terbaru
function cariProdukTerbaru() {
    let hasilTerbaru = [];

    for (let i = 0; i < produk.length; i++) {
        if (!produk[i].tanggalDitambahkan) {
            continue;
        }

        const tanggal = new Date(produk[i].tanggalDitambahkan);

        if (tanggal.getFullYear() === 2026) {
            hasilTerbaru.push(produk[i]);
        }
    }

    hasilTerbaru.sort(function(a, b) {
        return new Date(b.tanggalDitambahkan) - new Date(a.tanggalDitambahkan);
    });

    return hasilTerbaru.slice(0, 3);
}

// Mencari paket hemat
function cariPaketHemat() {
    let hasilPaketHemat = [];

    for (let i = 0; i < produk.length; i++) {
        if (produk[i].paketHemat === true) {
            hasilPaketHemat.push(produk[i]);
        }
    }
    return hasilPaketHemat;
}
// Validasi produk
function validasiProduk(dataProduk) {
    if (!dataProduk || typeof dataProduk.nama !== "string" || dataProduk.nama.trim() === "") {
        return false;
    }
    if (typeof dataProduk.harga !== "number" || dataProduk.harga <= 0) {
        return false;
    }
    if (typeof dataProduk.stok !== "number" || dataProduk.stok < 0) {
        return false;
    }
    if (typeof dataProduk.tokoId !== "number" || dataProduk.tokoId <= 0) {
        return false;
    }
    return true;
}
// Kelompokkan keranjang berdasarkan toko
function kelompokkanKeranjang() {
    let hasil = [];
    for (let i = 0; i < keranjangBelanja.length; i++) {
        let barang = keranjangBelanja[i];
        let tokoBarang = cariToko(barang.tokoId);

        if (!tokoBarang) {
            continue;
        }

        let tokoSudahAda = false;

        for (let j = 0; j < hasil.length; j++) {
            if (hasil[j].tokoId === barang.tokoId) {
                hasil[j].produk.push(barang);
                tokoSudahAda = true;
                break;
            }
        }

        if (tokoSudahAda === false) {
            hasil.push({
                tokoId: barang.tokoId,
                namaToko: tokoBarang.nama,
                produk: [barang]
            });
        }
    }

    return hasil;
}

// Search
if (formPencarian && kolomPencarian) {
    formPencarian.addEventListener("submit", function(event) {
        event.preventDefault();

        const kataKunci = kolomPencarian.value.trim();

        if (kataKunci === "") {
            tampilkanDaftarProduk(produk);
            return;
        }

        tampilkanDaftarProduk(cariProduk(kataKunci));
    });
}
// Kategori
// Menu sidebar
function pasangEventKategori() {
    const menuSidebar = document.querySelectorAll(".nav-main > ul > li > a");

    for (let i = 0; i < menuSidebar.length; i++) {
        menuSidebar[i].addEventListener("click", function(event) {
            const namaMenu = this.textContent.trim();

            if (namaMenu === "Terbaru") {
                event.preventDefault();
                const hasilTerbaru = cariProdukTerbaru();
                tampilkanDaftarProduk(hasilTerbaru.length > 0 ? hasilTerbaru : produk);
                return;
            }

            if (namaMenu === "Paket Hemat") {
                event.preventDefault();
                const hasilPaketHemat = cariPaketHemat();
                tampilkanDaftarProduk(hasilPaketHemat);
                return;
            }
        });
    }
    const linkKategori = document.querySelectorAll(".dropdown-category .dropdown-menu a");
    for (let i = 0; i < linkKategori.length; i++) {
        linkKategori[i].addEventListener("click", function(event) {
            event.preventDefault();

            const namaKategori = this.textContent.trim();
            const hasilKategori = cariKategori(namaKategori);

            tampilkanDaftarProduk(hasilKategori);
        });
    }
}
// Menampilkan produk awal
function tampilkanProdukAwal() {
    if (daftarProduk) {
        tampilkanDaftarProduk(produk);
    }
}
// Memasang tombol keranjang dan wishlist pada kartu produk
function pasangTombolProduk() {
    const kartuProduk = document.querySelectorAll(".product-card");
    for (let i = 0; i < kartuProduk.length; i++) {
        const kartu = kartuProduk[i];
        const idProduk = Number(kartu.dataset.id);
        if (!idProduk) {
            continue;
        }
        const produkDitemukan = cariProdukById(idProduk);
        if (!produkDitemukan) {
            continue;
        }
        const tombolKeranjang = kartu.querySelector(".tombolkeranjang");
        const tombolWishlist = kartu.querySelector(".tombolwishlist");
        if (tombolKeranjang) {
            tombolKeranjang.onclick = function() {
                tambahKeKeranjang(idProduk);
            };
        }
        if (tombolWishlist) {
            tombolWishlist.textContent = daftarWishlist.some(function(item) {
                return item.id === idProduk;
            }) ? "♥ Hapus dari Wishlist" : "♡ Tambah ke Wishlist";
            tombolWishlist.onclick = function() {
                ubahWishlist(idProduk);

                tombolWishlist.textContent = daftarWishlist.some(function(item) {
                    return item.id === idProduk;
                }) ? "♥ Hapus dari Wishlist" : "♡ Tambah ke Wishlist";
            };
        }
    }
}

// Jalankan saat halaman dibuka
tampilkanJumlahKeranjang();
tampilkanJumlahWishlist();
tampilkanWishlist();
tampilkanProdukAwal();
pasangEventKategori();
tampilkanDetailProduk();
tampilkanKeranjangHalaman();
// DATA AKUN
let dataAkun = JSON.parse(localStorage.getItem("dataAkun")) || {
    nama: "",
    email: "",
    noHp: "",
    alamat: ""
};

// Menyimpan data akun
function simpanDataAkun() {
    localStorage.setItem("dataAkun", JSON.stringify(dataAkun));
}

// Menampilkan halaman akun
function tampilkanAkun() {
    const halamanAkun = document.getElementById("halaman-akun");

    if (!halamanAkun) {
        return;
    }

    const accountHeader = halamanAkun.querySelector(".account-header");

    if (accountHeader) {
        const pesanSelamatDatang = accountHeader.querySelector("p");

        if (pesanSelamatDatang) {
            if (dataAkun.nama !== "") {
                pesanSelamatDatang.textContent = "Selamat datang kembali, " + dataAkun.nama + "!";
            } else {
                pesanSelamatDatang.textContent = "Selamat datang di akun Anda!";
            }
        }
    }

    const akunLama = document.getElementById("data-akun-js");

    if (akunLama) {
        akunLama.remove();
    }

    const wadahAkun = document.createElement("div");
    wadahAkun.id = "data-akun-js";

    const judul = document.createElement("h2");
    judul.textContent = "Informasi Akun";

    const nama = document.createElement("p");
    nama.textContent = "Nama: " + (dataAkun.nama || "Belum diisi");

    const email = document.createElement("p");
    email.textContent = "Email: " + (dataAkun.email || "Belum diisi");

    const noHp = document.createElement("p");
    noHp.textContent = "No. HP: " + (dataAkun.noHp || "Belum diisi");

    const alamat = document.createElement("p");
    alamat.textContent = "Alamat: " + (dataAkun.alamat || "Belum diisi");

    const tombolEdit = document.createElement("button");
    tombolEdit.type = "button";
    tombolEdit.textContent = "Edit Profil";

    tombolEdit.addEventListener("click", function() {
        tampilkanFormAkun();
    });

    wadahAkun.appendChild(judul);
    wadahAkun.appendChild(nama);
    wadahAkun.appendChild(email);
    wadahAkun.appendChild(noHp);
    wadahAkun.appendChild(alamat);
    wadahAkun.appendChild(tombolEdit);

    halamanAkun.appendChild(wadahAkun);
}

// Menampilkan form edit akun
function tampilkanFormAkun() {
    const halamanAkun = document.getElementById("halaman-akun");

    if (!halamanAkun) {
        return;
    }

    const formLama = document.getElementById("form-akun-js");

    if (formLama) {
        formLama.remove();
    }

    const form = document.createElement("form");
    form.id = "form-akun-js";

    const judul = document.createElement("h2");
    judul.textContent = "Edit Profil";

    const labelNama = document.createElement("label");
    labelNama.textContent = "Nama";

    const inputNama = document.createElement("input");
    inputNama.type = "text";
    inputNama.value = dataAkun.nama;
    inputNama.placeholder = "Masukkan nama";

    const labelEmail = document.createElement("label");
    labelEmail.textContent = "Email";

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.value = dataAkun.email;
    inputEmail.placeholder = "Masukkan email";

    const labelNoHp = document.createElement("label");
    labelNoHp.textContent = "No. HP";

    const inputNoHp = document.createElement("input");
    inputNoHp.type = "tel";
    inputNoHp.value = dataAkun.noHp;
    inputNoHp.placeholder = "Masukkan nomor HP";

    const labelAlamat = document.createElement("label");
    labelAlamat.textContent = "Alamat";

    const inputAlamat = document.createElement("textarea");
    inputAlamat.value = dataAkun.alamat;
    inputAlamat.placeholder = "Masukkan alamat";

    const tombolSimpan = document.createElement("button");
    tombolSimpan.type = "submit";
    tombolSimpan.textContent = "Simpan Profil";

    const tombolBatal = document.createElement("button");
    tombolBatal.type = "button";
    tombolBatal.textContent = "Batal";

    tombolBatal.addEventListener("click", function() {
        form.remove();
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        dataAkun.nama = inputNama.value.trim();
        dataAkun.email = inputEmail.value.trim();
        dataAkun.noHp = inputNoHp.value.trim();
        dataAkun.alamat = inputAlamat.value.trim();

        simpanDataAkun();
        tampilkanAkun();
    });

    form.appendChild(judul);
    form.appendChild(labelNama);
    form.appendChild(inputNama);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelNoHp);
    form.appendChild(inputNoHp);
    form.appendChild(labelAlamat);
    form.appendChild(inputAlamat);
    form.appendChild(tombolSimpan);
    form.appendChild(tombolBatal);

    halamanAkun.appendChild(form);
}

// Menjalankan fitur akun
tampilkanAkun();

// DATA PESANAN
let daftarPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];

// Menyimpan pesanan
function simpanPesanan() {
    localStorage.setItem("pesanan", JSON.stringify(daftarPesanan));
}

// Membuat pesanan dari keranjang
function buatPesanan() {
    if (keranjangBelanja.length === 0) {
        return false;
    }

    const pesananBaru = {
        id: Date.now(),
        tanggal: new Date().toLocaleString("id-ID"),
        produk: keranjangBelanja.map(function(item) {
            return {
                id: item.id,
                nama: item.nama,
                harga: item.harga,
                jumlah: item.jumlah,
                tokoId: item.tokoId
            };
        }),
        total: hitungTotalKeranjang(),
        status: "Menunggu Pembayaran"
    };

    daftarPesanan.push(pesananBaru);
    simpanPesanan();

    keranjangBelanja = [];
    simpanKeranjang();

    tampilkanJumlahKeranjang();
    tampilkanKeranjang();

    return true;
}

// Mengambil semua pesanan
function ambilDaftarPesanan() {
    return daftarPesanan;
}

// Menampilkan pesanan
function tampilkanPesanan() {
    const halamanPesanan = document.querySelector(".dashboard-pesanan");

    if (!halamanPesanan) {
        return;
    }

    const kartuPesanan = halamanPesanan.querySelectorAll(".kartu-pesanan");

    for (let i = 0; i < kartuPesanan.length; i++) {
        kartuPesanan[i].remove();
    }

    if (daftarPesanan.length === 0) {
        const pesanKosong = document.createElement("p");
        pesanKosong.className = "pesanan-kosong";
        pesanKosong.textContent = "Belum ada pesanan.";
        halamanPesanan.appendChild(pesanKosong);
        return;
    }

    for (let i = 0; i < daftarPesanan.length; i++) {
        const pesanan = daftarPesanan[i];
        const kartu = document.createElement("article");
        kartu.className = "kartu-pesanan";

        const header = document.createElement("div");
        header.className = "header-kartu-pesanan";

        const informasiPesanan = document.createElement("div");

        const idPesanan = document.createElement("span");
        idPesanan.className = "id-pesanan";
        idPesanan.textContent = "#" + pesanan.id;

        const tanggalPesanan = document.createElement("span");
        tanggalPesanan.className = "tanggal-pesanan";
        tanggalPesanan.textContent = pesanan.tanggal;

        informasiPesanan.appendChild(idPesanan);
        informasiPesanan.appendChild(document.createTextNode(" • "));
        informasiPesanan.appendChild(tanggalPesanan);

        const statusPesanan = document.createElement("span");
        statusPesanan.className = "badge-diproses";
        statusPesanan.textContent = pesanan.status;

        header.appendChild(informasiPesanan);
        header.appendChild(statusPesanan);

        kartu.appendChild(header);

        for (let j = 0; j < pesanan.produk.length; j++) {
            const itemPesanan = pesanan.produk[j];

            const item = document.createElement("div");
            item.className = "item-pesanan";

            const informasiItem = document.createElement("div");
            informasiItem.className = "info-item-pesanan";

            const namaItem = document.createElement("h4");
            namaItem.textContent = itemPesanan.nama;

            const jumlahItem = document.createElement("p");
            jumlahItem.textContent = "Jumlah: " + itemPesanan.jumlah + " x Rp " + itemPesanan.harga.toLocaleString("id-ID");

            informasiItem.appendChild(namaItem);
            informasiItem.appendChild(jumlahItem);

            const hargaItem = document.createElement("div");
            hargaItem.className = "harga-item";
            hargaItem.textContent = "Rp " + (itemPesanan.harga * itemPesanan.jumlah).toLocaleString("id-ID");

            item.appendChild(informasiItem);
            item.appendChild(hargaItem);

            kartu.appendChild(item);
        }

        const footer = document.createElement("div");
        footer.className = "footer-kartu-pesanan";

        const total = document.createElement("div");
        total.className = "harga-total";
        total.innerHTML = "Total Pesanan: <span>Rp " + pesanan.total.toLocaleString("id-ID") + "</span>";

        const aksi = document.createElement("div");
        aksi.className = "action-pesanan";

        const tombolDetail = document.createElement("button");
        tombolDetail.type = "button";
        tombolDetail.className = "tombol-detail";
        tombolDetail.textContent = "Detail Pesanan";

        tombolDetail.addEventListener("click", function() {
            alert("ID Pesanan: #" + pesanan.id);
        });

        aksi.appendChild(tombolDetail);
        footer.appendChild(total);
        footer.appendChild(aksi);

        kartu.appendChild(footer);
        halamanPesanan.appendChild(kartu);
    }
}

// Menjalankan fitur pesanan
tampilkanPesanan();
// Menu sidebar mobile
function pasangTombolKategori() {
    const tombolKategori = document.getElementById("buttonkategori");
    const sidebar = document.querySelector(".sidebar-nav");

    if (!tombolKategori || !sidebar) {
        return;
    }

    tombolKategori.addEventListener("click", function() {
        sidebar.classList.toggle("sidebar-terbuka");
    });
}

pasangTombolKategori();