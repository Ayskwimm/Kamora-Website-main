import React from 'react';
import Button from '../components/Button';

type TabKey = 'home' | 'menu' | 'about' | 'contact';

interface HomeProps {
  onNavigate: (tab: TabKey) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
    
         
        </div>
      </div>
    </section>
  );
};

export default Home;
