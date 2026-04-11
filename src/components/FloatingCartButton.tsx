import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useCartUi } from '../contexts/CartUiContext';
import cartIcon from '../../assets/icon cart.png';

const FloatingCartButton: React.FC = () => {
  const { cart } = useCart();
  const { openCart } = useCartUi();

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed right-4 bottom-5 z-50 inline-flex items-center justify-center rounded-full bg-kamora-orange shadow-2xl px-4 py-4 text-white transition hover:bg-kamora-red focus:outline-none focus:ring-4 focus:ring-kamora-orange/40"
      aria-label="Open cart"
    >
      <img src={cartIcon} alt="Cart" className="h-6 w-6" />
      <span className="ml-3 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-white text-kamora-dark font-bold text-sm shadow-sm">
        {cart.items.length}
      </span>
    </button>
  );
};

export default FloatingCartButton;
