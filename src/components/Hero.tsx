import React from 'react';
import Button from './Button';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kamora-cream to-orange-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-kamora-dark mb-6">
            Welcome to <span className="text-kamora-orange">Kamora</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Experience the perfect blend of flavors with our curated selection
          </p>
          <div className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            <p className="mb-4">
              At Kamora, we offer a carefully crafted dining experience featuring:
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-kamora-orange font-semibold">
              <span>🍽️ One Main Dish</span>
              <span>🥗 One Side Dish</span>
              <span>🥤 One Drink</span>
            </div>
            <p className="mt-4 text-gray-600">
              Each item is thoughtfully prepared and reasonably priced for your enjoyment
            </p>
          </div>
          <Button onClick={scrollToAbout} variant="primary" className="text-lg px-8 py-4">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
