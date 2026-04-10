import React from 'react';
import Cart from '../components/Cart';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';

const Menu: React.FC = () => {
  const { cart, addItem } = useCart();

  // Single signature dish with included items
  const signatureDish = {
    id: 'kamora-signature-feast',
    name: 'Kamora Signature Feast',
    description: 'Our signature complete meal featuring premium grilled salmon, fresh garden salad, and artisan lemonade. Perfect for sharing or a satisfying individual meal.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=350&fit=crop',
    includedItems: [
      {
        name: 'Grilled Salmon Deluxe',
        category: 'main',
        description: 'Fresh Atlantic salmon grilled to perfection',
        icon: '🍽️',
        color: 'bg-kamora-red'
      },
      {
        name: 'Garden Fresh Salad',
        category: 'side',
        description: 'Mixed greens with house vinaigrette',
        icon: '🥗',
        color: 'bg-green-500'
      },
      {
        name: 'Artisan Lemonade',
        category: 'drink',
        description: 'Freshly squeezed with natural ingredients',
        icon: '🥤',
        color: 'bg-blue-500'
      }
    ]
  };

  return (
    <section id="menu" className="section-padding bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-kamora-dark mb-3">
            Signature Feast
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Our complete meal featuring the best of Kamora
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Signature Dish Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img
                src={signatureDish.image}
                alt={signatureDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-kamora-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                  Signature
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-kamora-dark mb-3">
                {signatureDish.name}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {signatureDish.description}
              </p>

              {/* Included Items */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-kamora-dark mb-4">
                  Complete Meal Includes:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {signatureDish.includedItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-kamora-dark text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Order */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-500 line-through">$42.99</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-kamora-orange">
                      ${signatureDish.price.toFixed(2)}
                    </span>
                    <p className="text-sm text-green-600 font-medium">Save $8!</p>
                  </div>
                </div>
                <Button
                  onClick={() => addItem({
                    id: signatureDish.id,
                    name: signatureDish.name,
                    price: signatureDish.price,
                    image: signatureDish.image,
                  })}
                  variant="primary"
                  className="w-full sm:w-auto px-6 py-3"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          <div>
            <div className="sticky top-4 lg:top-24">
              <Cart />
            </div>
          </div>
        </div>

        {/* Mobile Cart Badge */}
        {cart.items.length > 0 && (
          <div className="lg:hidden fixed bottom-4 right-4 bg-kamora-orange text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50">
            <div className="text-center">
              <div className="text-xs">Cart</div>
              <div className="text-lg font-bold">{cart.items.length}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
