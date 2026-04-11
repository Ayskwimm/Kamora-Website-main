import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartUiContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartUiContext = createContext<CartUiContextType | undefined>(undefined);

export const CartUiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((current) => !current);

  return (
    <CartUiContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartUiContext.Provider>
  );
};

export const useCartUi = (): CartUiContextType => {
  const context = useContext(CartUiContext);
  if (!context) {
    throw new Error('useCartUi must be used within a CartUiProvider');
  }
  return context;
};
