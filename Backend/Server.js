const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// ===============================
// FRONTEND
// ===============================

const frontendPath = path.join(__dirname, "..", "Frontend");

app.use(express.static(frontendPath));


// ===============================
// DATA PRODUK SEMENTARA
// ===============================

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


// ===============================
// API PRODUK
// ===============================

app.get("/api/products", (req, res) => {
    res.json(products);
});


// ===============================
// SERVER
// ===============================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di port ${PORT}`);
});