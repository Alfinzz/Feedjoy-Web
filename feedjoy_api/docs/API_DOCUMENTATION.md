# FeedJoy API Documentation

API REST untuk sistem manajemen pesanan makanan dengan autentikasi Laravel Passport.

**Base URL:** `http://localhost:8000/api`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Products](#products)
3. [Orders](#orders)
4. [Reviews](#reviews)
5. [Models](#models)
6. [Error Responses](#error-responses)

---

## Authentication

Semua endpoint yang memerlukan autentikasi harus menyertakan header:

```
Authorization: Bearer {token}
```

### Register

Mendaftarkan user baru.

**Endpoint:** `POST /auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "081234567890"
}
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "081234567890",
            "role": "user",
            "created_at": "2025-12-14T06:00:00.000000Z"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJS..."
    }
}
```

---

### Login

Login dan mendapatkan access token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
``` 

**Response Success (200):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "user"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJS..."
    }
}
```

---

### Logout

Logout dan revoke token.

**Endpoint:** `POST /auth/logout`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "message": "Successfully logged out"
}
```

---

### Get Profile

Mendapatkan profil user yang sedang login.

**Endpoint:** `GET /auth/profile`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "081234567890",
        "role": "user",
        "created_at": "2025-12-14T06:00:00.000000Z"
    }
}
```

---

### Update Profile

Mengupdate profil user.

**Endpoint:** `PUT /auth/profile`

**Auth Required:** Yes

**Request Body:**
```json
{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "081234567899",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

> Note: Semua field bersifat optional

**Response Success (200):**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        "id": 1,
        "name": "John Updated",
        "email": "john.updated@example.com",
        "phone": "081234567899"
    }
}
```

---

### Delete Account

Menghapus akun user.

**Endpoint:** `DELETE /auth/account`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "message": "Account deleted successfully"
}
```

---

### Forgot Password

Meminta reset password token.

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
    "email": "john@example.com"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Password reset token generated successfully",
    "data": {
        "reset_token": "abc123...",
        "note": "In production, this token would be sent via email"
    }
}
```

---

### Reset Password

Reset password dengan token.

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
    "email": "john@example.com",
    "token": "abc123...",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Password reset successfully"
}
```

---

## Products

### List Products (Public)

Mendapatkan daftar produk.

**Endpoint:** `GET /products`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| search | string | Search by name |
| sort_by | string | Sort field (default: created_at) |
| sort_order | string | asc/desc (default: desc) |
| per_page | int | Items per page (default: 10) |
| show_all | boolean | Include inactive products |

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "name": "Nasi Goreng Special",
                "description": "Nasi goreng dengan telur dan ayam",
                "price": "25000.00",
                "image": "products/nasigoreng.jpg",
                "category": "Makanan",
                "stock": 50,
                "is_active": true,
                "created_at": "2025-12-14T06:00:00.000000Z"
            }
        ],
        "total": 1,
        "per_page": 10
    }
}
```

---

### Get Product Detail (Public)

Mendapatkan detail produk.

**Endpoint:** `GET /products/{id}`

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Nasi Goreng Special",
        "description": "Nasi goreng dengan telur dan ayam",
        "price": "25000.00",
        "image": "products/nasigoreng.jpg",
        "category": "Makanan",
        "stock": 50,
        "is_active": true
    }
}
```

---

### Get Categories (Public)

Mendapatkan daftar kategori.

**Endpoint:** `GET /products/categories`

**Response Success (200):**
```json
{
    "success": true,
    "data": ["Makanan", "Minuman", "Snack"]
}
```

---

### Create Product (Admin)

Menambahkan produk baru.

**Endpoint:** `POST /admin/products`

**Auth Required:** Yes (Admin)

**Content-Type:** `multipart/form-data`

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Nama produk |
| description | string | No | Deskripsi |
| price | number | Yes | Harga |
| image | file | No | Gambar produk |
| category | string | No | Kategori |
| stock | integer | No | Stok (default: 0) |
| is_active | boolean | No | Status aktif (default: true) |

**Response Success (201):**
```json
{
    "success": true,
    "message": "Product created successfully",
    "data": {
        "id": 1,
        "name": "Nasi Goreng Special",
        "price": "25000.00"
    }
}
```

---

### Update Product (Admin)

Mengupdate produk.

**Endpoint:** `PUT /admin/products/{id}`

**Auth Required:** Yes (Admin)

**Request Body:** Same as Create Product (all fields optional)

**Response Success (200):**
```json
{
    "success": true,
    "message": "Product updated successfully",
    "data": { ... }
}
```

---

### Delete Product (Admin)

Menghapus produk.

**Endpoint:** `DELETE /admin/products/{id}`

**Auth Required:** Yes (Admin)

**Response Success (200):**
```json
{
    "success": true,
    "message": "Product deleted successfully"
}
```

---

## Orders

### Create Order (User)

Membuat pesanan baru.

**Endpoint:** `POST /orders`

**Auth Required:** Yes

**Request Body:**
```json
{
    "product_id": 1,
    "quantity": 2,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "address": "Jl. Contoh No. 123, Jakarta",
    "notes": "Tidak pedas"
}
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "Order created successfully",
    "data": {
        "id": 1,
        "user_id": 1,
        "product_id": 1,
        "quantity": 2,
        "total_price": "50000.00",
        "status": "pending",
        "full_name": "John Doe",
        "email": "john@example.com",
        "phone": "081234567890",
        "address": "Jl. Contoh No. 123, Jakarta",
        "notes": "Tidak pedas",
        "product": { ... }
    }
}
```

---

### List Orders (User)

Mendapatkan daftar pesanan user.

**Endpoint:** `GET /orders`

**Auth Required:** Yes

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status |
| per_page | int | Items per page |

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "status": "pending",
                "total_price": "50000.00",
                "product": { ... },
                "review": null
            }
        ]
    }
}
```

---

### Get Order Detail (User)

Mendapatkan detail pesanan.

**Endpoint:** `GET /orders/{id}`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "status": "pending",
        "product": { ... },
        "review": null
    }
}
```

---

### Order History (User)

Mendapatkan riwayat pesanan (completed).

**Endpoint:** `GET /orders/history`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": 1,
                "status": "completed",
                "product": { ... },
                "review": { ... }
            }
        ]
    }
}
```

---

### Delete Order from History (User)

Menghapus pesanan dari riwayat (hanya completed).

**Endpoint:** `DELETE /orders/{id}`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "message": "Order removed from history"
}
```

---

### List All Orders (Admin)

Mendapatkan semua pesanan.

**Endpoint:** `GET /admin/orders`

**Auth Required:** Yes (Admin)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status |
| user_id | int | Filter by user |
| per_page | int | Items per page |

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": 1,
                "user": { ... },
                "product": { ... },
                "status": "pending"
            }
        ]
    }
}
```

---

### Update Order Status (Admin)

Mengupdate status pesanan.

**Endpoint:** `PUT /admin/orders/{id}/status`

**Auth Required:** Yes (Admin)

**Request Body:**
```json
{
    "status": "processing"
}
```

**Available Status Values:**
- `pending` - Menunggu
- `processing` - Diproses
- `shipped` - Dikirim
- `completed` - Selesai
- `cancelled` - Dibatalkan

**Response Success (200):**
```json
{
    "success": true,
    "message": "Order status updated successfully",
    "data": {
        "id": 1,
        "status": "processing"
    }
}
```

---

## Reviews

### Get Testimonials (Public)

Mendapatkan testimonial untuk landing page.

**Endpoint:** `GET /testimonials`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | int | Number of items (default: 10) |

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "rating": 5,
            "comment": "Makanan enak sekali!",
            "is_testimonial": true,
            "user": {
                "id": 1,
                "name": "John Doe"
            },
            "order": {
                "product": {
                    "id": 1,
                    "name": "Nasi Goreng Special"
                }
            }
        }
    ]
}
```

---

### Create Review (User)

Menambahkan review untuk pesanan yang sudah selesai.

**Endpoint:** `POST /reviews`

**Auth Required:** Yes

**Request Body:**
```json
{
    "order_id": 1,
    "rating": 5,
    "comment": "Makanan enak sekali!"
}
```

> Note: Hanya bisa review pesanan dengan status "completed"

**Response Success (201):**
```json
{
    "success": true,
    "message": "Review created successfully",
    "data": {
        "id": 1,
        "order_id": 1,
        "rating": 5,
        "comment": "Makanan enak sekali!",
        "is_testimonial": false
    }
}
```

---

### List My Reviews (User)

Mendapatkan daftar review user.

**Endpoint:** `GET /reviews`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": 1,
                "rating": 5,
                "comment": "Makanan enak sekali!",
                "order": {
                    "product": { ... }
                }
            }
        ]
    }
}
```

---

### Update Review (User)

Mengupdate review.

**Endpoint:** `PUT /reviews/{id}`

**Auth Required:** Yes

**Request Body:**
```json
{
    "rating": 4,
    "comment": "Updated comment"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Review updated successfully",
    "data": { ... }
}
```

---

### Delete Review (User)

Menghapus review.

**Endpoint:** `DELETE /reviews/{id}`

**Auth Required:** Yes

**Response Success (200):**
```json
{
    "success": true,
    "message": "Review deleted successfully"
}
```

---

### List All Reviews (Admin)

Mendapatkan semua review.

**Endpoint:** `GET /admin/reviews`

**Auth Required:** Yes (Admin)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| is_testimonial | boolean | Filter testimonials |
| rating | int | Filter by rating |
| per_page | int | Items per page |

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": 1,
                "user": { ... },
                "order": { "product": { ... } },
                "rating": 5,
                "is_testimonial": false
            }
        ]
    }
}
```

---

### Toggle Testimonial (Admin)

Toggle status testimonial review.

**Endpoint:** `PUT /admin/reviews/{id}/testimonial`

**Auth Required:** Yes (Admin)

**Response Success (200):**
```json
{
    "success": true,
    "message": "Review added to testimonials",
    "data": {
        "id": 1,
        "is_testimonial": true
    }
}
```

---

## Models

### User

```json
{
    "id": "integer",
    "name": "string",
    "email": "string (unique)",
    "phone": "string (nullable)",
    "role": "enum: user, admin",
    "email_verified_at": "datetime (nullable)",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

### Product

```json
{
    "id": "integer",
    "name": "string",
    "description": "text (nullable)",
    "price": "decimal(12,2)",
    "image": "string (nullable)",
    "category": "string (nullable)",
    "stock": "integer (default: 0)",
    "is_active": "boolean (default: true)",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

### Order

```json
{
    "id": "integer",
    "user_id": "integer (foreign key)",
    "product_id": "integer (foreign key)",
    "quantity": "integer (default: 1)",
    "total_price": "decimal(12,2)",
    "status": "enum: pending, processing, shipped, completed, cancelled",
    "full_name": "string",
    "email": "string",
    "phone": "string",
    "address": "text",
    "notes": "text (nullable)",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

### Review

```json
{
    "id": "integer",
    "user_id": "integer (foreign key)",
    "order_id": "integer (foreign key)",
    "rating": "integer (1-5)",
    "comment": "text (nullable)",
    "is_testimonial": "boolean (default: false)",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

---

## Error Responses

### Validation Error (422)

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password must be at least 8 characters."]
    }
}
```

### Unauthorized (401)

```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

### Forbidden (403)

```json
{
    "success": false,
    "message": "Access denied. Admin privileges required."
}
```

### Not Found (404)

```json
{
    "success": false,
    "message": "Resource not found"
}
```

### Bad Request (400)

```json
{
    "success": false,
    "message": "Error message describing the issue"
}
```

---

## Quick Start

### 1. Register User

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Create Order (with token)

```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "product_id": 1,
    "quantity": 2,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "address": "Jl. Contoh No. 123"
  }'
```

---

## Creating Admin User

Untuk membuat admin user, jalankan tinker:

```bash
php artisan tinker
```

Kemudian:

```php
$user = App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => 'admin123',
    'role' => 'admin'
]);
```

---

## API Routes Summary

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /auth/register | No | - | Register user |
| POST | /auth/login | No | - | Login |
| POST | /auth/logout | Yes | - | Logout |
| GET | /auth/profile | Yes | - | Get profile |
| PUT | /auth/profile | Yes | - | Update profile |
| DELETE | /auth/account | Yes | - | Delete account |
| POST | /auth/forgot-password | No | - | Forgot password |
| POST | /auth/reset-password | No | - | Reset password |
| GET | /products | No | - | List products |
| GET | /products/categories | No | - | List categories |
| GET | /products/{id} | No | - | Product detail |
| POST | /admin/products | Yes | Admin | Create product |
| PUT | /admin/products/{id} | Yes | Admin | Update product |
| DELETE | /admin/products/{id} | Yes | Admin | Delete product |
| GET | /orders | Yes | - | List user orders |
| GET | /orders/history | Yes | - | Order history |
| POST | /orders | Yes | - | Create order |
| GET | /orders/{id} | Yes | - | Order detail |
| DELETE | /orders/{id} | Yes | - | Delete from history |
| GET | /admin/orders | Yes | Admin | List all orders |
| GET | /admin/orders/{id} | Yes | Admin | Order detail |
| PUT | /admin/orders/{id}/status | Yes | Admin | Update status |
| GET | /testimonials | No | - | List testimonials |
| GET | /reviews | Yes | - | List user reviews |
| POST | /reviews | Yes | - | Create review |
| GET | /reviews/{id} | Yes | - | Review detail |
| PUT | /reviews/{id} | Yes | - | Update review |
| DELETE | /reviews/{id} | Yes | - | Delete review |
| GET | /admin/reviews | Yes | Admin | List all reviews |
| PUT | /admin/reviews/{id}/testimonial | Yes | Admin | Toggle testimonial |
| DELETE | /admin/reviews/{id} | Yes | Admin | Delete review |
