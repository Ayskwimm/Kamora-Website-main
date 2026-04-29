import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';
import burgerWithCheeseImg from '../../assets/burgerwcheese.png';
import burgerDeluxeImg from '../../assets/burgerdeluxe.png';
import extraGravyImg from '../../assets/extragravy.png';
import mushroomSoupImg from '../../assets/soupmushroom.png';
import soupImg from '../../assets/SOUP.png';
import iceTeaImg from '../../assets/ice-tea.png';
import redIceTeaImg from '../../assets/redicetea.png';
import mealOriginalImg from '../../assets/mealOriginal.png';
import mealBbqImg from '../../assets/mealBBQ.png';
import mealSpicyImg from '../../assets/mealSpicy.png';
import mealGarlicImg from '../../assets/mealgarlic.png';
import mealAlakingImg from '../../assets/mealAlaking.png';
import mealCheeseImg from '../../assets/mealcheese.png';
import bitesOriginal from '../../assets/bitesOriginal.png';
import bitesSpicy from '../../assets/bitesSpicy.png';
import bitesBbq from '../../assets/bitesBBQ.png';
import bitesGarlic from '../../assets/bitesGarlic.png';
import rice from '../../assets/RICE.webp';

type CategoryKey = 'meal' | 'burger' | 'snacks' | 'soup' | 'drinks';

interface MenuItem {
  id: string;
  name: string;
  category: CategoryKey;

  price: number;
  priceLabel: string;
  comboPriceLabel?: string;
  comboPrice?: number;
  image: string;
}

const categories: { key: CategoryKey; label: string; icon: string; description: string; image: string }[] = [
  { key: 'meal', label: 'Meals', icon: '🍽️', description: 'Fresh hot meals served with savory sides.', image: mealOriginalImg },
  { key: 'burger', label: 'Burger', icon: '🍔', description: 'Juicy burgers with premium toppings.', image: burgerWithCheeseImg },
  { key: 'snacks', label: 'Snacks', icon: '🍟', description: 'Crispy snacks made for sharing.', image: bitesOriginal },
  { key: 'soup', label: 'Soup', icon: '🍲', description: 'Warm soups made to comfort and delight.', image: mushroomSoupImg },
  { key: 'drinks', label: 'Drinks', icon: '🥤', description: 'Refreshing beverages to complete every meal.', image: iceTeaImg },
];


const customizationOptions = [
  { label: 'Extra gravy', value: 'Extra gravy', price: 10, image: extraGravyImg },
  { label: 'Extra rice', value: 'Extra rice', price: 15, image: rice },
];

const comboPricingMap: Record<string, Record<string, number>> = {
  'Kamofile original with gravy': { 'Mushroom soup': 89, 'Crab and corn soup': 95 },
  'Kamofile spicy flavor': { 'Mushroom soup': 95, 'Crab and corn soup': 99 },
  'Kamofile buttered garlic flavor': { 'Mushroom soup': 95, 'Crab and corn soup': 99 },
  'Kamofile BBQ flavor': { 'Mushroom soup': 95, 'Crab and corn soup': 99 },
  'Kamofile a la king': { 'Mushroom soup': 99, 'Crab and corn soup': 105 },
  'Cheesy kamofile': { 'Mushroom soup': 99, 'Crab and corn soup': 105 },
};

const menuItems: MenuItem[] = [
  { id: 'Kamofile-original-with-gravy', name: 'Kamofile original with gravy', category: 'meal', price: 108, priceLabel: '₱39.00', image: mealOriginalImg },
  { id: 'Kamofile-spicy-flavor', name: 'Kamofile spicy flavor', category: 'meal', price: 112, priceLabel: '₱45.00', image: mealSpicyImg },
  { id: 'Kamofile-buttered-garlic-flavor', name: 'Kamofile buttered garlic flavor', category: 'meal', price: 116, priceLabel: '₱45.00', image: mealGarlicImg },
  { id: 'Kamofile-BBQ-flavor', name: 'Kamofile BBQ flavor', category: 'meal', price: 120, priceLabel: '₱45.00', image: mealBbqImg },
  { id: 'Kamofile-a-la-king', name: 'Kamofile a la king', category: 'meal', price: 130, priceLabel: '₱49.00', image: mealAlakingImg },
  { id: 'Cheesy-kamofile', name: 'Cheesy kamofile', category: 'meal', price: 128, priceLabel: '₱49.00', image: mealCheeseImg },
  { id: 'kamora-burger-with-cheese', name: 'Kamora burger with cheese', category: 'burger', price: 105, priceLabel: '₱49.00', image: burgerWithCheeseImg },
  { id: 'kamora-burger-deluxe', name: 'Kamora burger deluxe', category: 'burger', price: 115, priceLabel: '₱69.00', image: burgerDeluxeImg },
  { id: 'kamo-bites-original', name: '6 pcs kamo-bites original', category: 'snacks', price: 102, priceLabel: '₱55.00', image: bitesOriginal},
  { id: 'kamo-bites-spicy', name: '6 pcs kamo-bites spicy', category: 'snacks', price: 108, priceLabel: '₱65.00', image: bitesSpicy},
  { id: 'kamo-bites-bbq', name: '6 pcs kamo-bites BBQ', category: 'snacks', price: 110, priceLabel: '₱65.00', image: bitesBbq},
  { id: 'kamo-bites-buttered-garlic', name: '6 pcs kamo-bites buttered garlic', category: 'snacks', price: 114, priceLabel: '₱69.00', image: bitesGarlic },
  { id: 'mushroom-soup', name: 'Mushroom soup', category: 'soup', price: 104, priceLabel: '₱39.00', comboPriceLabel: '₱89.00', comboPrice: 89, image: mushroomSoupImg },
  { id: 'crab-and-corn-soup', name: 'Crab and corn soup', category: 'soup', price: 106, priceLabel: '₱45.00', comboPriceLabel: '₱95.00', comboPrice: 95, image: soupImg },
  { id: 'ice-tea', name: 'Ice tea', category: 'drinks', price: 52, priceLabel: '₱19.00', image: iceTeaImg },
  { id: 'red-ice-tea', name: 'Red tea', category: 'drinks', price: 55, priceLabel: '₱19.00', image: redIceTeaImg },
];

const Menu: React.FC = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({
    'Extra gravy': 0,
    'Extra rice': 0,
  });
  const [selectedSize, setSelectedSize] = useState('Solo');
  const [selectedSoup, setSelectedSoup] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [selectedDrinkSize, setSelectedDrinkSize] = useState<'Regular' | 'Large'>('Regular');
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
    setAddonQuantities({
      'Extra gravy': 0,
      'Extra rice': 0,
    });
    setSelectedSize('Solo');
    setSelectedSoup(null);
    setSelectedDrink(null);
    setSelectedDrinkSize('Regular');
  };

  const closeCustomization = () => {
    setCustomizingItem(null);
    setAddonQuantities({
      'Extra gravy': 0,
      'Extra rice': 0,
    });
    setSelectedSize('Solo');
    setSelectedSoup(null);
    setSelectedDrink(null);
    setSelectedDrinkSize('Regular');
  };

  const handleAddToCart = () => {
    if (!customizingItem) return;

    const isDrinkItem = customizingItem.category === 'drinks';
    let customizationText = isDrinkItem ? selectedDrinkSize : `${selectedSize}`;
    let totalExtraPrice = 0;
    const drinkPrice = selectedDrink
      ? (customizingItem.category === 'burger' || customizingItem.category === 'snacks' || customizingItem.category === 'soup')
        ? selectedDrinkSize === 'Large'
          ? 29
          : 19
        : selectedDrinkSize === 'Large'
        ? 10
        : 0
      : 0;
    const addonLines: string[] = [];

    customizationOptions.forEach((option) => {
      const qty = addonQuantities[option.value] || 0;
      if (qty > 0) {
        addonLines.push(`${option.value} x${qty}`);
        totalExtraPrice += option.price * qty;
      }
    });

    if (selectedSize === 'Combo') {
      if (selectedSoup) {
        customizationText += ` - Soup: ${selectedSoup}`;
        totalExtraPrice += comboDisplayPrice - customizingItem.price;
      }
      if (selectedDrink) {
        customizationText += ` - Drink: ${selectedDrink} (${selectedDrinkSize})`;
        totalExtraPrice += drinkPrice;
      }
    } else if (!isDrinkItem && (customizingItem.category === 'burger' || customizingItem.category === 'snacks' || customizingItem.category === 'soup') && selectedDrink) {
      customizationText += ` - Drink: ${selectedDrink} (${selectedDrinkSize})`;
      totalExtraPrice += drinkPrice;
    }

    if (addonLines.length > 0) {
      customizationText += ` - ${addonLines.join(', ')}`;
    }

    const sanitizedCustomization = customizationText.trim().replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
    const cartItemId = customizingItem.id + (sanitizedCustomization ? `-${sanitizedCustomization}` : '');
    const itemPrice = customizingItem.category === 'drinks' ? (selectedDrinkSize === 'Large' ? 29 : 19) : customizingItem.price;

    addItem({
      id: cartItemId,
      name: customizingItem.name,
      price: itemPrice,
      displayPrice: customizingItem.priceLabel,
      image: customizingItem.image,
      customization: customizationText || undefined,
      extraPrice: totalExtraPrice || undefined,
    });

    setNotificationMessage(`${customizingItem.name} added to cart successfully.`);
    setShowNotification(true);
    closeCustomization();
  };

  const updateAddonQuantity = (optionValue: string, quantity: number) => {
    setAddonQuantities((prev) => ({
      ...prev,
      [optionValue]: quantity,
    }));
  };

  const activeCategoryData = activeCategory ? categories.find((category) => category.key === activeCategory) : null;
  const isMealItem = customizingItem?.category === 'meal';
  const isBurgerItem = customizingItem?.category === 'burger';
  const isSnackItem = customizingItem?.category === 'snacks';
  const isSoupItem = customizingItem?.category === 'soup';
  const isDrinkItem = customizingItem?.category === 'drinks';

  const currentCustomizationOptions = isMealItem
    ? customizationOptions
    : isSnackItem
    ? customizationOptions.filter((option) => option.value === 'Extra gravy')
    : isSoupItem
    ? customizationOptions.filter((option) => option.value === 'Extra rice')
    : [];

  const getComboPrice = (): number => {
    if (!selectedSize || selectedSize === 'Solo' || !customizingItem || !selectedSoup) return 0;
    return comboPricingMap[customizingItem.name]?.[selectedSoup] ?? 0;
  };

  const comboDisplayPrice = getComboPrice();
  const mealAddonTotal = currentCustomizationOptions.reduce(
    (sum, option) => sum + (addonQuantities[option.value] || 0) * option.price,
    0
  );
  const drinkItemPrice = isDrinkItem ? (selectedDrinkSize === 'Large' ? 29 : 19) : customizingItem?.price ?? 0;
  const drinkAddonPrice = selectedDrink
    ? (customizingItem?.category === 'burger' || customizingItem?.category === 'snacks' || customizingItem?.category === 'soup')
      ? selectedDrinkSize === 'Large'
        ? 29
        : 19
      : selectedDrinkSize === 'Large'
      ? 10
      : 0
    : 0;
  const addonTotalPrice = mealAddonTotal + drinkAddonPrice;
  const totalAddonFee = addonTotalPrice;

  const isComboRequirementsMet = selectedSize === 'Combo' ? selectedSoup && selectedDrink : true;
  const canAddToCart = isComboRequirementsMet;

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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto" onClick={closeCustomization}>
          <div
            className="relative w-full max-w-4xl rounded-[32px] bg-white shadow-2xl overflow-hidden max-h-[calc(100vh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-kamora-dark">Customize your Order</h3>
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

            <div className="flex flex-col md:flex-row overflow-y-auto max-h-[calc(100vh-10rem)]">
              {/* Product Image Section */}
              <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-gray-50 border-r">
                <img
                  src={selectedSize === 'Combo' ? 'https://via.placeholder.com/300x300/f5f5f5/999999?text=Combo+Meal' : customizingItem.image}
                  alt={selectedSize === 'Combo' ? 'Combo Meal' : customizingItem.name}
                  className="w-full max-w-xs h-auto object-cover rounded-2xl mb-4"
                />
                <h4 className="text-lg font-bold text-kamora-dark text-center">
                  {customizingItem.name}{isMealItem ? ` - ${selectedSize}` : ''}
                </h4>
                {isDrinkItem ? (
                  <p className="mt-2 text-xl font-bold text-kamora-orange text-center">₱{drinkItemPrice.toFixed(2)}</p>
                ) : selectedSize === 'Solo' ? (
                  <p className="mt-2 text-xl font-bold text-kamora-orange text-center">{customizingItem.priceLabel}</p>
                ) : selectedSize === 'Combo' && comboDisplayPrice > 0 ? (
                  <p className="mt-2 text-sm font-semibold text-kamora-orange text-center">
                    ₱{comboDisplayPrice.toFixed(2)}
                  </p>
                ) : null}
              </div>

              <div className="md:w-2/3 p-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Customize your order</p>
                  {isMealItem && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {['Combo', 'Solo'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setSelectedSize(size);
                            if (size === 'Combo') {
                              setSelectedSoup(null);
                              setSelectedDrink(null);
                              setSelectedDrinkSize('Regular');
                            }
                          }}
                          className={`rounded-2xl border px-4 py-3 text-center transition font-semibold ${
                            selectedSize === size
                              ? 'border-kamora-orange bg-kamora-orange/10 text-kamora-dark'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-kamora-orange'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {(selectedSize === 'Combo' || isBurgerItem || isSnackItem || isSoupItem || isDrinkItem) && (
                  <>
                    {isDrinkItem ? (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Choose your size</p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { size: 'Regular', price: 19, label: '₱19.00' },
                            { size: 'Large', price: 29, label: '₱29.00' },
                          ].map((option) => (
                            <button
                              key={option.size}
                              type="button"
                              onClick={() => setSelectedDrinkSize(option.size as 'Regular' | 'Large')}
                              className={`rounded-2xl border px-4 py-4 text-center transition ${
                                selectedDrinkSize === option.size
                                  ? 'border-kamora-orange bg-kamora-orange/10 text-kamora-dark'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-kamora-orange'
                              }`}
                            >
                              <span className="font-semibold block">{option.size}</span>
                              <span className="text-sm text-kamora-orange">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {selectedSize === 'Combo' && (
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-3">Choose your soup</p>
                            <div className="relative">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    const container = document.getElementById('soup-carousel');
                                    if (container) container.scrollLeft -= 200;
                                  }}
                                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-gray-700 transition"
                                >
                                  ‹
                                </button>
                                <div
                                  id="soup-carousel"
                                  className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                                >
                                  {menuItems
                                    .filter((item) => item.category === 'soup')
                                    .map((soup) => (
                                      <button
                                        key={soup.id}
                                        type="button"
                                        onClick={() => setSelectedSoup(soup.name)}
                                        className={`flex-shrink-0 w-32 rounded-2xl border overflow-hidden transition ${
                                          selectedSoup === soup.name
                                            ? 'border-kamora-orange bg-kamora-orange/10'
                                            : 'border-gray-200 bg-white hover:border-kamora-orange'
                                        }`}
                                      >
                                        <div className="relative w-full h-32 overflow-hidden bg-gray-100">
                                          <img
                                            src={soup.image}
                                            alt={soup.name}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div className="p-2 text-center">
                                          <span className="font-semibold text-xs text-kamora-dark block">{soup.name}</span>
                                        </div>
                                      </button>
                                    ))}
                                </div>
                                <button
                                  onClick={() => {
                                    const container = document.getElementById('soup-carousel');
                                    if (container) container.scrollLeft += 200;
                                  }}
                                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-gray-700 transition"
                                >
                                  ›
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-3">Choose your drink</p>
                          <div className="relative">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  const container = document.getElementById('drink-carousel');
                                  if (container) container.scrollLeft -= 200;
                                }}
                                className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-gray-700 transition"
                              >
                                ‹
                              </button>
                              <div
                                id="drink-carousel"
                                className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                              >
                                {menuItems
                                  .filter((item) => item.category === 'drinks')
                                  .map((drink) => (
                                    <button
                                      key={drink.id}
                                      type="button"
                                      onClick={() => setSelectedDrink(drink.name)}
                                      className={`flex-shrink-0 w-32 rounded-2xl border overflow-hidden transition ${
                                        selectedDrink === drink.name
                                          ? 'border-kamora-orange bg-kamora-orange/10'
                                          : 'border-gray-200 bg-white hover:border-kamora-orange'
                                      }`}
                                    >
                                      <div className="relative w-full h-32 overflow-hidden bg-gray-100">
                                        <img
                                          src={drink.image}
                                          alt={drink.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-2 text-center">
                                        <span className="font-semibold text-xs text-kamora-dark block">{drink.name}</span>
                                      </div>
                                    </button>
                                  ))}
                              </div>
                              <button
                                onClick={() => {
                                  const container = document.getElementById('drink-carousel');
                                  if (container) container.scrollLeft += 200;
                                }}
                                className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-gray-700 transition"
                              >
                                ›
                              </button>
                            </div>
                          </div>

                          {selectedDrink && (
                            <div className="mt-4">
                              <p className="text-sm font-semibold text-gray-700 mb-3">Choose your drink size</p>
                              <div className="grid grid-cols-2 gap-3">
                                {((customizingItem?.category === 'burger' || customizingItem?.category === 'snacks' || customizingItem?.category === 'soup')
                                  ? [
                                      { size: 'Regular', price: 19, label: '+₱19.00' },
                                      { size: 'Large', price: 29, label: '+₱29.00' },
                                    ]
                                  : [
                                      { size: 'Regular', price: 0, label: '₱0.00' },
                                      { size: 'Large', price: 10, label: '+₱10.00' },
                                    ]
                                ).map((option) => (
                                  <button
                                    key={option.size}
                                    type="button"
                                    onClick={() => setSelectedDrinkSize(option.size as 'Regular' | 'Large')}
                                    className={`rounded-2xl border px-4 py-4 text-center transition ${
                                      selectedDrinkSize === option.size
                                        ? 'border-kamora-orange bg-kamora-orange/10 text-kamora-dark'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-kamora-orange'
                                    }`}
                                  >
                                    <span className="font-semibold block">{option.size}</span>
                                    <span className="text-sm text-kamora-orange">{option.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}

                {(isMealItem || isSnackItem || isSoupItem) && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Include Add-ons</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {currentCustomizationOptions.map((option) => {
                        const qty = addonQuantities[option.value] || 0;
                        return (
                          <div
                            key={option.value}
                            className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition"
                          >
                            <div className="relative w-full h-40 overflow-hidden bg-gray-100">
                              <img
                                src={option.image}
                                alt={option.label}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 space-y-3">
                              <div>
                                <p className="font-semibold text-sm text-kamora-dark">{option.label}</p>
                                <p className="text-sm text-kamora-orange font-medium">+₱{option.price}</p>
                              </div>
                              <div className="flex items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
                                <button
                                  type="button"
                                  onClick={() => updateAddonQuantity(option.value, Math.max(0, qty - 1))}
                                  className="h-8 w-8 rounded-full bg-white text-kamora-dark shadow-sm hover:bg-gray-100"
                                >
                                  −
                                </button>
                                <span className="text-sm font-semibold">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateAddonQuantity(option.value, qty + 1)}
                                  className="h-8 w-8 rounded-full bg-white text-kamora-dark shadow-sm hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-6">
                  <div>
                    <p className="text-sm text-gray-500">Add-ons fee</p>
                    <p className="text-lg font-bold text-kamora-orange">+₱{totalAddonFee.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {selectedSize === 'Combo' && !selectedSoup && (
                      <p className="text-sm text-red-600 font-medium">Please select a soup</p>
                    )}
                    {selectedSize === 'Combo' && selectedSoup && !selectedDrink && (
                      <p className="text-sm text-red-600 font-medium">Please select a drink</p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={closeCustomization}
                        variant="secondary"
                        className="px-5 py-3 !bg-red-500 !text-white !border-red-500 hover:!bg-red-600 hover:!border-red-600"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddToCart} 
                        variant="primary" 
                        className="px-5 py-3"
                        disabled={!canAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
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
