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

const categories: { key: CategoryKey; label: string; icon: string; color: string; description: string }[] = [
  { key: 'meal', label: 'Meal', icon: '🍽️', color: 'from-orange-50 to-red-50', description: 'Delicious hot meals served fresh' },
  { key: 'burger', label: 'Burger', icon: '🍔', color: 'from-red-50 to-orange-50', description: 'Juicy burgers with premium toppings' },
  { key: 'snacks', label: 'Snacks', icon: '🍟', color: 'from-yellow-50 to-orange-50', description: 'Crispy and tasty snack options' },
  { key: 'soup', label: 'Soup', icon: '🍲', color: 'from-green-50 to-yellow-50', description: 'Warm soups made with love' },
  { key: 'drinks', label: 'Drinks', icon: '🥤', color: 'from-blue-50 to-purple-50', description: 'Refreshing beverages to complete your meal' },
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
  const [expandedCategories, setExpandedCategories] = useState<Set<CategoryKey>>(new Set(['meal']));
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

  const toggleCategory = (categoryKey: CategoryKey) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryItems = (categoryKey: CategoryKey) => {
    return menuItems.filter((item) => item.category === categoryKey);
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

    closeCustomization();
  };

  const handleOptionChange = (optionValue: string, price: number) => {
    setSelectedOption(optionValue);
    setCustomOptionPrice(price);
  };

  return (
    <section id="menu" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-kamora-dark mb-3">Our Menu</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any category to explore our delicious menu items.
          </p>
        </div>

        {/* Expandable Category Cards */}
        <div className="space-y-6">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.key);
            const categoryItems = getCategoryItems(category.key);

            return (
              <div key={category.key} className="category-section">
                {/* Category Card */}
                <div
                  onClick={() => toggleCategory(category.key)}
                  className="group cursor-pointer"
                >
                  <div
                    className={`relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-r ${category.color}`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-kamora-dark uppercase tracking-widest mb-2">
                        {category.label}
                      </h3>
                      <p className="text-base md:text-lg text-kamora-dark font-medium max-w-2xl">
                        {category.description}
                      </p>
                    </div>

                    {/* Icon on the right */}
                    <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                      {category.icon}
                    </div>

                    {/* Toggle icon button */}
                    <div
                      className={`absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-kamora-orange group-hover:text-white transition-all duration-300 shadow-lg transform ${
                        isExpanded ? 'rotate-45' : ''
                      }`}
                    >
                      <span className="text-xl md:text-2xl font-bold">+</span>
                    </div>

                    {/* Item count badge */}
                    <div className="absolute bottom-4 left-8 md:left-12 bg-kamora-orange text-white px-4 py-2 rounded-full font-semibold text-sm">
                      {categoryItems.length} items
                    </div>
                  </div>
                </div>

                {/* Expanded Items Grid */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isExpanded ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryItems.map((item, index) => (
                      <div
                        key={item.id}
                        style={{
                          animation: isExpanded
                            ? `slideInUp 0.5s ease-out ${index * 0.1}s both`
                            : 'none',
                        }}
                        className="flex flex-col items-center text-center cursor-pointer group/item"
                        onClick={() => startCustomization(item)}
                      >
                        {/* Image Container */}
                        <div className="relative w-full mb-6 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-64">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Item Name */}
                        <h3 className="text-lg md:text-xl font-heading font-bold text-kamora-dark mb-3 group-hover/item:text-kamora-orange transition-colors duration-300 min-h-14 flex items-center justify-center">
                          {item.name}
                        </h3>

                        {/* Price and Order Button */}
                        <div className="flex flex-col items-center gap-4 w-full mt-auto">
                          <p className="text-xl font-heading font-bold text-kamora-orange">{item.priceLabel}</p>
                          <Button
                            onClick={() => startCustomization(item)}
                            variant="primary"
                            className="w-full px-4 py-2"
                          >
                            Add to Order
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
