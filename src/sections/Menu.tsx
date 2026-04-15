import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';

type CategoryKey = 'meal' | 'burger' | 'snacks' | 'soup' | 'drinks';

interface MenuItem {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  priceLabel: string;
  image: string;
}

const getPlaceholderImage = (category: string) =>
  `https://via.placeholder.com/640x420/ffffff/cc1427?text=${encodeURIComponent(category)}`;

const categories: { key: CategoryKey; label: string; icon: string; description: string; image: string }[] = [
  { key: 'meal', label: 'Meals', icon: '🍽️', description: 'Fresh hot meals served with savory sides.', image: getPlaceholderImage('Meals') },
  { key: 'burger', label: 'Burger', icon: '🍔', description: 'Juicy burgers with premium toppings.', image: getPlaceholderImage('Burger') },
  { key: 'snacks', label: 'Snacks', icon: '🍟', description: 'Crispy snacks made for sharing.', image: getPlaceholderImage('Snacks') },
  { key: 'soup', label: 'Soup', icon: '🍲', description: 'Warm soups made to comfort and delight.', image: getPlaceholderImage('Soup') },
  { key: 'drinks', label: 'Drinks', icon: '🥤', description: 'Refreshing beverages to complete every meal.', image: getPlaceholderImage('Drinks') },
];

const customizationOptions = [
  { label: 'No extras', value: 'No extras', price: 0 },
  { label: 'Extra gravy', value: 'Extra gravy', price: 15 },
  { label: 'Extra cheese', value: 'Extra cheese', price: 25 },
  { label: 'Spicy kick', value: 'Spicy kick', price: 20 },
];

const menuItems: MenuItem[] = [
  { id: 'kamote-fillet-with-gravy', name: 'Kamote fillet with gravy', category: 'meal', price: 108, priceLabel: '$108.00', image: getPlaceholderImage('Meals') },
  { id: 'spicy-jamote-fillet-with-gravy', name: 'Spicy Kamote fillet with gravy', category: 'meal', price: 112, priceLabel: '$112.00', image: getPlaceholderImage('Meals') },
  { id: 'garlic-butter-kamote-fillet-with-gravy', name: 'Garlic butter kamote fillet with gravy', category: 'meal', price: 116, priceLabel: '$116.00', image: getPlaceholderImage('Meals') },
  { id: 'bbq-kamote-fillet-with-gravy', name: 'BBQ Kamote fillet with gravy', category: 'meal', price: 120, priceLabel: '$120.00', image: getPlaceholderImage('Meals') },
  { id: 'kamote-fillet-ala-king', name: 'Kamote fillet Ala king', category: 'meal', price: 130, priceLabel: '$130.00', image: getPlaceholderImage('Meals') },
  { id: 'kamote-fillet-with-cheese', name: 'Kamote fillet with cheese', category: 'meal', price: 128, priceLabel: '$128.00', image: getPlaceholderImage('Meals') },
  { id: 'kamora-burger-with-cheese', name: 'Kamora burger with cheese', category: 'burger', price: 105, priceLabel: '$105.00', image: getPlaceholderImage('Burger') },
  { id: 'kamora-burger-deluxe', name: 'Kamora burger deluxe', category: 'burger', price: 115, priceLabel: '$115.00', image: getPlaceholderImage('Burger') },
  { id: 'kamote-fillet-bites-original', name: 'Kamote fillet bites original', category: 'snacks', price: 102, priceLabel: '$102.00', image: getPlaceholderImage('Snacks') },
  { id: 'kamote-fillet-bites-spicy', name: 'Kamote fillet bites spicy', category: 'snacks', price: 108, priceLabel: '$108.00', image: getPlaceholderImage('Snacks') },
  { id: 'kamote-fillet-bites-garlic-butter', name: 'Kamote fillet bites garlic butter', category: 'snacks', price: 110, priceLabel: '$110.00', image: getPlaceholderImage('Snacks') },
  { id: 'kamote-fillet-bites-bbq', name: 'Kamote fillet bites BBQ', category: 'snacks', price: 114, priceLabel: '$114.00', image: getPlaceholderImage('Snacks') },
  { id: 'mushroom-soup', name: 'Mushroom soup', category: 'soup', price: 104, priceLabel: '$104.00', image: getPlaceholderImage('Soup') },
  { id: 'crab-and-corn-soup', name: 'Crab and corn soup', category: 'soup', price: 106, priceLabel: '$106.00', image: getPlaceholderImage('Soup') },
  { id: 'ice-tea', name: 'Ice tea', category: 'drinks', price: 52, priceLabel: '$52.00', image: getPlaceholderImage('Drinks') },
  { id: 'red-ice-tea', name: 'Red ice tea', category: 'drinks', price: 55, priceLabel: '$52.00', image: getPlaceholderImage('Drinks') },
];

const Menu: React.FC = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedOption, setSelectedOption] = useState('No extras');
  const [customOptionPrice, setCustomOptionPrice] = useState(0);
  const [customizationNote, setCustomizationNote] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    document.body.style.overflow = customizingItem ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [customizingItem]);

  useEffect(() => {
    if (!showNotification) return;
    const timeout = window.setTimeout(() => setShowNotification(false), 2800);
    return () => window.clearTimeout(timeout);
  }, [showNotification]);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#category-')) {
        const slug = hash.replace('#category-', '') as CategoryKey;
        if (categories.some((category) => category.key === slug)) {
          setActiveCategory(slug);
          return;
        }
      }
      setActiveCategory(null);
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const getCategoryItems = (categoryKey: CategoryKey) => menuItems.filter((item) => item.category === categoryKey);

  const showCategoryView = (categoryKey: CategoryKey) => {
    window.history.replaceState(null, '', `${window.location.pathname}#category-${categoryKey}`);
    setActiveCategory(categoryKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearCategoryView = () => {
    window.history.replaceState(null, '', window.location.pathname);
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startCustomization = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedOption('No extras');
    setCustomOptionPrice(0);
    setCustomizationNote('');
  };

  const closeCustomization = () => {
    setCustomizingItem(null);
    setSelectedOption('No extras');
    setCustomOptionPrice(0);
    setCustomizationNote('');
  };

  const handleAddToCart = () => {
    if (!customizingItem) return;

    const customizationText = selectedOption === 'No extras'
      ? customizationNote
      : `${selectedOption}${customizationNote ? ` · ${customizationNote}` : ''}`;

    const sanitizedCustomization = customizationText.trim().replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
    const cartItemId = customizingItem.id + (sanitizedCustomization ? `-${sanitizedCustomization}` : '');

    addItem({
      id: cartItemId,
      name: customizingItem.name,
      price: customizingItem.price,
      image: customizingItem.image,
      customization: customizationText || undefined,
      extraPrice: customOptionPrice || undefined,
    });

    setNotificationMessage(`${customizingItem.name} added to cart successfully.`);
    setShowNotification(true);
    closeCustomization();
  };

  const handleOptionChange = (optionValue: string, price: number) => {
    setSelectedOption(optionValue);
    setCustomOptionPrice(price);
  };

  const activeCategoryData = activeCategory ? categories.find((category) => category.key === activeCategory) : null;

  return (
    <section id="menu" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {showNotification && (
          <div className="fixed right-5 top-24 z-50 w-full max-w-sm rounded-[28px] border border-green-100 bg-white/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 opacity-0"
            style={{ animation: 'slideInRight 0.35s ease-out forwards' }}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700 text-xl">
                ✓
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-kamora-dark">Added to cart</p>
                <p className="mt-1 text-sm text-gray-600 break-words">{notificationMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-kamora-orange"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-kamora-dark mb-3">Our Menu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our categories with cards, then open a dedicated page for each collection of menu items.
          </p>
        </div>

        {!activeCategory ? (
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, index) => {
              const categoryItems = getCategoryItems(category.key);
              return (
                <div
                  key={category.key}
                  className="group cursor-pointer w-full max-w-[380px] sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)] rounded-[32px] overflow-hidden border-2 border-transparent bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-kamora-orange/70 hover:shadow-2xl hover:ring-2 hover:ring-kamora-orange/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-kamora-orange/10 opacity-0"
                  style={{ animation: `fadeInScale 0.55s ease-out forwards ${index * 0.08}s` }}
                  onClick={() => showCategoryView(category.key)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute left-6 bottom-6 right-6">
                      <p className="text-sm uppercase tracking-[0.4em] text-white/80 mb-2">{category.icon}</p>
                      <h3 className="text-3xl font-heading font-bold text-white drop-shadow-lg">{category.label}</h3>
                      <p className="mt-3 text-sm text-white/90 leading-relaxed">{category.description}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 text-sm text-gray-500">
                      {categoryItems.length} items · click card to view all.
                    </div>
                    <Button
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.stopPropagation();
                        showCategoryView(category.key);
                      }}
                      variant="primary"
                      className="w-full"
                    >
                      Explore {category.label}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.4em] text-kamora-orange font-semibold">{activeCategoryData?.label}</p>
                <h3 className="mt-4 text-4xl md:text-5xl font-heading font-bold text-kamora-dark">{activeCategoryData?.label}</h3>
                <p className="mt-4 text-lg text-gray-600">{activeCategoryData?.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" onClick={clearCategoryView} className="px-5 py-3">
                  Back to Categories
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {getCategoryItems(activeCategory).map((item, index) => (
                <div
                  key={item.id}
                  className="group flex flex-col w-full max-w-[380px] sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)] overflow-hidden rounded-[32px] border-2 border-transparent bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-kamora-orange/70 hover:shadow-2xl hover:ring-2 hover:ring-kamora-orange/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-kamora-orange/10 opacity-0"
                  style={{ animation: `slideInUp 0.55s ease-out forwards ${index * 0.06 + 0.1}s` }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="mb-4">
                      <h4 className="text-xl font-heading font-bold text-kamora-dark">{item.name}</h4>
                      <p className="mt-2 text-sm text-gray-500">A delicious option from our {activeCategoryData?.label.toLowerCase()} menu.</p>
                    </div>
                    <div className="mt-auto flex flex-col gap-4">
                      <p className="text-xl font-bold text-kamora-orange">{item.priceLabel}</p>
                      <Button onClick={() => startCustomization(item)} className="w-full">
                        Add to Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-start justify-center overflow-y-auto pt-6" onClick={closeCustomization}>
          <div
            className="relative w-full max-w-2xl rounded-[32px] bg-white shadow-2xl overflow-hidden max-h-[calc(100vh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-kamora-dark">Customize Your Meal</h3>
                <p className="text-sm text-gray-500">Select your options and add the item to cart.</p>
              </div>
              <button
                type="button"
                onClick={closeCustomization}
                className="text-red-500 hover:text-red-700"
                aria-label="Close customization"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-16rem)]">
              <div>
                <p className="text-sm font-semibold text-gray-700">Item</p>
                <p className="text-xl font-bold text-kamora-dark">{customizingItem.name}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Choose an option</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {customizationOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleOptionChange(option.value, option.price)}
                        className={`rounded-3xl border px-5 py-4 text-left transition ${
                          selectedOption === option.value
                            ? 'border-kamora-orange bg-kamora-orange/10 text-kamora-dark'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-kamora-orange'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span>{option.label}</span>
                          <span className="text-sm text-kamora-orange">+₱{option.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-kamora-cream rounded-3xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special instructions <span className="text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    value={customizationNote}
                    onChange={(e) => setCustomizationNote(e.target.value)}
                    rows={4}
                    placeholder="Optional: Add requests like less salt, extra sauce, or no onions"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-kamora-orange"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Customization fee</p>
                  <p className="text-lg font-bold text-kamora-orange">+₱{customOptionPrice.toFixed(2)}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={closeCustomization}
                    variant="secondary"
                    className="px-5 py-3 !bg-red-500 !text-white !border-red-500 hover:!bg-red-600 hover:!border-red-600"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddToCart} variant="primary" className="px-5 py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
