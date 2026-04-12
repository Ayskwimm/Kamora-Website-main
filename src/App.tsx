import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { CartUiProvider } from './contexts/CartUiContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './sections/Home';
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

  return (
    <CartProvider>
      <CartUiProvider>
        <div className="min-h-screen">
          <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'home' && <Hero onNavigate={setActiveTab} />}
          {activeTab === 'home' && <Home onNavigate={setActiveTab} />}
          {activeTab === 'menu' && <Menu />}
          {activeTab === 'about' && <About />}
          {activeTab === 'contact' && <Contact />}
          <Footer onNavigate={setActiveTab} />
          <FloatingCartButton />
          <FloatingCartModal />
        </div>
      </CartUiProvider>
    </CartProvider>
  );
};

export default App;
