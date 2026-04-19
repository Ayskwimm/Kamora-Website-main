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
    <div className="card p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center h-full">
      {/* Image Carousel */}
      <div className="w-full mb-4">
        <ImageCarousel 
          images={images} 
          alt={name}
          autoPlay={true}
          interval={4000}
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-col flex-grow w-full">
        {/* Title */}
        <h3 className="text-2xl font-bold text-kamora-red mb-3">{name}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">{description}</p>
        
        {/* Price */}
        <p className="text-2xl font-bold text-kamora-orange mb-4">
          ${price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <div className="w-full flex justify-center">
          <Button 
            onClick={handleAddToCart}
            variant="primary"
            className="px-6 py-2"
          >
            ORDER NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
