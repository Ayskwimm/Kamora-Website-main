import React from 'react';
import ImageCarousel from './ImageCarousel';
import { useCart } from '../contexts/CartContext';
import Button from './Button';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'main' | 'side' | 'drink';
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  id, 
  name, 
  description, 
  price, 
  images, 
  category 
}) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image: images[0] || '',
    });
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'main':
        return '🍽️';
      case 'side':
        return '🥗';
      case 'drink':
        return '🥤';
      default:
        return '🍽️';
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'main':
        return 'bg-kamora-red';
      case 'side':
        return 'bg-green-500';
      case 'drink':
        return 'bg-blue-500';
      default:
        return 'bg-kamora-orange';
    }
  };

  return (
    <div className="card p-6 hover:scale-105 transition-transform duration-300">
      {/* Category Badge */}
      <div className="flex items-center justify-center mb-4">
        <div className={`w-12 h-12 rounded-full ${getCategoryColor()} flex items-center justify-center text-white text-lg`}>
          {getCategoryIcon()}
        </div>
      </div>

      {/* Image Carousel */}
      <ImageCarousel 
        images={images} 
        alt={name}
        autoPlay={true}
        interval={4000}
      />

      {/* Item Details */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-kamora-dark mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-kamora-orange">
            ${price.toFixed(2)}
          </span>
          <Button 
            onClick={handleAddToCart}
            variant="primary"
            className="px-4 py-2"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
