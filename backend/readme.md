# KaryaNusa Backend API

KaryaNusa adalah platform marketplace digital yang berfokus pada pemberdayaan produk lokal dan hasil daur ulang kreatif. Repositori ini berisi kode sumber untuk sistem Backend yang dibangun menggunakan **Node.js**, **Express**, dan **Supabase**.

---

## Fitur Utama
* **Autentikasi Pengguna**: Register, Login, dan Logout menggunakan Supabase Auth.
* **Manajemen Profil**: Pemisahan peran antara `Seller` (Penjual) dan `Buyer` (Pembeli).
* **CRUD Produk**: Pengelolaan data barang (Nama, Harga, Deskripsi).
* **Sistem Keamanan**: Proteksi rute menggunakan Middleware (JWT Token).
* **Database Relasional**: Integrasi tabel `profiles` dan `products` dengan PostgreSQL (via Supabase).

---

## Teknologi yang Digunakan
* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
* **Tools**: Postman (API Testing), Git & GitHub.

---

## Instalasi

**Clone Repository**
   ```bash
   git clone [git@github.com:lilymilo/KaryaNusa.git]
