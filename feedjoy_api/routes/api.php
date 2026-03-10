<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentCallbackController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ==================== PUBLIC ROUTES ====================

// Auth routes (public)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

// IMPORTANT: Payment callback HARUS public (no auth) agar Midtrans bisa akses
Route::post('/payment/callback', [PaymentCallbackController::class, 'callback']);

// Public product routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/categories', [ProductController::class, 'categories']);
    Route::get('/{id}', [ProductController::class, 'show']);
});

// Public testimonials route
Route::get('/testimonials', [ReviewController::class, 'testimonials']);

// ==================== PROTECTED ROUTES (AUTH REQUIRED) ====================

Route::middleware('auth:api')->group(function () {
    
    // Auth routes (authenticated)
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::delete('/account', [AuthController::class, 'deleteAccount']);
    });

    // Payment status check (authenticated)
    Route::get('/payment/status/{orderId}', [PaymentCallbackController::class, 'checkStatus']);

    // Order routes (user)
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/history', [OrderController::class, 'history']);
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::delete('/{id}', [OrderController::class, 'destroy']);
        
        // Manual payment check
        Route::post('/{id}/check-payment', [OrderController::class, 'checkPaymentStatus']);
    });

    // Review routes (user)
    Route::prefix('reviews')->group(function () {
        Route::get('/', [ReviewController::class, 'index']);
        Route::post('/', [ReviewController::class, 'store']);
        Route::get('/{id}', [ReviewController::class, 'show']);
        Route::put('/{id}', [ReviewController::class, 'update']);
        Route::delete('/{id}', [ReviewController::class, 'destroy']);
    });

    // ==================== ADMIN ROUTES ====================
    
    Route::middleware('admin')->prefix('admin')->group(function () {
        
        // Product management
        Route::prefix('products')->group(function () {
            Route::post('/', [ProductController::class, 'store']);
            Route::put('/{id}', [ProductController::class, 'update']);
            Route::delete('/{id}', [ProductController::class, 'destroy']);
        });

        // Order management
        Route::prefix('orders')->group(function () {
            Route::get('/', [OrderController::class, 'adminIndex']);
            Route::get('/{id}', [OrderController::class, 'adminShow']);
            Route::put('/{id}/status', [OrderController::class, 'updateStatus']);
        });

        // Review management
        Route::prefix('reviews')->group(function () {
            Route::get('/', [ReviewController::class, 'adminIndex']);
            Route::put('/{id}/testimonial', [ReviewController::class, 'toggleTestimonial']);
            Route::delete('/{id}', [ReviewController::class, 'adminDestroy']);
        });
        
        // User management
        Route::apiResource('users', UserController::class);
    });
});