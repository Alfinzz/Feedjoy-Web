<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Exception;

class MidtransService
{
    public function __construct()
    {
        // Konfigurasi otomatis dari file config/midtrans.php
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function generateSnapToken($order)
    {
        // Pastikan order memiliki relasi product
        $order->load('product');

        $params = [
            'transaction_details' => [
                'order_id' => $order->id . '-' . time(), // Unique ID per request
                'gross_amount' => (int) $order->total_price,
            ],
            'customer_details' => [
                'first_name' => $order->full_name,
                'email' => $order->email,
                'phone' => $order->phone,
                'shipping_address' => [
                    'first_name' => $order->full_name,
                    'address' => $order->address,
                    'phone' => $order->phone,
                ],
            ],
            'item_details' => [
                [
                    'id' => $order->product_id,
                    'price' => (int) ($order->total_price / $order->quantity),
                    'quantity' => $order->quantity,
                    'name' => substr($order->product->name . ' (' . $order->variant . ')', 0, 50),
                ]
            ],
            // Opsional: Batasi metode pembayaran (misal cuma QRIS & Bank Transfer)
            // 'enabled_payments' => ['credit_card', 'bca_va', 'gopay', 'shopeepay', 'qris'],
        ];

        try {
            return Snap::getSnapToken($params);
        } catch (Exception $e) {
            throw new Exception("Midtrans Error: " . $e->getMessage());
        }
    }
}
