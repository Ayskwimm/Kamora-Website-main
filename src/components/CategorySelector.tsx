import React from 'react';

type CategoryKey = 'meal' | 'burger' | 'snacks' | 'soup' | 'drinks';

interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  color: string;
  description: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: CategoryKey;
  onSelectCategory: (key: CategoryKey) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="hidden sm:block mb-12">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onSelectCategory(category.key)}
              className={`group relative px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-3xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-kamora-orange to-kamora-red text-white shadow-xl shadow-kamora-orange/30'
                  : 'bg-white text-kamora-dark border-2 border-gray-200 hover:border-kamora-orange hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {category.icon}
                </span>
                <span>{category.label}</span>
              </div>
              
              {/* Animated underline for active state */}
              {selectedCategory === category.key && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="sm:hidden mb-8 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onSelectCategory(category.key)}
              className={`flex-shrink-0 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 snap-center whitespace-nowrap ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-kamora-orange to-kamora-red text-white shadow-lg shadow-kamora-orange/30 scale-105'
                  : 'bg-white text-kamora-dark border-2 border-gray-200 active:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>


    </>
  );
};

export default CategorySelector;
