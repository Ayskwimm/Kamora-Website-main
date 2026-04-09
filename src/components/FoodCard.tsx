import React from 'react';

interface FoodCardProps {
  name: string;
  price: string;
  description?: string;
  category: 'main' | 'side' | 'drink';
}

const FoodCard: React.FC<FoodCardProps> = ({ name, price, description, category }) => {
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
      <div className="flex items-center justify-center mb-4">
        <div className={`w-16 h-16 rounded-full ${getCategoryColor()} flex items-center justify-center text-white text-2xl`}>
          {getCategoryIcon()}
        </div>
      </div>
      <h3 className="text-xl font-bold text-kamora-dark mb-2 text-center">{name}</h3>
      <p className="text-2xl font-bold text-kamora-orange mb-3 text-center">${price}</p>
      {description && (
        <p className="text-gray-600 text-center text-sm">{description}</p>
      )}
    </div>
  );
};

export default FoodCard;
