<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Get all products (public)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    // public function index(Request $request)
    // {
    //     $query = Product::query();
    //    $products = Product::with('variants')
    //             ->orderBy('created_at', 'desc')
    //             ->paginate(8); // Sesuaikan dengan itemsPerPage di React
    //     // Filter by active status (default: only active)
    //     if ($request->has('show_all') && $request->show_all === 'true') {
    //         // Show all products (admin use)
    //     } else {
    //         $query->where('is_active', true);
    //     }

    //     // Filter by category
    //     if ($request->has('category')) {
    //         $query->where('category', $request->category);
    //     }

    //     // Search by name
    //     if ($request->has('search')) {
    //         $query->where('name', 'like', '%' . $request->search . '%');
    //     }

    //     // Sorting
    //     $sortBy = $request->get('sort_by', 'created_at');
    //     $sortOrder = $request->get('sort_order', 'desc');
    //     $query->orderBy($sortBy, $sortOrder);

    //     // Pagination
    //     $perPage = $request->get('per_page', 10);
    //     $products = $query->paginate($perPage);

    //     return response()->json([
    //         'success' => true,
    //         'data' => $products
    //     ], 200);
    // }

    public function index(Request $request)
{
    // 1. Masukkan 'with' langsung ke Query Builder agar tidak hilang
    $query = Product::with('variants');

    // Filter by active status
    if (!($request->has('show_all') && $request->show_all === 'true')) {
        $query->where('is_active', true);
    }

    // Filter by category
    if ($request->has('category')) {
        $query->where('category', $request->category);
    }

    // Search by name
    if ($request->has('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    // Sorting
    $sortBy = $request->get('sort_by', 'created_at');
    $sortOrder = $request->get('sort_order', 'desc');
    $query->orderBy($sortBy, $sortOrder);

    // 2. Jalankan pagination dari query yang SUDAH ADA 'with' nya
    $perPage = $request->get('per_page', 8);
    $products = $query->paginate($perPage);

    return response()->json([
        'success' => true,
        'data' => $products
    ], 200);
}
    /**
     * Get single product (public)
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::with('variants', 'reviews.user')->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product // image_url akan otomatis ter-append
        ], 200);
    }

    /**
     * Create new product (admin only)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255',
    //         'short_description' => 'nullable|string|max:500',
    //         'fullDescription' => 'nullable|string',
    //         'price' => 'required|numeric|min:0',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         'category' => 'nullable|string|max:100',
    //         'stock' => 'nullable|integer|min:0',
    //         'variants' => 'required|array|min:1',
    //         'image' => 'nullable|string',
    //         'is_active' => 'nullable|boolean',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Validation failed',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $data = $request->only(['name', 'short_description', 'fullDescription', 'price', 'category', 'stock', 'is_active', 'variants', 'image']);

    //     // Handle image upload
    //     if ($request->hasFile('image')) {
    //         $imagePath = $request->file('image')->store('products', 'public');
    //         $data['image'] = $imagePath;
    //     }

    //     // Set defaults
    //     $data['stock'] = $data['stock'] ?? 0;
    //     $data['is_active'] = $data['is_active'] ?? true;

    //     $product = Product::create($data);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Product created successfully',
    //         'data' => $product
    //     ], 201);
    // }

    public function store(Request $request)
{
    // Mapping data manual dari React ke DB
    $product = Product::create([
        'name'              => $request->name,
        'short_description' => $request->shortDescription,
        'description'       => $request->fullDescription,
        'category'          => $request->category,
        'stock'             => $request->stock,
        'price'             => $request->variants[0]['price'],
        'image'             => $request->image,
        'is_active'         => true
    ]);

    // Pastikan loop ini berjalan
    if ($request->has('variants') && is_array($request->variants)) {
        foreach ($request->variants as $v) {
            $product->variants()->create([
                'size'  => $v['size'],
                'price' => $v['price'],
                'usage' => $v['usage']
            ]);
        }
    }

    return response()->json([
        'success' => true,
        'message' => 'Produk & Varian Berhasil Disimpan',
        'data' => $product->load('variants')
    ], 201);
}

    /**
     * Update product (admin only)
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    // public function update(Request $request, $id)
    // {
    //     $product = Product::find($id);

    //     if (!$product) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Product not found'
    //         ], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'name' => 'sometimes|required|string|max:255',
    //         'description' => 'nullable|string',
    //         'price' => 'sometimes|required|numeric|min:0',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         'category' => 'nullable|string|max:100',
    //         'stock' => 'nullable|integer|min:0',
    //         'is_active' => 'nullable|boolean',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Validation failed',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $data = $request->only(['name', 'description', 'price', 'category', 'stock', 'is_active']);

    //     // Handle image upload
    //     if ($request->hasFile('image')) {
    //         // Delete old image if exists
    //         if ($product->image) {
    //             Storage::disk('public')->delete($product->image);
    //         }
    //         $imagePath = $request->file('image')->store('products', 'public');
    //         $data['image'] = $imagePath;
    //     }

    //     $product->update($data);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Product updated successfully',
    //         'data' => $product
    //     ], 200);
    // }



    public function update(Request $request, $id)
{
    $product = Product::find($id);
    if (!$product) {
        return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan'], 404);
    }

    // 1. Update data produk utama
    $product->update([
        'name' => $request->name,
        'short_description' => $request->shortDescription,
        'description' => $request->fullDescription,
        'category' => $request->category,
        'stock' => $request->stock,
        'price' => isset($request->variants[0]) ? $request->variants[0]['price'] : $product->price,
        'image' => $request->image,
    ]);

    // 2. Sinkronisasi Varian (Hapus yang lama, ganti yang baru)
    if ($request->has('variants')) {
        // Hapus varian lama agar tidak duplikat atau bentrok
        $product->variants()->delete();

        foreach ($request->variants as $v) {
            $product->variants()->create([
                'size'  => $v['size'],
                'price' => $v['price'],
                'usage' => $v['usage']
            ]);
        }
    }

    return response()->json([
        'success' => true,
        'message' => 'Produk & Varian berhasil diperbarui',
        'data' => $product->load('variants')
    ], 200);
}
    /**
     * Delete product (admin only)
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        // Delete image if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ], 200);
    }

    /**
     * Get all categories (public)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function categories()
    {
        $categories = Product::where('is_active', true)
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        return response()->json([
            'success' => true,
            'data' => $categories
        ], 200);
    }
}
