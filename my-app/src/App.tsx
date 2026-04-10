import React from 'react';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './sections/Home';
import Menu from './sections/Menu';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Home />
        <Menu />
        <About />
        <Contact />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
