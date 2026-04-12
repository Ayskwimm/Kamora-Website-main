import React, { useState } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

interface PhotoGalleryProps {
  title?: string;
  description?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  title = 'Our Gallery',
  description = 'Explore our delicious food creations',
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1625867768218-81a19ba0ab60?w=500&h=400&fit=crop',
      title: 'Signature Meal',
      category: 'meals',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
      title: 'Gourmet Burger',
      category: 'burgers',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1585238341710-4ebb0c0c05c3?w=500&h=400&fit=crop',
      title: 'Crispy Snacks',
      category: 'snacks',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=400&fit=crop',
      title: 'Savory Soup',
      category: 'soups',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1606788981566-c0e69b90ebf3?w=500&h=400&fit=crop',
      title: 'Tasty Drink',
      category: 'drinks',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
      title: 'Chef Special',
      category: 'meals',
    },
  ];

  const categories = ['all', 'meals', 'burgers', 'snacks', 'soups', 'drinks'];
  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-kamora-dark mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? 'bg-kamora-orange text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-64"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm md:text-base capitalize text-gray-200">{image.category}</p>
                </div>
                <div className="mt-4 bg-kamora-orange rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full image view */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-kamora-orange text-white rounded-full p-2 hover:bg-kamora-red transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />

              {/* Info Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 capitalize">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
