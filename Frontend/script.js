const produk = {
    nama: "Keripik Pisang",
    harga: 15000,
    stok: 20
};

const daftarProduk = document.getElementById("daftar-produk");

daftarProduk.innerHTML = `
    <div class="produk">
        <h3>${produk.nama}</h3>
        <p>Harga: Rp${produk.harga}</p>
        <p>Stok: ${produk.stok}</p>
    </div>
`;