import React, { useState, useEffect } from 'react';
import Button from './Button';

type TabKey = 'home' | 'menu' | 'about' | 'contact';

interface EnhancedHeroProps {
  onNavigate: (tab: TabKey) => void;
}

const EnhancedHero: React.FC<EnhancedHeroProps> = ({ onNavigate }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Featured images - replace with your actual image URLs
  const featuredImages = [
    {
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop',
      title: 'Delicious Meals',
      subtitle: 'Freshly prepared with love',
    },
    {
      url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=600&fit=crop',
      title: 'Premium Burgers',
      subtitle: 'Juicy and flavorful',
    },
    {
      url: 'https://images.unsplash.com/photo-1585238341710-4ebb0c0c05c3?w=1200&h=600&fit=crop',
      title: 'Perfect Snacks',
      subtitle: 'Crispy and tasty',
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % featuredImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, featuredImages.length]);

  const goToImage = (index: number) => {
    setActiveImageIndex(index);
    setIsAutoPlay(false);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % featuredImages.length);
    setIsAutoPlay(false);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
    setIsAutoPlay(false);
  };

  return (
    <section id="home" className="relative flex flex-col overflow-hidden">
      {/* Main Hero with Image Slider */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full">
        {/* Image Container */}
        <div className="absolute inset-0">
          {featuredImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === activeImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Content overlay */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 drop-shadow-lg animate-fade-in">
              Welcome to <span className="text-kamora-orange">Kamora</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 drop-shadow-lg max-w-2xl mx-auto leading-relaxed hidden sm:block">
              {featuredImages[activeImageIndex].subtitle}
            </p>
            <Button
              onClick={() => onNavigate('menu')}
              variant="primary"
              className="text-sm sm:text-base px-5 sm:px-8 py-2 sm:py-4 shadow-xl hover:shadow-2xl"
            >
              Explore Menu
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm hover:scale-110 group hidden sm:flex items-center justify-center"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm hover:scale-110 group hidden sm:flex items-center justify-center"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {featuredImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeImageIndex
                  ? 'bg-kamora-orange w-6 sm:w-8 h-2 sm:h-3'
                  : 'bg-white/40 hover:bg-white/60 w-2 sm:w-2.5 h-2 sm:h-2.5'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm"
          title={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlay ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default EnhancedHero;
