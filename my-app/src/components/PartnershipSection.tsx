import React from 'react';
import Button from './Button';

const PartnershipSection: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-kamora-orange to-kamora-red rounded-2xl p-8 md:p-12 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Partner with Kamora
      </h2>
      <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
        Join us in creating exceptional dining experiences. We're looking for passionate partners who share our vision for quality food and outstanding service.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
          <p className="text-white/90">
            Expand your business with our established brand and loyal customer base.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Quality Support</h3>
          <p className="text-white/90">
            Receive comprehensive training, marketing support, and operational guidance.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Shared Success</h3>
          <p className="text-white/90">
            Benefit from our proven business model and collaborative partnership approach.
          </p>
        </div>
      </div>

      <Button onClick={scrollToContact} variant="secondary" className="text-lg px-8 py-4">
        Get Started Today
      </Button>
    </div>
  );
};

export default PartnershipSection;
