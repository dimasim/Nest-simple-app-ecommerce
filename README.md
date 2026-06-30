# NestJS Simple E-Commerce API

Project backend sederhana untuk aplikasi E-Commerce menggunakan framework **NestJS**, **TypeORM**, dan **PostgreSQL**. Repository ini sudah mendukung Authentication (JWT & Role-based Access Control), manajemen pengguna (Users), manajemen produk (Products), serta fitur unggah gambar (file upload).

---

## 🚀 Fitur Utama

- **Autentikasi & Otorisasi**:
  - Register & Login menggunakan JWT (JSON Web Token).
  - Enkripsi password menggunakan `bcrypt`.
  - Role-based Access Control (RBAC) untuk mengamankan endpoint tertentu (e.g., hanya Admin yang bisa melihat daftar pengguna).
- **Manajemen Produk**:
  - Tambah, ubah, hapus, dan lihat data produk.
  - Dukungan unggah gambar produk menggunakan `multer` (tersimpan di direktori `uploads/`).
- **Static File Serving**:
  - File gambar yang diunggah dapat diakses secara publik melalui URL prefix `/uploads`.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database ORM**: [TypeORM](https://typeorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Security**: Passport JWT, Bcrypt
- **File Upload**: Multer

---

## 📦 Prerequisites & Setup

### 1. Database Configuration
Sebelum menjalankan aplikasi, pastikan PostgreSQL sudah berjalan dan buatlah database baru dengan nama `project_db`.
Konfigurasi database default di [src/app.module.ts](file:///d:/belajar/project-backend/src/app.module.ts):
- **Host**: `localhost`
- **Port**: `5434`
- **Username**: `postgres`
- **Password**: `postgres`
- **Database**: `project_db`

### 2. Install Dependencies
Instal semua modul Node.js yang diperlukan:
```bash
npm install
```

### 3. Run the Application
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

---

## 📌 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Deskripsi | Keterangan |
|--------|----------|-----------|------------|
| **POST** | `/auth/register` | Mendaftarkan pengguna baru | Body: `CreateUserDto` |
| **POST** | `/auth/login` | Login untuk mendapatkan token JWT | Body: `LoginDto` |

### 👥 Users
| Method | Endpoint | Deskripsi | Keterangan |
|--------|----------|-----------|------------|
| **POST** | `/users` | Membuat user baru secara langsung | |
| **GET** | `/users` | Mengambil daftar semua user | *Membutuhkan JWT & Role: Admin* |

### 📦 Products
| Method | Endpoint | Deskripsi | Keterangan |
|--------|----------|-----------|------------|
| **GET** | `/products` | Mengambil semua daftar produk | Publik |
| **GET** | `/products/:id` | Mengambil detail produk berdasarkan ID | Publik |
| **POST** | `/products` | Menambahkan produk baru (dengan upload `image`) | *Membutuhkan JWT* (Multipart form-data) |
| **PATCH** | `/products/:id` | Memperbarui data produk (dengan upload `image` opsional) | *Membutuhkan JWT* (Multipart form-data) |
| **DELETE** | `/products/:id` | Menghapus produk berdasarkan ID | *Membutuhkan JWT* |

---

## 📁 Struktur Proyek Utama

```bash
src/
├── auth/            # Modul Autentikasi (JWT, Strategy, Guards, Decorator)
├── products/        # Modul Produk (Controller, Service, Entity, DTO)
├── users/           # Modul Pengguna (Controller, Service, Entity, DTO)
├── app.module.ts    # Modul Utama (Konfigurasi TypeORM & Static Serving)
└── main.ts          # Entry point aplikasi
```

---

## 📝 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

