# FeedJoy API - Dokumentasi Autentikasi

Dokumentasi lengkap untuk endpoint autentikasi FeedJoy API menggunakan Laravel Passport.

**Base URL:** `http://localhost:8000/api`

**Versi:** 1.0

---

## 📋 Daftar Isi

1. [Ikhtisar](#ikhtisar)
2. [Autentikasi](#autentikasi)
3. [Endpoint Publik](#endpoint-publik)
   - [Register](#1-register)
   - [Login](#2-login)
   - [Forgot Password](#3-forgot-password)
   - [Reset Password](#4-reset-password)
4. [Endpoint Terproteksi](#endpoint-terproteksi)
   - [Logout](#5-logout)
   - [Get Profile](#6-get-profile)
   - [Update Profile](#7-update-profile)
   - [Delete Account](#8-delete-account)
5. [Response Codes](#response-codes)
6. [Error Handling](#error-handling)

---

## Ikhtisar

FeedJoy API menggunakan **Laravel Passport** untuk autentikasi berbasis token OAuth2. Setelah berhasil login atau register, client akan menerima **access token** yang harus disertakan dalam setiap request ke endpoint yang memerlukan autentikasi.

### Fitur Autentikasi
- ✅ Registrasi user baru
- ✅ Login dengan email & password
- ✅ Logout (revoke token)
- ✅ Lihat & update profile
- ✅ Hapus akun
- ✅ Forgot & reset password
- ✅ Role-based access (user/admin)

---

## Autentikasi

Semua endpoint yang memerlukan autentikasi harus menyertakan header:

```http
Authorization: Bearer {access_token}
```

**Contoh:**
```http
GET /api/auth/profile
Host: localhost:8000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...
Content-Type: application/json
```

---

## Endpoint Publik

Endpoint berikut dapat diakses tanpa autentikasi.

### 1. Register

Mendaftarkan user baru dan langsung mendapatkan access token.

**Endpoint:** `POST /auth/register`

**Headers:**
```http
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "081234567890",
    "remember_me": true
}
```

**Request Parameters:**

| Field | Type | Required | Validasi | Deskripsi |
|-------|------|----------|----------|-----------|
| name | string | ✅ Yes | max:255 | Nama lengkap user |
| email | string | ✅ Yes | email, unique | Email user (harus unique) |
| password | string | ✅ Yes | min:8, confirmed | Password (minimal 8 karakter) |
| password_confirmation | string | ✅ Yes | - | Konfirmasi password (harus sama) |
| phone | string | ❌ No | max:20 | Nomor telepon |
| remember_me | boolean | ❌ No | - | Ingat saya (token valid 7 hari jika true, 1 hari jika false) |

**Response Success (201 Created):**
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
            "created_at": "2025-12-16T08:00:00.000000Z",
            "updated_at": "2025-12-16T08:00:00.000000Z"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "expires_at": "2026-01-15T08:00:00",
        "remember_me": true
    }
}
```

**Response Error (422 Validation Failed):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "The email has already been taken."
        ],
        "password": [
            "The password must be at least 8 characters."
        ]
    }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "081234567890"
  }'
```

---

### 2. Login

Login dengan kredensial yang sudah terdaftar dan mendapatkan access token.

**Endpoint:** `POST /auth/login`

**Headers:**
```http
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123",
    "remember_me": true
}
```

**Request Parameters:**

| Field | Type | Required | Validasi | Deskripsi |
|-------|------|----------|----------|-----------|
| email | string | ✅ Yes | email | Email terdaftar |
| password | string | ✅ Yes | - | Password user |
| remember_me | boolean | ❌ No | - | Ingat saya (token valid 7 hari jika true, 1 hari jika false) |

**Response Success (200 OK):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "081234567890",
            "role": "user",
            "created_at": "2025-12-16T08:00:00.000000Z",
            "updated_at": "2025-12-16T08:00:00.000000Z"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "expires_at": "2026-01-15T08:00:00",
        "remember_me": true
    }
}
```

**Response Error (401 Unauthorized):**
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

**Response Error (422 Validation Failed):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "The email field is required."
        ]
    }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "remember_me": true
  }'
```

---

### 3. Forgot Password

Meminta reset password token. Dalam production, token akan dikirim via email. Saat ini token dikembalikan langsung untuk keperluan testing.

**Endpoint:** `POST /auth/forgot-password`

**Headers:**
```http
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
    "email": "john@example.com"
}
```

**Request Parameters:**

| Field | Type | Required | Validasi | Deskripsi |
|-------|------|----------|----------|-----------|
| email | string | ✅ Yes | email, exists:users | Email yang terdaftar di sistem |

**Response Success (200 OK):**
```json
{
    "success": true,
    "message": "Password reset token generated successfully",
    "data": {
        "reset_token": "8Kq4XjN9vB2M5pR7sT1uW3zL6dF0hY8eG4cV7nA2kS9xJ5mP1qT3rU6wZ",
        "note": "In production, this token would be sent via email"
    }
}
```

> **⚠️ CATATAN:** Field `reset_token` hanya muncul di development environment untuk keperluan testing. Di production, token hanya dikirim via email.

**Response Error (422 Validation Failed):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "The selected email is invalid."
        ]
    }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Catatan Keamanan:**
- Token valid selama **60 menit**
- Token di-hash sebelum disimpan ke database
- Token lama akan dihapus saat request token baru

---

### 4. Reset Password

Reset password menggunakan token yang didapat dari forgot password.

**Endpoint:** `POST /auth/reset-password`

**Headers:**
```http
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
    "email": "john@example.com",
    "token": "8Kq4XjN9vB2M5pR7sT1uW3zL6dF0hY8eG4cV7nA2kS9xJ5mP1qT3rU6wZ",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

**Request Parameters:**

| Field | Type | Required | Validasi | Deskripsi |
|-------|------|----------|----------|-----------|
| email | string | ✅ Yes | email, exists:users | Email terdaftar |
| token | string | ✅ Yes | - | Reset token dari forgot password |
| password | string | ✅ Yes | min:8, confirmed | Password baru |
| password_confirmation | string | ✅ Yes | - | Konfirmasi password baru |

**Response Success (200 OK):**
```json
{
    "success": true,
    "message": "Password reset successfully"
}
```

**Response Error (400 Bad Request):**
```json
{
    "success": false,
    "message": "Invalid or expired reset token"
}
```

atau

```json
{
    "success": false,
    "message": "Reset token has expired"
}
```

**Response Error (422 Validation Failed):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "password": [
            "The password confirmation does not match."
        ]
    }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "john@example.com",
    "token": "8Kq4XjN9vB2M5pR7sT1uW3zL6dF0hY8eG4cV7nA2kS9xJ5mP1qT3rU6wZ",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }'
```

**Flow Reset Password:**
1. User request forgot password → dapat token
2. User submit reset password dengan token
3. Sistem validasi token (exists & belum expired)
4. Password diupdate & token dihapus dari database

---

## Endpoint Terproteksi

Endpoint berikut memerlukan autentikasi (header `Authorization: Bearer {token}`).

### 5. Logout

Logout dan revoke access token yang sedang digunakan.

**Endpoint:** `POST /auth/logout`

**Auth Required:** ✅ Yes

**Headers:**
```http
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Request Body:** 
```json
(tidak ada payload)
```

**Response Success (200 OK):**
```json
{
    "success": true,
    "message": "Successfully logged out"
}
```

**Response Error (401 Unauthorized):**
```json
{
    "message": "Unauthenticated."
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```

**Catatan:**
- Token yang di-logout tidak bisa digunakan lagi
- User harus login ulang untuk mendapatkan token baru

---

### 6. Get Profile

Mendapatkan informasi profile user yang sedang login.

**Endpoint:** `GET /auth/profile`

**Auth Required:** ✅ Yes

**Headers:**
```http
Authorization: Bearer {access_token}
Accept: application/json
```

**Response Success (200 OK):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "081234567890",
        "role": "user",
        "email_verified_at": null,
        "created_at": "2025-12-16T08:00:00.000000Z",
        "updated_at": "2025-12-16T08:00:00.000000Z"
    }
}
```

**Response Error (401 Unauthorized):**
```json
{
    "message": "Unauthenticated."
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8000/api/auth/profile \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
  -H "Accept: application/json"
```

---

### 7. Update Profile

Mengupdate informasi profile user. Semua field bersifat optional, kirim hanya field yang ingin diupdate.

**Endpoint:** `PUT /auth/profile`

**Auth Required:** ✅ Yes

**Headers:**
```http
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

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

**Request Parameters:**

| Field | Type | Required | Validasi | Deskripsi |
|-------|------|----------|----------|-----------|
| name | string | ❌ No | max:255 | Nama baru |
| email | string | ❌ No | email, unique (kecuali email sendiri) | Email baru |
| phone | string | ❌ No | max:20 | Nomor telepon baru |
| password | string | ❌ No | min:8, confirmed | Password baru |
| password_confirmation | string | ❌ No* | - | Konfirmasi password (*required jika update password) |

> **💡 TIP:** Semua field bersifat **optional**. Kirim hanya field yang ingin diubah.

**Response Success (200 OK):**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        "id": 1,
        "name": "John Updated",
        "email": "john.updated@example.com",
        "phone": "081234567899",
        "role": "user",
        "email_verified_at": null,
        "created_at": "2025-12-16T08:00:00.000000Z",
        "updated_at": "2025-12-16T09:00:00.000000Z"
    }
}
```

**Response Error (422 Validation Failed):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "The email has already been taken."
        ],
        "password": [
            "The password confirmation does not match."
        ]
    }
}
```

**Response Error (401 Unauthorized):**
```json
{
    "message": "Unauthenticated."
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:8000/api/auth/profile \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "081234567899"
  }'
```

**Contoh Update Password Saja:**
```bash
curl -X PUT http://localhost:8000/api/auth/profile \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }'
```

---

### 8. Delete Account

Menghapus akun user secara permanen. Semua token akan di-revoke dan data user dihapus.

**Endpoint:** `DELETE /auth/account`

**Auth Required:** ✅ Yes

**Headers:**
```http
Authorization: Bearer {access_token}
Accept: application/json
```

**Request Body:** 
```json
(tidak ada payload)
```

**Response Success (200 OK):**
```json
{
    "success": true,
    "message": "Account deleted successfully"
}
```

**Response Error (401 Unauthorized):**
```json
{
    "message": "Unauthenticated."
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:8000/api/auth/account \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
  -H "Accept: application/json"
```

**⚠️ PERINGATAN:** 
- Aksi ini **TIDAK BISA DIBATALKAN**
- Semua data user akan dihapus permanen
- Semua token akan di-revoke
- User harus registrasi ulang jika ingin menggunakan aplikasi lagi

---

## Response Codes

| HTTP Code | Status | Deskripsi |
|-----------|--------|-----------|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat (register) |
| 400 | Bad Request | Request invalid (token expired, dll) |
| 401 | Unauthorized | Autentikasi gagal/token invalid |
| 422 | Unprocessable Entity | Validasi gagal |
| 500 | Internal Server Error | Error di server |

---

## Error Handling

### Format Error Response

Semua error response mengikuti format standar:

**Validation Error (422):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "field_name": [
            "Error message 1",
            "Error message 2"
        ]
    }
}
```

**Authentication Error (401):**
```json
{
    "message": "Unauthenticated."
}
```

atau

```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

**General Error:**
```json
{
    "success": false,
    "message": "Error message here"
}
```

### Contoh Error Responses

**1. Email sudah terdaftar:**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "The email has already been taken."
        ]
    }
}
```

**2. Password tidak match:**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "password": [
            "The password confirmation does not match."
        ]
    }
}
```

**3. Password terlalu pendek:**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "password": [
            "The password must be at least 8 characters."
        ]
    }
}
```

**4. Token expired/invalid:**
```json
{
    "message": "Unauthenticated."
}
```

---

## Testing dengan Postman

### Setup Environment

1. Create new environment dengan variables:
   - `base_url`: `http://localhost:8000/api`
   - `token`: (kosong, akan di-set otomatis)

2. Setelah login/register, simpan token ke environment variable:
   ```javascript
   // Di Postman Tests tab
   pm.environment.set("token", pm.response.json().data.token);
   ```

3. Gunakan `{{token}}` di Authorization header untuk endpoint terproteksi

### Flow Testing

**1. Register User Baru:**
```
POST {{base_url}}/auth/register
Body: name, email, password, password_confirmation, phone
→ Simpan token ke environment
```

**2. Login:**
```
POST {{base_url}}/auth/login
Body: email, password
→ Simpan token ke environment
```

**3. Get Profile:**
```
GET {{base_url}}/auth/profile
Header: Authorization: Bearer {{token}}
```

**4. Update Profile:**
```
PUT {{base_url}}/auth/profile
Header: Authorization: Bearer {{token}}
Body: name, email, phone (optional)
```

**5. Logout:**
```
POST {{base_url}}/auth/logout
Header: Authorization: Bearer {{token}}
```

---

## Role-Based Access

Sistem menggunakan 2 role:

| Role | Deskripsi | Default |
|------|-----------|---------|
| `user` | User biasa | ✅ Yes (saat register) |
| `admin` | Administrator | ❌ No |

**Access Control:**
- Semua user bisa akses endpoint `/auth/*` dan `/orders/*`
- Hanya admin yang bisa akses endpoint `/admin/*`
- Role di-set otomatis saat register → `role: "user"`
- Untuk upgrade ke admin, update manual di database

---

## Frontend Implementation Guide

### Remember Me Feature

Fitur "Ingat Saya" memungkinkan user tetap login dalam periode waktu tertentu tanpa perlu memasukkan kredensial lagi.

#### Cara Kerja

1. **Dengan Remember Me = true:**
   - Token disimpan di `localStorage` (persisten)
   - Token valid selama 7 hari
   - User tetap login meski browser ditutup

2. **Dengan Remember Me = false/tidak diisi:**
   - Token disimpan di `sessionStorage` (temporary)
   - Token valid selama 1 hari
   - User logout otomatis saat browser ditutup

### Implementasi di React

#### 1. Auth Service

```javascript
// services/authService.js
const API_BASE_URL = 'http://localhost:8000/api';

export const authService = {
  // Login dengan remember me
  async login(email, password, rememberMe = false) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        remember_me: rememberMe
      })
    });

    const data = await response.json();

    if (data.success) {
      // Simpan token sesuai preferensi user
      this.setToken(data.data.token, rememberMe);
      this.setUser(data.data.user, rememberMe);
      return data.data;
    }

    throw new Error(data.message || 'Login failed');
  },

  // Register dengan remember me
  async register(userData, rememberMe = false) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        remember_me: rememberMe
      })
    });

    const data = await response.json();

    if (data.success) {
      this.setToken(data.data.token, rememberMe);
      this.setUser(data.data.user, rememberMe);
      return data.data;
    }

    throw new Error(data.message || 'Registration failed');
  },

  // Logout
  async logout() {
    const token = this.getToken();
    
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
    }

    this.clearAuth();
  },

  // Token management
  setToken(token, remember) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
    
    // Set flag untuk tahu storage mana yang digunakan
    if (remember) {
      localStorage.setItem('remember_me', 'true');
      sessionStorage.removeItem('auth_token');
    } else {
      sessionStorage.setItem('remember_me', 'false');
      localStorage.removeItem('auth_token');
    }
  },

  getToken() {
    // Cek localStorage dulu, lalu sessionStorage
    return localStorage.getItem('auth_token') || 
           sessionStorage.getItem('auth_token');
  },

  setUser(user, remember) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const userStr = localStorage.getItem('user') || 
                    sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  clearAuth() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('remember_me');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('remember_me');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
};
```

#### 2. Login Component

```jsx
// components/LoginForm.jsx
import { useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(
        formData.email,
        formData.password,
        formData.rememberMe
      );

      // Redirect ke dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />

      <label>
        <input
          type="checkbox"
          checked={formData.rememberMe}
          onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
        />
        Ingat Saya (7 hari)
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

#### 3. Protected Route

```jsx
// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ProtectedRoute({ children }) {
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

#### 4. App.jsx dengan Auto-Check Auth

```jsx
// App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth status saat app load
    const checkAuth = async () => {
      const token = authService.getToken();
      
      if (token) {
        try {
          // Verify token dengan memanggil profile endpoint
          const response = await fetch('http://localhost:8000/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Token invalid/expired, clear auth
            authService.clearAuth();
            setIsAuthenticated(false);
          }
        } catch (error) {
          authService.clearAuth();
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <LoginForm />
          } 
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Implementasi di Vue.js

#### Auth Store (Pinia)

```javascript
// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    rememberMe: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email, password, rememberMe = false) {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          remember_me: rememberMe
        })
      });

      const data = await response.json();

      if (data.success) {
        this.setAuth(data.data.token, data.data.user, rememberMe);
        return data.data;
      }

      throw new Error(data.message || 'Login failed');
    },

    setAuth(token, user, remember) {
      this.token = token;
      this.user = user;
      this.rememberMe = remember;

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('auth_token', token);
      storage.setItem('user', JSON.stringify(user));
      
      if (remember) {
        localStorage.setItem('remember_me', 'true');
        sessionStorage.clear();
      } else {
        sessionStorage.setItem('remember_me', 'false');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    },

    loadAuth() {
      const token = localStorage.getItem('auth_token') || 
                   sessionStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user') || 
                     sessionStorage.getItem('user');

      if (token && userStr) {
        this.token = token;
        this.user = JSON.parse(userStr);
        this.rememberMe = localStorage.getItem('remember_me') === 'true';
      }
    },

    async logout() {
      if (this.token) {
        await fetch('http://localhost:8000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        });
      }

      this.clearAuth();
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.rememberMe = false;
      localStorage.clear();
      sessionStorage.clear();
    }
  }
});
```

### Best Practices

#### 1. Token Security
```javascript
// Jangan simpan token di cookies tanpa httpOnly flag
// ❌ BAD: document.cookie = `token=${token}`;

// ✅ GOOD: Gunakan localStorage/sessionStorage
localStorage.setItem('auth_token', token);
```

#### 2. Auto-Refresh Before Expiry (Optional)
```javascript
// Cek token expiry dan refresh sebelum expired
function setupTokenRefresh(expiresAt) {
  const expiryTime = new Date(expiresAt).getTime();
  const currentTime = Date.now();
  const timeUntilExpiry = expiryTime - currentTime;
  
  // Refresh 1 jam sebelum expired
  const refreshTime = timeUntilExpiry - (60 * 60 * 1000);
  
  if (refreshTime > 0) {
    setTimeout(async () => {
      // Implement refresh token logic here
      await refreshToken();
    }, refreshTime);
  }
}
```

#### 3. Axios Interceptor (untuk Request API)
```javascript
// Add token automatically to all requests
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || 
                  sessionStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle expired token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      authService.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Security Best Practices

### ✅ Yang Sudah Diimplementasi:
- Password di-hash dengan bcrypt
- Token-based authentication (Laravel Passport)
- CORS configuration
- Validation pada semua input
- Reset token di-hash sebelum disimpan
- Reset token auto-expire (60 menit)

### 🔐 Rekomendasi Tambahan:
- Implementasi rate limiting untuk login/register
- Email verification setelah register
- 2FA (Two-Factor Authentication) untuk user penting
- Log semua aktivitas autentikasi
- IP whitelist untuk admin access
- Password strength validation (min special chars, uppercase, dll)

---

## Changelog

### Version 1.1 (2025-12-16)
- ✅ **NEW:** Remember Me feature
- ✅ Dynamic token expiration (1 day / 7 days)
- ✅ Token expiration info in login/register response
- ✅ Frontend implementation guide (React & Vue.js)
- ✅ localStorage vs sessionStorage strategy
- ✅ Auto-authentication examples

### Version 1.0 (2025-12-16)
- ✅ Initial release
- ✅ Register, Login, Logout
- ✅ Profile management (get, update, delete)
- ✅ Password reset (forgot & reset)
- ✅ Laravel Passport integration
- ✅ Role-based access control

---

## Support & Contact

Untuk pertanyaan atau issue, hubungi:
- **Developer:** FeedJoy Team
- **Documentation:** v1.0
- **Last Updated:** 2025-12-16

---

**© 2025 FeedJoy API. All rights reserved.**


