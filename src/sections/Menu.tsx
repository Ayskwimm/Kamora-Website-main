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

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'meal', label: 'Meal' },
  { key: 'burger', label: 'Burger' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'soup', label: 'Soup' },
  { key: 'drinks', label: 'Drinks' },
];

const categoryLabels: Record<CategoryKey, string> = {
  meal: 'Meal',
  burger: 'Burger',
  snacks: 'Snacks',
  soup: 'Soup',
  drinks: 'Drinks',
};

const customizationOptions = [
  { label: 'No extras', value: 'No extras', price: 0 },
  { label: 'Extra gravy', value: 'Extra gravy', price: 15 },
  { label: 'Extra cheese', value: 'Extra cheese', price: 25 },
  { label: 'Spicy kick', value: 'Spicy kick', price: 20 },
];

const getPlaceholderImage = (category: string) =>
  `https://via.placeholder.com/640x420?text=${encodeURIComponent(category)}`;

const menuItems: MenuItem[] = [
  { id: 'kamote-fillet-with-gravy', name: 'Kamote fillet with gravy', category: 'meal', price: 108, priceLabel: '$108.00', image: getPlaceholderImage('Meal') },
  { id: 'spicy-jamote-fillet-with-gravy', name: 'Spicy Kamote fillet with gravy', category: 'meal', price: 112, priceLabel: '$112.00', image: getPlaceholderImage('Meal') },
  { id: 'garlic-butter-kamote-fillet-with-gravy', name: 'Garlic butter kamote fillet with gravy', category: 'meal', price: 116, priceLabel: '$116.00', image: getPlaceholderImage('Meal') },
  { id: 'bbq-kamote-fillet-with-gravy', name: 'BBQ Kamote fillet with gravy', category: 'meal', price: 120, priceLabel: '$120.00', image: getPlaceholderImage('Meal') },
  { id: 'kamote-fillet-ala-king', name: 'Kamote fillet Ala king', category: 'meal', price: 130, priceLabel: '$130.00', image: getPlaceholderImage('Meal') },
  { id: 'kamote-fillet-with-cheese', name: 'Kamote fillet with cheese', category: 'meal', price: 128, priceLabel: '$128.00', image: getPlaceholderImage('Meal') },
  { id: 'kamora-burger-with-cheese', name: 'Kamora burger with cheese', category: 'burger', price: 105, priceLabel: '$105.00', image: getPlaceholderImage('Burger') },
  { id: 'kamora-burger-deluxe', name: 'Kamora burger deluxe', category: 'burger', price: 115, priceLabel: '$115.00', image: getPlaceholderImage('Burger') },
  { id: 'kamote-fillet-bites-original', name: 'Kamote fillet bites original', category: 'snacks', price: 102, priceLabel: '$102.00', image: getPlaceholderImage('Snacks') },
  { id: 'kamote-fillet-bites-spicy', name: 'Kamote fillet bites spicy', category: 'snacks', price: 108, priceLabel: '$108.00', image: getPlaceholderImage('Snacks') },
  { id: 'kamote-fillet-bites-garlic-butter', name: 'Kamote fillet bites garlic butter', category: 'snacks', price: 110, priceLabel: '$110.00', image: getPlaceholderImage('Snacks') },
  { id: 'kamote-fillet-bites-bbq', name: 'Kamote fillet bites BBQ', category: 'snacks', price: 114, priceLabel: '$114.00', image: getPlaceholderImage('Snacks') },
  { id: 'mushroom-soup', name: 'Mushroom soup', category: 'soup', price: 104, priceLabel: '$104.00', image: getPlaceholderImage('Soup') },
  { id: 'crab-and-corn-soup', name: 'Crab and corn soup', category: 'soup', price: 106, priceLabel: '$106.00', image: getPlaceholderImage('Soup') },
  { id: 'ice-tea', name: 'Ice tea', category: 'drinks', price: 52, priceLabel: '$52.00', image: getPlaceholderImage('Drinks') },
];

const Menu: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('meal');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedOption, setSelectedOption] = useState('No extras');
  const [customOptionPrice, setCustomOptionPrice] = useState(0);
  const [customizationNote, setCustomizationNote] = useState('');

  useEffect(() => {
    document.body.style.overflow = customizingItem ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [customizingItem]);

  const filteredItems = menuItems.filter((item) => item.category === selectedCategory);

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

    closeCustomization();
  };

  const handleOptionChange = (optionValue: string, price: number) => {
    setSelectedOption(optionValue);
    setCustomOptionPrice(price);
  };

  return (
    <section id="menu" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-kamora-dark mb-3">Our Menu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your favorite category and build your order with fresh, flavor-packed items.
          </p>
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 p-1 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  selectedCategory === category.key
                    ? 'bg-kamora-orange text-white shadow-lg'
                    : 'text-kamora-dark hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-sm flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="inline-flex items-center justify-center rounded-full bg-kamora-cream px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-kamora-dark mb-4">
                  {categoryLabels[item.category]}
                </span>
                <h3 className="text-xl font-bold text-kamora-dark mb-2">{item.name}</h3>
                <p className="text-lg font-semibold text-kamora-orange mb-6">{item.priceLabel}</p>
                <div className="mt-auto">
                  <Button
                    onClick={() => startCustomization(item)}
                    variant="primary"
                    className="w-full"
                  >
                    Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" onClick={closeCustomization}>
          <div
            className="relative w-full max-w-2xl rounded-[32px] bg-white shadow-2xl overflow-hidden"
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
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close customization"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special instructions</label>
                  <textarea
                    value={customizationNote}
                    onChange={(e) => setCustomizationNote(e.target.value)}
                    rows={4}
                    placeholder="Add requests like less salt, extra sauce, or no onions"
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
                  <Button onClick={closeCustomization} variant="secondary" className="px-5 py-3">
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
