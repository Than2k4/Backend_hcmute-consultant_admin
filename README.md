
# 🧠 HCMUTE Consultant Admin – Backend  
**License:** MIT  
**Framework:** NestJS + MongoDB   

Một hệ thống **backend** được phát triển để phục vụ ứng dụng quản lý tư vấn học tập tại **Trường Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE)**.  
Hệ thống cung cấp API cho ứng dụng Admin, quản lý người dùng, phòng ban, lĩnh vực, câu hỏi – trả lời, bài viết, và thống kê dữ liệu.

---

## 📑 Table of Contents
- [Overview](#-overview)  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Project Structure](#-project-structure)  
- [Installation](#-installation)  
- [Environment Variables](#-environment-variables)  
- [Run Commands](#-run-commands)  
- [API Overview](#-api-overview)  
- [Author](#-author)

---

## 🔍 Overview
Backend này là phần lõi của hệ thống HCMUTE Consultant Admin.  
Nó cung cấp RESTful API cho giao diện **Next.js frontend**, cho phép:
- Quản lý khoa, lĩnh vực, người dùng, bài viết, câu hỏi và câu trả lời.  
- Xử lý logic thống kê cho dashboard admin.  
- Liên kết dữ liệu giữa các mô-đun MongoDB qua **Mongoose ODM**.

---

## ✨ Features
✅ CRUD cho **Phòng ban (Department)** và **Lĩnh vực (Field)**  
✅ CRUD cho **Người dùng, Câu hỏi, Câu trả lời, Bài viết**  
✅ Tự động xoá toàn bộ **Field** khi xoá **Department**  
✅ Tích hợp **JWT Authentication**  
✅ **Global Error Handling** và **Validation Pipe**  
✅ API thống kê Dashboard (User, Câu hỏi, Bài viết, Phòng ban, Tỉ lệ trả lời, v.v.)

---

## 🧰 Tech Stack
| Area | Technology |
|------|-------------|
| **Framework** | NestJS |
| **Database** | MongoDB (Mongoose) |
| **Language** | TypeScript |
| **Validation** | class-validator, class-transformer |
| **Authentication** | JWT |
| **Environment** | dotenv |
| **Build Tool** | tsc |
| **Package Manager** | npm / yarn |

---

## 📂 Project Structure
```
Backend_hcmute-consultant_admin/
│
├── src/
│   ├── departments/
│   │   ├── departments.controller.ts
│   │   ├── departments.service.ts
│   │   └── schemas/
│   │       ├── department.schema.ts
│   │       └── field.schema.ts
│   ├── users/
│   ├── questions/
│   ├── answers/
│   ├── posts/
│   ├── app.module.ts
│   └── main.ts
│
├── dist/                # compiled JS files
├── package.json
├── tsconfig.json
└── .env.example
```

---

## ⚙️ Installation

### 1️⃣ Clone repository
```bash
git clone https://github.com/Than2k4/Backend_hcmute-consultant_admin.git
cd Backend_hcmute-consultant_admin
```

### 2️⃣ Install dependencies
```bash
npm install
# hoặc
yarn install
```

---

## 🧩 Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
OTP_EXPIRES_MIN=5
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Run Commands

### Development
```bash
npm run start:dev
```

### Production build
```bash
npm run build
npm run start:prod
```

---

## 📡 API Overview

| Resource | Method | Endpoint | Description |
|-----------|---------|-----------|-------------|
| Department | GET | `/departments` | Lấy tất cả khoa |
| Department | POST | `/departments` | Thêm khoa mới |
| Field | POST | `/fields` | Thêm lĩnh vực |
| Department | DELETE | `/departments/:id` | Xoá khoa (và field liên quan) |
| Question | GET | `/questions` | Lấy danh sách câu hỏi |
| Stats | GET | `/dashboard/stats` | Lấy dữ liệu thống kê Dashboard |
