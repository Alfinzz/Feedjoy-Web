<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Order;
use Illuminate\Support\Facades\Log;

echo "=== Testing Payment Status Update ===\n\n";

// Get latest order
$order = Order::latest()->first();

if (!$order) {
    echo "❌ No orders found in database\n";
    exit;
}

echo "📦 Order ID: {$order->id}\n";
echo "💳 Payment Status: {$order->payment_status}\n";
echo "📊 Order Status: {$order->status}\n";
echo "🎫 Snap Token: " . ($order->snap_token ? 'Yes' : 'No') . "\n\n";

// Test update
echo "Testing update...\n";
$order->update([
    'payment_status' => 'paid',
    'status' => 'pending'
]);

$order->refresh();

echo "✅ After update:\n";
echo "💳 Payment Status: {$order->payment_status}\n";
echo "📊 Order Status: {$order->status}\n";

// Revert
$order->update([
    'payment_status' => 'unpaid',
    'status' => 'pending'
]);

echo "\n✅ Test completed!\n";