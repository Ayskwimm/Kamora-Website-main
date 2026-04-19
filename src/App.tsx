import React, { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { CartUiProvider } from './contexts/CartUiContext';
import Navbar from './components/Navbar';
import EnhancedHero from './components/EnhancedHero';
import ScrollTextMarquee from './components/ScrollTextMarquee';
import QuickLinks from './components/QuickLinks';
import Menu from './sections/Menu';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import FloatingCartButton from './components/FloatingCartButton';
import FloatingCartModal from './components/FloatingCartModal';
import './styles/index.css';

type TabKey = 'home' | 'menu' | 'about' | 'contact';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#category-')) {
      setActiveTab('menu');
    }
  }, []);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <CartUiProvider>
        <div className="min-h-screen pt-16">
          <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
          {activeTab === 'home' && <EnhancedHero onNavigate={handleTabChange} />}
          {activeTab === 'home' && <ScrollTextMarquee />}
          {activeTab === 'home' && <QuickLinks />}
          {activeTab === 'menu' && <Menu />}
          {activeTab === 'about' && <About />}
          {activeTab === 'contact' && <Contact />}
          <Footer onNavigate={handleTabChange} />
          <FloatingCartButton />
          <FloatingCartModal />
        </div>
      </CartUiProvider>
    </CartProvider>
  );
};

export default App;
