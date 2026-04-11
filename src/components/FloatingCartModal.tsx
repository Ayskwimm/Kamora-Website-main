import React, { useEffect } from 'react';
import Cart from './Cart';
import { useCartUi } from '../contexts/CartUiContext';

const FloatingCartModal: React.FC = () => {
  const { isCartOpen, closeCart } = useCartUi();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-start justify-center overflow-y-auto pt-6"
      onClick={closeCart}
    >
      <div
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] bg-transparent max-h-[calc(100vh-4rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-10">
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
            aria-label="Close cart"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18L18 6" />
              <path d="M6 6L18 18" />
            </svg>
          </button>
        </div>

        <div className="h-full max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[32px] bg-white p-4 shadow-2xl md:p-6">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default FloatingCartModal;
