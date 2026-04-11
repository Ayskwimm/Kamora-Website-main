import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useCartUi } from '../contexts/CartUiContext';

const FloatingCartButton: React.FC = () => {
  const { cart } = useCart();
  const { openCart } = useCartUi();

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed right-4 bottom-5 z-50 inline-flex items-center justify-center rounded-full bg-kamora-orange shadow-2xl px-5 py-4 text-white transition hover:bg-kamora-red focus:outline-none focus:ring-4 focus:ring-kamora-orange/40"
      aria-label="Open cart"
    >
      <span className="font-semibold text-sm">Cart</span>
      <span className="ml-3 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-white text-kamora-dark font-bold text-sm shadow-sm">
        {cart.items.length}
      </span>
    </button>
  );
};

export default FloatingCartButton;
