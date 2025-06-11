import React, { useState } from 'react';
import { ShoppingBag, Filter, Search, Star } from 'lucide-react';
import { Product } from '../types';
import { getProductRecommendations } from '../utils/productRecommendations';
import ProductCard from './ProductCard';

// Extended product database for marketplace
const allProducts: Product[] = [
  {
    id: 'interactive-puzzle-toy',
    name: 'Interactive Puzzle Feeder',
    description: 'Mental stimulation toy that reduces anxiety and boredom',
    price: '$24.99',
    image: 'https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'toy',
    targetMoods: ['Anxious', 'Bored', 'Curious'],
    targetPersonalities: ['Chill Introvert', 'Anxious Angel'],
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: 'rope-tug-toy',
    name: 'Heavy Duty Rope Tug Toy',
    description: 'Perfect for high-energy play sessions and bonding',
    price: '$16.99',
    image: 'https://images.pexels.com/photos/7210755/pexels-photo-7210755.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'toy',
    targetMoods: ['Excited', 'Playful', 'Happy'],
    targetPersonalities: ['Playful Diva', 'Adventure Seeker'],
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: 'calming-chew-toy',
    name: 'Calming Lavender Chew Toy',
    description: 'Infused with natural lavender to promote relaxation',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/7210756/pexels-photo-7210756.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'comfort',
    targetMoods: ['Anxious', 'Stressed'],
    targetPersonalities: ['Gentle Giant', 'Anxious Angel'],
    rating: 4.7,
    reviewCount: 634
  },
  {
    id: 'calming-treats',
    name: 'Natural Calming Treats',
    description: 'Chamomile and L-theanine treats for stress relief',
    price: '$22.99',
    image: 'https://images.pexels.com/photos/7210757/pexels-photo-7210757.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'food',
    targetMoods: ['Anxious', 'Stressed'],
    targetPersonalities: ['Anxious Angel', 'Gentle Giant'],
    rating: 4.5,
    reviewCount: 456
  },
  {
    id: 'training-treats',
    name: 'High-Value Training Treats',
    description: 'Irresistible treats perfect for training sessions',
    price: '$18.99',
    image: 'https://images.pexels.com/photos/7210758/pexels-photo-7210758.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'training',
    targetMoods: ['Curious', 'Playful'],
    targetPersonalities: ['Adventure Seeker', 'Playful Diva'],
    rating: 4.9,
    reviewCount: 1123
  },
  {
    id: 'orthopedic-bed',
    name: 'Memory Foam Orthopedic Bed',
    description: 'Ultimate comfort for rest and relaxation',
    price: '$89.99',
    image: 'https://images.pexels.com/photos/7210759/pexels-photo-7210759.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'comfort',
    targetMoods: ['Content', 'Tired'],
    targetPersonalities: ['Chill Introvert', 'Gentle Giant'],
    rating: 4.8,
    reviewCount: 789
  },
  {
    id: 'anxiety-vest',
    name: 'Calming Anxiety Vest',
    description: 'Gentle pressure therapy for anxious pets',
    price: '$34.99',
    image: 'https://images.pexels.com/photos/7210760/pexels-photo-7210760.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'health',
    targetMoods: ['Anxious', 'Stressed'],
    targetPersonalities: ['Anxious Angel', 'Gentle Giant'],
    rating: 4.4,
    reviewCount: 567
  },
  {
    id: 'agility-kit',
    name: 'Backyard Agility Training Kit',
    description: 'Complete set for active dogs who love challenges',
    price: '$79.99',
    image: 'https://images.pexels.com/photos/7210761/pexels-photo-7210761.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'training',
    targetMoods: ['Excited', 'Playful', 'Energetic'],
    targetPersonalities: ['Adventure Seeker', 'Playful Diva'],
    rating: 4.7,
    reviewCount: 345
  }
];

interface MarketplaceProps {
  currentPet?: { name: string; personality?: { type: string } } | null;
}

const Marketplace: React.FC<MarketplaceProps> = ({ currentPet }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'reviews'>('rating');

  const categories = [
    { id: 'all', label: 'All Products', icon: '🛍️' },
    { id: 'toy', label: 'Toys', icon: '🧸' },
    { id: 'food', label: 'Food & Treats', icon: '🦴' },
    { id: 'comfort', label: 'Comfort', icon: '🛏️' },
    { id: 'health', label: 'Health', icon: '💊' },
    { id: 'training', label: 'Training', icon: '🎯' },
  ];

  // Filter and sort products
  let filteredProducts = allProducts;

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  // Get personalized recommendations if we have a pet
  const personalizedProducts = currentPet?.personality ? 
    getProductRecommendations('Happy', currentPet.personality, 4) : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-mint-100 to-coral-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-mint-600" />
          </div>
          <div>
            <h2 className="font-fredoka text-3xl font-bold text-gray-800">
              Pet Marketplace
            </h2>
            <p className="text-gray-600">
              Curated products to keep your pet happy and healthy
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400 focus:border-transparent font-fredoka"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'reviews')}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400 focus:border-transparent font-fredoka"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="reviews">Sort by Reviews</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-fredoka font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-mint-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-mint-100'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      {personalizedProducts.length > 0 && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 mb-6">
            <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-2 flex items-center">
              <Star className="w-6 h-6 text-purple-500 mr-2" />
              Perfect for {currentPet?.name}
            </h3>
            <p className="text-gray-600">
              Based on {currentPet?.name}'s personality: {currentPet?.personality?.type}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {personalizedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                source="marketplace"
                petName={currentPet?.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Products */}
      <div className="mb-6">
        <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-4">
          {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.label}
          <span className="text-gray-500 text-lg ml-2">({filteredProducts.length})</span>
        </h3>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-fredoka text-2xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              source="marketplace"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;