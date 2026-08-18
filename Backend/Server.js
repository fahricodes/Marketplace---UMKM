const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const frontendPath = path.join(__dirname, "..", "Frontend");

app.use(express.static(frontendPath));
// HALAMAN UTAMA
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "homescreen.html"));
});
// HALAMAN WEBSITE
app.get("/homescreen.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "homescreen.html"));
});

app.get("/akun.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "akun.html"));
});

app.get("/masukdaftar.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "masukdaftar.html"));
});

app.get("/pengaturan.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "pengaturan.html"));
});
app.get("/pesanan.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "pesanan.html"));
});
app.get("/wishlist.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "wishlist.html"));
});
app.get("/keranjang.html", (req, res) => {
    res.sendFile(path.join(frontendPath, "keranjang.html"));
});
// DATA PRODUK SEMENTARA
const products = [
    {
        id: 1,
        name: "Produk 1",
        price: 100000,
        category: "Makanan & Minuman"
    },
    {
        id: 2,
        name: "Produk 2",
        price: 150000,
        category: "Fashion Lokal"
    },
    {
        id: 3,
        name: "Produk 3",
        price: 200000,
        category: "Kerajinan Tangan"
    }
];
// API PRODUK
app.get("/api/products", (req, res) => {
    res.json(products);
});
// SERVER
if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server berjalan di port ${PORT}`);
    });
}
module.exports = app;