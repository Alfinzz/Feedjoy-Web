// Product Image Gallery Component

interface ProductImageGalleryProps {
    category: string;
    mainImage: string;
    additionalImages: string[];
    selectedImage: number;
    onSelectImage: (index: number) => void;
}

export default function ProductImageGallery({
    category,
    mainImage,
    additionalImages,
    selectedImage,
    onSelectImage
}: ProductImageGalleryProps) {
    const allImages = [mainImage, ...additionalImages];

    return (
        <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Main Image - Left Side (50%) */}
                <div className="lg:flex-1">
                    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 h-full min-h-[200px] lg:min-h-[280px] flex items-center justify-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins text-center px-6">
                            {category}
                        </h2>
                    </div>
                </div>

                {/* Thumbnails - Right Side 2x2 Grid */}
                <div className="lg:flex-1 grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-3">
                    {Array.from({ length: 4 }).map((_, idx) => {
                        const hasImage = idx < allImages.length;
                        const isSelected = selectedImage === idx;

                        return (
                            <button
                                key={idx}
                                onClick={() => hasImage && onSelectImage(idx)}
                                disabled={!hasImage}
                                className={`aspect-square lg:aspect-auto lg:h-full rounded-xl overflow-hidden border-2 transition-all bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ${isSelected && hasImage
                                    ? "border-primary ring-2 ring-primary/30"
                                    : hasImage
                                        ? "border-transparent hover:border-gray-300 cursor-pointer"
                                        : "border-transparent opacity-40 cursor-default"
                                    }`}
                            >
                                <span className="text-[10px] lg:text-xs text-white font-medium text-center px-1 leading-tight">
                                    {hasImage
                                        ? (idx === 0 ? category : `Kemasan ${idx}`)
                                        : "Kosong"
                                    }
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
