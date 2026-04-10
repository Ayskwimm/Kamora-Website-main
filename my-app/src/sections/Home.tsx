import React from 'react';
import Button from '../components/Button';

const Home: React.FC = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-kamora-dark mb-4">
            Welcome to Kamora
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the finest flavors crafted with passion and served with love
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {/* Feature Cards */}
          <div className="bg-gradient-to-br from-kamora-orange to-kamora-red p-8 rounded-2xl text-white text-center">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold mb-2">Premium Quality</h3>
            <p className="text-lg">Fresh Ingredients Daily</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white text-center">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold mb-2">Chef's Special</h3>
            <p className="text-lg">Signature Recipes</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-2">Fast Service</h3>
            <p className="text-lg">Quick Delivery</p>
          </div>
        </div>

        {/* CTA to Menu */}
        <div className="text-center">
          <Button
            onClick={scrollToMenu}
            variant="primary"
            className="px-8 py-4 text-lg"
          >
            View Our Complete Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
